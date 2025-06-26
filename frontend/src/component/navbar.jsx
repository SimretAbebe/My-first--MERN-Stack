import React from 'react'
import {Link } from "react-router-dom";
import './navbar.css'

const navbar = () => {
  return (
    <nav className='nav-bar'>
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/register" className="nav-link">
        Register
      </Link>
      <Link to="/login" className="nav-link">
        Login
      </Link>
    </nav>
  );
}

export default navbar