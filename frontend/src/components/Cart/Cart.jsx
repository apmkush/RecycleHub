import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../store/slices/cartSlice.js';
import { toast } from 'react-toastify';
import ShowDetails from './ShowDetails';

const Cart = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [bought, setBought] = useState(false);
  
  // Get cart from Redux
  const { items: cartItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRowClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleBuyClick = () => {
    if (cartItems.length === 0) {
      toast.error('Cart is empty!', {
        position: "top-center",
        autoClose: 1500,
      });
      return;
    }
    setBought(true);
    // After successful purchase, clear the cart
    setTimeout(() => {
      dispatch(clearCart());
      setBought(false);
      toast.success('Purchase completed successfully!', {
        position: "top-center",
        autoClose: 1500,
      });
    }, 2000);
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.info('Item removed from cart', {
      position: "top-right",
      autoClose: 1000,
    });
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info('Cart cleared', {
      position: "top-center",
      autoClose: 1000,
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header with action buttons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <div className="flex gap-3">
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          )}
          <button
            onClick={handleBuyClick}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={cartItems.length === 0}
          >
            Buy ({cartItems.length}) Items
          </button>
        </div>
      </div>

      {bought && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <p className="text-green-700 font-semibold">✓ Items purchased successfully!</p>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
          <p className="text-gray-500">Browse the Pricing page to add items to your cart</p>
        </div>
      ) : (
        <>
          <div className="overflow-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Item</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-center">Quantity</th>
                  <th className="py-3 px-6 text-center">Total</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(item)}
                  >
                    <td className="py-3 px-6 flex items-center space-x-3">
                      {item.image && (
                        <img src={item.image} alt={item.material} className="w-10 h-10 rounded-full object-cover" />
                      )}
                      <span className="font-semibold">{item.material}</span>
                    </td>
                    <td className="py-3 px-6">₹{item.price.toFixed(2)}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(item.id, item.quantity - 1);
                          }}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-2 py-1 rounded"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(item.id, item.quantity + 1);
                          }}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-2 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center font-semibold">₹{(item.price * item.quantity).toFixed(2)}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveItem(item.id);
                        }}
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition text-xs"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Price Summary */}
          <div className="mt-6 flex justify-end">
            <div className="bg-gray-50 rounded-lg p-6 w-full max-w-sm border border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Subtotal:</span>
                <span className="text-gray-700">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Items:</span>
                <span className="text-gray-700">{cartItems.length}</span>
              </div>
              <div className="border-t border-gray-300 my-3"></div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <ShowDetails details={selectedItem} onClose={closeModal} />
        </div>
      )}
    </div>
  );
};

export default Cart;
