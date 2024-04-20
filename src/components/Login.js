import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message as Message } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Flex } from 'antd';
import { useAuth } from "../hooks/auth";
import { loginUser } from "../services/auth";

const Login = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = Message.useMessage();
  const { login, user } = useAuth();
  const [message, setMessage] = useState(null);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const onFinish = async (values) => {
    try {
      messageApi?.destroy();
      messageApi.open({
        type: 'loading',
        content: 'Login in progress..',
        duration: 0,
      });
      const { token, user } = await loginUser(values);
      messageApi?.destroy();
      messageApi?.open({
        type: 'success',
        content: 'Log in successfull!',
        duration: 2,
      });
      setMessage(null);
      await login({ token, user });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      messageApi?.destroy();
      setMessage('Username or Password failed!');
      messageApi?.open({
        type: 'error',
        content: 'Username or Password failed!',
        duration: 0,
      });
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
      <h1>Login</h1>
      <Form
        style={{ width: '300px' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <p style={{ marginTop: '16px' }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </Flex>
  );
};

export default Login;