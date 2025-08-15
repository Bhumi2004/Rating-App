
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">⭐ Rating App</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        {role === "user" && <Link to="/stores">Stores</Link>}

        {role === "owner" && (
          <>
            <Link to="/create-store">Create Store</Link>
            <Link to="/owner">Owner Dashboard</Link>
          </>
        )}

        {role === "admin" && <Link to="/admin">Admin Dashboard</Link>}

        {role && (
          <>
            <Link to="/update-password" className="update-pass-link">
              Update Password
            </Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}

        {!role && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

