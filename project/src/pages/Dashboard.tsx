import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import StudentsContent from "./students";
import CoursesContent from "./courses";
import MajorContent from "./major";
import PtnContent from "./ptn";
import CreateCourses from "./CreateCourses";
import CreateUniversity from "./CreateUniversity";
import CreateMajor from "./CreateMajor";
import UpdateCourses from "./EditCourses";
import UpdateMajor from "./EditMajor";
import UpdateUniversity from "./EditUniversity";
import UpdateStudents from "./EditStudents";
import ViewCourses from "./ViewCourses";
import ViewMajor from "./ViewMajor";
import ViewStudents from "./ViewStudents";
import ViewUniversity from "./ViewUniversity";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Breadcrumbs from "../components/Breadcrumbs";

const DashboardContent = () => {
  const [time, setTime] = useState(new Date());
  const [totalPackets, setTotalPackets] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalUniversity, setTotalUniversity] = useState(0);
  const [totalMajor, setTotalMajor] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchPackets = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://127.0.0.1:8000/admin/listPacket");
        if (!response.ok) throw new Error("Gagal mengambil data students");
        const data = await response.json();
        setTotalPackets(data.length);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("");
      } finally {
        setLoading(false);
      }
    };
    const fetchStudents = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://127.0.0.1:8000/admin/listStudent");
        if (!response.ok) throw new Error("Gagal mengambil data students");
        const data = await response.json();
        setTotalStudents(data.length);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("");
      } finally {
        setLoading(false);
      }
    };
    const fetchUniversity = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://127.0.0.1:8000/admin/listUniversity");
        if (!response.ok) throw new Error("Gagal mengambil data students");
        const data = await response.json();
        setTotalUniversity(data.length);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("");
      } finally {
        setLoading(false);
      }
    };
    const fetchMajor = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://127.0.0.1:8000/admin/listMajor");
        if (!response.ok) throw new Error("Gagal mengambil data students");
        const data = await response.json();
        setTotalMajor(data.length);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("");
      } finally {
        setLoading(false);
      }
    };
    fetchPackets();
    fetchStudents();
    fetchUniversity();
    fetchMajor();
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
          <h3 className="text-md font-semibold text-gray-700 mb-2">Paket TryOut</h3>
          {loading ? (
            <p className="text-lg text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-lg text-red-500">{error}</p>
          ) : (
            <p className="text-3xl font-bold text-indigo-600">{totalPackets.toLocaleString()}</p>
          )}
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Jumlah Siswa</h3>
          {loading ? (
            <p className="text-lg text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-lg text-red-500">{error}</p>
          ) : (
            <p className="text-3xl font-bold text-indigo-600">{totalStudents.toLocaleString()}</p>
          )}
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Perguruan Tinggi Negeri</h3>
          {loading ? (
            <p className="text-lg text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-lg text-red-500">{error}</p>
          ) : (
            <p className="text-3xl font-bold text-indigo-600">{totalUniversity.toLocaleString()}</p>
          )}
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Program Studi</h3>
          {loading ? (
            <p className="text-lg text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-lg text-red-500">{error}</p>
          ) : (
            <p className="text-3xl font-bold text-indigo-600">{totalMajor.toLocaleString()}</p>
          )}
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
          <Route path="/courses/editPaket/:id" element={<UpdateCourses />} />
          <Route path="/courses/viewPaket/:id" element={<ViewCourses />} />
          <Route path="/students/list" element={<StudentsContent />} />
          <Route path="/students/viewSiswa/:username" element={<ViewStudents />} />
          <Route path="/students/editSiswa/:username" element={<UpdateStudents />} />
          <Route path="/university/list" element={<PtnContent />} />
          <Route path="/university/tambahPtn" element={<CreateUniversity />} />
          <Route path="/university/editPtn/:id_ptn" element={<UpdateUniversity />} />
          <Route path="/university/viewPtn/:id_ptn" element={<ViewUniversity />} />
          <Route path="/major/list" element={<MajorContent />} />
          <Route path="/major/tambahMajor" element={<CreateMajor />} />
          <Route path="/major/editMajor/:id_prodi" element={<UpdateMajor />} />
          <Route path="/major/viewMajor/:id_prodi" element={<ViewMajor />} />
          <Route path="/settings" element={<div className="p-6">Settings Content</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
