import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import BlogPosts from "./components/BlogPosts";
import CreatePost from "./components/CreatePost";
import NotFound from "./components/NotFound";
import EditPost from "./components/EditPost";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  // const [loggedIn, setLoggedIn] = useState(false);
  const baseRedColor = "bg-red-500";
  const lightRedColor = "bg-red-100";
  const darkRedText = "text-red-700";

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    // withCredentials: true,
    headers: {
      Authorization: token ? token : "",
    },
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get("/user/detail");
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch user details:",
          error.response ? error.response.data.error : error.message
        );
      }
    };

    if (token) {
      fetchUserDetails();
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      setToken(response.data.token);
      // setLoggedIn(true);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data.error : error.message
      );
    }
  };

  const handleLogout = async () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  const navStyle = `p-2 ${baseRedColor} text-white flex gap-4`;
  const linkStyle = `text-white hover:underline rounded p-2 focus:outline-none focus:ring-2 focus:ring-white`;

  return (
    <Router>
      <div className="font-poppins">
        <nav className={navStyle}>
          <ul className="flex">
            <li>
              <Link to="/" className={linkStyle}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/posts" className={linkStyle}>
                Blog Posts
              </Link>
            </li>
            {token ? (
              <>
                <li>
                  <Link to="/create-post" className={linkStyle}>
                    Create Post
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className={`p-2 rounded ${lightRedColor} ${darkRedText} focus:outline-none focus:ring-2 focus:ring-red-300`}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className={linkStyle}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/posts" />
              ) : (
                <div className="text-center my-4">Welcome to the Homepage</div>
              )
            }
          />

          <Route
            path="/posts"
            element={<BlogPosts axiosInstance={axiosInstance} user={user} />}
          />
          <Route
            path="/create-post"
            element={
              token ? (
                <CreatePost axiosInstance={axiosInstance} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/posts/:id?/edit-post"
            element={
              token ? (
                <EditPost axiosInstance={axiosInstance} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/login"
            element={
              token ? <Navigate to="/posts" /> : <Login onLogin={handleLogin} />
            }
          />

          <Route
            path="/register"
            element={token ? <Navigate to="/posts" /> : <Register />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
