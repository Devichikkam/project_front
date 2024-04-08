import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Payment = () => {
  const { registrationId } = useParams(); 
  const [userName, setUserName] = useState('');
  const [amount, setAmount] = useState(0);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  

  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const response = await fetch(`http://localhost:9090/payments/amount/${registrationId}`);
        const data = await response.json();
        setAmount(data);
      } catch (error) {
        console.error('Error fetching amount:', error);
      }
    };

    fetchAmount();

    // Fetch username from current user session
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    setUserName(userSession.username);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, [registrationId]);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      console.error('Razorpay SDK not loaded');
      return;
    }

    try {
      const order = await createOrder();
      if (order && order.orderId) {
        const options = {
          key: "rzp_test_YaNh8d3lVsmNvU",
          amount: amount * 100,
          currency: "INR",
          name: userName,
          description: "Test Transaction",
          order_id: order.orderId,
          handler: function (response) {
            const tId = response.razorpay_payment_id;
            // Send tId to the endpoint
            sendTId(tId);
            alert(tId);
          },
          prefill: {
            name: userName,
          },
          theme: {
            color: "#007bff", // Set primary Bootstrap color
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        console.error('Error: Order ID not found in the response');
      }
    } catch (error) {
      console.error('Error handling payment:', error);
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch('http://localhost:8080/payment/' + amount * 100, {
        method: 'GET',
      });
      const data = await response.text();
      console.log('Response from server:', data);
      return { orderId: data };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const sendTId = async (tId) => {
    try {
      await fetch(`http://localhost:7003/registrations/setTId/${registrationId}/${tId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          registrationId,
          tId
        })
      });
      console.log('tId sent successfully');
    } catch (error) {
      console.error('Error sending tId:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Payment Details</h5>
        <div className="form-group">
          <label htmlFor="userName">Name</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            value={userName}
            readOnly // Make the input field read-only
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
        </div>
        <button onClick={handlePayment} className="btn btn-primary">Make Payment</button>
      </div>
    </div>
  );
};

export default Payment;
