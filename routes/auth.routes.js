import express from "express";
import {
  register,
  verifyOtp,
  resendOtp,
  login,
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  getUserById,
  updateUserStatus,
  deleteUser,
} from "../controllers/auth.controller.js";
import {
  authenticateToken,
  requireAdmin
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/login', login);

// Protected routes (require authentication)
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.put('/change-password', authenticateToken, changePassword);

// Admin only routes
router.get('/users', authenticateToken, requireAdmin, getAllUsers);
router.get('/users/:id', authenticateToken, requireAdmin, getUserById);
router.put('/users/:id/status', authenticateToken, requireAdmin, updateUserStatus);
router.delete('/users/:id', authenticateToken, requireAdmin, deleteUser);

export default router;