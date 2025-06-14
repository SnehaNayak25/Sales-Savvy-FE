import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';

export default function Sign_in() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { username, password };

    try {
      const response = await fetch('http://localhost:8080/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const result = await response.text();
      
      if(result === "admin") {
        navigate('/adminHome');
      } else if(result === "customer"){
        navigate('/customerHome');
      } else {
        alert(result)
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to sign in. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="submit-btn">SIGN IN</button>
        </form>
      </div>
    </div>
  );
}