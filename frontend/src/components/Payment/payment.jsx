import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import{backendUrl}from '../../service/url';


const Payment = (plan) => {
  const isDarkMode = useSelector((state) => state.theme.darkMode) ; 
  const { user } = useSelector((state) => state.auth); // Assuming `user` is fetched from Redux
  // console.log(user._id);

  const DisplayMessage = (text) => {
    toast.success(text, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: { marginTop: '10px' },
    });
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post(`${backendUrl}/create-subscription`, {
        plan_id: plan.plan.id,
        total_count: 12,
        quantity: 1,
        expire_by: Math.floor(Date.now() / 1000) + 86400 * 30, // 1 month expiry
        customer_notify: 1,
        addons: [
          {
            item: {
              name: 'Delivery charges',
              amount: 300 * 100, // in paise
              currency: 'INR',
            },
          },
        ],
        name: user.name,
        email: user.email,
        contact: user.phone,
      });

      // console.log('Response Data:', response.data);

      const subscription = response.data.subscription; 
      if (!subscription || !subscription.id) {
        throw new Error('Subscription object is missing or invalid in the API response.');
      }

      openRazorpay(subscription);
    } catch (error) {
      console.error('Error creating subscription:', error.response?.data || error.message);
      toast.error('Failed to create subscription. Please try again.');
    }
  };

  const openRazorpay = (subscription) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // Replace with your Razorpay Key ID
      subscription_id: subscription.id,
      name: 'Recycle Hub',
      description: 'Subscription Payment',
      prefill: {
        email: user.email, // Prefill customer email
        contact: user.phone, // Prefill customer contact
      },
      handler: async (response) => {
        try {
          const res=await axios.post(`${backendUrl}/verify-payment`, {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_subscription_id: response.razorpay_subscription_id,
            razorpay_signature: response.razorpay_signature,
            customer_id:user._id,
          });
          if(res.data.success){
            DisplayMessage('Payment verified and subscription activated.');
          }
        } catch (error) {
          console.error('Error in processing payment:', error);
          toast.error('Failed to verify payment. Please try again.');
        }
      },
      theme: {
        color: isDarkMode ? '#1E293B' : '#F37254', 
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div 
      className={`shadow-lg rounded-lg p-6 m-4 w-80 border 
      ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'}`}
    >
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Payment Details</h2>
            <p className="text-gray-700 mb-4">
                <strong className="text-purple-700">Amount:</strong>{' '}
                <span className="text-green-600 font-medium">₹{(plan.plan.item.amount / 100).toFixed(2)}</span>{' '}
                {plan.plan.item.currency.toUpperCase()}
            </p>
            {/* Payment form can go here */}
            <button 
             onClick={handlePayment} 
             className={`px-4 py-2 rounded-md 
              ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            >
              Proceed to Payment
            </button>
        </div>
  );
};

export default Payment;
