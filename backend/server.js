import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import weatherRoute from './routes/weatherRoute.js';
import converterRoute from './routes/converterRoute.js';
import quoteRoute from './routes/quoteRoute.js';



const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => res.send('InfoHub Backend running'));


app.use('/api/weather', weatherRoute);
app.use('/api/convert', converterRoute);
app.use('/api/quote', quoteRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));