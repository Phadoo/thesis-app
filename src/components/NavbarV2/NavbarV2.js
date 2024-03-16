// Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavbarV2.css";

const Navbar = () => {
  const [isResponsive, setResponsive] = useState(false);

  const handleToggle = () => {
    setResponsive(!isResponsive);
  };

  return (
    <nav className={isResponsive ? 'responsive' : ''}>
      <Link to="/">Home</Link>
      <Link to="/statistics">Statistics</Link>
      <Link to="/contact">Contact</Link>
      <a href="javascript:void(0);" className="icon" onClick={handleToggle}>
        &#9776;
      </a>
    </nav>
  );
};

export default Navbar;
