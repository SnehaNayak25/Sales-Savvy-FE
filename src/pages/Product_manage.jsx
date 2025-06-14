import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/style.css';

export default function Product_manage() {
  return (
    <div className="container">
      <nav className="navbar">
        <h2>Product Management</h2>
        <div className="nav-links">
          <NavLink to="/adminHome" className="nav-link">Back to Admin</NavLink>
        </div>
      </nav>
      <div className="form-container">
        <h3 className="form-title">Product Management</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <NavLink to="/addProduct" className="submit-btn">Add Products</NavLink>
          <NavLink to="/getAllProducts" className="submit-btn">View Products</NavLink>
        </div>
      </div>
    </div>
  );
}