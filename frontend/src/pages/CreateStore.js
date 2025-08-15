// src/pages/CreateStore.js
import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./CreateStore.css";

export default function CreateStore() {
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/stores", form);
      alert("✅ Store created successfully!");
      navigate("/owner");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating store");
    }
  };

  return (
    <div className="create-store-container">
      <h2>Create Store</h2>
      <form className="create-store-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Store Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Store Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Store Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-primary">
          Create Store
        </button>
      </form>
    </div>
  );
}

