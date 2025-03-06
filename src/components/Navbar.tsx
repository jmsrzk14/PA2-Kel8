import React from 'react';
import { Bell, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <div className="h-[4.5em] shadow-sm flex items-center justify-between px-4" style={{ backgroundColor: "#A3D1C6"}}>
      <div className="flex items-center gap-2">
        <h2 className="text-gray-700 text-lg font-semibold">Welcome, Teacher</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <User size={20} className="text-indigo-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;