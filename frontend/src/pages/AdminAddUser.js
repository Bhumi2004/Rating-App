import React from "react";
import { useForm } from "react-hook-form";
import API from "../services/api";
import "./AdminAddUser.css";

export default function AdminAddUser() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/admin/users", data);
      alert(res.data.message);
      reset();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating store owner");
    }
  };

  return (
    <div className="add-user-container">
      <h2>➕ Create Store Owner</h2>
      <form className="add-user-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name")}
          placeholder="Owner Full Name"
          required
        />
        <input
          {...register("email")}
          type="email"
          placeholder="Owner Email"
          required
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Create Owner</button>
      </form>
    </div>
  );
}
