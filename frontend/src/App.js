import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Weather from './components/Weather';
import Converter from './components/Converter';
import Quotes from './components/Quotes';
import './App.css';


function App() {
return (
<Router>
<div className="app">
<Navbar />
<div className="container">
<Routes>
<Route path="/" element={<Weather />} />
<Route path="/converter" element={<Converter />} />
<Route path="/quotes" element={<Quotes />} />
</Routes>
</div>
</div>
</Router>
);
}


export default App;