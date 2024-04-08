import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
//import AddEvent from './AddEvent'; // Import AddEvent component
import ListAllEvents from './ListAllEvents';
import backgroundImage from '../Images/admin_login.jpg';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false); // State to track authentication

  // Check if the admin is already authenticated on component mount
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      setAuthenticated(true);
      setName(adminSession);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9090/admins');
      if (!response.ok) {
        throw new Error('Failed to fetch admin data');
      }
      const adminData = await response.json();
      console.log('adminData:', adminData); // Log adminData for debugging purposes

      // Check if adminData is an array and not empty
      if (Array.isArray(adminData) && adminData.length > 0) {
        // Find admin data by name
        const admin = adminData.find(admin => admin.name === name);

        if (admin) {
          if (admin.password === password) {
            console.log("Login successful");
            setAuthenticated(true); // Set authenticated state to true upon successful login
            localStorage.setItem('adminSession', name); // Store the username in local storage
          } else {
            setError('Invalid name or password');
          }
        } else {
          setError('Admin not found');
        }
      } else {
        setError('No admin data found');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while logging in');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('adminSession'); // Remove admin session data from local storage
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`,  backgroundSize: 'cover', minHeight: '900px' }}>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            {authenticated ? (
              <div className="card shadow-lg">
                <div className="card-header bg-primary text-white">
                  <h3 className="card-title mb-0">Welcome, {name}!</h3>
                </div>
                <div className="card-body">
                <div className="card-body d-flex justify-content-between">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                     <Link to='/viewAllRegistrations' className="btn btn-warning">View All Registrations</Link>
                </div>
                <Link to='/viewallusers' className="btn btn-info mb-2 d-block" style={{ display: 'block', margin: '0 auto' }}>View All Users</Link> 
                <Link to='/addevent' className="btn btn-success" style={{ display: 'block', margin: '0 auto' }}>Add Event</Link>
                  <ListAllEvents />
                </div>
              </div>
            ) : (
              <div className="card shadow-lg">
                <div className="card-header bg-primary text-white">
                  <h3 className="card-title mb-0">Admin Login</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleLogin}>
                    <table className="table">
                      <tbody>
                        <tr>
                          <td><label htmlFor="name">Name:</label></td>
                          <td>
                            <input
                              type="text"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="form-control"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td><label htmlFor="password">Password:</label></td>
                          <td>
                            <input
                              type="password"
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="form-control"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary">Login</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
