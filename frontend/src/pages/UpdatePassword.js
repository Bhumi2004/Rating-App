import React from "react";
import { useForm } from "react-hook-form";
import API from "../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./UpdatePassword.css"; // import CSS

const schema = yup.object({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, "Must include uppercase & special char")
    .min(8, "Min 8 chars")
    .max(16, "Max 16 chars")
    .required("New password is required"),
});

export default function UpdatePassword() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await API.put("/auth/update-password", data);
      alert("✅ Password updated successfully!");
      reset();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className="update-password-container">
      <div className="update-password-card">
        <h2>Update Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="password"
            {...register("oldPassword")}
            placeholder="Old Password"
          />
          <p>{errors.oldPassword?.message}</p>

          <input
            type="password"
            {...register("newPassword")}
            placeholder="New Password"
          />
          <p>{errors.newPassword?.message}</p>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
