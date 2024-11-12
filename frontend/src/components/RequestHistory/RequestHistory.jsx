import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowDetails from '../Cart/ShowDetails';

const Requestory = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [removeItem, setRemoveItem] = useState(null);
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState([]);
  const [sortOption, setSortOption] = useState('date');


  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-requests');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Use useEffect to fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Map item statuses for display purposes
  const displayStatus = {
    'awaiting pickup': 'Not Accepted',
    'completed': 'Sold',
    'accepted': 'Accepted',
  };

  // Filter items based on status
  const filteredItems = items
    .filter(item => filter === 'all' || displayStatus[item.status] === filter || item.status === filter)
    .sort((a, b) => {
      if (sortOption === 'date') {
        return new Date(a.date) - new Date(b.date);
      }
      return b.price - a.price;
    });

  const handleRowClick = (item) => setSelectedItem(item);

  const handleRemoveClick =async (item) => {
    if (item.status === 'awaiting pickup' || item.status === 'accepted') {
      try {
        await axios.delete(`http://localhost:5000/delete-request/${item._id}`);
        setRemoveItem(item);
        fetchItems(); // Refresh the items list
      } catch (error) {
        console.error('Error removing item:', error);
      }
    }
  };

  const closeModal = () => setSelectedItem(null);

  return (
    <div className="p-6">
      <h2 className="text-center text-2xl font-semibold mb-6">Request History</h2>

      {/* Filter Buttons */}
      <div className="flex space-x-4 justify-center mb-4">
        {['All', 'Accepted', 'Not Accepted', 'Completed'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-semibold ${filter === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex space-x-4 justify-center mb-4">
        <label>
          <input
            type="radio"
            value="date"
            checked={sortOption === 'date'}
            onChange={() => setSortOption('date')}
            className="mr-2"
          />
          Sort by Date
        </label>
        {/* <label>
          <input
            type="radio"
            value="price"
            checked={sortOption === 'price'}
            onChange={() => setSortOption('price')}
            className="mr-2"
          />
          Sort by Price
        </label> */}
      </div>

      <div className="overflow-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Item</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-center">Pincode</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Remove</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {filteredItems.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(item)}
              >
                <td className="py-3 px-6 flex items-center space-x-3">
                  <img src={item.image} alt={item.item} className="w-8 h-8 rounded-full" />
                  <span>{item.item}</span>
                </td>
                <td className="py-3 px-6">{item.address}</td>
                <td className="py-3 px-6 text-center">
                  {new Date(item.pickupDate).toLocaleDateString('en-CA')} {/* Outputs YYYY-MM-DD */}
                </td>
                <td className="py-3 px-6 text-center">{item.pincode}</td>
                <td className="py-3 px-6 text-center">
                  {displayStatus[item.status]}
                </td>
                <td className="py-3 px-6 text-center">
                  {(item.status === 'awaiting pickup' || item.status === 'accepted') ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveClick(item);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg font-semibold hover:bg-red-600"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      className="bg-gray-300 text-gray-500 px-3 py-1 rounded-lg font-semibold cursor-not-allowed"
                      disabled
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for showing item details */}
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <ShowDetails details={selectedItem} onClose={closeModal} />
        </div>
      )}

      {/* Displaying removed item details if any */}
      {removeItem && (
        <p className="text-red-500 text-center mt-4">
          {removeItem.itemName} has been marked for removal!
        </p>
      )}
    </div>
  );
};

export default Requestory;
