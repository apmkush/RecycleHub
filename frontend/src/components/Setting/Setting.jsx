import React, { useState } from 'react';

const SettingsPage = () => {
  const [isPasswordEditing, setIsPasswordEditing] = useState(false); // Toggle password edit mode
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [darkMode, setDarkMode] = useState(false); // Dark Mode toggle
  const [language, setLanguage] = useState('English'); // Language preference

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  // Save password change (mocked functionality)
  const savePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Assuming the password change is successful:
    alert('Password changed successfully!');
    setIsPasswordEditing(false);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode); // Switch dark mode on/off globally
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Settings Card */}
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

          {/* Edit Button for Password */}
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

        {/* Language Preferences Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Language Preferences</h3>
          <div className="flex flex-row items-center mb-6">
            <label htmlFor="language" className="text-lg mr-4">Preferred Language:</label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="border p-2 rounded-md w-full"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
