import React, { useState, useEffect } from 'react';
import { FaDownload, FaSearch, FaSort } from 'react-icons/fa';
import axios from 'axios';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('date');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalItemsCollected, setTotalItemsCollected] = useState(0);

  // Fetch transactions from backend
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/transactions'); // Update with your API endpoint
        const data = Array.isArray(response.data) ? response.data : []; // Ensure data is an array
        setTransactions(data);
        setFilteredTransactions(data); // Set initial filtered data
        setError(null);

        // Calculate initial totals
        updateTotals(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to load transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Update totals based on transactions array
  const updateTotals = (transactionsArray) => {
    const totalEarnings = transactionsArray.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
    const totalItems = transactionsArray.reduce((count, transaction) => count + (transaction.items || 0), 0);
    setTotalEarnings(totalEarnings);
    setTotalItemsCollected(totalItems);
  };

  // Filter transactions based on search input
  useEffect(() => {
    const filtered = transactions.filter(transaction =>
      transaction.date?.includes(search) ||
      transaction.status?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTransactions(filtered);
  }, [search, transactions]);

  // Handle sorting transactions
  const handleSort = (type) => {
    const sorted = [...filteredTransactions].sort((a, b) => {
      if (type === 'date') return new Date(b.date) - new Date(a.date);
      if (type === 'amount') return b.amount - a.amount;
      if (type === 'items') return b.items - a.items;
      return 0;
    });
    setFilteredTransactions(sorted);
    setSortType(type);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Transaction History</h1>

      {/* Display Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading transactions...</p>
      ) : (
        <>
          {/* Summary Card */}
          <div className="bg-blue-100 dark:bg-gray-700 rounded-lg p-4 flex justify-between mb-8 shadow-md">
            <div className="text-gray-700 dark:text-gray-300">
              <h2 className="text-xl font-semibold">Total Earnings</h2>
              <p className="text-2xl font-bold">Rs. {totalEarnings.toFixed(2)}</p>
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <h2 className="text-xl font-semibold">Total Items Collected</h2>
              <p className="text-2xl font-bold">{totalItemsCollected}</p>
            </div>
          </div>

          {/* Filter, Sort, and Search */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center border rounded-lg p-2 bg-white dark:bg-gray-800 shadow-md">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search by date or status"
                className="outline-none bg-transparent text-gray-700 dark:text-gray-300"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => handleSort('date')} className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md">
                <FaSort className="mr-1" /> Date
              </button>
              <button onClick={() => handleSort('amount')} className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md">
                <FaSort className="mr-1" /> Amount
              </button>
              <button onClick={() => handleSort('items')} className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md">
                <FaSort className="mr-1" /> Items
              </button>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <table className="w-full">
              <thead>
                <tr className="text-gray-700 dark:text-gray-300 bg-blue-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Items</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredTransactions) && filteredTransactions.length > 0 ? (
                  filteredTransactions.map(transaction => (
                    <tr key={transaction.id} className="text-gray-700 dark:text-gray-300 border-b dark:border-gray-700">
                      <td className="px-4 py-2">{transaction.date}</td>
                      <td className="px-4 py-2">{transaction.items}</td>
                      <td className="px-4 py-2">${transaction.amount}</td>
                      <td className="px-4 py-2">{transaction.status}</td>
                      <td className="px-4 py-2 text-center">
                        <button className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300">
                          <FaDownload /> Download Bill
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Transactions;
