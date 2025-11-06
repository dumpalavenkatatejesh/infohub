import axios from 'axios';

// backend base URL — change to your Render/Vercel backend URL after deploy
const BASE_URL = 'http://localhost:5000/api';

export const getWeather = async (city) => {
  const res = await axios.get(`${BASE_URL}/weather?city=${city}`);
  return res.data;
};

export const convertCurrency = async (amount, to) => {
  const res = await axios.get(`${BASE_URL}/convert?amount=${amount}&to=${to}`);
  return res.data;
};

export const getQuote = async () => {
  const res = await axios.get(`${BASE_URL}/quote`);
  return res.data;
};
