import { useState } from 'react';
import { Link, Route, Routes, useLocation, Navigate, useNavigate  } from 'react-router-dom'; // Import Navigate
import { FiUser, FiLock, FiLogOut, FiMenu, FiShoppingCart } from 'react-icons/fi';
import { HiOutlineClock } from 'react-icons/hi';
import Home from '../Home/Home.jsx';
import Requestory from '../RequestHistory/RequestHistory.jsx';
import Orders from '../Orders/Orders.jsx';
import PlansDisplay from '../Payment/plans.jsx';
import BillGenerator from '../Billing/billing.jsx';
import SubscriptionStatus from '../Subscription/subscriptions.jsx';
import SettingsPage from '../Setting/Setting.jsx';
import { useSelector , useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice.js';
import Profile from '../Profile/Profile.jsx';
import NotFound from '../NotFound/NotFound.jsx';

function Account() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation(); // Get current location
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.darkMode) ; 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    navigate('/');
    dispatch(logout());
  };

  // Function to check if the route is active
  const isActive = (path) => location.pathname.endsWith(path);

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}> 
      {/* Sidebar */}
      <aside
        className={`w-64 ${isDarkMode ? 'bg-black' : 'bg-teal-700'} text-white p-5 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:sticky top-0 h-screen`}
      >
        <h2 className="text-2xl font-semibold mb-6">Account Portal</h2>
        <nav className="flex flex-col gap-4">
        <Link 
          to="Profile" 
          className={`flex items-center gap-3 p-2 rounded-md ${isActive('/Profile') ? (isDarkMode ? 'bg-gray-700' : 'bg-teal-500') : (isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-teal-600')}`}
        >
            <FiUser />
            <span>My Profile</span>
        </Link>
          <Link to="Requestory" className={`flex items-center gap-3 p-2 rounded-md ${isActive('/Requestory') ? (isDarkMode ? 'bg-gray-700' : 'bg-teal-500') : (isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-teal-600')}`}>
            <HiOutlineClock />
            <span>Request History</span>
          </Link>
          <Link to="subscriptions" className={`flex items-center gap-3 p-2 rounded-md ${isActive('/subscriptions') ? (isDarkMode ? 'bg-gray-700' : 'bg-teal-500') : (isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-teal-600')}`}>
            <HiOutlineClock />
            <span>Subscription Status</span>
          </Link>
          <Link to="plans" className={`flex items-center gap-3 p-2 rounded-md ${isActive('/plans') ? (isDarkMode ? 'bg-gray-700' : 'bg-teal-500') : (isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-teal-600')}`}>
            <HiOutlineClock />
            <span>Plans</span>
          </Link>
          <Link to="billing" className={`flex items-center gap-3 p-2 rounded-md ${isActive('/billing') ? (isDarkMode ? 'bg-gray-700' : 'bg-teal-500') : (isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-teal-600')}`}>
            <HiOutlineClock />
            <span>Billing</span>
          </Link>
          <Link to="Orders" className={`flex items-center gap-3 p-2 rounded-md ${isActive('/Orders') ? (isDarkMode ? 'bg-gray-700' : 'bg-teal-500') : (isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-teal-600')}`}>
            <FiShoppingCart />
            <span>Orders</span>
          </Link>
          <Link to="Settings" className={`flex items-center gap-3 p-2 rounded-md ${isActive('/Settings') ? (isDarkMode ? 'bg-gray-700' : 'bg-teal-500') : (isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-teal-600')}`}>
            <FiLock />
            <span>Privacy and Setting</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-teal-600"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between">
          <button onClick={toggleSidebar} className={`md:hidden ${isDarkMode ? 'text-white' : 'text-teal-700'} focus:outline-none`}>
            <FiMenu size={24} />
          </button>
        </header>

        {/* Content Area */}
        <main className={`flex-1 p-1.5 overflow-y-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'}`}>
          <Routes>
            {/* Redirect "/account" to "/account/Profile" */}
            <Route path="/*" element={<Navigate to="Profile" />} /> {/* Redirects if no section is clicked */}

            <Route path='Profile' element={<Profile />} />
            <Route path="Requestory" element={<Requestory />} /> 
            <Route path="Orders" element={<Orders />} />
            <Route path="subscriptions" element={<SubscriptionStatus />} />
            <Route path="plans" element={<PlansDisplay />} />
            <Route path="billing" element={<BillGenerator />} />
            <Route path="Settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Account;
