import express from 'express';
import axios from 'axios';
const router = express.Router();

// GET /api/convert?from=INR&to=USD&amount=1000
router.get('/', async (req, res) => {
  const from = (req.query.from || 'INR').toUpperCase();
  const to = (req.query.to || 'USD').toUpperCase();
  const amount = parseFloat(req.query.amount);
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number' });
  }

  try {
    const url = `https://api.exchangerate.host/convert`;
    const resp = await axios.get(url, { params: { from, to, amount } });
    if (resp.data && resp.data.result != null) {
      return res.json({
        source: 'exchangerate.host',
        from,
        to,
        amount,
        result: resp.data.result,
      });
    } else {
      return res.json({
        source: 'mock',
        from,
        to,
        amount,
        result: amount * (to === 'USD' ? 0.012 : 0.011),
      });
    }
  } catch (err) {
    console.error('Conversion error', err.message || err);
    return res.status(500).json({ error: 'Failed to convert currency' });
  }
});

export default router;
