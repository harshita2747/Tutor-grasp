import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes.js'; 
import dashboardRoutes from './routes/dashboardRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/students', studentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/attendance', attendanceRoutes);



export default app;  