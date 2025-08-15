import express from "express";
import { createStore, getStores } from "../controllers/storeController.js";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";
import { getOwnerStore } from "../controllers/storeController.js";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("admin", "owner"), createStore);

router.get("/", authMiddleware, getStores);

router.get("/owner", authMiddleware, roleMiddleware("owner"), getOwnerStore);

export default router;
