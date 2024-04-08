import React from 'react';
import Navbar from './Navbar';
import backgroundImage from '../Images/Media.jpg'; // Import your background image

const HomePage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top', // Set background position to top
        minHeight: '100vh',
      }}
    >
      <Navbar />
      
      <div style={{ paddingTop: '100px' }}>
        <h1>.</h1>
      </div>
    </div>
  );
}

export default HomePage;