import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalScrapsSold: 0,
    totalRequests: 0,
    totalAwaitingPickup: 0,
  });
  const [history, setHistory] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [yearlyChartData, setYearlyChartData] = useState({ labels: [], datasets: [] });
  const [monthlyChartData, setMonthlyChartData] = useState({ labels: [], datasets: [] });

  // Fetch data from the backend
  useEffect(() => {
    // Replace with your actual API call
    const fetchData = async () => {
      // const response = await fetch('/api/dashboard-data');
      // const data = await response.json();

      // Mock data (replace with fetched data)
      const data = {
        totalRevenue: 2100,
        totalScrapsSold: 99,
        totalRequests: 3,
        totalAwaitingPickup: 2,
        History: [
          { transactionId: 'T0001', date: '2022-12-12', status: 'sold' },
          { transactionId: 'T0002', date: '2023-12-13', status: 'awaiting pickup' },
          // More transactions here...
        ],
      };

      setStats({
        totalRevenue: data.totalRevenue,
        totalScrapsSold: data.totalScrapsSold,
        totalRequests: data.totalRequests,
        totalAwaitingPickup: data.totalAwaitingPickup,
      });
      setHistory(data.History);
    };

    fetchData();
  }, []);

  // Update yearly bar chart data
  useEffect(() => {
    const yearData = new Array(12).fill(0);

    history
      .filter((item) => new Date(item.date).getFullYear() === selectedYear)
      .forEach((item) => {
        const month = new Date(item.date).getMonth();
        if (item.status === 'sold') {
          yearData[month] += 1;
        }
      });

    setYearlyChartData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Items Sold per Month',
          data: yearData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, [history, selectedYear]);

  // Update monthly line chart data
  useEffect(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const monthData = new Array(daysInMonth).fill(0);

    history
      .filter(
        (item) =>
          new Date(item.date).getFullYear() === selectedYear &&
          new Date(item.date).getMonth() === selectedMonth
      )
      .forEach((item) => {
        const day = new Date(item.date).getDate() - 1;
        if (item.status === 'sold') {
          monthData[day] += 1;
        }
      });

    setMonthlyChartData({
      labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
      datasets: [
        {
          label: 'Items Sold per Day',
          data: monthData,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1,
        },
      ],
    });
  }, [history, selectedYear, selectedMonth]);

  return (
    <div className="p-5 bg-gray-150">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg shadow-xl text-center">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-4xl font-bold text-blue-700">${stats.totalRevenue}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-xl text-center">
          <h3 className="text-sm font-medium text-gray-500">Total Scraps Sold</h3>
          <p className="text-4xl font-bold text-green-700">{stats.totalScrapsSold}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-xl text-center">
          <h3 className="text-sm font-medium text-gray-500">Total Requests</h3>
          <p className="text-4xl font-bold text-yellow-700">{stats.totalRequests}</p>
        </div>
        <div className="bg-red-100 p-6 rounded-lg shadow-xl text-center">
          <h3 className="text-sm font-medium text-gray-500">Total Awaiting Pickup</h3>
          <p className="text-4xl font-bold text-red-700">{stats.totalAwaitingPickup}</p>
        </div>
      </div>

      {/* Yearly Bar Chart Section */}
      <div className="mb-8">
        <label htmlFor="year-selector" className="mr-2 font-semibold">Select Year:</label>
        <select
          id="year-selector"
          className="p-2 border rounded-md"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {[2022, 2023, 2024].map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <Bar data={yearlyChartData} options={{
          responsive: true,
          plugins: { title: { display: true, text: `Items Sold in ${selectedYear}` } },
          scales: { x: { title: { display: true, text: 'Month' } }, y: { beginAtZero: true } },
        }} />
      </div>

      {/* Monthly Line Chart Section */}
      <div>
        <label htmlFor="month-selector" className="mr-2 font-semibold">Select Month:</label>
        <select
          id="month-selector"
          className="p-2 border rounded-md"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>
        <Line data={monthlyChartData} options={{
          responsive: true,
          plugins: { title: { display: true, text: `Items Sold in ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][selectedMonth]} ${selectedYear}` } },
          scales: { x: { title: { display: true, text: 'Day' } }, y: { beginAtZero: true } },
        }} />
      </div>
    </div>
  );
};

export default Dashboard;
