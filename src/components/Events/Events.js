import React, { useState, useEffect } from 'react';
import { Table, Input, Layout, Button, FloatButton, Tooltip, Drawer, Space } from 'antd';
import { PlusOutlined, CloseOutlined, SyncOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { getAllEvents } from '../../services/events';
import AddEvent from './AddEvent';
import AddParticipantModal from './AddParticipantModal';

const { Header, Content } = Layout;

const Events = () => {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addEditModal, setAddEditModal] = useState(false);
  const [event, setEvent] = useState();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getAllEvents();
      setEvents(response);
      setFiltered(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = (needReload = false, cb = () => { }) => {
    setOpen(false);
    if (needReload) {
      fetchEvents();
      cb(); // close message if open and call is comming from AddEvent page.
    }
  };

  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'eventName',
      key: 'eventName',
      filterSearch: true,
      sorter: (a, b) => a?.eventName?.length - b?.eventName?.length
    },
    {
      title: 'College Name',
      dataIndex: 'college',
      key: 'collegeName',
      render: (item) => item?.collegeName,
      onFilter: (value, record) => record?.college?.collegeName?.startsWith(value),
      filterSearch: true,
      sorter: (a, b) => a?.college?.collegeName?.length - b?.college?.collegeName?.length,
    },
    {
      title: 'Event Type',
      dataIndex: 'eventType',
      key: 'eventType',
      filterSearch: true,
      sorter: (a, b) => a?.eventType?.length - b?.eventType?.length,
    },
    {
      title: 'Event Fee',
      dataIndex: 'eventFee',
      key: 'eventFee',
      sorter: (a, b) => a.eventFee - b.eventFee,
    },
    {
      title: 'Event Location',
      dataIndex: 'eventLocation',
      key: 'eventLocation',
      filterSearch: true,
    },
    {
      title: 'Event Time',
      dataIndex: 'eventTime',
      key: 'eventTime',
      filterSearch: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (item) => <div>
        <Tooltip title={'Add/Edit Participants'}>
          <UsergroupAddOutlined onClick={() => {
            setAddEditModal(true);
            setEvent(item)
          }} />
        </Tooltip>
      </div>,
    },
  ];

  const search = value => {
    value = (value || '').trim();
    if (!value) {
      setFiltered(events);
    } else {
      const filterData = [...(events || [])].filter(o =>
        Object.keys(o).some(k =>
          String(o[k])
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      );
      setFiltered(filterData);
    }
  };

  return (
    <div>
      <Drawer
        title="Create New Event"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Tooltip title="Cancel Add Event" >
              <Button
                onClick={onClose}
                type="primary"
                shape='circle'
                icon={<CloseOutlined />}
                style={{ background: '#ce1f1fe3' }} />
            </Tooltip>
          </Space>
        }
      >
        <AddEvent doClose={onClose} doOpen={showDrawer} />
      </Drawer>
      <Header style={{
        background: 'rgb(255, 255, 255)',
        display: 'inline-flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: '2px',
      }}>
        <div>
          <span style={{
            fontSize: '24px',
            fontWeight: '800'
          }}>Events</span>
        </div>
        <div>
          <Tooltip placement='top' title={'Add Event'} arrow={true}>
            <FloatButton.Group shape="square" style={{ right: 24 }} >
              <FloatButton icon={<SyncOutlined />} tooltip={'Refresh Events'} onClick={fetchEvents} />
              <FloatButton icon={<PlusOutlined />} tooltip={'Add Event'} onClick={showDrawer} />
            </FloatButton.Group>
          </Tooltip>
        </div>
      </Header>
      <Input.Search
        style={{ margin: "0 0 10px 0" }}
        placeholder="Search by..."
        enterButton
        onSearch={search}
      />
      <Table columns={columns} dataSource={filtered} loading={loading} rowKey="id" />
      <AddParticipantModal event={event}
        open={addEditModal}
        onClose={() => setAddEditModal(false)} />
    </div>
  );
};

export default Events;