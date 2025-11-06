import React, { useState } from 'react';
import { getWeather } from '../api';
import '../App.css';

export default function Weather() {
  const [city, setCity] = useState('Delhi');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const result = await getWeather(city);
      setData(result.data); 
    } catch (err) {
      setError('❌ Failed to fetch weather. Try again.');
      setData(null);
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>🌦️ Weather Info</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Get Weather</button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="result">
          <h3>{data.city}</h3>
          <p>Temperature: {data.temp_c}°C</p>
          <p>Condition: {data.description}</p>
          <p>Humidity: {data.humidity}%</p>
        </div>
      )}
    </div>
  );
}
