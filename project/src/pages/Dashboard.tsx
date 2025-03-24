import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CoursesContent from "./courses";
import CreateCourses from "./CreateCourses";
import UpdateCourses from "./EditCourses";
import ViewCourses from "./ViewCourses";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Breadcrumbs from "../components/Breadcrumbs";

const DashboardContent = () => {
  const [time, setTime] = useState(new Date());
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://127.0.0.1:8000/courses/list");
        if (!response.ok) throw new Error("Gagal mengambil data students");
        const data = await response.json();
        setTotalStudents(data.length);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Gagal memuat jumlah students.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
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
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Paket TryOut</h3>
          {loading ? (
            <p className="text-lg text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-lg text-red-500">{error}</p>
          ) : (
            <p className="text-3xl font-bold text-indigo-600">{totalStudents.toLocaleString()}</p>
          )}
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Perguruan Tinggi Negeri</h3>
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
          <Route path="/courses/list" element={<CoursesContent />} />
          <Route path="/courses/tambahPaket" element={<CreateCourses />} />
          <Route path="/courses/edit/:id" element={<UpdateCourses />} />
          <Route path="/courses/view/:id" element={<ViewCourses />} />
          <Route path="/messages" element={<div className="p-6">Messages Content</div>} />
          <Route path="/settings" element={<div className="p-6">Settings Content</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
