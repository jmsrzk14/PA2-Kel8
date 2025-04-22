import React from 'react';
import { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';


const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="px-4 py-2 bg-gray-50">
      <div className="flex items-center text-sm">
        <Link to="/daashboard/student/home" className="text-indigo-600 hover:text-indigo-800">
          Dashboard
        </Link>
        {pathnames.slice(1).map((name, index) => (
          <React.Fragment key={name}>
            <ChevronRight size={16} className="mx-1 text-gray-400" />
            <span className="capitalize text-gray-600">
              {name}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs;