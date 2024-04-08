import React, { useState, useEffect } from 'react';

const MyEvents = ({ username }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch user-specific events from backend
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:9090/events?username=${username}`);
        const eventData = await response.json();
        setEvents(eventData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEvents();
  }, [username]);

  return (
    <div>
      <h1>My Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyEvents;
