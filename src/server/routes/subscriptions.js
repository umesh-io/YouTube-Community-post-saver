import express from 'express';
import Stripe from 'stripe';
import db from '../db/init.js';
import { authenticateToken } from '../middleware/auth.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Get user's subscription
router.get('/my-subscription', authenticateToken, (req, res) => {
  try {
    const subscription = db.prepare(`
      SELECT s.*, p.name as plan_name, p.price as plan_price
      FROM subscriptions s
      JOIN plans p ON s.plan_id = p.id
      WHERE s.user_id = ? AND s.status = 'active'
      ORDER BY s.created_at DESC
      LIMIT 1
    `).get(req.user.userId);

    res.json(subscription || null);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching subscription' });
  }
});

// Create checkout session
router.post('/create-checkout-session', authenticateToken, async (req, res) => {
  try {
    const { planId } = req.body;

    const plan = db.prepare('SELECT * FROM plans WHERE id = ?').get(planId);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    // Create or get Stripe price
    let priceId = plan.stripe_price_id;
    if (!priceId) {
      const price = await stripe.prices.create({
        unit_amount: plan.price * 100,
        currency: 'usd',
        recurring: { interval: 'month' },
        product_data: {
          name: plan.name,
          description: `${plan.name} Plan - Monthly Subscription`
        }
      });
      priceId = price.id;

      // Save Stripe price ID
      db.prepare('UPDATE plans SET stripe_price_id = ? WHERE id = ?')
        .run(priceId, plan.id);
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/pricing`,
      customer_email: req.user.email,
      metadata: {
        userId: req.user.userId,
        planId: plan.id
      }
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: 'Error creating checkout session' });
  }
});

// Handle webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Create subscription record
        db.prepare(`
          INSERT INTO subscriptions (
            user_id, plan_id, status, stripe_subscription_id, current_period_end
          ) VALUES (?, ?, ?, ?, datetime(?))
        `).run(
          session.metadata.userId,
          session.metadata.planId,
          'active',
          session.subscription,
          new Date(session.current_period_end * 1000).toISOString()
        );
        break;
      }
      
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        
        // Update subscription status
        db.prepare(`
          UPDATE subscriptions 
          SET status = ?, current_period_end = datetime(?)
          WHERE stripe_subscription_id = ?
        `).run(
          subscription.status,
          new Date(subscription.current_period_end * 1000).toISOString(),
          subscription.id
        );
        break;
      }
    }

    res.json({ received: true });
  } catch (error) {
    res.status(400).json({ error: 'Webhook error' });
  }
});

export default router;