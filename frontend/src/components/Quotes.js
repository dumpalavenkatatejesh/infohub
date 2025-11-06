import React, { useState } from 'react';
import { getQuote } from '../api';
import '../App.css';

export default function Quotes() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await getQuote();
      setQuote(res.quote);
      setAuthor(res.author);
    } catch (err) {
      setQuote('Failed to load quote');
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>💬 Motivational Quote</h2>
      <button onClick={fetchQuote}>Get Quote</button>

      {loading && <p>Loading...</p>}
      {quote && (
        <blockquote style={{ marginTop: '10px' }}>
          “{quote}”
          <footer style={{ fontSize: '0.9em', color: '#555' }}>— {author}</footer>
        </blockquote>
      )}
    </div>
  );
}
