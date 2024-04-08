import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import backgroundImage from '../Images/Haleem.jpg';

const ViewFoodOptions = () => {
  const [foodOptions, setFoodOptions] = useState([]);
  const { eventId } = useParams(); // Get eventId from URL parameter

  useEffect(() => {
    const fetchFoodOptions = async () => {
      try {
        const response = await fetch(`http://localhost:7000/foodOptions/event/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch food options');
        }
        const data = await response.json();
        setFoodOptions(data);
      } catch (error) {
        console.error('Error fetching food options:', error);
      }
    };

    fetchFoodOptions();
  }, [eventId]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Food Options for Event {eventId}</h2>
          <ul className="list-group list-group-flush">
            {foodOptions.map(foodOption => (
              <li key={foodOption.id} className="list-group-item">
                <h3>{foodOption.name}</h3>
                <p>Price: ${foodOption.price}</p>
                <p>Description: {foodOption.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewFoodOptions;
