import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center p-8 rounded-lg shadow-md bg-white">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" 
          alt="404 Not Found" 
          className="mx-auto w-52 h-52 mb-4"
        />
        <h1 className="text-4xl font-bold text-red-500 mb-2">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-4">Oops! The page you are looking for doesn't exist or has been moved.</p>
        <Link 
          to="/Home" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
