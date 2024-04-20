import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, Outlet } from 'react-router-dom';
import { Spin, Layout, } from 'antd';
import './App.css'; // Import CSS file for styling

import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Events from './components/Events/Events';
import { AuthProvider, useAuth } from './hooks/auth';

const { Content } = Layout;

const LandingComponent = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

const ProtectedRoute = ({ children, collapsed, setCollapsed }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return <Header collapsed={collapsed} setCollapsed={setCollapsed}>
    {children}
  </Header>;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [collapsed, setCollapsed] = useState(false); // State to manage the collapse of the sider

  // Function to render components with loading spinner
  const renderComponentWithLoading = (component) => (
    loading ? <div className="spinner-container"><Spin size="large" /></div> : component
  );

  return (
    <Router>
      <AuthProvider>
        <Layout style={{ minHeight: '100vh' }}>
          <Content>
            <Routes>
              <Route path="/" element={<LandingComponent><Navigate to="/dashboard" /></LandingComponent>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={
                <ProtectedRoute collapsed={collapsed} setCollapsed={setCollapsed}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/events" element={
                <ProtectedRoute collapsed={collapsed} setCollapsed={setCollapsed}>
                  <Events />
                </ProtectedRoute>
              } />
            </Routes>
          </Content>
          <Outlet />
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
