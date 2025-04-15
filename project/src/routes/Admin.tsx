import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard';

const isAuthenticated = true;

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='/dashboard/*' element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace/>} />
    </Routes>
  );
};

export default AdminRoutes;
