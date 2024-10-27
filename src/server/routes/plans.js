import express from 'express';
import db from '../db/init.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all plans
router.get('/', async (req, res) => {
  try {
    const plans = db.prepare('SELECT * FROM plans').all();
    res.json(plans.map(plan => ({
      ...plan,
      features: JSON.parse(plan.features)
    })));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching plans' });
  }
});

// Get single plan
router.get('/:id', async (req, res) => {
  try {
    const plan = db.prepare('SELECT * FROM plans WHERE id = ?').get(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    
    res.json({
      ...plan,
      features: JSON.parse(plan.features)
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching plan' });
  }
});

export default router;