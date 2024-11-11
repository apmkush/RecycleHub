import React, { useState } from 'react';
import ShowDetails from './ShowDetails';

const Cart = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [bought, setBought] = useState(false); // Track if items are bought

  const items = [
    {
      itemName: 'Laptop',
      image: './laptop.png',
      address: '123 Tech Street, Cityville',
      price: 500,
      status: 'added to cart',
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
      status: 'added to cart',
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
      status: 'added to cart',
      date: '2023-08-05',
      weight: '0.2 kg',
      pickupTime: '11:30 AM',
      description: 'Noise-canceling headphones with minimal wear.',
    },
  ];

  const cartItems = items.filter((item) => item.status === 'added to cart');

  const handleRowClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleBuyClick = () => {
    setBought(true);
    // Additional logic for handling purchase could go here
  };

  return (
    <div className="p-6">
      <div className="flex justify-center mb-4">
        <button
          onClick={handleBuyClick}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600"
        >
          Buy ({cartItems.length}) Items
        </button>
      </div>

      {bought && <p className="text-green-500 text-center mb-4">Items have been bought!</p>}

      <div className="overflow-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Item</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-center">Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {cartItems.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(item)}
              >
                <td className="py-3 px-6 flex items-center space-x-3">
                  <img src={item.image} alt={item.itemName} className="w-10 h-10 rounded-full" />
                  <span>{item.itemName}</span>
                </td>
                <td className="py-3 px-6">{item.address}</td>
                <td className="py-3 px-6 text-center">{item.date}</td>
                <td className="py-3 px-6 text-center">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <ShowDetails details={selectedItem} onClose={closeModal} />
        </div>
      )}
    </div>
  );
};

export default Cart;
