import React from 'react';

const ShowDetails = ({ details, onClose }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 text-lg font-bold"
      >
        &times;
      </button>

      <img
        src={details.image}
        alt={details.itemName}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      
      <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
        {details.itemName}
      </h3>
      <p className="text-sm text-gray-600 mb-2"><strong>Weight:</strong> {details.weight}</p>
      <p className="text-sm text-gray-600 mb-2"><strong>Price:</strong> ${details.price}</p>
      <p className="text-sm text-gray-600 mb-2"><strong>Date of Pickup:</strong> {details.date}</p>
      <p className="text-sm text-gray-600 mb-2"><strong>Pickup Time:</strong> {details.pickupTime}</p>
      <p className="text-sm text-gray-600 mb-2"><strong>Address:</strong> {details.address}</p>
      <p className="text-sm text-gray-600 mb-2"><strong>Description:</strong> {details.description}</p>
    </div>
  );
};

export default ShowDetails;
