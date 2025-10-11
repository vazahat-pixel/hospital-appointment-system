import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reason: { type: String },
  date: { type: Date, required: true },
  status: { type: String, enum: ['scheduled', 'cancelled', 'completed'], default: 'scheduled' }
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);