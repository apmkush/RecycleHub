import React, { useState } from 'react';
import axios, { Axios } from 'axios';
import imageTest from "./images/NonRecyclable/Aluminium.png";

const Card = ({ id,image, price, material, userRole, description }) => {
  // State to handle price editing
  const [isEditing, setIsEditing] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(price);

  // Function to toggle edit mode
  const toggleEdit = () => setIsEditing(!isEditing);

  // Function to handle price change
  const handlePriceChange = (e) => setCurrentPrice(e.target.value);
  const savePrice = async () => {
    try {
      await axios.put(`http://localhost:5000/editPrice/${id}`, { price: currentPrice });
      toggleEdit(); // Toggle off edit mode after saving
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  return (
    <div className="text-center p-4">
      {/* Card */}
      <div className="w-32 bg-white rounded-lg shadow-lg p-3 border border-gray-300 shadow-gray-400 mx-auto">
        {/* Image section */}
        <img src={image} alt={material} className="w-full h-24 object-cover rounded-t-lg" />

        {/* Card content */}
        <div className="mt-2">

          {/* Price section */}
          <div className="mt-2">
            {userRole === 'admin' ? (
              isEditing ? (
                <input
                  type="number"
                  value={currentPrice}
                  onChange={handlePriceChange}
                  className="border-b-2 border-blue-500 focus:outline-none w-full"
                />
              ) : (
                <span className="text-gray-800 font-semibold">Rs. {currentPrice}/kg</span>
              )
            ) : (
              <span className="text-gray-800 font-semibold">Rs. {currentPrice}/kg</span>
            )}
          </div>

          {/* Edit button for admin */}
          {userRole === 'admin' && (
            <button
              onClick={isEditing ? savePrice : toggleEdit}
              className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              {isEditing ? 'Save' : 'Edit Price'}
            </button>
          )}
        </div>
      </div>

      {/* Description below the card */}
      {material && (
        <p className="mt-4 text-gray-700 text-sm">
          {material}
        </p>
      )}
    </div>
  );
};

export default Card;
