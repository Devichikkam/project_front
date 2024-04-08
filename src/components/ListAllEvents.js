import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ListAllEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // initialize navigate function

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:9090/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const eventData = await response.json();
        setEvents(eventData);
      } catch (error) {
        console.error(error);
        // Handle error appropriately, e.g., show an error message
      }
    };

    fetchEvents();
  }, []);

  const handleEditEvent = (eventId) => {
    // Navigate to the edit event page based on the event ID
    navigate(`/edit-event/${eventId}`);
  };

  const handleAddFoodOption = (eventId) => {
    // Navigate to the edit event page based on the event ID
    navigate(`/addfoodoption/${eventId}`);
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">List of Events</h1>
      <div className="row">
        {events.map(event => (
          <div key={event.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body" style={{ backgroundColor: '#E6E6FA' }}>
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">Description: {event.description}</p>
                {/* Add other event details as needed */}
                <button onClick={() => handleAddFoodOption(event.id)} className="btn btn-primary btn-sm">Add Food</button>
<button onClick={() => handleEditEvent(event.id)} className="btn btn-primary btn-sm">Edit Event</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListAllEvents;
