import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, Button, Row, Col, Tooltip, Table, Input, message } from 'antd';
import { UsergroupAddOutlined, UserOutlined } from '@ant-design/icons'
import { getAllUsers } from '../../services/users';
import { getAllEventParticipantsByEventId, upsertEventParticipant } from '../../services/event_participants';

const { Option } = Select;

const columns = [
    {
        title: 'User Name',
        dataIndex: 'username',
        key: 'username',
        filterSearch: true,
        sorter: (a, b) => a?.username?.length - b?.username?.length
    },
    {
        title: 'College Name',
        dataIndex: 'college',
        key: 'collegeName',
        render: (item) => item?.collegeName,
        onFilter: (value, record) => record?.college?.collegeName?.startsWith(value),
        filterSearch: true,
        sorter: (a, b) => a?.college?.collegeName?.length - b?.college?.collegeName?.length,
    }
];

const AddParticipantModal = ({ event, open, onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [selectionType, setSelectionType] = useState('checkbox');
    const [messageApi, contextHolder] = message.useMessage();

    // Fetch list of users when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    // Fetch list of participants when the event changes
    useEffect(() => {
        if (event?.id) {
            fetchEventParticipants(event?.id);
        }
    }, [event]);

    // Function to handle form submission
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            messageApi?.destroy();
            messageApi?.open({
                type: 'loading',
                content: 'Updating Event Participants..',
                duration: 0,
            });
            const result = await upsertEventParticipant(participants);
            const selectedParticipants = (result || [])?.map(participant => participant?.user?.id);
            if (selectedParticipants) {
                setSelectedParticipants(selectedParticipants);
            }
            messageApi?.destroy();
            messageApi.open({
                type: 'success',
                content: 'Event Participants Updated Successflly!',
                duration: 4000,
            });
            setLoading(false);
            onClose();
        } catch (error) {
            console.error('Error adding participants:', error);
            messageApi.open({
                type: 'error',
                content: 'Event participants updation failed, Please try again after sometime!',
                duration: 4000,
            });
            setLoading(false);
        }
    };

    // Function to fetch list of users
    const fetchUsers = async () => {
        try {
            const users = await getAllUsers();
            setUsers(users);
            setFiltered(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Function to fetch list of event participants
    const fetchEventParticipants = async (id) => {
        try {
            const participants = await getAllEventParticipantsByEventId(id);
            setParticipants(participants);
            const selectedParticipants = participants.map(participant => participant?.user?.id);
            setSelectedParticipants(selectedParticipants);
        } catch (error) {
            setParticipants([]);
            console.error('Error fetching participants:', error);
        }
    };

    const search = value => {
        value = (value || '').trim();
        if (!value) {
            setFiltered(users);
        } else {
            const filterData = [...(users || [])].filter(o =>
                Object.keys(o).some(k =>
                    String(o[k])
                        .toLowerCase()
                        .includes(value.toLowerCase())
                )
            );
            setFiltered(filterData);
        }
    };

    const getByHeader = () => {
        return <>
            <div className='modal-header'>
                <div className='title'>{event?.eventName}</div>
                <div className='subtitle'>Manage Participants</div>
            </div>
        </>
    };

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            if (selectedParticipants) {
                setSelectedParticipants(selectedRowKeys);
            }
            let updatedParticipants = [];
            (selectedRows || []).forEach((user) => {
                updatedParticipants = [...updatedParticipants, { user, event }]
            });
            setParticipants(updatedParticipants);
        },
        getCheckboxProps: (record) => ({
            disabled: record.deleted === true,
            // Column configuration not to be checked
            name: record.username,
        }),
    };

    return (
        <Modal
            type='info'
            title={getByHeader()}
            open={open}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
                    Add
                </Button>,
            ]}
        >
            {contextHolder}
            <Row >
                <Input.Search
                    style={{ margin: "0 0 10px 0" }}
                    placeholder="Search participants to add.."
                    enterButton
                    onSearch={search}
                />
                <Table
                    columns={columns}
                    dataSource={filtered}
                    loading={loading}
                    rowKey="id"
                    scroll={{ y: 200 }}
                    pagination={false}
                    rowSelection={{
                        selectedRowKeys: selectedParticipants,
                        type: selectionType,
                        ...rowSelection,
                    }} />
            </Row>

        </Modal>
    );
};

export default AddParticipantModal;
