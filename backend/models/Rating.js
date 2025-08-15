import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
  rating: { type: Number, min: 1, max: 5, required: true }
});

export default mongoose.model("Rating", ratingSchema);

