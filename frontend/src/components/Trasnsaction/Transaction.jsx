import React, { useState, useEffect } from 'react';
import { FaDownload, FaSearch, FaSort, FaFilter } from 'react-icons/fa';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('date');
  const [filter, setFilter] = useState('all');

  // Dummy data (replace this with data fetched from your backend)
  useEffect(() => {
    const fetchTransactions = async () => {
      const data = [
        { id: 1, date: '2024-11-01', items: 10, amount: 500, status: 'Completed' },
        { id: 2, date: '2024-10-25', items: 5, amount: 200, status: 'Completed' },
        { id: 3, date: '2024-10-18', items: 15, amount: 700, status: 'Pending' },
        // Add more dummy transactions as needed
      ]; 
      setTransactions(data);
      setFilteredTransactions(data);
    };
    fetchTransactions();
  }, []);

  // Search function
  useEffect(() => {
    const filtered = transactions.filter(transaction =>
      transaction.date.includes(search) ||
      transaction.status.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTransactions(filtered);
  }, [search, transactions]);

  // Sort function
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

      {/* Summary Card */}
      <div className="bg-blue-100 dark:bg-gray-700 rounded-lg p-4 flex justify-between mb-8 shadow-md">
        <div className="text-gray-700 dark:text-gray-300">
          <h2 className="text-xl font-semibold">Total Earnings</h2>
          <p className="text-2xl font-bold">$1,400</p>
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <h2 className="text-xl font-semibold">Total Items Collected</h2>
          <p className="text-2xl font-bold">30</p>
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
          <button
            onClick={() => handleSort('date')}
            className={`flex items-center bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md ${
              sortType === 'date' ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <FaSort className="mr-1" /> Date
          </button>
          <button
            onClick={() => handleSort('amount')}
            className={`flex items-center bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md ${
              sortType === 'amount' ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <FaSort className="mr-1" /> Amount
          </button>
          <button
            onClick={() => handleSort('items')}
            className={`flex items-center bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md ${
              sortType === 'items' ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
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
            {filteredTransactions.map(transaction => (
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
            ))}
          </tbody>
        </table>
        {filteredTransactions.length === 0 && (
          <p className="text-center py-4 text-gray-500 dark:text-gray-400">No transactions found</p>
        )}
      </div>
    </div>
  );
}

export default Transactions;
