import express from "express";
import { getOwnerDashboard } from "../controllers/ownerController.js";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Owner dashboard
router.get("/dashboard", authMiddleware, roleMiddleware("owner"), getOwnerDashboard);

export default router;
