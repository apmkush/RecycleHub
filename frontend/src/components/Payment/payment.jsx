import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const  DisplayMessage=(text)=>{
    toast.success(text, {
        position: "top-center",
        autoClose: 3000, // Auto-close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {marginTop: "10px" },
    });
};

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post('http://localhost:5000/create-order', { amount });
      const { orderId, amount: orderAmount, currency } = orderResponse.data;

      const options = {
        key: window.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderAmount,
        currency: currency,
        order_id: orderId,
        name: 'Your App Name',
        description: 'Test Transaction',
        handler: async function (response) {
          const verifyResponse = await axios.post('http://localhost:5000/verify-payment', {
            orderId: orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });
          if (verifyResponse.data.success) {
            DisplayMessage('Payment successful!');
          } else {
            DisplayMessage('Payment verification failed!');
          }
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error in processing payment:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <ToastContainer />
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Enter Amount for Payment</h2>
            <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
            />
            <button
            onClick={handlePayment}
            className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
            Pay Now
            </button>
        </div>
    </div>

  );
};

export default Payment;
