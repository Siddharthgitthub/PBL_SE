import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Flex } from 'antd';
import { useAuth } from "../hooks/auth";
import { getNoAuthAllColleges } from "../services/colleges";
import { registerUser } from "../services/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { login, user } = useAuth();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const { Option } = Select;

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const collages = await getNoAuthAllColleges();
        setColleges(collages);
      } catch (error) {
        console.error('Error fetching colleges:', error);
      }
    };
    fetchColleges();
  }, []);

  if (user) {
    // user is not authenticated
    return <Navigate to="/dashboard" />;
  }

  const onFinish = async (values = {}) => {
    console.log('Success:', values);
    try {
      setLoading(true);
      messageApi?.destroy();
      messageApi.open({
        type: 'loading',
        content: 'Signing up...',
        duration: 0,
      });
      values = { ...values, college: { id: values?.college } };
      // Implement your signup logic here
      const result = await registerUser(values);
      setTimeout(() => {
        messageApi?.destroy();
        messageApi.open({
          type: 'success',
          content: 'Signup successfull!',
          duration: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }, 4000);

    } catch (error) {
      setLoading(false);
      messageApi?.destroy();
      console.error('Error while signing up, Error:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const flexStyle = {
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  return (
    <Flex style={flexStyle}>
      {contextHolder}
      <h1>Signup</h1>
      <Form
        style={{ width: '300px' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input a valid username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="college"
          rules={[{ required: true, message: 'Please select your college!' }]}
        >
          <Select placeholder="Select your college">
            {colleges.map((college) => (
              <Option key={college.id} value={college.id}>
                {college.collegeName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit" style={{ width: '100%' }}>
            Signup
          </Button>
        </Form.Item>
      </Form>
      <p style={{ marginTop: '16px' }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </Flex>
  );
};

export default Signup;
