// src/pages/Login.js
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // new CSS

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "owner") navigate("/owner");
      else navigate("/stores");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("email")} placeholder="Email" />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input type="password" {...register("password")} placeholder="Password" />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

