import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import{backendUrl}from '../../service/url';

const ProfilePage = () => {
  const[message,setMesssage]=useState(null);
  const { user,token } = useSelector((state) => state.auth);
  const UserId = user._id;
  const [User, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [profileImage, setProfileImage] = useState(null); // State to store selected image
  const [isCustomImage, setIsCustomImage] = useState(false); // Whether custom image is selected
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    // Fetch user data (replace 'user-id' with actual user ID)
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/get-data`,
          {
            headers: {
                Authorization: `Bearer ${token}`, // Send JWT token in headers
            },
        });
        if(response.data.success){
          console.log(response.data);
          setUser(response.data.user);
          setFormData(response.data.user);
          setAddresses(response.data.user.addresses || []);
          if (response.data.user.addresses && response.data.user.addresses.length > 0) {
            setSelectedAddress(response.data.user.addresses[0]); // Select the first address by default
          }
          setImagePreview(response.data.user.profileImage || 'https://via.placeholder.com/150'); // Set initial image preview
        }else{
          setMesssage(response.data.message);
          console.log(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handlePersonalDetailChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSavePersonalDetails = async () => {
    try {
      console.log("Hello",formData);
      const response = await axios.put(`${backendUrl}/update-data`, formData,{
        headers: {
            Authorization: `Bearer ${token}`, // Send JWT token in headers
        },
    });
    if(response.data.success){
      setUser(response.data);
      toast.success('Personal details updated successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsEditing(false);
    }else{
      toast.error(response.data.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    } catch (error) {
      console.error('Error saving personal details:', error);
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

  const handleSaveAddresses = async () => {
    try {
      const response = await axios.put(`${backendUrl}/update-addresses/${UserId}`, { addresses });
      setAddresses(response.data.addresses);
      toast.success('Addresses updated successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error saving addresses:', error);
    }
  };

  const handleAddressSelect = (index) => {
    const updatedAddresses = addresses.map((address, i) => {
      if (i === index) {
        return { ...address, isPrimary: true };
      } else {
        return { ...address, isPrimary: false };
      }
    });
    setAddresses(updatedAddresses);
    setSelectedAddress(updatedAddresses[index]);
  };

  // Handle image file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log("Selected file:", file);
  
    if (file) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        console.log("FileReader result:", reader.result);
        setProfileImage(file); // Set the selected image file
        setImagePreview(reader.result); // Set the preview of the image
        setIsCustomImage(true); // Mark as custom image
        console.log("Image preview:", imagePreview);
      };
  
      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);

      } else {
        console.error("Unsupported file type:", file.type);
      }
    } else {
      console.error("No file selected");
    }
  };
  

  // Handle predefined image selection
  const handlePredefinedImageSelect = (imageUrl) => {
    setImagePreview(imageUrl); // Set the predefined image as the profile image
    setIsCustomImage(false); // Reset custom image flag
  };

  return (
    <div 
      className={`max-w-6xl mx-auto p-6 rounded-lg shadow-xl ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      <ToastContainer />

      {/* Profile Image Section */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <img
            src={imagePreview || 'https://via.placeholder.com/150'}
            alt="Profile"
            className={`h-32 w-32 rounded-full object-cover border-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
          />
          {isEditing && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer"
              />
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded-md"
                  onClick={() => handlePredefinedImageSelect('https://via.placeholder.com/150')}
                >
                  Select Default
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  onClick={() => setImagePreview('https://via.placeholder.com/150')}
                >
                  Reset
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Personal Details Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Personal Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handlePersonalDetailChange}
              className={`w-full mt-2 p-2 border rounded-md ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handlePersonalDetailChange}
              className={`w-full mt-2 p-2 border rounded-md ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="font-semibold">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handlePersonalDetailChange}
              className={`w-full mt-2 p-2 border rounded-md ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePersonalDetailChange}
              className={`w-full mt-2 p-2 border rounded-md ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end">
          {isEditing ? (
            <button onClick={handleSavePersonalDetails} className={`py-2 px-6 rounded-lg text-white ${isDarkMode ? 'bg-gray-500' : 'bg-blue-500'}`}>
              Save Changes
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className={`text-white py-2 px-6 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-green-500"}`}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Address Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Addresses</h2>

        {/* Ensure addresses is an array before using map */}
        {Array.isArray(addresses) && addresses.length > 0 ? (
          addresses.map((address, index) => (
            <div
              key={index}
              className={`p-4 mb-4 border rounded-md ${address.isPrimary ? 'bg-green-100' : 'bg-white'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Address {index + 1}</p>
                  <p>{address.street}, {address.city}, {address.zip}</p>
                  {address.isPrimary && <span className="text-green-500">Primary</span>}
                </div>
                <button onClick={() => handleAddressSelect(index)} className="text-blue-500">
                  {address.isPrimary ? 'Unselect' : 'Select as Primary'}
                </button>
              </div>
              {isEditing && (
                <div className="mt-4">
                  <label className="font-semibold">Street</label>
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={(e) => handleAddressChange(index, e)}
                    className="w-full mt-2 p-2 border rounded-md"
                  />
                  <label className="font-semibold mt-4">City</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={(e) => handleAddressChange(index, e)}
                    className="w-full mt-2 p-2 border rounded-md"
                  />
                  <label className="font-semibold mt-4">ZIP</label>
                  <input
                    type="text"
                    name="zip"
                    value={address.zip}
                    onChange={(e) => handleAddressChange(index, e)}
                    className="w-full mt-2 p-2 border rounded-md"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No addresses available</p>
        )}

        {isEditing && (
          <div className="mt-4">
            <button onClick={handleAddNewAddress} className="bg-gray-500 text-white py-2 px-4 rounded-lg">
              Add New Address
            </button>
            <button onClick={handleSaveAddresses} className={`py-2 px-4 rounded-lg ml-4 text-white ${isDarkMode ? 'bg-gray-500' : 'bg-blue-500'}`}>
              Save Addresses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
