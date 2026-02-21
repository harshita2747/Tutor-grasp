import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes.js'; //import Routes
import dashboardRoutes from './routes/dashboardRoutes.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/students', studentRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Add other routes here as needed

export default app;  // ← Make sure this line is present!