import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
import studentRoutes from './routes/studentRoutes.js';

// Use routes
app.use('/api/students', studentRoutes);

// Add other routes here as needed

export default app;  // ← Make sure this line is present!