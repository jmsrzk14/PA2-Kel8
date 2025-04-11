import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../admin/Dashboard';

const isAuthenticated = true; // Sesuaikan dengan sistem autentikasi

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='/dashboard/*' element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace/>} />
    </Routes>
  );
};

export default AdminRoutes;
