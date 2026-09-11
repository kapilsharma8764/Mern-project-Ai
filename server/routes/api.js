import { Router } from 'express';
import { isDbConnected } from '../config/db.js';
import Subscriber from '../models/Subscriber.js';

const router = Router();

const memoryStore = [];

router.get('/health', (req, res) => {
  res.json({ status: 'ok', db: isDbConnected() ? 'mongodb' : 'in-memory' });
});

router.get('/templates', (req, res) => {
  res.json({
    templates: [
      { id: 'sure-thing-chapel', name: 'Sure Thing Chapel', category: 'Events', image: '/assets/images/showcase-1.png' },
      { id: 'thread-caravan', name: 'Thread Caravan', category: 'Retail', image: '/assets/images/showcase-2.png' },
      { id: 'black-girl-blue-world', name: 'Black Girl, Blue World', category: 'Community', image: '/assets/images/showcase-3.png' },
      { id: 'sure-thing-chapel-desktop', name: 'Sure Thing Chapel — Desktop', category: 'Events', image: '/assets/images/showcase-4.png' },
    ],
  });
});

router.post('/subscribe', async (req, res) => {
  const { email } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }

  try {
    if (isDbConnected()) {
      const existing = await Subscriber.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.status(200).json({ message: 'You are already subscribed.' });
      }
      await Subscriber.create({ email });
    } else {
      if (memoryStore.includes(email.toLowerCase())) {
        return res.status(200).json({ message: 'You are already subscribed.' });
      }
      memoryStore.push(email.toLowerCase());
    }
    res.status(201).json({ message: 'Subscribed successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Could not subscribe right now.' });
  }
});

export default router;
