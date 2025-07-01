import React from 'react';
import { useSelector } from 'react-redux';

const ShowDetails = ({ details, setAccept, setReject, onClose }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Get dark mode state

  return (
    <div className={`p-8 rounded-lg shadow-lg w-96 relative 
      ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      
      {/* Close Button */}
      <button 
        onClick={onClose} 
        className={`absolute top-2 right-2 text-lg 
          ${isDarkMode ? 'text-gray-300' : 'text-gray-400'}`}
      >
        &times;
      </button>

      {/* Image */}
      <img 
        src={details.image} 
        alt={details.itemName} 
        className="w-full h-40 object-cover rounded-lg mb-4" 
      />

      {/* Item Details */}
      <h3 className={`text-2xl font-semibold mb-2 text-center 
        ${isDarkMode ? 'text-purple-300' : 'text-gray-800'}`}>
        {details.item}
      </h3>
      
      <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <strong>Weight:</strong> {details.weight} kg
      </p>
      <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <strong>Price:</strong> ₹{details.price}
      </p>
      <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <strong>Date of Pickup:</strong> {details.pickupDate}
      </p>
      <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <strong>Address:</strong> {details.address}
      </p>
      <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <strong>Description:</strong> {details.description}
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-x-4 mt-4">
        <button 
          onClick={() => {
            setAccept();
            onClose();
          }}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
        >
          Accept
        </button>
        <button 
          onClick={() => {
            setReject();
            onClose();
          }}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ShowDetails;
