import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../Login/login';

const PickupForm = ({ itemValue = '' }) => {
  // State for each form field
  const [item, setItem] = useState(itemValue);
  const [description, setDescription] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pincode, setPincode] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [weight, setWeight] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(''); // New state for image
  const navigate = useNavigate();
  const { userId, userType, isLoggedIn } = useContext(UserContext); // Access context variables

  const DisplayMessage = (text, type = "success") => {
    toast[type](text, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: { marginTop: "10px" },
    });
  };

  useEffect(() => {
    setItem(itemValue);
  }, [itemValue]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is logged in
    if (!isLoggedIn) {
      navigate('/login');
      return; // Stop further execution
    }

    // Include userId in the data if necessary
    const formData = new FormData();
    formData.append('item', item);
    formData.append('description', description);
    formData.append('pickupDate', pickupDate);
    formData.append('pincode', pincode);
    formData.append('contactNumber', contactNumber);
    formData.append('weight', weight);
    formData.append('address', address);
    formData.append('email', email);
    if (userId) formData.append('userId', userId); // Include userId
    if (image) formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/addPickup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        DisplayMessage(response.data.message);
      } else {
        DisplayMessage(response.data.message, "error");
      }
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
      DisplayMessage("An error occurred while submitting the form", "error");
    }
  };

  // Handle image selection and base64 conversion
  const handleImageChange = (e) => {
    const imgData = new FileReader();
    imgData.readAsDataURL(e.target.files[0]);
    imgData.onload = () => {
      setImage(imgData.result);
      console.log(imgData.result);
    };
    imgData.onerror = () => {
      console.log("Error: ", Error);
    };
  };

  return (
    <div className="flex justify-center pt-24 pb-12 bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen">
      <ToastContainer />
      <div className="w-full max-w-5xl p-10 lg:p-16 bg-white shadow-2xl rounded-lg border-t-4 border-blue-600">
        <h2 className="text-4xl font-bold mb-10 text-center text-blue-700">Scrap Pickup Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Item */}
          <div className="mb-8">
            <label className="block text-blue-800 font-semibold mb-2">Item</label>
            <input
              type="text"
              className="w-full p-4 bg-blue-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="e.g., Metal, Plastic"
              value={item || ''}
              onChange={(e) => setItem(e.target.value)}
              required
            />
          </div>

          {/* Date and Pincode in Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Pickup Date */}
            <div>
              <label className="block text-blue-800 font-semibold mb-2">Pickup Date</label>
              <input
                type="date"
                className="w-full p-4 bg-blue-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                required
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-blue-800 font-semibold mb-2">Pincode</label>
              <input
                type="number"
                className="w-full p-4 bg-blue-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Enter area pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Contact Number and Email in Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Contact Number */}
            <div>
              <label className="block text-blue-800 font-semibold mb-2">Contact Number</label>
              <input
                type="tel"
                className="w-full p-4 bg-blue-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Enter mobile number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>

            {/* Email (optional) */}
            <div>
              <label className="block text-blue-800 font-semibold mb-2">Email</label>
              <input
                type="email"
                className="w-full p-4 bg-blue-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Enter email for contact"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Weight and Address */}
          <div className="mb-8">
            <label className="block text-blue-800 font-semibold mb-2">Approximate Weight</label>
            <input
              type="number"
              className="w-full p-4 bg-blue-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Approximate weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <label className="block text-blue-800 font-semibold mb-2">Address </label>
            <textarea
              className="w-full p-4 bg-blue-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Address of pickup"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>

          {/* Scrap Image */}
          <div className="mb-8">
            <label className="block text-blue-800 font-semibold mb-2">Scrap Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-4 bg-blue-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            {image == "" || image == null ? (
              <p className="text-red-500">Please upload an image</p>
            ) : (
              <img width={100} height={100} src={image} />
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-blue-800 font-semibold mb-2">Description</label>
            <textarea
              className="w-full p-4 bg-blue-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Short description of the scrap item"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PickupForm;
