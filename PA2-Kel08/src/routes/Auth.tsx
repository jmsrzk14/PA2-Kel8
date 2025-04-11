import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotPass from "../auth/forgot_pass";
import ChangePass from "../auth/change_pass";

const AuthRoutes = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot_pass" element={<ForgotPass />} />
            <Route path="/change_pass" element={<ChangePass />} />
        </Routes>
    );
};

export default AuthRoutes;