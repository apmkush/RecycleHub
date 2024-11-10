import React from 'react';
import GetStat from "./GetStat";
import GetYearlyGraph from "./GetYearlyGraph";

const Dashboard = () => {
  const data = {
    totalRevenue: 2100,
    totalScrapsSold: 99,
    totalRequests: 3,
    totalAwaitingPickup: 2,
    History: [
      {
        transactionId: 'T0001',
        dealerId: 123,
        dealerName: 'John Doe',
        customerId: 234567,
        customerName: 'Jane Smith',
        scrapType: 'Metal',
        weight: 50,
        date: '2022-12-12',
        amount: 1000,
        paymentMethod: 'Bank Transfer',
        pickupStatus: 'Completed',
        pickupAddress: '123 Scrap Street, Cityville',
        remarks: 'Transaction went smoothly',
        status: 'sold',
      },
      {
        transactionId: 'T0002',
        dealerId: 124,
        dealerName: 'Alice Brown',
        customerId: 234568,
        customerName: 'Bob Martin',
        scrapType: 'Plastic',
        weight: 30,
        date: '2023-12-13',
        amount: 700,
        paymentMethod: 'Cash',
        pickupStatus: 'Pending',
        pickupAddress: '456 Recycle Rd, Greenfield',
        remarks: 'Awaiting pickup',
        status: 'awaiting pickup',
      },
      {
        transactionId: 'T0003',
        dealerId: 125,
        dealerName: 'Charlie Green',
        customerId: 234569,
        customerName: 'Emma White',
        scrapType: 'Glass',
        weight: 20,
        date: '2023-12-14',
        amount: 400,
        paymentMethod: 'Credit Card',
        pickupStatus: 'Pending',
        pickupAddress: '789 Eco Lane, Newtown',
        remarks: 'Awaiting pickup',
        status: 'awaiting pickup',
      },
    ],
  };

  return (
    <div>
      <GetStat data={data} />
      <GetYearlyGraph history={data.History} />
    </div>
  );
};

export default Dashboard;
