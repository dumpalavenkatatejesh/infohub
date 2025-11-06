import express from 'express';
import axios from 'axios';
const router = express.Router();

// GET /api/quote
router.get('/', async (req, res) => {
  try {
    const url = 'https://zenquotes.io/api/quotes';
    const resp = await axios.get(url, { timeout: 3000 });
    const arr = Array.isArray(resp.data) ? resp.data : [];
    if (!arr.length) throw new Error('No quotes');
    const q = arr[Math.floor(Math.random() * arr.length)];
    res.json({ 
      source: 'zenquotes.io', 
      quote: q.q, 
      author: q.a || 'Unknown' 
    });
  } catch (err) {
    console.error('Quotes error', err.message || err);
    const fallback = [
      { text: 'Do one thing every day that scares you.', author: 'Eleanor Roosevelt' },
      { text: 'Act as if what you do makes a difference. It does.', author: 'William James' },
      { text: 'Success is not final; failure is not fatal.', author: 'Winston Churchill' }
    ];
    const q = fallback[Math.floor(Math.random() * fallback.length)];
    res.json({ source: 'mock', quote: q.text, author: q.author });
  }
});

export default router;
