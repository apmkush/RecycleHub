import React, { useState, useEffect } from 'react';

const GetStat = ({ data }) => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalScrapsSold: 0,
    totalRequests: 0,
    totalAwaitingPickup: 0,
  });

  // When data changes, update the stats
  useEffect(() => {
    if (data) {
      setStats({
        totalRevenue: data.totalRevenue,
        totalScrapsSold: data.totalScrapsSold,
        totalRequests: data.totalRequests,
        totalAwaitingPickup: data.totalAwaitingPickup,
      });
    }
  }, [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-5">
      <div className="bg-blue-100 p-6 rounded-lg shadow-xl text-center transform hover:scale-105 transition-all hover:bg-blue-200 hover:text-blue-700">
        <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
        <p className="text-4xl font-bold text-blue-700">{`$${stats.totalRevenue}`}</p>
      </div>
      <div className="bg-green-100 p-6 rounded-lg shadow-xl text-center transform hover:scale-105 transition-all hover:bg-green-200 hover:text-green-700">
        <h3 className="text-sm font-medium text-gray-500">Total Scraps Sold</h3>
        <p className="text-4xl font-bold text-green-700">{stats.totalScrapsSold}</p>
      </div>
      <div className="bg-yellow-100 p-6 rounded-lg shadow-xl text-center transform hover:scale-105 transition-all hover:bg-yellow-200 hover:text-yellow-700">
        <h3 className="text-sm font-medium text-gray-500">Total Requests</h3>
        <p className="text-4xl font-bold text-yellow-700">{stats.totalRequests}</p>
      </div>
      <div className="bg-red-100 p-6 rounded-lg shadow-xl text-center transform hover:scale-105 transition-all hover:bg-red-200 hover:text-red-700">
        <h3 className="text-sm font-medium text-gray-500">Total Awaiting Pickup</h3>
        <p className="text-4xl font-bold text-red-700">{stats.totalAwaitingPickup}</p>
      </div>
    </div>
  );
};

export default GetStat;
