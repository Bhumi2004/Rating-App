import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 20, maxlength: 60 },
  email: { type: String, required: true, unique: true },
  address: { type: String, maxlength: 400 },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["admin", "user", "owner"], default: "user" }
});

export default mongoose.model("User", userSchema);
