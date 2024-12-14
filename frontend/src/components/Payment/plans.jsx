import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Payment from './payment';


const PlansDisplay = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleBuyClick = (plan) => {
      setSelectedPlan(plan);
  };

  // Fetch plans from the backend API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fetch-plans'); // Replace with your API endpoint
        setPlans(response.data);
      } catch (err) {
        setError('Failed to fetch plans. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading plans...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center p-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen">
            <h1 className="w-full text-4xl font-extrabold text-purple-800 mb-8 text-center drop-shadow-lg">
                Explore Our Plans
            </h1>
            {selectedPlan ? (
                <Payment plan={selectedPlan} />
            ) : (
                plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="bg-white shadow-lg rounded-lg p-6 m-4 w-80 border border-gray-200 hover:shadow-2xl transition-transform transform hover:scale-105"
                        style={{
                            backgroundColor: '#f9f9fc', // Subtle light color distinct from background
                        }}
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">
                            {plan.item.name}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            <strong className="text-purple-700">Amount:</strong>{' '}
                            <span className="text-green-600 font-medium">₹{(plan.item.amount / 100).toFixed(2)}</span>{' '}
                            {plan.item.currency.toUpperCase()}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong className="text-purple-700">Interval:</strong>{' '}
                            <span className="text-blue-600">{plan.interval} {plan.period}</span>
                        </p>
                        <p className="text-gray-700 mb-4">
                            <strong className="text-purple-700">Status:</strong>{' '}
                            <span className={plan.item.active ? 'text-green-500' : 'text-red-500'}>
                                {plan.item.active ? 'Active' : 'Inactive'}
                            </span>
                        </p>
                        <p className="text-gray-600 text-sm italic">
                            <strong className="text-purple-700">Created At:</strong>{' '}
                            {new Date(plan.created_at * 1000).toLocaleDateString()}
                        </p>
                        <button
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
                            onClick={() => handleBuyClick(plan)}
                        >
                            Buy
                        </button>
                    </div>
                ))
            )}
        </div>


  );
};

export default PlansDisplay;