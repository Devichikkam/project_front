// RoutingPaths.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage'; 
import UserLogin from '../components/UserLogin';
import AdminLogin from '../components/AdminLogin';
import Events from '../components/Events';
import UserRegistration from '../components/UserRegistration';
import AddEvent from '../components/AddEvent';
import PaymentPage from '../components/PaymentPage';
import Registration from '../components/Registration';
import EditEvent from '../components/EditEvent';
import MyRegistrations from '../components/MyRegistrations';
import Payment from '../components/Payment';
import AddFoodOption from '../components/AddFoodOption';
import ViewFoodOptions from '../components/ViewFoodOptions';
import ViewAllRegistrations from '../components/ViewAllRegistrations';
import ViewAllUsers from '../components/ViewAllUsers';

const RoutingPaths = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/events" element={<Events />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/admin-login/add-event" element={<AddEvent/>}/>
        <Route path="/payments/:registrationId" element={<PaymentPage />} />
        <Route path="/registration/:eventId" element={<Registration />} />
        <Route path="/edit-event/:eventId" element={<EditEvent />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/addfoodoption/:eventId" element={<AddFoodOption />} />
        <Route path="/viewallusers" element={<ViewAllUsers />} />
        <Route path='/myregistrations' element={<MyRegistrations />} />
        <Route path="/payment" element={<Payment />}/>
        <Route path="/foodOptions/:eventId" element={<ViewFoodOptions/>} />
        <Route path="/payment/razor/:registrationId" element={<Payment />} />
        <Route path="/viewAllRegistrations" element={<ViewAllRegistrations />} />



      </Routes>
    </Router>
  );
}

export default RoutingPaths;
