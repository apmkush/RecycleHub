import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaTruck, FaMoneyCheck, FaTag, FaUser, FaTachometerAlt, FaEnvelopeOpenText, FaCartPlus } from 'react-icons/fa';
import LogoImage from './logo.jpeg';
import Aos from 'aos';


function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace this with actual authentication logic
  const location = useLocation(); // Get the current path to track the active link

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const linkClasses = (path) =>
    `text-gray-700 border-2 border-transparent hover:border-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white font-semibold text-lg flex items-center px-4 py-2 rounded-md ${
      location.pathname === path ? 'bg-gray-300 border-gray-400' : ''
    }`;

  return (
    <header className="bg-gray-50 bg-opacity-90 shadow-lg py-4 dark:bg-gray-800 text-gray-800">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <img src={LogoImage} alt="Logo" className="h-10 w-10" />
          <span className="text-3xl font-bold text-gray-800 dark:text-gray-200">Recycle Hub</span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex space-x-4">
          <Link to="/Home" className={linkClasses('/Home')}>
            <FaHome className="mr-2" /> Home
          </Link>
          <Link to="/Pickup" className={linkClasses('/Pickup')}>
            <FaTruck className="mr-2" /> Request Pickup
          </Link>
          <Link to="/Transactions" className={linkClasses('/Transactions')}>
            <FaMoneyCheck className="mr-2" /> Transactions
          </Link>
          <Link to="/Pricing" className={linkClasses('/Pricing')}>
            <FaTag className="mr-2" /> Pricing
          </Link>
          <Link to="/Dashboard" className={linkClasses('/Dashboard')}>
            <FaTachometerAlt className="mr-2" /> Dashboard
          </Link>
          <Link to="/Requests" className={linkClasses('/Requests')}>
            <FaEnvelopeOpenText className="mr-2" /> Requests
          </Link>
          <Link to="/Cart" className={linkClasses('/Cart')}>
            <FaCartPlus className="mr-2" /> Cart
          </Link>
          {isLoggedIn && (
            <Link to="/Account" className={linkClasses('/Account')}>
              <FaUser className="mr-2" /> Account
            </Link>
          )}
        </nav>

        {/* Login/Register or Account Button */}
        {!isLoggedIn ? (
          <Link to="/login" className="hidden lg:block bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600">
            Login/Register
          </Link>
        ) : null}

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-gray-800 dark:text-gray-300" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-50 bg-opacity-90 dark:bg-gray-800 mt-4">
          <div className="flex flex-col items-start px-6 py-4 space-y-4">
            <Link to="/Home" className={linkClasses('/Home')}>
              <FaHome className="mr-2" /> Home
            </Link>
            <Link to="/Pickup" className={linkClasses('/Pickup')}>
              <FaTruck className="mr-2" /> Request Pickup
            </Link>
            <Link to="/Transactions" className={linkClasses('/Transactions')}>
              <FaMoneyCheck className="mr-2" /> Transactions
            </Link>
            <Link to="/Pricing" className={linkClasses('/Pricing')}>
              <FaTag className="mr-2" /> Pricing
            </Link>
            <Link to="/Dashboard" className={linkClasses('/Dashboard')}>
              <FaTachometerAlt className="mr-2" /> Dashboard
            </Link>
            <Link to="/Requests" className={linkClasses('/Requests')}>
              <FaEnvelopeOpenText className="mr-2" /> Requests
            </Link>
            <Link to="/Cart" className={linkClasses('/Cart')}>
              <FaCartPlus className="mr-2" /> Cart
            </Link>
            {isLoggedIn && (
              <Link to="/Account" className={linkClasses('/Account')}>
                <FaUser className="mr-2" /> Account
              </Link>
            )}
          </div>
          <div className="px-6 py-4">
            {!isLoggedIn ? (
              <Link to="/login" className="block w-full bg-purple-500 text-white text-center py-2 rounded-lg hover:bg-purple-600">
                Login/Register
              </Link>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
