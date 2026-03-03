import express from 'express';
import Student from '../models/Student.js';
import Attendance from '../models/Attendance.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log("1. Starting dashboard route");
    const totalStudents = await Student.countDocuments();
    console.log("2. totalStudents:", totalStudents);

    const pendingStudents = await Student.countDocuments({ feesStatus: 'Pending' });
    console.log("3. pendingStudents:", pendingStudents);

    const totalFeesResult = await Student.aggregate([
      { $group: { _id: null, total: { $sum: '$schoolFees' } } }
    ]);
    console.log("4. totalFees done");

    const totalFees = totalFeesResult[0]?.total || 0;

    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    console.log("5. dateString:", dateString);

    const presentToday = await Attendance.countDocuments({ date: dateString, status: 'Present' });
    console.log("6. presentToday:", presentToday);

    const absentToday = await Attendance.countDocuments({ date: dateString, status: 'Absent' });
    console.log("7. absentToday:", absentToday);

    res.json({ totalStudents, pendingStudents, totalFees, presentToday, absentToday });

  } catch (error) {
    console.error("❌ Crashed at step:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;