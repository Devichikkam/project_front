import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import backgroundImage from '../Images/Registration.png';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const { userId } = JSON.parse(localStorage.getItem('userSession'));
  const { eventId } = useParams(); // Accessing eventId from URL parameters

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch(`http://localhost:9090/registrations/user/${userId}`);
        const data = await response.json();

        const updatedRegistrations = await Promise.all(data.map(async registration => {
          const eventResponse = await fetch(`http://localhost:9090/events/${registration.eventId}`);
          const eventData = await eventResponse.json();
          return {
            ...registration,
            event: eventData
          };
        }));

        setRegistrations(updatedRegistrations);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    };
    fetchRegistrations();
  }, [userId, eventId]); // Include eventId in the dependency array to trigger useEffect on URL change

  return (
    <div className="container-fluid p-0" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
      <div className="container">
        <h2 className="mt-4 mb-3">Events Registered by User</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {registrations.map(registration => (
            <div key={registration.id} className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Event ID: {registration.eventId}</h5>
                  {registration.event && (
                    <>
                      <p className="card-text">Event Name: {registration.event.name}</p>
                      <p className="card-text">Event Description: {registration.event.description}</p>
                      <p className="card-text">Start Date: {registration.event.startDate}</p>
                      <p className="card-text">End Date: {registration.event.endDate}</p>
                      <p className="card-text">Entry Fee: ${registration.event.entryFee}</p>
                      <p className="card-text">Number Of Adults: {registration.numberOfAdults}</p>
                      <p className="card-text">Number Of Children: {registration.numberOfChildren}</p>
                    </>
                  )}
                  {registration.paymentStatus ? (
                    <p className="card-text text-success">Payment Done <span role="img" aria-label="Paid">💳</span></p>
                  ) : (
                    <div>
                      <Link to={`/payments/${registration.id}`} className="btn btn-primary mr-2">Go to Payment</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/user-login" className="btn btn-secondary">Back to Login</Link>
      </div>
    </div>
  );
}

export default MyRegistrations;
