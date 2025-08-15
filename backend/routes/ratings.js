import express from "express";
import { submitRating, getStoreRatings } from "../controllers/ratingController.js";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";

const router = express.Router();


router.post("/", authMiddleware, roleMiddleware("user"), submitRating);


router.get("/:storeId", authMiddleware, roleMiddleware("admin", "owner"), getStoreRatings);

export default router;

