import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './events.css';
 
const Events = () => {
  const [events, setEvents] = useState([]);
 
  useEffect(() => {
    fetchEvents();
  }, []);
 
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:9090/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <div>
      <h1 className="text-center mt-3 mb-4">Events Page</h1>
      <div className="container">
        <div className="row">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
 


const EventCard = ({ event }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="card bg-light text-dark">
        <div className="card-body">
          <h5 className="card-title text-primary">{event.name}</h5>
          <p className="card-text">Description: {event.description}</p>
          <p className="card-text">Start Date: {event.startDate}</p>
          <p className="card-text">End Date: {event.endDate}</p>
          <p className="card-text">Time: {event.time}</p>
          <p className="card-text">Entry Fee: {event.entryFee}</p>
          <p className="card-text">Last Registration Date: {event.lastRegistrationDate}</p>
          <p className="card-text">Food Included: {event.foodIncluded ? 'Yes' : 'No'}</p>
          {event.foodIncluded && (
            <div>
              <p className="card-text">Food Price (Adult): {event.foodPriceAdult}</p>
              <p className="card-text">Food Price (Child): {event.foodPriceChild}</p>
            </div>
          )}
           {/* <Link to={`/foodOptions/${event.id}`} className="btn btn-primary">View Food Options</Link> */}
          {/* Pass event ID to the registration page */}
          {/* <Link to={`/foodOptions/${event.id}`} className="btn btn-primary me-2">View Food Options</Link>  */}
          {/* <button onClick={window.open(`/foodOptions/${event.id}`, '_blank', `width=800, height=900, top=${(window.screen.height - 500) / 2}, left=${(window.screen.width - 800) / 2}`)} className="btn btn-primary">Open Payment Popup</button> */}
          <button onClick={() => window.open(`/foodOptions/${event.id}`, '_blank', `width=800, height=900, top=${(window.screen.height - 500) / 2}, left=${(window.screen.width - 800) / 2}`)} className="btn btn-primary me-2">View FoodOptions</button>
          <Link to={`/registration/${event.id}`} className="btn btn-primary">Go to Register</Link>
        </div>
      </div>
    </div>
  );
}
 
export default Events;