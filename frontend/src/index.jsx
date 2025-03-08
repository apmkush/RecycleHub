import React from 'react';
/*import ReactDOM from 'react-dom/client';*/
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Transactions from './components/Trasnsaction/Transaction.jsx';
import PickupForm from './components/Pickup/Pickup.jsx';
import Requests from './components/Request/Requests.jsx';
import Pricing from './components/Pricing/Pricing.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Account from './components/Account/Account.jsx';
import Payment from './components/Payment/payment.jsx';
import Subscriptions from './components/Subscription/subscriptions.jsx'; 
import BillGenerator from './components/Billing/billing.jsx';
import Cart from './components/Cart/Cart.jsx';
import PayoutForm from './components/Payment/payout.jsx';
import CopperScrapInfo from './components/Footer/CopperScrapInfo.jsx';
import BrassScrapInfo from './components/Footer/BrassScrapInfo.jsx';
import ElectronicScrapInfo from './components/Footer/ElectronicScrapInfo.jsx';
import Best from './components/Footer/Best.jsx';
import { UserProvider } from './App.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'Home', element: <Home /> },
      { path: 'Transactions', element: <Transactions /> },
      { path: 'Login', element: <Login /> },
      { path: 'Signup', element: <Signup /> },
      { path: 'Pickup', element: <PickupForm /> },
      { path: 'Requests', element: <Requests /> },
      { path: 'Pricing', element: <Pricing /> },
      { path: 'Dashboard', element: <Dashboard /> },
      { path: 'Account/*', element: <Account /> },
      { path: 'Cart', element: <Cart /> },
      { path: 'payout', element: <PayoutForm /> },
      { path: 'CopperScrapInfo', element: <CopperScrapInfo /> },
      { path: 'BrassScrapInfo', element: <BrassScrapInfo /> },
      { path: 'ElectronicScrapInfo', element: <ElectronicScrapInfo /> },
      { path: 'Best', element: <Best /> },
      { path: 'billing', element: <BillGenerator /> },
    ],
  },
  {
    path: 'payment',
    element: <Payment />,
  },
  {
    path: 'subscriptions',
    element: <Subscriptions />,
  },
]);

const Index = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default Index;
