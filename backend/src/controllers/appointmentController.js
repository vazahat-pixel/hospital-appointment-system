import Appointment from '../models/Appointment.js';

export const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, reason } = req.body;
    if (!doctorId || !date) return res.status(400).json({ message: 'doctorId and date required' });
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      date,
      reason
    });
    res.status(201).json(appointment);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const roleField = req.user.role === 'doctor' ? 'doctor' : 'patient';
    const query = {};
    query[roleField] = req.user._id;
    const appts = await Appointment.find(query)
      .populate('doctor', 'name email specialization')
      .populate('patient', 'name email')
      .sort({ createdAt: -1 });
    res.json(appts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appt = await Appointment.findById(id);
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    const isOwner = String(appt.patient) === String(req.user._id) || String(appt.doctor) === String(req.user._id);
    if (!isOwner) return res.status(403).json({ message: 'Not allowed to cancel' });
    appt.status = 'cancelled';
    await appt.save();
    res.json({ message: 'Appointment cancelled', appointment: appt });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};