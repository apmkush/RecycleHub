import React, { useState } from 'react';

const AddDetails = ({ setShowAddDetails }) => {
  const [image, setImage] = useState(null);
  const [scrapType, setScrapType] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!image || !scrapType || !price) {
      setError('Please fill out all fields.');
      return;
    }
    
    setError('');
    // Handle the form submission logic here (e.g., uploading the data)
    setShowAddDetails(false); // Close the form after successful submission
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Scrap Item</h2>
      
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Scrap Type</label>
          <input
            type="text"
            value={scrapType}
            onChange={(e) => setScrapType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter scrap type"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter price"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button 
            type="button" 
            onClick={() => setShowAddDetails(false)} 
            className="text-red-500 font-semibold"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDetails;
