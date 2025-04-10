import React, { useState, useRef, useEffect } from 'react';
import { Bell, User } from 'lucide-react';
import { Link,useNavigate } from 'react-router-dom';


const Navbar: React.FC = () => {
  const navigate = useNavigate();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token'); 
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-[4.5em] shadow-sm flex items-center justify-between px-4" style={{ backgroundColor: "#A3D1C6" }}>
      <div className="flex items-center gap-2">
        <h2 className="text-gray-700 text-lg font-semibold">Welcome, Teacher</h2>
      </div>
      <div className="flex items-center gap-4" ref={menuRef}>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
        </button>
        <div className="relative">
          <button 
            className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center" 
            onClick={toggleMenu}
          >
            <User size={20} className="text-indigo-600" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white border rounded-lg shadow-lg z-10">
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
