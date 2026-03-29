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
import BillGenerator from './components/Billing/billing.jsx';
import Cart from './components/Cart/Cart.jsx';
import PayoutForm from './components/Payment/payout.jsx';
import CopperScrapInfo from './components/Footer/CopperScrapInfo.jsx';
import BrassScrapInfo from './components/Footer/BrassScrapInfo.jsx';
import ElectronicScrapInfo from './components/Footer/ElectronicScrapInfo.jsx';
import Best from './components/Footer/Best.jsx';
import NotFound from './components/NotFound/NotFound.jsx'
import { UserProvider } from './App.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'Home', element: <Home /> },
      
      // Public routes (no authentication required)
      { path: 'Login', element: <Login /> },
      { path: 'Signup', element: <Signup /> },
      { path: 'CopperScrapInfo', element: <CopperScrapInfo /> },
      { path: 'BrassScrapInfo', element: <BrassScrapInfo /> },
      { path: 'ElectronicScrapInfo', element: <ElectronicScrapInfo /> },
      { path: 'Best', element: <Best /> },
      
      // Customer routes (all authenticated users)
      { path: 'Transactions', element: <ProtectedRoute><Transactions /></ProtectedRoute> },
      { path: 'Pickup', element: <ProtectedRoute><PickupForm /></ProtectedRoute> },
      { path: 'Account/*', element: <ProtectedRoute><Account /></ProtectedRoute> },
      { path: 'Cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      
      // Admin & Dealer routes
      { path: 'Requests', element: <ProtectedRoute requiredRoles={['admin', 'dealer']}><Requests /></ProtectedRoute> },
      { path: 'Dashboard', element: <ProtectedRoute requiredRoles={['admin', 'dealer']}><Dashboard /></ProtectedRoute> },
      { path: 'billing', element: <ProtectedRoute requiredRoles={['admin', 'dealer']}><BillGenerator /></ProtectedRoute> },
      
      // Admin only routes
      { path: 'Pricing', element: <ProtectedRoute requiredRoles={['admin']}><Pricing /></ProtectedRoute> },
      
      // Dealer only routes
      { path: 'payout', element: <ProtectedRoute requiredRoles={['dealer']}><PayoutForm /></ProtectedRoute> },
      
      // Fallback 404
      { path: '*', element: <NotFound/> },
    ],
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
