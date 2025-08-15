import express from "express";
import {
  getAdminDashboard,
  getUsersList,
  getStoresList,
  createUser 
} from "../controllers/adminController.js";

import { authMiddleware, roleMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, roleMiddleware("admin"), getAdminDashboard);
router.get("/users", authMiddleware, roleMiddleware("admin"), getUsersList);
router.get("/stores", authMiddleware, roleMiddleware("admin"), getStoresList);
router.post("/users", authMiddleware, roleMiddleware("admin"), createUser);

export default router;
