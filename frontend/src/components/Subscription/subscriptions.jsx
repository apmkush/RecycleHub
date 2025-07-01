import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

const SubscriptionStatus = () => {
  const { user } = useSelector((state) => state.auth);
  const UserId = user._id;
  const isDarkMode = useSelector((state) => state.theme.darkMode) ; 
  const [subscriptions, setSubscriptions] = useState([]);

  const fetchSubscriptions = async () => {
    try {
        const response = await axios.get('http://localhost:5000/fetch-subscriptions', {
            params: {
              UserId
            }
          });
      setSubscriptions(response.data);
      console.log('Subscriptions:', response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Failed to fetch subscriptions. Please try again.');
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className={`flex flex-col items-center p-6 min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Subscription Details</h1>
      <div className={`w-full max-w-6xl shadow-lg rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {subscriptions && subscriptions.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}>
              <tr>
                <th className="px-6 py-3 border-b border-gray-300 text-gray-700 font-semibold">Status</th>
                <th className="px-6 py-3 border-b border-gray-300 text-gray-700 font-semibold">Remaining Count</th>
                <th className="px-6 py-3 border-b border-gray-300 text-gray-700 font-semibold">Start Date</th>
                <th className="px-6 py-3 border-b border-gray-300 text-gray-700 font-semibold">End Date</th>
                <th className="px-6 py-3 border-b border-gray-300 text-gray-700 font-semibold">Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, index) => (
                <tr
                  key={sub.id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td
                    className={`px-6 py-4 border-b border-gray-300 font-semibold ${
                      sub.status === 'active'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {sub.status}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-gray-600">
                    {sub.remaining_count || 'N/A'}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-gray-600">
                    {sub.start_at ? formatDate(sub.start_at) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-gray-600">
                    {sub.end_at ? formatDate(sub.end_at) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-gray-600">
                    {sub.payment_method || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-gray-500 text-center">No subscriptions found.</div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionStatus;
