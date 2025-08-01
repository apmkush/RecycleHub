import React, { useState } from 'react';
import axios from 'axios';

const PayoutForm = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
        if (!accountNumber || !ifscCode || !amount) {
            setStatus('Please fill in all fields');
            return;
        }

        try {
            setStatus('Processing...');
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/payout`, {
                account_number: accountNumber,
                ifsc_code: ifscCode,
                amount: amount
            });

            if (response.data.message === 'Payout initiated successfully') {
                setStatus('Payout successful!');
            }
        } catch (error) {
            setStatus('Error initiating payout');
            console.error('Error:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Initiate Payout</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="accountNumber" className="block text-gray-700 font-medium">Account Number:</label>
                    <input
                        id="accountNumber"
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="ifscCode" className="block text-gray-700 font-medium">IFSC Code:</label>
                    <input
                        id="ifscCode"
                        type="text"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="amount" className="block text-gray-700 font-medium">Amount:</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Send Payout
                </button>
            </form>
            {status && (
                <div className={`mt-4 p-2 text-center ${status.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                    {status}
                </div>
            )}
        </div>
    );
};

export default PayoutForm;
