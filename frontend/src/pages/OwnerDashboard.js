// src/pages/OwnerDashboard.js
import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./OwnerDashboard.css";

export default function OwnerDashboard() {
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOwnerStore = async () => {
    try {
      setLoading(true);
      const res = await API.get("/stores/owner");
      setStoreData(res.data);
    } catch (err) {
      setStoreData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerStore();
  }, []);

  if (loading) return <p className="loading">Loading dashboard...</p>;

  if (!storeData) {
    return (
      <div className="dashboard-container">
        <h2>Owner Dashboard</h2>
        <p>No store found for your account.</p>
        <Link to="/create-store" className="btn-primary">Create Store</Link>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>Owner Dashboard</h2>

      <div className="store-card">
        <p><strong>Name:</strong> {storeData.store.name}</p>
        <p><strong>Email:</strong> {storeData.store.email}</p>
        <p><strong>Address:</strong> {storeData.store.address}</p>
        <p><strong>Average Rating:</strong> ⭐ {storeData.avgRating}</p>
      </div>

      <h3>Rated Users</h3>
      {storeData.ratedUsers.length === 0 ? (
        <p>No ratings yet.</p>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {storeData.ratedUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>⭐ {user.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
