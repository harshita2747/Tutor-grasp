import mongoose from 'mongoose';


const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  className: {  // className
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  school: {  // school field
    type: String, 
    required: true 
  },
  schoolFees: { 
    type: Number, 
    required: true 
  },
  feesStatus: {  //  feesStatus field
    type: String,
    enum: ['Paid', 'Pending'],
    default: 'Pending'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('Student', studentSchema);