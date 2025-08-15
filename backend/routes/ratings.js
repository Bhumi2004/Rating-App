import express from "express";
import { submitRating, getStoreRatings } from "../controllers/ratingController.js";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Submit or update rating (normal users only)
router.post("/", authMiddleware, roleMiddleware("user"), submitRating);

// Get all ratings for a store (admin or owner)
router.get("/:storeId", authMiddleware, roleMiddleware("admin", "owner"), getStoreRatings);

export default router;

