import React, { useState, useEffect } from 'react';
import backgroundImage from '../Images/allregistrations.png';
import { useNavigate } from 'react-router-dom';

export default function ViewAllRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch('http://localhost:7003/registrations');
        if (!response.ok) {
          throw new Error('Failed to fetch registrations');
        }
        const data = await response.json();
        setRegistrations(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRegistrations();
  }, []);
  const handleBack = () => {
    navigate('/admin-login');
  };


  return (
    <div className="container-fluid" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <h1 className="text-center">All Registrations</h1>
      <button onClick={handleBack} className="btn btn-danger" style={{ position: 'absolute', top: '20px', right: '20px', marginBottom: '40px' }}>Back</button>
      {/* <button onClick={handleBack} className="btn btn-primary" style={{ position: 'absolute', top: '20px', left: '20px' }}>Back</button> */}
      <div className="row">
        {registrations.map(registration => (
          <div key={registration.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Registration ID: {registration.id}</h5>
                <p className="card-text">Number of Adults: {registration.numberOfAdults}</p>
                <p className="card-text">Number of Children: {registration.numberOfChildren}</p>
                <p className="card-text">User ID: {registration.userId}</p>
                <p className="card-text">Event ID: {registration.eventId}</p>
                <p className="card-text">Payment Status: {registration.paymentStatus ? 'Paid' : 'Pending'}</p>
                <p className="card-text">Ticket ID: {registration.tId}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
