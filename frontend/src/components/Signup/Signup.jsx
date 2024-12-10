import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    role: '', 
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });
  const DisplayMessage = (text) => {
    toast.success(text, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { marginTop: "10px" },
    });
};

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formInput.role ||
      !formInput.name ||
      !formInput.email ||
      !formInput.phone ||
      !formInput.password ||
      !formInput.confirm_password
    ) {
      toast.error('Please fill all credentials');
    } else {
      try {
        const response = await axios.post('http://localhost:5000/signup', formInput, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.data.success) {
          DisplayMessage('SignUp successful!!');
          setTimeout(() => {
            navigate('/Home');
          }, 3000);
        } else {
          DisplayMessage(response.data.message);
        }
        setMessage(response.data.message);
      } catch (error) {
        DisplayMessage('An error has occurred!!');
        console.log(error);
      }
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600">Sign Up for Recycle Hub</h2>
        {message && <p className="text-red-500 text-sm text-center">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection at the Top */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              onChange={handleInput}
              value={formInput.role}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="customer">Customer</option>
              <option value="dealer">Dealer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          {/* Remaining Form Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleInput}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleInput}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tel</label>
            <input
              type="number"
              name="phone"
              onChange={handleInput}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleInput}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              onChange={handleInput}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
          <ToastContainer />
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
