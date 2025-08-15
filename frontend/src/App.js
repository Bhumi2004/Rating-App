import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stores from "./pages/Stores";
import CreateStore from "./pages/CreateStore";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddUser from "./pages/AdminAddUser";
import UpdatePassword from "./pages/UpdatePassword";
import Home from "./pages/Home";
import UsersPage from "./pages/UsersPage";
import StoresPage from "./pages/StoresPage";
import RatingsPage from "./pages/RatingsPage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
  <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path="/stores" element={<Stores />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
          <Route path="/create-store" element={<CreateStore />} />
          <Route path="/owner" element={<OwnerDashboard />} />
        </Route>
 <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/stores" element={<StoresPage />} />
        <Route path="/admin/ratings" element={<RatingsPage />} />
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
    <Route path="/admin/add-user" element={<AdminAddUser />} />
</Route>

<Route path="/update-password" element={<UpdatePassword />} />


      </Routes>
      
    </Router>
  );
}


