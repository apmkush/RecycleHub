import React, { useState } from 'react';
import ShowDetails from '../Cart/ShowDetails';

const Requestory = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [removeItem, setRemoveItem] = useState(null);                     // agr removeItem null nhi h to isko database se hatao

  // Collection of items
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
      date: '2023-06-15',
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
      price: 80,
      status: 'awaiting pickup',
      date: '2023-08-05',
      weight: '0.2 kg',
      pickupTime: '11:30 AM',
      description: 'Noise-canceling headphones with minimal wear.',
    },
  ];

  // Filter items to only those with status other than "sold"
  const availableItems = items.filter((item) => item.status !== 'sold');

  const handleRowClick = (item) => {
    setSelectedItem(item); // Set the clicked item for the modal
  };

  const handleRemoveClick = (item) => {
    if (item.status === 'awaiting pickup' || item.status === 'added to cart') {
      setRemoveItem(item); // Set item to be removed
      // Additional remove logic can go here if needed
    }
  };

  const closeModal = () => {
    setSelectedItem(null); // Close the ShowDetails modal
  };

  return (
    <div className="p-6">
      <h2 className="text-center text-2xl font-semibold mb-6">Request History</h2>

      <div className="overflow-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Item</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-center">Price</th>
              <th className="py-3 px-6 text-center">Remove</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {availableItems.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(item)}
              >
                <td className="py-3 px-6 flex items-center space-x-3">
                  <img src={item.image} alt={item.itemName} className="w-8 h-8 rounded-full" />
                  <span>{item.itemName}</span>
                </td>
                <td className="py-3 px-6">{item.address}</td>
                <td className="py-3 px-6 text-center">{item.date}</td>
                <td className="py-3 px-6 text-center">${item.price}</td>
                <td className="py-3 px-6 text-center">
                  {item.status === 'awaiting pickup' || item.status === 'added to cart' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering row click event
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
