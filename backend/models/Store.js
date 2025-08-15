import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  address: { type: String, maxlength: 400 },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Store", storeSchema);
