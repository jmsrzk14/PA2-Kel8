import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "../user/HomeUser";
// import Dashboard from "../admin/Dashboard";

const UserRoutes = () => {
    return(
        <Routes>
            <Route path="/homeuser/*" element={<Home />} />
            <Route path="/" element={<Navigate to="/homeuser" replace />} />
        </Routes>
    );
};

export default UserRoutes;