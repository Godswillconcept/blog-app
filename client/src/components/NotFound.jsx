
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">404 - Page Not Found</h1>
        <p className="mb-6 text-gray-600">The page you are looking for does not exist or has moved.</p>
        <button
          onClick={redirectToHome}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}

export default NotFound;
