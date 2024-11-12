import React, { useState } from 'react';
import ShowDetails from './ShowDetails';

const RequestCard = ({ details }) => { console.log(details);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);

  // Open modal only when the card itself is clicked (excluding buttons)
  const handleCardClick = (e) => {
    if (!e.target.closest("button")) {
      setIsModalOpen(true);
    }
  };

  // Update states for accept and reject actions
  const handleAccept = () => setAccept(true);
  const handleReject = () => setReject(true);

  return (
    <>
      {/* Card */}
      <div 
        onClick={handleCardClick} 
        className="bg-white shadow-lg rounded-lg p-4 w-64 mx-auto cursor-pointer"
      >
        {/* Image */}
        <img src={details.image} alt={details.itemName} className="w-full h-40 object-cover rounded-t-lg" />

        {/* Item Name */}
        <h3 className="text-xl font-semibold text-gray-800 mt-4 text-center">{details.itemName}</h3>

        {/* Centered Buttons */}
        <div className="flex justify-center gap-x-4 mt-6">
          <button 
            onClick={(e) => {
              e.stopPropagation();  // Prevent triggering card click
              handleAccept();
            }} 
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Accept 
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();  // Prevent triggering card click
              handleReject();
            }} 
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Reject 
          </button>
        </div>
      </div>

      {/* Modal - ShowDetails */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <ShowDetails 
            details={details}
            setAccept={handleAccept}
            setReject={handleReject}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default RequestCard;
