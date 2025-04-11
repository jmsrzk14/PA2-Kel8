import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Bell, User, LogOut, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout= () => {
    console.log("LogOut Clicked");
    navigate("/login");
  };
  
  return (
    <div className="h-[4.5em] shadow-sm flex items-center justify-between px-4" style={{ backgroundColor: "#A3D1C6"}}>
      <div className="flex items-center gap-2">
        <h2 className="text-gray-700 text-lg font-semibold">Welcome, Teacher</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
        </button>
        <div className="relative inline-block">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition" onClick={() => setIsOpen(!isOpen)}>
            <User size={20} className="text-gray-700" />
            <ChevronDown size={16} className="text-gray-700" />
          </button>
          {isOpen && (
            <div className='absolute right-0 mt-2 bg-white border rounded-lg shadow-lg'>
              <button className='w-full flex items-center gap-2 px-4 py-3 text-red-600 font-medium hover:bg-red-100 rounded-md transition' onClick={handleLogout}>
                <LogOut size={16} />LogOut
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;