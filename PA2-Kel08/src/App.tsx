import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthRoutes from './routes/Auth';
import AdminRoutes from './routes/Admin';
import UserRoutes from './routes/User';

function App() {
  return (
    <BrowserRouter>
    <AuthRoutes />
    <AdminRoutes />
    <UserRoutes />
    </BrowserRouter>
  );
}

export default App;