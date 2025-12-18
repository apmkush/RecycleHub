import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendUrl } from '../../service/url';

const ProfilePage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [User, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${backendUrl}/get-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.data.success) {
          setUser(response.data.user);
          setFormData(response.data.user);
          setAddresses(response.data.user.addresses || []);
          if (response.data.user.profileImage) {
            setProfileImageUrl(response.data.user.profileImage + '?t=' + Date.now());
          }
        } else {
          setError(response.data.message || 'Failed to load profile');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handlePersonalDetailChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadProfilePhoto = async () => {
    if (!profileImageFile) {
      toast.warning('Please select an image first', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    try {
      setSaving(true);
      const uploadFormData = new FormData();
      uploadFormData.append('profilePhoto', profileImageFile);

      const response = await axios.post(
        `${backendUrl}/upload-profile-photo`,
        uploadFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        setFormData(response.data.user);
        setProfileImageUrl(response.data.profileImage + '?t=' + Date.now());
        setProfileImageFile(null);
        toast.success('Profile photo uploaded successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });
      } else {
        toast.error(response.data.message || 'Error uploading photo', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      toast.error('Error uploading profile photo', {
        position: 'top-center',
        autoClose: 3000,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSavePersonalDetails = async () => {
    try {
      setSaving(true);
      const response = await axios.put(`${backendUrl}/update-data`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        setFormData(response.data.user);
        toast.success('Personal details updated successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });
        setIsEditing(false);
      } else {
        toast.error(response.data.message || 'Error updating profile', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error saving personal details:', error);
      toast.error('Error saving details', {
        position: 'top-center',
        autoClose: 3000,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = [...addresses];
    updatedAddresses[index][name] = value;
    setAddresses(updatedAddresses);
  };

  const handleAddNewAddress = () => {
    setAddresses([...addresses, { street: '', city: '', zip: '', isPrimary: false }]);
  };

  const handleAddressSelect = (index) => {
    const updatedAddresses = addresses.map((address, i) => ({
      ...address,
      isPrimary: i === index,
    }));
    setAddresses(updatedAddresses);
  };

  const handleSaveAddresses = async () => {
    try {
      setSaving(true);
      const updatedFormData = { ...formData, addresses };
      const response = await axios.put(`${backendUrl}/update-data`, updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        setFormData(response.data.user);
        setAddresses(response.data.user.addresses || []);
        toast.success('Addresses updated successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });
      } else {
        toast.error(response.data.message, {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error saving addresses:', error);
      toast.error('Error saving addresses', {
        position: 'top-center',
        autoClose: 3000,
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-8`}>
        <div className={`max-w-6xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 text-center`}>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-8`}>
        <div className="max-w-6xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-8`}>
      <ToastContainer />

      <div className={`max-w-6xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
        
        {/* Profile Header Section */}
        <div className={`flex items-center space-x-6 mb-8 pb-8 border-b-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`w-40 h-40 rounded-full overflow-hidden border-4 ${isDarkMode ? 'border-blue-500' : 'border-blue-600'} relative flex-shrink-0`}>
            {profileImageUrl ? (
              <img
                key={`url-${profileImageUrl}`}
                src={profileImageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  if (profileImageUrl.includes('?')) {
                    const urlWithoutCache = profileImageUrl.split('?')[0];
                    e.target.src = urlWithoutCache;
                  }
                }}
              />
            ) : (
              <div className={`w-full h-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span>No Image</span>
              </div>
            )}
            <label className={`absolute bottom-0 right-0 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white p-2 rounded-full cursor-pointer ${isDarkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-600'}`}>
              📷
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex-1">
            <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {formData.name || 'Your Name'}
            </h1>
            <p className={`text-lg mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span className="font-semibold">Email:</span> {formData.email || 'Not specified'}
            </p>
            <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span className="font-semibold">Phone:</span> {formData.phone || 'Not specified'}
            </p>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className={`py-2 px-6 rounded-md transition duration-300 font-semibold text-white ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Upload Photo Section */}
        {profileImageFile && (
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleUploadProfilePhoto}
              disabled={saving}
              className={`py-2 px-6 rounded-lg text-white font-semibold transition ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {saving ? 'Uploading...' : '✓ Upload Photo'}
            </button>
            <button
              onClick={() => {
                setProfileImageFile(null);
                setProfileImageUrl(User?.profileImage || null);
              }}
              className={`py-2 px-6 rounded-lg text-white font-semibold ${isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} transition`}
            >
              ✕ Cancel
            </button>
          </div>
        )}

        {/* Personal Details Section */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Name */}
            <div className={`p-5 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <label className={`text-sm font-semibold block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handlePersonalDetailChange}
                  className={`w-full p-2 border-2 rounded-md focus:outline-none ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white focus:border-blue-500' : 'bg-white border-gray-300 text-black focus:border-blue-500'}`}
                />
              ) : (
                <p className={`text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{formData.name || 'Not provided'}</p>
              )}
            </div>

            {/* Email */}
            <div className={`p-5 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <label className={`text-sm font-semibold block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handlePersonalDetailChange}
                  className={`w-full p-2 border-2 rounded-md focus:outline-none ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white focus:border-blue-500' : 'bg-white border-gray-300 text-black focus:border-blue-500'}`}
                />
              ) : (
                <p className={`text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{formData.email || 'Not provided'}</p>
              )}
            </div>

            {/* Phone */}
            <div className={`p-5 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <label className={`text-sm font-semibold block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handlePersonalDetailChange}
                  className={`w-full p-2 border-2 rounded-md focus:outline-none ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white focus:border-blue-500' : 'bg-white border-gray-300 text-black focus:border-blue-500'}`}
                />
              ) : (
                <p className={`text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{formData.phone || 'Not provided'}</p>
              )}
            </div>

            {/* Age */}
            <div className={`p-5 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <label className={`text-sm font-semibold block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Age</label>
              {isEditing ? (
                <input
                  type="number"
                  name="age"
                  value={formData.age || ''}
                  onChange={handlePersonalDetailChange}
                  className={`w-full p-2 border-2 rounded-md focus:outline-none ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white focus:border-blue-500' : 'bg-white border-gray-300 text-black focus:border-blue-500'}`}
                />
              ) : (
                <p className={`text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{formData.age || 'Not provided'}</p>
              )}
            </div>

            {/* Primary Address */}
            <div className={`p-5 rounded-lg border col-span-1 md:col-span-2 lg:col-span-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <label className={`text-sm font-semibold block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Primary Address</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address || ''}
                  onChange={handlePersonalDetailChange}
                  className={`w-full p-2 border-2 rounded-md focus:outline-none ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white focus:border-blue-500' : 'bg-white border-gray-300 text-black focus:border-blue-500'}`}
                  placeholder="Enter your primary address"
                />
              ) : (
                <p className={`text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{formData.address || 'Not provided'}</p>
              )}
            </div>

            {/* User Role */}
            <div className={`p-5 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <label className={`text-sm font-semibold block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>User Role</label>
              <p className={`text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                {formData.userRole ? formData.userRole.charAt(0).toUpperCase() + formData.userRole.slice(1) : 'Not provided'}
              </p>
            </div>
          </div>
        </div>

        {/* Addresses Section */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Saved Addresses</h2>

          {Array.isArray(addresses) && addresses.length > 0 ? (
            addresses.map((address, index) => (
              <div
                key={index}
                className={`p-4 mb-4 border-2 rounded-md ${address.isPrimary 
                  ? isDarkMode 
                    ? 'border-green-600 bg-green-900' 
                    : 'border-green-500 bg-green-50' 
                  : isDarkMode 
                    ? 'border-gray-700 bg-gray-700' 
                    : 'border-gray-300 bg-white'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Address {index + 1}</p>
                    {!isEditing && (
                      <>
                        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{address.street}</p>
                        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{address.city}, {address.zip}</p>
                      </>
                    )}
                    {address.isPrimary && <span className="text-green-500 font-semibold">★ Primary Address</span>}
                  </div>
                  {isEditing && (
                    <button 
                      onClick={() => handleAddressSelect(index)} 
                      className={`text-sm py-1 px-3 rounded transition ${address.isPrimary 
                        ? 'bg-green-500 text-white' 
                        : isDarkMode 
                          ? 'bg-gray-600 text-white hover:bg-gray-500' 
                          : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    >
                      {address.isPrimary ? '✓ Primary' : 'Set Primary'}
                    </button>
                  )}
                </div>
                {isEditing && (
                  <div className={`mt-4 p-4 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-50'}`}>
                    <label className={`font-semibold block mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Street</label>
                    <input
                      type="text"
                      name="street"
                      value={address.street || ''}
                      onChange={(e) => handleAddressChange(index, e)}
                      className={`w-full mt-2 p-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                      placeholder="Street address"
                    />
                    <label className={`font-semibold block mt-4 mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>City</label>
                    <input
                      type="text"
                      name="city"
                      value={address.city || ''}
                      onChange={(e) => handleAddressChange(index, e)}
                      className={`w-full mt-2 p-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                      placeholder="City"
                    />
                    <label className={`font-semibold block mt-4 mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>ZIP Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={address.zip || ''}
                      onChange={(e) => handleAddressChange(index, e)}
                      className={`w-full mt-2 p-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                      placeholder="ZIP code"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>No addresses saved yet</p>
          )}

          {isEditing && (
            <div className="mt-6 space-x-4">
              <button 
                onClick={handleAddNewAddress} 
                className={`py-2 px-6 rounded-lg text-white font-semibold transition ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-500 hover:bg-gray-600'}`}
              >
                + Add New Address
              </button>
              <button 
                onClick={handleSaveAddresses} 
                disabled={saving}
                className={`py-2 px-6 rounded-lg text-white font-semibold transition ${isDarkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600'} ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {saving ? 'Saving...' : 'Save Addresses'}
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={handleSavePersonalDetails}
              disabled={saving}
              className={`py-3 px-8 rounded-md transition duration-300 font-semibold text-white ${
                saving 
                  ? 'bg-gray-400 text-white cursor-not-allowed opacity-50' 
                  : isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className={`py-3 px-8 rounded-md transition duration-300 font-semibold text-white ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-400 hover:bg-gray-500'}`}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
