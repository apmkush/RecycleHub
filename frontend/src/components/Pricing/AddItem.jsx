import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const AddItem = ({setShowAddDetails}) => {
  return (
    <div 
      onClick={() => setShowAddDetails(true)}
      className="flex flex-col items-center justify-center w-36 h-36 bg-gray-100 rounded-lg shadow-lg hover:bg-blue-50 transition duration-200 ease-in-out"
    >
      <div className="text-blue-500 mb-2">
        <FontAwesomeIcon icon={faCirclePlus} size="3x" />
      </div>
      <p className="text-blue-700 font-medium text-lg">Add Element</p>
    </div>
  );
};

export default AddItem;
