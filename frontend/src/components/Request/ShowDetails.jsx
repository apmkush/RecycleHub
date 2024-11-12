import React from 'react';

const ShowDetails = ({ details, setAccept, setReject, onClose }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 text-lg">&times;</button>

      {/* Image */}
      <img src={details.image} alt={details.itemName} className="w-full h-40 object-cover rounded-lg mb-4" />

      {/* Item Details */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">{details.item}</h3>
      <p className="text-sm text-gray-600 mb-2"><strong>Weight:</strong> {details.weight} kg</p>
      <p className="text-sm text-gray-600 mb-2"><strong>Price:</strong> ₹{details.price}</p>
      <p className="text-sm text-gray-600 mb-2"><strong>Date of Pickup:</strong> {details.pickupDate}</p>
      <p className="text-sm text-gray-600 mb-2"><strong>Address:</strong> {details.address}</p>
      <p className="text-sm text-gray-600 mb-2"><strong>Description:</strong> {details.description}</p>

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
