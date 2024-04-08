import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//import backgroundImage from '../Images/editevents.jpg';

const EditEvent = () => {
  const { eventId } = useParams(); // Extract eventId from URL params
  const navigate = useNavigate(); // Initialize navigate function
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    time: '',
    entryFee: 0,
    lastRegistrationDate: '',
    foodIncluded: false,
    foodPriceAdult: 0,
    foodPriceChild: 0,
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:9090/events/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        const eventData = await response.json();
        setEvent(eventData);
        setFormData({
          name: eventData.name,
          description: eventData.description,
          startDate: eventData.startDate,
          endDate: eventData.endDate,
          time: eventData.time,
          entryFee: eventData.entryFee,
          lastRegistrationDate: eventData.lastRegistrationDate,
          foodIncluded: eventData.foodIncluded,
          foodPriceAdult: eventData.foodPriceAdult,
          foodPriceChild: eventData.foodPriceChild,
        });
      } catch (error) {
        console.error(error);
        // Handle error appropriately, e.g., show an error message
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9090/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      // Redirect to Admin login page upon successful update
      navigate('/admin-login');
    } catch (error) {
      console.error(error);
      // Handle error appropriately, e.g., show an error message
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-light"> {/* Add bg-light class for background color */}
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Edit Event {eventId}</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">Start Date</label>
                  <input type="date" className="form-control" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">End Date</label>
                  <input type="date" className="form-control" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="time" className="form-label">Time</label>
                  <input type="time" className="form-control" id="time" name="time" value={formData.time} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="entryFee" className="form-label">Entry Fee</label>
                  <input type="number" className="form-control" id="entryFee" name="entryFee" value={formData.entryFee} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastRegistrationDate" className="form-label">Last Registration Date</label>
                  <input type="date" className="form-control" id="lastRegistrationDate" name="lastRegistrationDate" value={formData.lastRegistrationDate} onChange={handleChange} />
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="foodIncluded" name="foodIncluded" checked={formData.foodIncluded} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="foodIncluded">Food Included</label>
                </div>
                {formData.foodIncluded && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="foodPriceAdult" className="form-label">Food Price (Adult)</label>
                      <input type="number" className="form-control" id="foodPriceAdult" name="foodPriceAdult" value={formData.foodPriceAdult} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="foodPriceChild" className="form-label">Food Price (Child)</label>
                      <input type="number" className="form-control" id="foodPriceChild" name="foodPriceChild" value={formData.foodPriceChild} onChange={handleChange} />
                    </div>
                  </>
                )}
                <button type="submit" className="btn btn-primary">Update Event</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
