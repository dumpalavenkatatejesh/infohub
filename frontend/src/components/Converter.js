import React, { useState } from 'react';
import { convertCurrency } from '../api';

export default function Converter() {
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('USD');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    setError('');
    setResult(null);

    const n = Number(amount);
    if (!n || n <= 0) {
      setError('Enter a valid positive amount');
      return;
    }

    setLoading(true);
    try {
      const data = await convertCurrency(n, to);
      // Expect backend shape: { source, from, to, amount, result }
      if (data?.result !== undefined && data?.result !== null) {
        setResult(data.result);
      } else {
        setError('Conversion returned unexpected response');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Currency Converter</h2>

      <div className="row">
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="INR amount" />
        <select value={to} onChange={e => setTo(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <button onClick={handleConvert} disabled={loading}>{loading ? 'Converting...' : `Convert to ${to}`}</button>
      </div>

      {error && <div className="error">{error}</div>}

      {result !== null && <div className="card" style={{marginTop:12}}>
        <strong>{Number(result).toFixed(2)} {to}</strong>
      </div>}
    </div>
  );
}
