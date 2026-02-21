import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    const paidStudents = await Student.countDocuments({
      feesStatus: 'Paid'
    });

    const pendingStudents = await Student.countDocuments({
      feesStatus: 'Pending'
    });

    const totalFeesResult = await Student.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$schoolFees' }
        }
      }
    ]);

    const totalFees = totalFeesResult[0]?.total || 0;

    res.json({
      totalStudents,
      paidStudents,
      pendingStudents,
      totalFees
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
