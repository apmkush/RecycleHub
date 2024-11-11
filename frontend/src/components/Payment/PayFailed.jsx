import React from 'react';

const PayFailed = ({ error }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md md:max-w-lg lg:max-w-xl mx-4 animate-color-change-red">
        <div className="flex flex-col items-center">
          <div className="text-red-600 text-4xl mb-4">❌</div>
          <h2 className="text-2xl font-semibold mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-4 text-center">
            Unfortunately, your payment could not be processed. Please try again later.
          </p>
          <div className="w-full mb-4">
            <p className="text-gray-800"><strong>Error:</strong> {error}</p>
          </div>
          <button
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayFailed;
