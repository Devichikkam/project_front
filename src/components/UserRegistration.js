import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import userRegistrationImage from '../Images/login.png';
import './UserRegistration.css';

const UserRegistration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (value) => {
    setUsername(value);
    setUsernameError(value.match(/[a-zA-Z]/) ? '' : 'Username must contain alphabets.');
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError(value.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/) ? '' : 'Password must contain at least one alphabet, one digit, and one special character.');
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError(value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? '' : 'Invalid email format. It should be in the format "example@gmail.com".');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!usernameError && !passwordError && !emailError) {
      try {
        const newUser = { username, password, email };
        const response = await axios.post('http://localhost:9090/users', newUser);
        console.log(response.data);
        alert('User registered successfully!');
        
        navigate('/user-login');
      } catch (error) {
        console.error('Error registering user:', error);
        // Handle errors here
      }
    }
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${userRegistrationImage})`, backgroundSize: 'cover', height: '100vh' }}>
      <Navbar />
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white border-0 text-center">
              <h3 className="card-title mb-0">User Registration</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username:</label>
                  <input placeholder='Enter User name' type="text" className="form-control" value={username} onChange={(e) => handleUsernameChange(e.target.value)} required />
                  {usernameError && <small className="text-danger">{usernameError}</small>}
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input placeholder='Enter password' type="password" className="form-control" value={password} onChange={(e) => handlePasswordChange(e.target.value)} required />
                  {passwordError && <small className="text-danger">{passwordError}</small>}
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input placeholder='Enter email' type="email" className="form-control" value={email} onChange={(e) => handleEmailChange(e.target.value)} required />
                  {emailError && <small className="text-danger">{emailError}</small>}
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
