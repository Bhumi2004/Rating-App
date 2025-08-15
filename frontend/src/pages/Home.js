import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const role = localStorage.getItem("role");

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Store Rating App</h1>
        <p>Rate your favorite stores, manage your own business, or explore as a guest!</p>

        {!role ? (
          <div className="home-buttons">
            <Link to="/login" className="btn btn-login">Login</Link>
            <Link to="/signup" className="btn btn-signup">Signup</Link>
          </div>
        ) : (
          <div className="home-buttons">
            {role === "admin" && <Link to="/admin" className="btn btn-dashboard">Go to Admin Dashboard</Link>}
            {role === "owner" && <Link to="/owner" className="btn btn-dashboard">Go to Owner Dashboard</Link>}
            {role === "user" && <Link to="/stores" className="btn btn-dashboard">Explore Stores</Link>}
          </div>
        )}
      </div>
    </div>
  );
}

