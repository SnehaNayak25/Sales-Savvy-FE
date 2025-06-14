import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';

export default function Sign_up() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, password, gender, dob, role };

    try {
      const response = await fetch("http://localhost:8080/signUp", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const result = await response.text();
      alert(result);
      if(result ==="User created successfully") {
        navigate('/signIn');
      }
    } catch(error) {
      console.log("Error:", error);
      alert("Failed to submit data")
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={username} 
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={email} 
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={password} 
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          
          <div className="form-group">
            <label>Gender</label>
            <div className="radio-group">
              <div className="radio-option">
                <input type="radio" name="gender" value="M" 
                  onChange={(e) => setGender(e.target.value)} /> Male
              </div>
              <div className="radio-option">
                <input type="radio" name="gender" value="F" 
                  onChange={(e) => setGender(e.target.value)} /> Female
              </div>
              <div className="radio-option">
                <input type="radio" name="gender" value="O" 
                  onChange={(e) => setGender(e.target.value)} /> Other
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" name="dob" value={dob} 
              onChange={(e) => setDob(e.target.value)} />
          </div>
          
          <div className="form-group">
            <label>Role</label>
            <div className="radio-group">
              <div className="radio-option">
                <input type="radio" name="role" value="admin" 
                  onChange={(e) => setRole(e.target.value)} /> Admin
              </div>
              <div className="radio-option">
                <input type="radio" name="role" value="customer" 
                  onChange={(e) => setRole(e.target.value)} /> Customer
              </div>
            </div>
          </div>
          
          <button type="submit" className="submit-btn">SIGN UP</button>
        </form>
      </div>
    </div>
  );
}