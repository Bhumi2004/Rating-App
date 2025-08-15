import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./Stores.css"; 

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingValue, setRatingValue] = useState({});
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await API.get("/stores");
      setStores(res.data);
    } catch (err) {
      alert("Error fetching stores");
    } finally {
      setLoading(false);
    }
  };

  const submitRating = async (storeId) => {
    try {
      const res = await API.post("/ratings", {
        storeId,
        rating: Number(ratingValue[storeId]),
      });
      alert(res.data.message || "Rating submitted");
      fetchStores();
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting rating");
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // Filter stores by search
  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase())
  );

  // Sort stores by name ascending or descending
  const sortedStores = filteredStores.sort((a, b) => {
    if (sortAsc) return a.name.localeCompare(b.name);
    else return b.name.localeCompare(a.name);
  });

  if (loading) return <p>Loading stores...</p>;

  return (
    <div className="stores-container">
      <h2>Stores List</h2>
      <div className="controls">
        <input
          placeholder="Search by name or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSortAsc(!sortAsc)}>
          Sort {sortAsc ? "Descending" : "Ascending"}
        </button>
      </div>
      {sortedStores.length === 0 ? (
        <p>No stores found</p>
      ) : (
        <table className="stores-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Average Rating</th>
              <th>My Rating</th>
              <th>Submit Rating</th>
            </tr>
          </thead>
          <tbody>
            {sortedStores.map((store) => (
              <tr key={store._id}>
                <td>{store.name}</td>
                <td>{store.email}</td>
                <td>{store.address}</td>
                <td>{store.avgRating}</td>
                <td>{store.myRating || "N/A"}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={ratingValue[store._id] || ""}
                    onChange={(e) =>
                      setRatingValue({ ...ratingValue, [store._id]: e.target.value })
                    }
                  />
                  <button onClick={() => submitRating(store._id)}>Submit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
