import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import backgroundImage from '../Images/Registration.png';

const Registration = () => {
  const { eventId } = useParams();
  const { userId } = JSON.parse(localStorage.getItem('userSession'));
  const [registrationData, setRegistrationData] = useState({
    numberOfAdults: 1,
    numberOfChildren: 0,
  });
  const [username, setUsername] = useState('');
  const [eventName, setEventName] = useState('');

  useEffect(() => {
    // Fetch user details based on userId
    fetch(`http://localhost:9090/users/${userId}`)
      .then(response => response.json())
      .then(data => setUsername(data.username))
      .catch(error => console.error('Error fetching user details:', error));

    // Fetch event details based on eventId
    fetch(`http://localhost:9090/events/${eventId}`)
      .then(response => response.json())
      .then(data => setEventName(data.name))
      .catch(error => console.error('Error fetching event details:', error));
  }, [eventId, userId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setRegistrationData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRegister = () => {
    fetch(`http://localhost:9090/registrations/create/${eventId}/${userId}?numberOfAdults=${registrationData.numberOfAdults}&numberOfChildren=${registrationData.numberOfChildren}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to register');
        }
        return response.json();
      })
      .then(data => {
        console.log('Registration successful', data);
        // Redirect to myregistrations page after successful registration
        return <Link to={`/myregistrations`} />;
      })
      .catch(error => {
        console.error('Error registering:', error.message);
        alert('Error registering: ' + error.message);
      });
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('userSession'); // Remove user session from localStorage
  };

  return (
    <div className="container-fluid p-0" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
     <h1 className="text-center mb-4 text-white">Registration Page</h1>
     <h3 className="text-center mb-4 text-white">Hey {username}!!</h3>
      <h3 className="text-center mb-4 text-warning">You are registering for {eventName} event</h3>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="numberOfAdults">Number of Adults:</label>
                  <input  
                    type="number"
                    name="numberOfAdults"
                    value={registrationData.numberOfAdults}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="numberOfChildren">Number of Children:</label>
                  <input
                    type="number"
                    name="numberOfChildren"
                    value={registrationData.numberOfChildren}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <Link to="/myregistrations">
                <button onClick={handleRegister} className="btn btn-primary">Register</button>
              </Link>
                
              </form>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
            <Link to="/user-login">
                <button className="btn btn-danger">Back</button>
            </Link>
             &nbsp; &nbsp;
              {/* Logout button */}
              <Link to="/user-login">
                <button onClick={handleLogout} className="btn btn-danger">Logout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
