import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./StoresPage.css";
export default function RatingsPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await API.get("/stores");
        setStores(res.data);
      } catch (err) {
        alert("Error fetching ratings");
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  if (loading) return <p>Loading ratings...</p>;

  return (
    <div>
      <h2 id="store-heading">Store Ratings</h2>
      <table>
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store._id}>
              <td>{store.name}</td>
              <td>{store.avgRating || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
