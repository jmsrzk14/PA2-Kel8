import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CoursesContent from "./courses";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Breadcrumbs from "../components/Breadcrumbs";

const DashboardContent = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("en-GB", { hour12: false });

  return (
    <div className="p-4">
      <h1 className="mt-[-1em] text-2xl mb-6 sm:text-lg">{`${formattedDate} ${formattedTime}`}</h1>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Dashboard cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-indigo-600">1,234</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Courses</h3>
          <p className="text-3xl font-bold text-indigo-600">12</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Assignments</h3>
          <p className="text-3xl font-bold text-indigo-600">48</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Messages</h3>
          <p className="text-3xl font-bold text-indigo-600">15</p>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`transition-all duration-300 flex-1 ${isSidebarOpen ? "lg:ml-64 ml-20" : "ml-20"}`}>
        <Navbar />
        <Breadcrumbs />
        <Routes>
          <Route path="/home" element={<DashboardContent />} />
          <Route path="/courses" element={<CoursesContent />} />
          <Route path="/students" element={<div className="p-6">Students Content</div>} />
          <Route path="/schedule" element={<div className="p-6">Schedule Content</div>} />
          <Route path="/messages" element={<div className="p-6">Messages Content</div>} />
          <Route path="/settings" element={<div className="p-6">Settings Content</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
