import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = () => {
  const { user } = useSelector((state) => state.auth); // Assuming `user` is fetched from Redux
  // console.log(user._id);
  const [amount, setAmount] = useState('');
  const [subscriptionId, setSubscriptionId] = useState(null);
  const[paymentLink,setpaymentLink]=useState('');
//   console.log(import.meta.env.VITE_RAZORPAY_KEY);

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
      const response = await axios.post('http://localhost:5000/create-subscription', {
        plan_id: 'plan_PKPBib2XkNce96',
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

      console.log('Response Data:', response.data);

      const subscription = response.data.subscription; // Assuming the subscription data is returned as the top-level object
      if (!subscription || !subscription.id) {
        throw new Error('Subscription object is missing or invalid in the API response.');
      }

      setpaymentLink(response.data.paymentLink);
      setSubscriptionId(subscription.id);
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
          const res=await axios.post('http://localhost:5000/verify-payment', {
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
        color: '#F37254',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
      
        {paymentLink && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 shadow-md w-full max-w-md">
                <p className="text-green-700 font-semibold text-lg mb-2">Payment Link Generated:</p>
                <a
                href={paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white font-medium text-sm px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition-all duration-200"
                >
                Click here to pay
                </a>
            </div>
            )}

      </div>
    </div>
  );
};

export default Payment;
