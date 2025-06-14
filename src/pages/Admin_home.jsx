import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/style.css'

export default function Admin_home() {
  return (
    <div className="container">
      <nav className="navbar">
        <h2>Admin Dashboard</h2>
        <div className="nav-links">
          <NavLink to="/userManage" className="nav-link">User Management</NavLink>
          <NavLink to="/productManage" className="nav-link">Product Management</NavLink>
        </div>
      </nav>
      <div className="welcome-container">
        <h1 className="welcome-title">Welcome Admin</h1>
        <p>Manage users and products from the navigation above</p>
      </div>
    </div>
  )
}