import express from 'express';
import axios from 'axios';
const router = express.Router();

console.log('Loaded API key:', process.env.WEATHER_API_KEY);

const API_KEY = process.env.WEATHER_API_KEY || null;



router.get('/', async (req, res) => {
const city = (req.query.city || '').trim();
if (!city) return res.status(400).json({ error: 'city query param required' });


try {
if (!API_KEY) {
// mock fallback
return res.json({ source: 'mock', data: { city, temp_c: 28.5, description: 'Partly cloudy', humidity: 55 } });
}


const url = 'https://api.openweathermap.org/data/2.5/weather';
const resp = await axios.get(url, { params: { q: city, appid: API_KEY, units: 'metric' } });
const d = resp.data;
const out = {
source: 'openweathermap',
data: {
city: d.name,
temp_c: d.main.temp,
description: d.weather?.[0]?.description || '',
humidity: d.main.humidity
}
};
res.json(out);
} catch (err) {
if (err.response && err.response.status === 404) {
res.status(404).json({ error: 'City not found' });
} else {
console.error('Weather error', err.message || err);
res.status(500).json({ error: 'Failed to fetch weather' });
}
}
});


export default router;