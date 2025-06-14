import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/style.css';

export default function Welcome() {
  return (
    <div className="container">
      <div className="welcome-container">
        <h1 className="welcome-title">Welcome to Our Store</h1>
        <p>Please sign up or sign in to continue</p>
        <div className="auth-links">
          <NavLink to="/signUp" className="auth-link">Sign Up</NavLink>
          <NavLink to="/signIn" className="auth-link">Sign In</NavLink>
        </div>
      </div>
    </div>
  );
}