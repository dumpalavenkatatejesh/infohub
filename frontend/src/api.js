import axios from 'axios';

const BASE_URL = 'https://infohub-lnu0.onrender.com/';

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
