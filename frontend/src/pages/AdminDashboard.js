import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [data, setData] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/dashboard");
      setData(res.data);
    } catch (err) {
      alert("Error fetching admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  if (loading) return <p className="loading-text">Loading dashboard...</p>;

  return (
    <div className="admin-dashboard">
      <h2>📊 Admin Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card" onClick={() => navigate("/admin/users")}>
          <h3>{data.totalUsers}</h3>
          <p>Total Users</p>
        </div>
        <div className="stat-card" onClick={() => navigate("/admin/stores")}>
          <h3>{data.totalStores}</h3>
          <p>Total Stores</p>
        </div>
        <div className="stat-card" onClick={() => navigate("/admin/ratings")}>
          <h3>{data.totalRatings}</h3>
          <p>Total Ratings</p>
        </div>
      </div>

      <div className="admin-actions">
        <Link to="/admin/add-user" className="action-button">
          ➕ Create Store Owner
        </Link>
      </div>
    </div>
  );
}
