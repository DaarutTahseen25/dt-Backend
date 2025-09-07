import express from "express";
import {
  getTest,
  submitTest,
  getTestHistory,
  getTestDetails,
  getLevelStats,
  seedTestQuestions
} from "../controllers/test.controller.js";
import {
  authenticateToken,
  requireAdmin
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes (require authentication)
router.get('/questions', authenticateToken, getTest);
router.post('/submit', authenticateToken, submitTest);
router.get('/history', authenticateToken, getTestHistory);
router.get('/submission/:submissionId', authenticateToken, getTestDetails);

// Public routes for statistics
router.get('/stats/:level', getLevelStats);

// Admin only routes
router.post('/seed-questions', authenticateToken, requireAdmin, seedTestQuestions);

export default router;