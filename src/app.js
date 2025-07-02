import express from 'express';
import homeRoutes from './routes/homeRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js'

const app = express();

app.use(express.json());

app.use('/', homeRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes)

//middlewares
app.use(errorHandler)

export default app;
