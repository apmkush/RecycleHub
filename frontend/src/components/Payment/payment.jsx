// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css';

// const Payment = () => {
//   const [amount, setAmount] = useState('');
//   const [subscriptionId, setSubscriptionId] = useState(null);
//   const  DisplayMessage=(text)=>{
//     toast.success(text, {
//         position: "top-center",
//         autoClose: 3000, // Auto-close after 3 seconds
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         style: {marginTop: "10px" },
//     });
// };

//   const handlePayment = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/create-subscription', {
//         plan_id: 'plan_PKPBib2XkNce96',
//         total_count: 1,
//         quantity: 1,
//         customer_notify: 0,
//         start_at: Math.floor(Date.now() / 1000),
//         expire_by: Math.floor(Date.now() / 1000) + 86400 * 30 * 1, // 6 months
//         addons: [
//           {
//             item: {
//               name: 'Platform Fee',
//               amount: 300 * 100, // in paise (300.00 INR)
//               currency: 'INR',
//             },
//           },
//         ],
//       });

//       const subscription = response.data.subscription;
//       setSubscriptionId(subscription.id);
//       openRazorpay(subscription);
//     } catch (error) {
//       console.error('Error creating subscription:', error);
//     }
//   };
//   const openRazorpay = (subscription) => {
//     const options = {
//       key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Use your Razorpay Key ID
//       subscription_id: subscription.id,
//       name: 'Recycle Hub',
//       description: 'Subscription Payment',
//       handler: async (response) => {
//         try {
//           await axios.post('http://localhost:5000/verify-payment', {
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_subscription_id: response.razorpay_subscription_id,
//             razorpay_signature: response.razorpay_signature,
//           });
//           alert('Payment verified and subscription active');
//         } catch (error) {
//           console.error('Error in processing payment:', error);
//         }
//       },
//       theme: {
//         color: '#F37254',
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };
  

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <ToastContainer />
//         <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Enter Amount for Payment</h2>
//             <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Enter amount"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
//             />
//             <button
//             onClick={handlePayment}
//             className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
//             >
//             Pay Now
//             </button>
//         </div>
//     </div>

//   );
// };

// export default Payment;



import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const [paymentLink, setPaymentLink] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        email: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/create-subscription', formData);
            setPaymentLink(response.data.paymentLink);
        } catch (error) {
            console.error('Error creating subscription link:', error);
        }
    };
    const verifyPayment = async (razorpay_payment_id, razorpay_subscription_id, razorpay_signature) => {
      try {
          const response = await axios.post('http://localhost:5000/verify-payment', {
              razorpay_payment_id,
              razorpay_subscription_id,
              razorpay_signature,
          });
          if (response.data.message === 'Payment verified successfully!') {
              setPaymentStatus('Payment successful! Subscription is now active.');
          } else {
              setPaymentStatus('Payment verification failed. Please try again.');
          }
      } catch (error) {
          console.error('Error verifying payment:', error);
          setPaymentStatus('Error during payment verification. Please try again.');
      }
  };

    const handlePaymentSuccess = async (response) => {
        const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = response;
        await verifyPayment(razorpay_payment_id, razorpay_subscription_id, razorpay_signature);
    };
    
    const openRazorpay = (subscription) => {
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Use your Razorpay Key ID
            subscription_id: subscription.id,
            name: 'Recycle Hub',
            description: 'Subscription Payment',
            handler: handlePaymentSuccess,
            theme: {
                color: '#F37254',
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
      <div className="subscription-container max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Subscribe to Our Plan</h2>
          <form className="space-y-4">
              <div>
                  <label className="block text-gray-700 font-semibold mb-2">Name:</label>
                  <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      placeholder="Enter your name"
                  />
              </div>
              <div>
                  <label className="block text-gray-700 font-semibold mb-2">Contact:</label>
                  <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      placeholder="Enter your contact number"
                  />
              </div>
              <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email:</label>
                  <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      placeholder="Enter your email address"
                  />
              </div>
              <button
                  type="button"
                  onClick={handlePayment}
                  className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
              >
                  Generate Subscription Link
              </button>
          </form>
      
          {paymentLink && (
              <div className="mt-6 text-center">
                  <p className="text-gray-600 mb-2">Click the link below to complete your subscription:</p>
                  <a
                      href={paymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                  >
                      Complete Subscription
                  </a>
              </div>
          )}
      </div>
  
    );
};

export default Payment;