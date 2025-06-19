import { Router } from 'express';
import { getAllStudents } from '../controllers/studentController.js';

const router = Router();

router.get('/', getAllStudents);

export default router;
