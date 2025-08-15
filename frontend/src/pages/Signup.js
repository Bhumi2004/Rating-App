// src/pages/Signup.js
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // reuse the login styles

const schema = yup.object({
  name: yup.string().min(20, "Min 20 chars").max(60, "Max 60 chars").required(),
  email: yup.string().email("Invalid email").required(),
  address: yup.string().max(400, "Max 400 chars").required(),
  password: yup
    .string()
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, "Must include uppercase & special char")
    .min(8)
    .max(16)
    .required(),
});

export default function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await API.post("/auth/signup", data);
      alert("Signup successful, please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} placeholder="Full Name" />
          {errors.name && <p className="error">{errors.name.message}</p>}

          <input {...register("email")} placeholder="Email" />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input {...register("address")} placeholder="Address" />
          {errors.address && <p className="error">{errors.address.message}</p>}

          <input type="password" {...register("password")} placeholder="Password" />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}
