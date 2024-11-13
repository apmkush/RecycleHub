// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { FaBars, FaTimes, FaHome, FaTruck, FaMoneyCheck, FaTag, FaUser, FaTachometerAlt, FaEnvelopeOpenText, FaCartPlus } from 'react-icons/fa';
// import LogoImage from './logo.jpeg';
// import { UserContext } from '../../App';

// function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { userId, userType,setIsLoggedIn,setUserId,setUserType, isLoggedIn } = useContext(UserContext);
//   // const isLoggedin = false;
//   // const userType = 'customer';
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if user data is in localStorage and update context accordingly
//     const storedUserData = localStorage.getItem('user');
//     if (storedUserData) {
//       const { userId, userType } = JSON.parse(storedUserData);
//       setIsLoggedIn(true);
//       setUserId(userId);
//       setUserType(userType);
//     } else {
//       setIsLoggedIn(false); // Set to false if no user data found
//     }

//     // Redirect if not logged in
//     if (!isLoggedIn) {
//       navigate('/Home'); // Redirect if not logged in
//     }
//   }, [isLoggedIn, navigate, setIsLoggedIn, setUserId, setUserType]);

//   // useEffect(() => {
//   //   if (!isLoggedIn) {
//   //     navigate('/Home'); // Redirect if not logged in
//   //   }
//   //   console.log(userType);
//   // }, [isLoggedIn, navigate,userType]);

//   // Toggle for mobile menu
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(prev => !prev);
//   };

//   // Helper function to determine active link style
//   const linkClasses = (path) => 
//     `text-gray-700 border-2 border-transparent hover:border-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white font-semibold text-lg flex items-center px-4 py-2 rounded-md ${
//       location.pathname === path ? 'bg-gray-300 border-gray-400' : ''
//     }`;

//   // Render navigation links based on user type
//   const renderLinks = () => {
//     if (!isLoggedIn) {
//       return (
//         <>
//           <Link to="/Home" className={linkClasses('/Home')}>
//             <FaHome className="mr-2" /> Home
//           </Link>
//           <Link to="/Pickup" className={linkClasses('/Pickup')}>
//             <FaTruck className="mr-2" /> Request Pickup
//           </Link>
//           <Link to="/Pricing" className={linkClasses('/Pricing')}>
//             <FaTag className="mr-2" /> Pricing
//           </Link>
//         </>
//       );
//     }

//     switch (userType) {
//       case 'customer':
//         return (
//           <>
//             <Link to="/Home" className={linkClasses('/Home')}>
//               <FaHome className="mr-2" /> Home
//             </Link>
//             <Link to="/Pickup" className={linkClasses('/Pickup')}>
//               <FaTruck className="mr-2" /> Request Pickup
//             </Link>
//             <Link to="/Cart" className={linkClasses('/Cart')}>
//               <FaCartPlus className="mr-2" /> Cart
//             </Link>
//             <Link to="/Pricing" className={linkClasses('/Pricing')}>
//               <FaTag className="mr-2" /> Pricing
//             </Link>
//             <Link to="/Account" className={linkClasses('/Account')}>
//               <FaUser className="mr-2" /> Account
//             </Link>
//           </>
//         );
//       case 'dealer':
//         return (
//           <>
//             <Link to="/Home" className={linkClasses('/Home')}>
//               <FaHome className="mr-2" /> Home
//             </Link>
//             <Link to="/Requests" className={linkClasses('/Requests')}>
//               <FaEnvelopeOpenText className="mr-2" /> Requests
//             </Link>
//             <Link to="/Pricing" className={linkClasses('/Pricing')}>
//               <FaTag className="mr-2" /> Pricing
//             </Link>
//             <Link to="/Account" className={linkClasses('/Account')}>
//               <FaUser className="mr-2" /> Account
//             </Link>
//           </>
//         );
//       case 'admin':
//         return (
//           <>
//             <Link to="/Home" className={linkClasses('/Home')}>
//               <FaHome className="mr-2" /> Home
//             </Link>
//             <Link to="/Transactions" className={linkClasses('/Transactions')}>
//               <FaMoneyCheck className="mr-2" /> Transactions
//             </Link>
//             <Link to="/Dashboard" className={linkClasses('/Dashboard')}>
//               <FaTachometerAlt className="mr-2" /> Dashboard
//             </Link>
//             <Link to="/Pricing" className={linkClasses('/Pricing')}>
//               <FaTag className="mr-2" /> Pricing
//             </Link>
//             <Link to="/Account" className={linkClasses('/Account')}>
//               <FaUser className="mr-2" /> Account
//             </Link>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <header className="bg-gray-50 bg-opacity-90 shadow-lg py-4 dark:bg-gray-800 text-gray-800">
//       <div className="container mx-auto flex justify-between items-center px-4 lg:px-8">
//         {/* Left Section - Logo and Recycle Hub */}
//         <div className="flex items-center space-x-3 w-full lg:w-[20%]">
//           <img src={LogoImage} alt="Logo" className="h-10 w-10" />
//           <span className="text-3xl font-bold text-gray-800 dark:text-gray-200">Recycle Hub</span>
//         </div>

//         {/* Middle Section - Navigation Links for unauthenticated users */}
//         {!isLoggedIn && (
//           <div className="hidden lg:flex items-center space-x-4 lg:w-[60%] justify-end">
//             {renderLinks()}
//           </div>
//         )}

//         {/* Right Section - Login/Signup for unauthenticated users */}
//         {!isLoggedIn && (
//           <div className="hidden lg:flex items-center lg:w-[20%] justify-end">
//             <Link to="/login" className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600">
//               Login/Register
//             </Link>
//           </div>
//         )}

//         {/* Right Section - Navigation Links for authenticated users */}
//         {isLoggedIn && (
//           <div className="hidden lg:flex items-center space-x-6 lg:w-[80%] justify-end">
//             {renderLinks()}
//           </div>
//         )}

//         {/* Mobile Menu Button */}
//         <button className="lg:hidden text-gray-800 dark:text-gray-300" onClick={toggleMobileMenu}>
//           {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="lg:hidden bg-gray-50 bg-opacity-90 dark:bg-gray-800 mt-4">
//           <div className="flex flex-col items-start px-6 py-4 space-y-4">
//             {renderLinks()}
//             {!isLoggedIn && (
//               <Link to="/login" className="block w-full bg-purple-500 text-white text-center py-2 rounded-lg hover:bg-purple-600">
//                 Login/Register
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Navbar;


import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaTruck, FaMoneyCheck, FaTag, FaUser, FaTachometerAlt, FaEnvelopeOpenText, FaCartPlus } from 'react-icons/fa';
import LogoImage from './logo.jpeg';
import { UserContext } from '../../App';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userId, userType, isLoggedin, setIsLoggedIn, setUserId, setUserType } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data is in localStorage and update context accordingly
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      const { userId, userType } = JSON.parse(storedUserData);
      setIsLoggedIn(true);
      setUserId(userId);
      setUserType(userType);
    }
  }, [setIsLoggedIn, setUserId, setUserType]);

  useEffect(() => {
    // Redirect if not logged in
    if (!isLoggedin) {
      navigate('/Home'); // Redirect if not logged in
    }
  }, [isLoggedin, navigate]);

  // Toggle for mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  // Helper function to determine active link style
  const linkClasses = (path) => 
    `text-gray-700 border-2 border-transparent hover:border-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white font-semibold text-lg flex items-center px-4 py-2 rounded-md ${
      location.pathname === path ? 'bg-gray-300 border-gray-400' : ''
    }`;

  // Render navigation links based on user type
  const renderLinks = () => {
    if (!isLoggedin) {
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

    switch (userType) {
      case 'customer':
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
      case 'dealer':
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
      case 'admin':
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
      default:
        return null;
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
        {!isLoggedin && (
          <div className="hidden lg:flex items-center space-x-4 lg:w-[60%]">
            {renderLinks()}
          </div>
        )}

        {/* Right Section - Login, Logout, User Info */}
        <div className="hidden lg:flex items-center space-x-4">
          {isLoggedin ? (
            <>
              <button
                onClick={() => {
                  handleLogout();
                  navigate('/');
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-xl text-gray-700 font-semibold px-4 py-2 border rounded-md hover:bg-gray-200">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-800 dark:text-gray-300">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-50 dark:bg-gray-800">
          <div className="px-4 py-2">{renderLinks()}</div>
        </div>
      )}
    </header>
  );
}

export default Navbar;