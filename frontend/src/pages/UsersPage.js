import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./UsersPage.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/admin/users");
        setUsers(res.data);
        setFilteredUsers(res.data);
      } catch (err) {
        alert("Error fetching users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

 
 useEffect(() => {
  const filtered = users.filter((user) =>
    (user.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (user.email || "").toLowerCase().includes(search.toLowerCase()) ||
    (user.address || "").toLowerCase().includes(search.toLowerCase()) ||
    (user.role || "").toLowerCase().includes(search.toLowerCase())
  );
  setFilteredUsers(filtered);
}, [search, users]);


  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2 id="users-heading">Users List</h2>


      <input
        type="text"
        placeholder="Search by Name, Email, Address or Role"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "15px", boxSizing: "border-box" }}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td data-label="Name">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Address">{user.address}</td>
                <td data-label="Role">{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
