// Navbar.js
import React, { useState } from 'react';
import './Navbar.css'; // Optional: add styling in a separate CSS file
import logo from './assets/idfilogo.png'

const Navbar = () => {
  const [menuOptions] = useState(['Home', 'About', 'Services', 'Contact']);
  
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />



      </div>
      <div className="menu-options">
        {menuOptions.map((option, index) => (
          <div key={index} className="menu-option">
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
