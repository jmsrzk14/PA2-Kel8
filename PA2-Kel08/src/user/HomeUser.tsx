import { useEffect, useState } from "react";
import Sidebar from "../components_user/Sidebar";
import Navbar from "../components_user/Navbar";
import Breadcrumbs from "../components_user/Breadcrumbs";
import { Route, Routes } from "react-router-dom";
import Tryout from "./Tryout";
import DetailTryout from "./DetailTryout";
import Profil from "./Profil";
import HasilTryout from "./HasilTryout";
import Paket from "./Paket";

const UserContent = () => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"></div>
        </div>
    );
};

const HomeUser: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className={`transition-all duration-300 flex-1 ${isSidebarOpen ? "lg:ml-64 ml-20" : "ml-20"}`}>
                <Navbar />
                <Breadcrumbs />
                <Routes>
                    <Route path="/home" element={<UserContent />} />
                    <Route path="/paket" element={<Paket />} />
                    <Route path="/tryout" element={<Tryout />} />
                    <Route path="/hasiltryout" element={<HasilTryout />} />
                    <Route path="/profil" element={<Profil />} />
                    <Route path="/tryout/detailtryout/:id" element={<DetailTryout />} />
                </Routes>
            </div>
        </div>
    );
};

export default HomeUser;