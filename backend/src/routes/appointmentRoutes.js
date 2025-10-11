import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createAppointment, getMyAppointments, cancelAppointment } from '../controllers/appointmentController.js';
const router = Router();
router.post('/', protect, createAppointment);
router.get('/mine', protect, getMyAppointments);
router.patch('/:id/cancel', protect, cancelAppointment);
export default router;