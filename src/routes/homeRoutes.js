import { Router } from 'express';
import { home } from '../controllers/homeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/', authMiddleware, home);

export default router;
