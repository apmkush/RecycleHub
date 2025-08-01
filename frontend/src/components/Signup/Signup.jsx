import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [message, setMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();

  const [formInput, setFormInput] = useState({
    role: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });

  const DisplayMessage = (text, type = 'success') => {
    const options = {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: { marginTop: "10px" },
    };

    if (type === 'success') toast.success(text, options);
    else toast.error(text, options);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhone = () => {
    if (!/^\d{10}$/.test(formInput.phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { role, name, email, phone, password, confirm_password } = formInput;

    if (!role || !name || !email || !phone || !password || !confirm_password) {
      DisplayMessage('Please fill all fields', 'error');
      return;
    }

    if (!validateEmail(email)) {
      DisplayMessage('Please enter a valid email address', 'error');
      return;
    }

    if (password !== confirm_password) {
      DisplayMessage('Passwords do not match', 'error');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, formInput, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        DisplayMessage('SignUp successful!');
        navigate('/login');
      } else {
        DisplayMessage(response.data.message, 'error');
      }
      setMessage(response.data.message);
    } catch (error) {
      DisplayMessage('An error has occurred!', 'error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600">Sign Up for Recycle Hub</h2>
        {message && <p className="text-red-500 text-sm text-center">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              onChange={handleInput}
              value={formInput.role}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="customer">Customer</option>
              <option value="dealer">Dealer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleInput}
              value={formInput.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleInput}
              value={formInput.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Mobile Number Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="number"
              name="phone"
              onChange={handleInput}
              value={formInput.phone}
              onBlur={validatePhone} // Validate on blur
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your mobile number"
              required
            />
            {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleInput}
              value={formInput.password}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              onChange={handleInput}
              value={formInput.confirm_password}
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








