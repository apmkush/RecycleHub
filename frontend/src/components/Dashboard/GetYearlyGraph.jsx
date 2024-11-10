import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GetYearlyGraph = ({ data }) => {
  const [history , setHistory] = useState(data.History || []);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Items Sold per Month',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  });

  // Helper function to extract month from date string (YYYY-MM-DD)
  const extractMonth = (dateString) => {
    const date = new Date(dateString);
    return date.getMonth(); // Returns 0 for January, 1 for February, etc.
  };

  // Process the history data and prepare the chart data
  useEffect(() => {
    const yearData = new Array(12).fill(0); // Initialize an array for 12 months

    // Filter transactions by selected year
    const filteredData = history.filter(item => {
        console.log(item) ; 
        const year = new Date(item.date).getFullYear();
        console.log(year);  // This will log the year for each transaction
        if(year == selectedYear){
            console.log(item) ; 
            return item ; 
        }
    });
      

    // Sum the number of items sold per month for the selected year
    filteredData.forEach(item => {
      const month = extractMonth(item.date);
      if (item.status === 'sold') {
        yearData[month] += 1; // Increase the sold items count for the respective month
      }
    });

    // Update the chart data
    setChartData({
      labels: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
      datasets: [{
        label: 'Items Sold per Month',
        data: yearData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    });
  }, [history, selectedYear]); // Run when history or selectedYear changes

  // Handle year selection
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="p-5">
      <div className="mb-4">
        <label htmlFor="year-selector" className="mr-2 font-semibold">Select Year:</label>
        <select
          id="year-selector"
          className="p-2 border rounded-md"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {/* You can replace these years with dynamic values or a range */}
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
        </select>
      </div>

      <div className="chart-container">
        <Bar data={chartData} options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Items Sold in ${selectedYear}`,
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Items Sold',
              },
              beginAtZero: true,
            },
          },
        }} />
      </div>
    </div>
  );
};

export default GetYearlyGraph;
