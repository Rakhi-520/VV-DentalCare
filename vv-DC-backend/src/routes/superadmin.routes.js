import { Router } from 'express';
import Tenant from '../multitenancy/models/Tenant.js';
import { requireRole } from '../multitenancy/middleware/requireRole.js';

const router = Router();

// Create tenant
router.post('/tenants', requireRole('SuperAdmin'), async (req, res, next) => {
  try {
    const t = await Tenant.create(req.body);
    res.status(201).json(t);
  } catch (e) { next(e); }
});

// List tenants
router.get('/tenants', requireRole('SuperAdmin'), async (req, res, next) => {
  try {
    const items = await Tenant.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (e) { next(e); }
});

// Update tenant
router.patch('/tenants/:id', requireRole('SuperAdmin'), async (req, res, next) => {
  try {
    const t = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(t);
  } catch (e) { next(e); }
});

// Suspend/activate
router.post('/tenants/:id/:action(suspend|activate)', requireRole('SuperAdmin'), async (req, res, next) => {
  try {
    const status = req.params.action === 'suspend' ? 'suspended' : 'active';
    const t = await Tenant.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(t);
  } catch (e) { next(e); }
});

export default router;