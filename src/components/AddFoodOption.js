import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import backgroundImage from '../Images/addfood.jpg';

const AddFoodOption = () => {
  const { eventId } = useParams();
  const navigate=useNavigate(); 
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    eventId: eventId // Include eventId in the initial formData
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
      const response = await fetch('http://localhost:7000/foodOptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to add food option');
      }
      alert('Food option added successfully');
      navigate("/admin-login")
      // Optionally, you can redirect the user to another page after successful submission
    } catch (error) {
      console.error(error);
      alert('Failed to add food option');
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="card bg-light">
        <div className="card-body">
          <h1 className="card-title text-center">Add Food Option</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price:</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description:</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">Add Food Option</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/admin-login")}>Back</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFoodOption;
