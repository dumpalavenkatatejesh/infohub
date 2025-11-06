import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


export default function Navbar(){
return (
<nav className="navbar">
<div className="brand">InfoHub</div>
<div className="links">
<Link to="/">Weather</Link>
<Link to="/converter">Converter</Link>
<Link to="/quotes">Quotes</Link>
</div>
</nav>
);
}