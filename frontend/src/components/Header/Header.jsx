import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaTruck, FaMoneyCheck, FaTag, FaUser, FaTachometerAlt, FaEnvelopeOpenText, FaCartPlus } from 'react-icons/fa';
import LogoImage from './logo.jpeg';
import { UserContext } from '../../App';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useContext(UserContext); // Get user context from App.jsx
  const location = useLocation(); // Get the current path to track the active link
  const navigate = useNavigate(); // Used for navigation

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Home'); // Redirect to home if not authenticated
    }
  }, [isAuthenticated, navigate]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const linkClasses = (path) =>
    `text-gray-700 border-2 border-transparent hover:border-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white font-semibold text-lg flex items-center px-4 py-2 rounded-md ${
      location.pathname === path ? 'bg-gray-300 border-gray-400' : ''
    }`;

  // Render different links based on user authentication and role
  const renderLinks = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Link to="/Home" className={linkClasses('/Home')}>
            <FaHome className="mr-2" /> Home
          </Link>
          <Link to="/Pickup" className={linkClasses('/Pickup')}>
            <FaTruck className="mr-2" /> Request Pickup
          </Link>
          <Link to="/Pricing" className={linkClasses('/Pricing')}>
            <FaTag className="mr-2" /> Pricing
          </Link>
        </>
      );
    }

    if (user && user.type === 'customer') {
      return (
        <>
          <Link to="/Home" className={linkClasses('/Home')}>
            <FaHome className="mr-2" /> Home
          </Link>
          <Link to="/Pickup" className={linkClasses('/Pickup')}>
            <FaTruck className="mr-2" /> Request Pickup
          </Link>
          <Link to="/Cart" className={linkClasses('/Cart')}>
            <FaCartPlus className="mr-2" /> Cart
          </Link>
          <Link to="/Pricing" className={linkClasses('/Pricing')}>
            <FaTag className="mr-2" /> Pricing
          </Link>
          <Link to="/Account" className={linkClasses('/Account')}>
            <FaUser className="mr-2" /> Account
          </Link>
        </>
      );
    }

    if (user && user.type === 'dealer') {
      return (
        <>
          <Link to="/Home" className={linkClasses('/Home')}>
            <FaHome className="mr-2" /> Home
          </Link>
          <Link to="/Requests" className={linkClasses('/Requests')}>
            <FaEnvelopeOpenText className="mr-2" /> Requests
          </Link>
          <Link to="/Pricing" className={linkClasses('/Pricing')}>
            <FaTag className="mr-2" /> Pricing
          </Link>
          <Link to="/Account" className={linkClasses('/Account')}>
            <FaUser className="mr-2" /> Account
          </Link>
        </>
      );
    }

    if (user && user.type === 'admin') {
      return (
        <>
          <Link to="/Home" className={linkClasses('/Home')}>
            <FaHome className="mr-2" /> Home
          </Link>
          <Link to="/Transactions" className={linkClasses('/Transactions')}>
            <FaMoneyCheck className="mr-2" /> Transactions
          </Link>
          <Link to="/Dashboard" className={linkClasses('/Dashboard')}>
            <FaTachometerAlt className="mr-2" /> Dashboard
          </Link>
          <Link to="/Pricing" className={linkClasses('/Pricing')}>
            <FaTag className="mr-2" /> Pricing
          </Link>
          <Link to="/Account" className={linkClasses('/Account')}>
            <FaUser className="mr-2" /> Account
          </Link>
        </>
      );
    }
  };

  return (
    <header className="bg-gray-50 bg-opacity-90 shadow-lg py-4 dark:bg-gray-800 text-gray-800">
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-8">
        {/* Left Section - Logo and Recycle Hub */}
        <div className="flex items-center space-x-3 w-full lg:w-[20%]">
          <img src={LogoImage} alt="Logo" className="h-10 w-10" />
          <span className="text-3xl font-bold text-gray-800 dark:text-gray-200">Recycle Hub</span>
        </div>

        {/* Middle Section - Navigation Links for unauthenticated users */}
        {!isAuthenticated && (
          <div className="hidden lg:flex items-center space-x-4 lg:w-[60%] justify-end">
            {renderLinks()}
          </div>
        )}

        {/* Right Section - Login/Signup for unauthenticated users */}
        {!isAuthenticated && (
          <div className="hidden lg:flex items-center lg:w-[20%] justify-end">
            <Link to="/login" className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600">
              Login/Register
            </Link>
          </div>
        )}

        {/* Right Section - Navigation Links for authenticated users */}
        {isAuthenticated && (
          <div className="hidden lg:flex items-center space-x-6 lg:w-[80%] justify-end">
            {/* Add space between items except Account */}
            {renderLinks()}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-gray-800 dark:text-gray-300" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-50 bg-opacity-90 dark:bg-gray-800 mt-4">
          <div className="flex flex-col items-start px-6 py-4 space-y-4">
            {renderLinks()}
            {!isAuthenticated && (
              <Link to="/login" className="block w-full bg-purple-500 text-white text-center py-2 rounded-lg hover:bg-purple-600">
                Login/Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
