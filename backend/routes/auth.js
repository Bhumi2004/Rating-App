import express from "express";
import { signup, login } from "../controllers/authController.js";
import { updatePassword } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.put("/update-password", authMiddleware, updatePassword);

export default router;
