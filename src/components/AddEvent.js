import React, { useState } from 'react';
import './AddEvent.css'; // Import CSS file
import { Link, useNavigate } from 'react-router-dom';

const AddEvent = () => {
  const navigate=useNavigate();
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
    foodPriceChild: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9090/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to add event');
      }
      alert('Event added successfully');
      navigate('/admin-login'); 
      // Optionally, you can redirect the user to another page after successful submission
    } catch (error) {
      console.error(error);
      alert('Failed to add event');
    }
  };

  return (
    <div className="container d-flex justify-content-center" >
      <div className="card mt-5" style={{width: '90%', backgroundColor: 'lightblue'}}>
        <div className="card-body">
          <h1 className="mb-4" style={{ textAlign:"center"}}>Add Event</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Start Date:</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>End Date:</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Time:</label>
              <input type="text" name="time" value={formData.time} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Entry Fee:</label>
              <input type="number" name="entryFee" value={formData.entryFee} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Last Registration Date:</label>
              <input type="date" name="lastRegistrationDate" value={formData.lastRegistrationDate} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Food Included:</label>
              <input type="checkbox" name="foodIncluded" checked={formData.foodIncluded} onChange={() => setFormData(prevState => ({ ...prevState, foodIncluded: !prevState.foodIncluded }))} className="form-check-input" />
            </div>
            {formData.foodIncluded && (
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Food Price (Adult):</label>
                  <input type="number" name="foodPriceAdult" value={formData.foodPriceAdult} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group col-md-6">
                  <label>Food Price (Child):</label>
                  <input type="number" name="foodPriceChild" value={formData.foodPriceChild} onChange={handleChange} className="form-control" />
                </div>
              </div>
            )}
            <button type="submit" className="btn btn-primary">Add Event</button>
          </form>
        </div>
        <Link to='/admin-login' className="btn btn-danger" style={{ display: 'block', margin: '0 auto' }}>Back</Link>
      </div>
    </div>
  );
}

export default AddEvent;
