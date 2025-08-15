import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./StoresPage.css";

export default function StoresPage() {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await API.get("/stores");
        setStores(res.data);
        setFilteredStores(res.data);
      } catch (err) {
        alert("Error fetching stores");
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  // Filter stores whenever search changes
  useEffect(() => {
    const filtered = stores.filter((store) =>
      (store.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (store.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (store.address || "").toLowerCase().includes(search.toLowerCase()) ||
      (store.avgRating !== undefined && String(store.avgRating).includes(search))
    );
    setFilteredStores(filtered);
  }, [search, stores]);

  if (loading) return <p>Loading stores...</p>;

  return (
    <div>
      <h2 id="store-heading">Stores List</h2>

      <input
        type="text"
        placeholder="Search by Name, Email, Address or Rating"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "100%",
          marginBottom: "15px",
          boxSizing: "border-box"
        }}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <tr key={store._id}>
                <td data-label="Name">{store.name}</td>
                <td data-label="Email">{store.email}</td>
                <td data-label="Address">{store.address}</td>
                <td data-label="Rating">{store.avgRating || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No stores found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
