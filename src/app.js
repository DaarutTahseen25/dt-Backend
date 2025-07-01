import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
import homeRoutes from './routes/homeRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

const app = express();

app.use(express.json());

app.use('/', homeRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/health', healthRoutes);

//middlewares
app.use(errorHandler)

export default app;
