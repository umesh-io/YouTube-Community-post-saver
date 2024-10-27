import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'database.sqlite'));

export function initializeDatabase() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Plans table
  db.exec(`
    CREATE TABLE IF NOT EXISTS plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      features TEXT NOT NULL,
      stripe_price_id TEXT
    )
  `);

  // Subscriptions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      plan_id INTEGER NOT NULL,
      status TEXT NOT NULL,
      current_period_end DATETIME,
      stripe_subscription_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (plan_id) REFERENCES plans (id)
    )
  `);

  // Insert default plans if they don't exist
  const existingPlans = db.prepare('SELECT COUNT(*) as count FROM plans').get();
  
  if (existingPlans.count === 0) {
    const plans = [
      {
        name: 'Starter',
        price: 49,
        features: JSON.stringify([
          '1 AI SaaS Template',
          'Basic Customization',
          'Community Support',
          '1 Month Updates'
        ])
      },
      {
        name: 'Pro',
        price: 99,
        features: JSON.stringify([
          '3 AI SaaS Templates',
          'Advanced Customization',
          'Priority Support',
          '6 Months Updates',
          'API Access'
        ])
      },
      {
        name: 'Enterprise',
        price: 0, // Custom pricing
        features: JSON.stringify([
          'Unlimited Templates',
          'Full Customization',
          'Dedicated Support',
          'Lifetime Updates',
          'White-labeling'
        ])
      }
    ];

    const insertPlan = db.prepare(
      'INSERT INTO plans (name, price, features) VALUES (@name, @price, @features)'
    );

    plans.forEach(plan => insertPlan.run(plan));
  }
}

export default db;