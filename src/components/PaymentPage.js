import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';
// import Payment from './Payment'; // Import Payment component
import backgroundImage from '../Images/payment.png';

const PaymentPage = () => {
  const { registrationId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentMessage, setPaymentMessage] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [qrCodeData, setQRCodeData] = useState('');
  const [registrationDetails, setRegistrationDetails] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false); // State for controlling the visibility of the pop-up
  const navigate = useNavigate(); // Initialize useNavigate
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const fetchRegistrationDetails = async () => {
      try {
        const response = await fetch(`http://localhost:9090/registrations/${registrationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch registration details');
        }
        const data = await response.json();
        setRegistrationDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRegistrationDetails();
  }, [registrationId]);

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:9090/payments/makePayment/${registrationId}?paymentMethod=${paymentMethod}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.text(); // Get response as text
        if (data.includes('successful')) {
          setPaymentMessage(data);
          const startIndex = data.indexOf('$') + 1;
          const endIndex = data.indexOf(' successful');
          const amount = data.substring(startIndex, endIndex);
          setPaymentAmount(amount);
          const tId = await fetchTicketId(registrationId);
          console.log(tId);
          //const qrCodeData = data.substring(data.lastIndexOf('QR Code: ') + 9)+tId;
          setQRCodeData(tId);
          setShowPaymentPopup(true); // Show payment popup on successful payment
        } else {
          setPaymentMessage('Payment failed');
        }
      } else {
        setPaymentMessage('Payment failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setPaymentMessage('An error occurred while processing the payment');
    }
  };

  const togglePaymentPopup = () => {
    setShowPaymentPopup(!showPaymentPopup); // Toggle the state to show/hide the pop-up
    window.open(`/payment/razor/${registrationId}`, '_blank', `width=800, height=900, top=${(window.screen.height - 500) / 2}, left=${(window.screen.width - 800) / 2}`);
    setIsButtonDisabled(false);
  };

  const fetchTicketId = async (registrationId) => {
    try {
      const response = await fetch(`http://localhost:7003/registrations/getTId/${registrationId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ticketId');
      }
      const data = await response.text(); // Get response as text
      return data; // Return the data (string) or an empty string if it's empty
    } catch (error) {
      console.error(error);
      return '';
    }
  
  };

  const goToUserLogin = () => {
    navigate('/user-login');
  };

  const handleLogout = () => {
    localStorage.removeItem('userSession'); // Remove user session from localStorage
    navigate('/user-login'); // Navigate to user login page
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh' }}>
      <div className="col-md-8">
        <div className="card p-4" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
          <h1 className="text-center">Payment Page</h1>
          {registrationDetails && (
            <div>
              <h2>Registration Details</h2>
              <p>Number of Adults: {registrationDetails.numberOfAdults}</p>
              <p>Number of Children: {registrationDetails.numberOfChildren}</p>
            </div>
          )}
          <form onSubmit={handlePayment}>
            <div className="mb-3">
              {/* <label htmlFor="paymentMethod" className="form-label">Payment Method:</label>
              <input
                type="text"
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-control"
              /> */}
            </div>
            <button type="submit" className="btn btn-primary" disabled={isButtonDisabled}>Complete Payment</button>
          </form>
          {paymentMessage && <div>{paymentMessage}</div>}
          {paymentAmount && <div>Amount: ${paymentAmount}</div>}
          {qrCodeData && (
            <div>
              <h2>QR Code:</h2>
              <QRCode value={qrCodeData} />
            </div>
          )}
          {/* Button to open payment popup */}
          <button onClick={togglePaymentPopup} className="btn btn-primary">Open Payment Popup</button>
          {/* Button to navigate to user login page */}
          <button onClick={goToUserLogin} className="btn btn-secondary">Go to User </button>
          {/* Logout button */}
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          {/* Render Payment component when showPaymentPopup is true */}
          {showPaymentPopup && <div className="overlay">
            {/* <Payment /> */}
          </div>}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
