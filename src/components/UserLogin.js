import React, { useState, useEffect } from 'react';
import Events from './Events';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import backgroundImage from '../Images/login.png';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user session exists in localStorage
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      const { username } = JSON.parse(userSession);
      setUsername(username);
      setAuthenticated(true);
    }
  }, []); // Empty dependency array ensures this effect runs only once, on component mount

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9090/users');
      const userData = await response.json();

      const user = userData.find((user) => user.username === username);

      if (user && user.password === password) {
        console.log('Login successful');
        setAuthenticated(true);
        localStorage.setItem('userSession', JSON.stringify({ userId: user.id, username }));
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while logging in');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('userSession');
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover',  minHeight: '900px' }}>
      <Navbar />
      {authenticated ? (
        <div>
          <h1 style={{ color: 'white' }}>Welcome, {username}!</h1>
          <button onClick={handleLogout} style={{ padding: '10px', margin: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
          {/* Add other components here after login */}
          <Link to="/myregistrations">
            <button style={{ padding: '10px', margin: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>My Registrations</button>
          </Link>
          <Events />
        </div>
      ) : (
        <div>
          <h1 style={{ color: 'black' }}>User Login Page</h1>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ margin: '10px' }}>
              <label htmlFor="username" style={{ marginRight: '10px', color: 'black' }}>Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ color: 'black' }}
              />
            </div>
            <div style={{ margin: '10px' }}>
              <label htmlFor="password" style={{ marginRight: '10px', color: 'black' }}>Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ color: 'black' }}
              />
            </div>
            {error && <div style={{ color: 'red', margin: '10px' }}>{error}</div>}
            <button type="submit" style={{ padding: '10px', margin: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
            <Link to="/user-registration">
              <button style={{ padding: '10px', margin: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Signup</button>
            </Link>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserLogin;
