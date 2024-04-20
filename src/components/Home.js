import React from 'react';
import { Layout } from 'antd';
import Header from './Header';

const { Content } = Layout;

const Home = ({ isLoggedIn, collapsed, setCollapsed }) => {
    return (
        <>
            {isLoggedIn && (
                <Header isLoggedIn={isLoggedIn} collapsed={collapsed} setCollapsed={setCollapsed} />
            )}
            <Content>
                {/* Your home content goes here */}
                <div style={{ padding: '24px', background: '#fff', minHeight: '280px' }}>
                    Welcome to the Home page!
                </div>
            </Content>
        </>
    );
};

export default Home;
