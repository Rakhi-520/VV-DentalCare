
import express from 'express';
import serviceRoutes from './service.routes.js';
import doctorRoutes from './doctor.routes.js';
import appointmentRoutes from './appointment.routes.js';
import paymentRoutes from './payment.routes.js';

const router = express.Router();
router.use('/services', serviceRoutes);
router.use('/doctors', doctorRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/payments', paymentRoutes); 


router.get('/health', (req, res) => {
  res.json({ status: 'Backend API running' });
});

export default router;
