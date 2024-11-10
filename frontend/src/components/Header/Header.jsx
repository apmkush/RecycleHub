import React, { useState, useEffect } from 'react';
import { FaHome, FaTruck, FaReceipt, FaTags, FaUserCircle , FaEnvelopeOpenText } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LogoImage from './logo.jpeg';
import SignupButton from './SignupButton';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedStatus = sessionStorage.getItem('isLoggedIn');
    return savedStatus === 'false';
  });

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn') === null) {
      const checkLoginStatus = async () => {
        try {
          const loggedIn = await new Promise((resolve) => setTimeout(() => resolve(false), 1000));
          setIsLoggedIn(loggedIn);
          sessionStorage.setItem('isLoggedIn', loggedIn);
        } catch (error) {
          console.error("Error checking login status:", error);
          setIsLoggedIn(false);
          sessionStorage.setItem('isLoggedIn', false);
        }
      };
      checkLoginStatus();
    }
  }, []);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg py-4">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        
        {/* Brand Logo and Name */}
        <div className="flex items-center space-x-3">
          <img src={LogoImage} alt="Recycle Hub Logo" className="h-11 w-13" />
          <span className="text-3xl font-bold text-gray-800 dark:text-gray-200">Recycle Hub</span>
        </div>

        {/* Navigation Links */}
        <nav className={`flex-1 flex justify-center ${isLoggedIn ? 'space-x-12' : 'space-x-10'} lg:space-x-16`}>
          <Link to="/Home" className="flex items-center text-gray-600 dark:text-gray-300 font-semibold text-lg">
            <FaHome className="mr-1" /> Home
          </Link>
          <Link to="/Pickup" className="flex items-center text-gray-600 dark:text-gray-300 font-semibold text-lg">
            <FaTruck className="mr-1" /> Request Pickup
          </Link>
          <Link to="/Transactions" className="flex items-center text-gray-600 dark:text-gray-300 font-semibold text-lg">
            <FaReceipt className="mr-1" /> Transactions
          </Link>
          <Link to="/Pricing" className="flex items-center text-gray-600 dark:text-gray-300 font-semibold text-lg">
            <FaTags className="mr-1" /> Pricing
          </Link>
          <Link to="/profile" className="flex items-center text-gray-600 dark:text-gray-300 font-semibold text-lg">
            <FaUserCircle className="mr-1" /> Account
          </Link>
          <Link to="/Dashboard" className="flex items-center text-gray-600 dark:text-gray-300 font-semibold text-lg">
            <FaEnvelopeOpenText className="mr-1" /> Dashboard
          </Link>
        </nav>

        {/* Right Side - Dark Mode Toggle & Auth Options */}
        <SignupButton isLoggedIn={isLoggedIn}
        />
      </div>
    </header>
  );
}

export default Navbar;
