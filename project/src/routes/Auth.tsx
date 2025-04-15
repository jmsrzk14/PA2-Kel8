import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
// import ForgotPass from "../pages/Auth/forgot_pass";
// import ChangePass from "../pages/Auth/change_pass";

const AuthRoutes = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/forgot_pass" element={<ForgotPass />} />
            <Route path="/change_pass" element={<ChangePass />} /> */}
        </Routes>
    );
};

export default AuthRoutes;