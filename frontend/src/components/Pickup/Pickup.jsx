import React, { useState } from 'react';

const PickupForm = () => {
  // State for each form field
  const [item, setItem] = useState('');
  const [description, setDescription] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pincode, setPincode] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [weight, setWeight] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null); // New state for image

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      item,
      description,
      pickupDate,
      pincode,
      contactNumber,
      weight,
      address,
      email,
      image, // Include image in form data
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected image file
  };

  return (
    <div className="flex justify-center pt-24 pb-12 bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen">
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
              value={item}
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
