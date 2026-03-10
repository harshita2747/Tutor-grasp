import express from 'express';
import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';

const router = express.Router();

router.post('/mark', async (req, res) => {
  try {
    const { studentId, status } = req.body;

    const today = new Date().toISOString().split('T')[0];

    const existing = await Attendance.findOne({
      student: studentId,
      date: today
    });

    if (existing) {
      existing.status = status;
      await existing.save();
      return res.json(existing);
    }

    const attendance = new Attendance({
      student: studentId,
      date: today,
      status
    });

    await attendance.save();
    res.status(201).json(attendance);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/summary', async (req, res) => {
  try {
    const totalClasses = await Attendance.distinct('date').then(d => d.length);

    const summary = await Attendance.aggregate([
      {
        $group: {
          _id: '$student',
          attended: {
            $sum: {
              $cond: [{ $eq: ['$status', 'Present'] }, 1, 0]
            }
          }
        }
      }
    ]);

    const students = await Student.find();

    const result = students.map(student => {
      const record = summary.find(
        s => s._id.toString() === student._id.toString()
      );

      return {
        studentId: student._id,
        name: student.name,
        attended: record?.attended || 0,
        totalClasses
      };
    });

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;