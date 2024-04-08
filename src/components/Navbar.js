import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';



const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" >
      <div className="container-fluid">
        <Link className="navbar-brand" style={{'width': '350px'}} to="/">Cultural Fest Management System</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto" style={{'margin-left': 'auto'}}>
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user-login">User Login</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/user-registration">User Registration</Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/admin-login">Admin Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
