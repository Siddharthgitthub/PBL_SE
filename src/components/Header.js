import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, BarChartOutlined, VideoCameraOutlined, LogoutOutlined, TeamOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

const { Header: AntdHeader, Sider, Content } = Layout;

const Header = ({ isLoggedIn, collapsed, setCollapsed, children }) => {
    const { logout } = useAuth();
    const location = useLocation();

    // Function to get the selected key based on the current route
    const getSelectedKey = () => {
        switch (location.pathname) {
            case '/dashboard':
                return '2';
            case '/events':
                return '3';
            default:
                return '2'; // Default to Dashboard if route not matched
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    defaultSelectedKeys={['2']}
                    selectedKeys={[getSelectedKey()]} // Set selected key based on current route
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={[
                        {
                            key: '1',
                            icon: <TeamOutlined style={{
                                fontSize: '18px',
                                fontWeight: '900',
                                fontFamily: 'fantasy',
                                color: 'darkseagreen',
                                marginBottom: '7px',
                            }}
                            />,
                            // label: 'CommunHive',
                            label: <Link to="/">CommunHive</Link>,
                            style: {
                                fontSize: '18px',
                                fontWeight: '900',
                                fontFamily: 'fantasy',
                                color: 'darkseagreen',
                            }
                        },
                        {
                            key: '2',
                            icon: <BarChartOutlined />,
                            label: <Link to="/dashboard">Dashboard</Link>
                        },
                        {
                            key: '3',
                            icon: <VideoCameraOutlined />,
                            label: <Link to="/events">Events</Link>
                        }]}
                />
            </Sider>
            <Layout>
                <AntdHeader style={{
                    background: '#fff',
                    padding: 14,
                    display: 'inline-flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Button
                        type="text"
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            padding: '0 24px',
                        }}
                    >
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                    <Button
                        type="text"
                        onClick={() => logout()}
                        style={{
                            fontSize: '16px',
                            padding: '0 24px',
                        }}
                    >
                        <LogoutOutlined />
                    </Button>
                </AntdHeader>
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Header;
