// Navbar.js
import React from 'react';
import logo from './assets/idfilogo.png';
import './Navbar.css';
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="menu-options">
        <a href="/" className="menu-option">Home</a>
        <a href="/about" className="menu-option">About</a>
        <a href="/services" className="menu-option">Services</a>
        <a href="/contact" className="menu-option">Contact</a>
      </div>
    </div>
  );
};

export default Navbar;
