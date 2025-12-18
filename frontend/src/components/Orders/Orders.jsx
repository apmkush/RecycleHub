import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ShowDetails from '../Cart/ShowDetails';
import{backendUrl}from '../../service/url';

const Orders = () => {
  const darkMode = useSelector((state) => state.theme.darkMode) ; 

  const { token } = useSelector((state) => state.auth);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // Filter state
  const [sortOption, setSortOption] = useState(''); // Sort state
  const [selectedItem, setSelectedItem] = useState(null); // State for the selected item

  // Fetching data from the backend
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${backendUrl}/get-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Handle array response from backend
      const ordersData = Array.isArray(response.data) ? response.data : [];
      
      // Extracting only required fields
      const formattedData = ordersData.map((order) => ({
        _id: order._id,
        item: order.item,
        itemName: order.item,
        date: order.pickupDate ? new Date(order.pickupDate).toLocaleDateString() : 'N/A',
        address: order.address,
        price: order.price || order.weight,
        weight: order.weight,
        status: order.status || 'not accepted',
        description: order.description,
        image: order.image,
        pickupDate: order.pickupDate,
        pincode: order.pincode,
        contactNumber: order.contactNumber,
        email: order.email,
      }));

      setItems(formattedData);
    } catch (err) {
      setError('Failed to load orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Filtered items based on selected filter
  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true; // Show all items
    if (filter === 'ready') return item.status === 'accepted';
    if (filter === 'completed') return item.status === 'completed';
    return false;
  });

  // Sorting items based on sort option
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === 'date') {
      return new Date(a.date) - new Date(b.date); // Sort by earliest date first
    } else if (sortOption === 'price') {
      return b.price - a.price; // Sort by highest price first
    }
    return 0;
  });

  return (
    <div className={`p-4 relative transition-all duration-300 
      ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      {/* Filter Buttons */}
      <div className="flex gap-6 mb-4">
        <button
          className={`py-2 px-4 rounded transition-all duration-300 
            ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-teal-500 text-white hover:bg-teal-600'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`py-2 px-4 rounded transition-all duration-300 
            ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-teal-500 text-white hover:bg-teal-600'}`}
          onClick={() => setFilter('ready')}
        >
          Ready to be Picked Up
        </button>
        <button
          className={`py-2 px-4 rounded transition-all duration-300 
            ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-teal-500 text-white hover:bg-teal-600'}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {/* Sort Options */}
      <div className="flex gap-4 mb-4">
        <label>Sort by:</label>
        <select
          className={`border p-2 rounded transition-all duration-300 
            ${darkMode ? 'bg-gray-700 text-white border-gray-500' : 'border-gray-300'}`}
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Select</option>
          <option value="date">Date (Earliest First)</option>
          <option value="price">Price (High to Low)</option>
        </select>
      </div>

      {/* Display loading state */}
      {loading && <p>Loading orders...</p>}

      {/* Display error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table of Items */}
      <table className={`w-full border-collapse text-left transition-all duration-300 
        ${darkMode ? 'border-gray-600 text-white' : 'border-gray-300'}`}
      >
        <thead>
          <tr className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.length > 0 ? (
            sortedItems.map((item, index) => (
              <tr
                key={index}
                className={`border-b cursor-pointer transition-all duration-300 
                  ${darkMode ? 'hover:bg-gray-700 border-gray-600' : 'hover:bg-gray-200'}`}
                onClick={() => setSelectedItem(item)}
              >
                <td className="px-4 py-2 flex items-center gap-3">
                  {item.image ? (
                    <img src={item.image} alt={item.itemName} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <div className={`w-12 h-12 rounded flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      📦
                    </div>
                  )}
                  <span>{item.itemName}</span>
                </td>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">{item.address}</td>
                <td className="px-4 py-2">{item.price}</td>
                <td className="px-4 py-2">
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${
                    item.status === 'completed' ? 'bg-green-500 text-white' :
                    item.status === 'accepted' ? 'bg-blue-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-6 text-center">
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No orders found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Showing Details */}
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <ShowDetails
            details={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Orders;