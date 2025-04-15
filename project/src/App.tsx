import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import StudentDashboard from './pages/Student/Dashboard';
import LoginAdmin from './pages/Auth/Login';
import LoginSiswa from './pages/Student/Auth/Login';
import Register from './pages/Auth/Register';

function AppRoutes() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      if (token.startsWith('admin-')) {
        setUserRole('admin');
        navigate('/dashboard/home', { replace: true });
      } else if (token.startsWith('student-')) {
        setUserRole('student');
        navigate('/dashboard/student/home', { replace: true });
      } else {
        setUserRole(null);
        setIsAuthenticated(false);
        navigate('/loginsiswa', { replace: true });
      }
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      navigate('/loginsiswa', { replace: true });
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={
          isAuthenticated && userRole === 'admin' ? (
            <Dashboard />
          ) : (
            <Navigate to="/loginadmin" replace />
          )
        }
      />

      <Route
        path="/dashboard/student/*"
        element={
          isAuthenticated && userRole === 'student' ? (
            <StudentDashboard />
          ) : (
            <Navigate to="/loginsiswa" replace />
          )
        }
      />

      <Route
        path="/loginadmin"
        element={
          <LoginAdmin
            setIsAuthenticated={setIsAuthenticated}
            setUserRole={setUserRole}
          />
        }
      />

      <Route
        path="/loginsiswa"
        element={
          <LoginSiswa
            setIsAuthenticated={setIsAuthenticated}
            setUserRole={setUserRole}
          />
        }
      />

      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          isAuthenticated ? (
            userRole === 'admin' ? (
              <Navigate to="/dashboard/home" replace />
            ) : userRole === 'student' ? (
              <Navigate to="/dashboard/student/home" replace />
            ) : (
              <Navigate to="/loginsiswa" replace />
            )
          ) : (
            <Navigate to="/loginsiswa" replace />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
