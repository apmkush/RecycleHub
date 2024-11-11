import React from 'react';
import checkMark from './check_mark.png'; // Adjust path as needed

const PaySuccess = ({ refId, amount, recipient }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md md:max-w-lg lg:max-w-xl mx-4 animate-color-change-green">
        <div className="flex flex-col items-center">
          {/* Custom Check Mark Image */}
          <img src={checkMark} alt="Success" className="w-16 h-16 mb-4" />

          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful</h2>
          <p className="text-gray-600 mb-6 text-center">
            Thank you for your payment! Your transaction has been processed successfully.
          </p>

          {/* Payment Details */}
          <div className="w-full mb-6">
            <div className="flex justify-between text-gray-800">
              <span className="font-medium">Reference ID:</span>
              <span>{refId}</span>
            </div>
            <div className="flex justify-between text-gray-800 mt-2">
              <span className="font-medium">Amount:</span>
              <span>Rs.{amount}</span>
            </div>
            <div className="flex justify-between text-gray-800 mt-2">
              <span className="font-medium">Recipient:</span>
              <span>{recipient}</span>
            </div>
          </div>

          {/* Button */}
          <button
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out"
            onClick={() => window.location.reload()}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaySuccess;
