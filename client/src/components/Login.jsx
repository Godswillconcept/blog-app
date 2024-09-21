/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom to use for navigation

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError('Email and password are required');
        return;
      }
      
      await onLogin(email, password);
      setError('');
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login failed:', error.response ? error.response.data.error : error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h1>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-6">{error}</p>}
        <div className="space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Email:</label>
            <input
              className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="text-gray-700 font-medium">Password:</label>
            <input
              className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button
          className="w-full mt-6 p-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="mt-4 text-center">
          New here? <Link to="/register" className="text-red-500 hover:text-red-600">Register</Link> for an account.
        </p>
      </div>
    </div>
  );
}

export default Login;
