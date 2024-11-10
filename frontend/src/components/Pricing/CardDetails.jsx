import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import imageTest from "./images/NonRecyclable/Aluminium.png";

const CardDetails = ({ image, price, scrapType, userRole }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(price);

  const toggleEdit = () => setIsEditing(!isEditing);
  const handlePriceChange = (e) => setCurrentPrice(e.target.value);

  return (
    <div className="text-center p-4">
      {/* Card container */}
      <div className="w-32 bg-white rounded-lg shadow-lg p-3 border border-gray-300 shadow-gray-400 mx-auto">
        {/* Image section */}
        <img src={imageTest} alt={scrapType} className="w-full h-24 object-cover rounded-t-lg" />

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
              onClick={toggleEdit}
              className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              {isEditing ? 'Save' : 'Edit Price'}
            </button>
          )}
        </div>
      </div>

      {/* Scrap type description below the card */}
      {scrapType && (
        <p className="mt-4 text-gray-700 text-sm">
          {scrapType}
        </p>
      )}
    </div>
  );
};

export default CardDetails;
