import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../Images/allregistrations.png';

export default function ViewAllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7001/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="container mt-4" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <h1 className="text-center mb-4">All Users</h1>
      <div className="row">
        {users.map(user => (
          <div className="col-md-6" key={user.id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">User ID: {user.id}</h5>
                <p className="card-text"><strong>Username:</strong> {user.username}</p>
                <p className="card-text"><strong>Password:</strong> {user.password}</p>
                <p className="card-text"><strong>Email:</strong> {user.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to='/admin-login' className="btn btn-danger" style={{ display: 'block', margin: '0 auto' }}>Back</Link>
    </div>
  );
}
