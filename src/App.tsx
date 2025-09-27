import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AnalysisPage from './components/AnalysisPage';
import InventoryPage from './components/InventoryPage';
import AdminPage from './components/AdminPage';
import Layout from './components/Layout';
import Chatbot from './components/Chatbot';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} 
          />
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <Layout>
                  <Routes>
                    <Route path="/analise" element={<AnalysisPage />} />
                    <Route path="/inventario" element={<InventoryPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/" element={<Navigate to="/analise" />} />
                  </Routes>
                  <Chatbot />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;