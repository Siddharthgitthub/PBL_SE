import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, DatePicker, Select, message, Flex } from 'antd';
import { createEvent } from '../../services/events';
import { useAuth } from '../../hooks/auth';

const { Option } = Select;

const AddEvent = ({ doOpen, doClose }) => {
  const [form] = Form.useForm(); // Create a form instance
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      if (values) {
        messageApi?.destroy();
        values['eventTime'] = values?.eventTime?.$d?.toISOString();
        values['college'] = {
          id: user?.college?.id,
        };
        values['createdBy'] = user?.id;
        messageApi.open({
          type: 'loading',
          content: 'Adding Event..',
          duration: 0,
        });
        setLoading(true);
        // Save Events Using API
        await createEvent(values);
        setTimeout(() => {
          setLoading(false);
          messageApi?.destroy();
          messageApi.open({
            type: 'success',
            content: 'Event created successflly!',
            duration: 4000,
          });
          form.resetFields();
          doClose(true, () => { messageApi.destroy() });
        }, 4000);
      }
    } catch (error) {
      console.error('Error creating event:', error.message);
      setLoading(true);
      messageApi.destroy();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const flexStyle = {
    width: '100%',
    justifyContent: 'left',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const disabledDate = (current) => {
    // Disable dates from today to the past
    return current && current < new Date();
  };

  return (
    <Flex style={flexStyle}>
      {contextHolder}
      <Form form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item label="Event Name" name="eventName" rules={[{ required: true, message: 'Please Enter Event Name!' }]}>
              <Input placeholder="Event Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Event Type" name="eventType" rules={[{ required: true, message: 'Please Select Event Type!' }]}>
              <Select
                placeholder="Select Type"
                style={{ width: '100%' }}
              >
                <Option value="PUBLIC">Public</Option>
                <Option value="PRIVATE">Private</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Event Fee" name="eventFee" rules={[{ required: true, message: 'Please Enter Event Fee!' }]}>
              <Input placeholder="Enter Fee" type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Event Location" name="eventLocation" rules={[{ required: true, message: 'Please Enter Event Location!' }]}>
              <Input placeholder="Enter Location" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Event Time" name="eventTime" rules={[{ required: true, message: 'Please Select Event Time!' }]}>
              <DatePicker showTime
                placeholder="Enter Date and Time"
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              style={{ width: '100%', justifyContent: 'right' }}>
              Add Event
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Flex>
  );
};

export default AddEvent;
