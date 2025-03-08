import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const SettingsPage = () => {
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [darkMode, setDarkMode] = useState(false);
  const { user,token } = useSelector((state) => state.auth);

  const userId = 'user123'; // Replace with actual user ID
  const  DisplayMessage=(text)=>{
    toast.success(text, {
        position: "top-center",
        autoClose: 3000, // Auto-close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {marginTop: "10px" },
    });
};

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  // Save password change
  const savePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      DisplayMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.put('http://localhost:5000/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      },{
        headers: {
            Authorization: `Bearer ${token}`, // Send JWT token in headers
        },
    });
      DisplayMessage(response.data.message);
      setIsPasswordEditing(false);
    } catch (error) {
      DisplayMessage(error.response.data.message || 'Failed to change password');
    }
  };

  // Toggle Dark Mode
  const toggleDarkMode = async () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode);
    try {
      const response =await axios.put('http://localhost:5000/update-mode', { darkMode: !darkMode },{
        headers: {
            Authorization: `Bearer ${token}`, // Send JWT token in headers
        },
    });
    console.log(response.data.message);
    } catch (error) {
      console.error('Error updating dark mode:', error);
    }
  };

  // Handle language change

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ToastContainer />
      <div className="bg-white shadow-xl rounded-lg p-8 mb-8 w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Account Settings</h2>

        {/* Change Password Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Change Password</h3>
          <div className="flex flex-col mb-6">
            {isPasswordEditing ? (
              <>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Current Password"
                  className="border p-2 rounded-md mb-4 w-full"
                />
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="New Password"
                  className="border p-2 rounded-md mb-4 w-full"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm New Password"
                  className="border p-2 rounded-md mb-4 w-full"
                />
              </>
            ) : (
              <p className="text-lg mb-2">You can change your password here.</p>
            )}
          </div>

          {isPasswordEditing ? (
            <button
              onClick={savePasswordChange}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
            >
              Save Password Change
            </button>
          ) : (
            <button
              onClick={() => setIsPasswordEditing(true)}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 w-full"
            >
              Change Password
            </button>
          )}
        </div>

        {/* Dark Mode Toggle Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Display Preferences</h3>
          <div className="flex flex-row items-center mb-6">
            <label htmlFor="darkMode" className="text-lg mr-4">Enable Dark Mode:</label>
            <input
              type="checkbox"
              id="darkMode"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="rounded-lg"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
