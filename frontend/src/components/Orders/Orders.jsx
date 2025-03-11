import React, { useState } from 'react';
import ShowDetails from '../Cart/ShowDetails';
import { useSelector } from 'react-redux';

const items = [
  {
    itemName: 'Laptop',
    image: './laptop.png',
    address: '123 Tech Street, Cityville',
    price: 500,
    status: 'awaiting pickup',
    date: '2023-05-21',
    weight: '2 kg',
    pickupTime: '10:00 AM',
    description: 'A slightly used laptop, ready for recycling.',
  },
  {
    itemName: 'Smartphone',
    image: './smartphone.png',
    address: '456 Mobile Avenue, Townsville',
    price: 200,
    status: 'sold',
    date: '2021-06-15',
    weight: '0.3 kg',
    pickupTime: '02:00 PM',
    description: 'A functional smartphone with minor scratches.',
  },
  {
    itemName: 'Tablet',
    image: './tablet.png',
    address: '789 Gadget Street, Metropolis',
    price: 300,
    status: 'added to cart',
    date: '2023-07-10',
    weight: '0.5 kg',
    pickupTime: '09:00 AM',
    description: 'A tablet in good condition, ready for use or recycling.',
  },
  {
    itemName: 'Headphones',
    image: './headphones.png',
    address: '101 Audio Lane, Sound City',
    price: 800,
    status: 'awaiting pickup',
    date: '2022-08-05',
    weight: '0.2 kg',
    pickupTime: '11:30 AM',
    description: 'Noise-canceling headphones with minimal wear.',
  },
];

const Orders = () => {
  const darkMode = useSelector((state) => state.theme.darkMode) ; 

  const [filter, setFilter] = useState('all'); // Filter state for All, Ready to be Picked Up, or Completed
  const [sortOption, setSortOption] = useState(''); // Sort state for Date or Price
  const [selectedItem, setSelectedItem] = useState(null); // State for the selected item

  // Filtered items based on selected filter
  const filteredItems = items.filter(item => {
    if (filter === 'all') return item.status === 'sold' || item.status === 'awaiting pickup';
    if (filter === 'ready') return item.status === 'awaiting pickup';
    if (filter === 'completed') return item.status === 'sold';
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
          {sortedItems.map((item, index) => (
            <tr
              key={index}
              className={`border-b cursor-pointer transition-all duration-300 
                ${darkMode ? 'hover:bg-gray-700 border-gray-600' : 'hover:bg-gray-200'}`}
              onClick={() => setSelectedItem(item)}
            >
              <td className="px-4 py-2 flex items-center gap-3">
                <img src={item.image} alt={item.itemName} className="w-12 h-12 object-cover" />
                <span>{item.itemName}</span>
              </td>
              <td className="px-4 py-2">{item.date}</td>
              <td className="px-4 py-2">{item.address}</td>
              <td className="px-4 py-2">${item.price}</td>
              <td className="px-4 py-2">
                {item.status === 'awaiting pickup' ? 'Not Picked' : 'Bought'}
              </td>
            </tr>
          ))}
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