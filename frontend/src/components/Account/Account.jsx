import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { FiUser, FiLock, FiLogOut, FiMenu } from 'react-icons/fi';
import { HiOutlineClock } from 'react-icons/hi';
import Home from '../Home/Home.jsx'
import App from '../Profile/Profile.jsx';

// Placeholder components for each page section
function Profile() {
  return <div>My Profile Content</div>;
}

function RequestHistory() {
  return <div>Request History Content</div>;
}

function PrivacySetting() {
  return <div>Privacy and History Content</div>;
}

function Logout() {
  return <div>Logging Out...</div>;
}

function Account() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out bg-teal-700 w-64 p-5 text-white`}
      >
        <h2 className="text-2xl font-semibold mb-6">Account Portal</h2>
        <nav className="flex flex-col gap-4">
          <Link to="Profile" className="flex items-center gap-3 p-2 rounded-md hover:bg-teal-600 focus:bg-teal-600">
            <FiUser />
            <span>My Profile</span>
          </Link>
          <Link to="request-history" className="flex items-center gap-3 p-2 rounded-md hover:bg-teal-600 focus:bg-teal-600">
            <HiOutlineClock />
            <span>Request History</span>
          </Link>
          <Link to="privacy-history" className="flex items-center gap-3 p-2 rounded-md hover:bg-teal-600 focus:bg-teal-600">
            <FiLock />
            <span>Privacy and Setting</span>
          </Link>
          <Link to="/logout" className="flex items-center gap-3 p-2 rounded-md hover:bg-teal-600 focus:bg-teal-600">
            <FiLogOut />
            <span>Logout</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow p-4">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="md:hidden text-teal-700 focus:outline-none"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </header>

        {/* Content Area - Define Routes here */}
        <main className="flex-1 p-4 bg-gray-50">
          <Routes>
            <Route path="Profile" element={<App />} />
            <Route path="request-history" element={<RequestHistory />} />
            <Route path="privacy-history" element={<PrivacySetting />} />
            <Route path="/logout" element={<Home />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Account;
