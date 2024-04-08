import React from 'react';

const UserNavbar = ({ handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#add8e6' }}>
      <div className="container">
        <span className="navbar-brand text-dark">User Dashboard</span>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
    </nav>
  );    
};

export default UserNavbar;
