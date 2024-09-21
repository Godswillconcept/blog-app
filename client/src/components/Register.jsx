import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3001/register", {
        username,
        email,
        phone,
        password,
        gender,
      });

      // Assuming the registration endpoint returns a token upon successful registration
      const registerUser = response.data;
      if (response.data) {
        console.log("New User registered", registerUser);
        setEmail("");
        setUsername("");
        setGender("");
        setPhone("");
        setPassword("");
        navigate("/posts");
      }

      setError("");
    } catch (error) {
      setError("Registration failed");
      console.error(
        "Registration failed:",
        error.response ? error.response.data.error : error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Register
        </h1>
        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-6">{error}</p>
        )}
        <div className="space-y-4">
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Phone Number"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Gender:
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setGender(e.target.value)}
              defaultValue=""
              value={gender}
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <button
            className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
            onClick={handleRegister}
          >
            Register
          </button>
          <p className="mt-4 text-center">
            Already a member?{" "}
            <Link to="/login" className="text-red-500 hover:text-red-600">
              Login
            </Link>{" "}
            to continue.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
