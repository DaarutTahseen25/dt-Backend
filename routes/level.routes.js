import express from "express";
import {
  registerLevel,
  getUserLevel,
  updateLevel,
  getAllLevels
} from "../controllers/level.controller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get('/available', getAllLevels);

// Protected routes (require authentication)
router.post('/register', authenticateToken, registerLevel);
router.get('/my-level', authenticateToken, getUserLevel);
router.put('/update', authenticateToken, updateLevel);

export default router;