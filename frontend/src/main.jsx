import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import Login from './components/Login/login.jsx'
import Signup from './components/Signup/Signup.jsx'
import Transactions from './components/Trasnsaction/Transaction.jsx'

// create a router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "/",
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
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
