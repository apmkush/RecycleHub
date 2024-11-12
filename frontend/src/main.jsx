import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import Login from './components/Login/login.jsx'
import Signup from './components/Signup/Signup.jsx'
import Transactions from './components/Trasnsaction/Transaction.jsx'
import PickupForm from './components/Pickup/Pickup.jsx'
import Requests from './components/Request/Requests.jsx'
import Pricing from './components/Pricing/Pricing.jsx' 
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Account from './components/Account/Account.jsx'
import Payment from './components/Payment/payment.jsx'
import Cart from './components/Cart/Cart.jsx'
import PayoutForm from './components/Payment/payout.jsx'
import App, { UserProvider } from './App';
import CopperScrapInfo from './components/Footer/CopperScrapInfo.jsx'
import BrassScrapInfo from './components/Footer/BrassScrapInfo.jsx'
import ElectronicScrapInfo from './components/Footer/ElectronicScrapInfo.jsx'
import Best from './components/Footer/Best.jsx'


// create a router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "Home",
        element: <Home />
      },
      {
        path: "Transactions",
        element: <Transactions />
      },
      {
        path: "Login",
        element: <Login />
      },
      {
        path: "Signup",
        element: <Signup />
      },
      {
        path: "Home",
        element: <Home />
      },
      {
        path: "Pickup",
        element: <PickupForm />
      },
      {
        path: "Request",
        element: <Request />
      },
      {
        path: "Pricing",
        element: <Pricing />
      },
      {
        path: "Dashboard",
        element: <Dashboard/>
      },
      {
        path: "Account/*",
        element: <Account />
      },
      {
        path: "payment",
        element: <Payment />
      },
      {
        path: "Requests",
        element: <Requests />
      },
      {
        path: "Cart",
        element: <Cart />
      },
      {
        path: "payout",
        element: <PayoutForm />
      },
      {
        path: "CopperScrapInfo",
        element: <CopperScrapInfo />
      },
      {
        path: "BrassScrapInfo",
        element: <BrassScrapInfo />
      },
      {
        path: "ElectronicScrapInfo",
        element: <ElectronicScrapInfo />
      },
      {
        path: "Best",
        element: <Best />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider> {/* Wrap with UserProvider to provide context */}
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);