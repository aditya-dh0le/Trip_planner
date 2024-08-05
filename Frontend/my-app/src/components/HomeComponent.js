import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card ,} from 'react-bootstrap';
import '../App.css'; // Import your custom styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import TravelDatePicker from './TravelDatePicker';
 
function HomeComponent() {
 
  const customStyle = {
    fontSize: '6rem',
    color: 'black',  
    fontWeight:  '750',
    marginTop: '20px' ,
 
 
  };
  let [Loading, setIsLoading] = useState(false);
  const [showFloatingText, setShowFloatingText] = useState(false);
 
  const handleClick = () => {
    setIsLoading(true);
    setShowFloatingText(true);
 
    // Optionally, you might want to hide the floating text after some time
    // setTimeout(() => setShowFloatingText(false), 3000); // Hide after 3 seconds
  };
  const ButtonStyle = {
    color: 'white',          
    backgroundColor: '#0d5d56',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
 
  };
 
 
 
  const [isLoading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate();
 
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
   
    try {
      await axios.post('http://127.0.0.1:3500/api/python', payload);
      navigate('/test');
    } catch (error) {
      // Handle error if needed
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false); // Reset loading state after form submission
    }
  };
 
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
        width: '100vw', // Full viewport width
        backgroundImage: 'url(/bgg.jpg)', // Replace with your image URL
        backgroundSize: 'cover', // Cover the entire element
        backgroundPosition: 'center', // Center the image within the element
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
 
      <Card className="mb-4" style={{   backgroundColor: 'transparent', width: '100%', maxWidth: '900px', border: "none" , }}>
        <Card.Body className="text-center">
          <Card.Title style={customStyle} >TripEase</Card.Title>
          {/* <Card.Text class="">
            Welcome to TripEase!
          </Card.Text> */}
          <Card.Text style={{ fontSize: '1.5rem',
    color: 'white',  
    fontWeight:  '600',
    textShadow: '1px 1px 2px black, 0 0 5px black, 0 0 2px white' }}>
           "
Your Perfect Trip, Perfectly Planned."
          </Card.Text>
        </Card.Body>
      </Card>
 
      <Row className="w-50">
        <Col>
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Source</Form.Label>
              <Form.Control type="text" placeholder="e.g. Mumbai" name='source' />
            </Form.Group>
 
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Destination</Form.Label>
              <Form.Control type="text" placeholder="e.g. Nagpur" name='destination' />
            </Form.Group>
 
            {/* <Button style={ButtonStyle}  type="submit" disabled={isLoading}>
              {isLoading ? 'Happy Journey...' : 'Create Trip '}
            </Button>
             */}
           
            {/* <button type="submit" disabled={isLoading} className='custom-button'><svg class="svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg> {isLoading ? 'Happy Journey...' : 'Create Trip '}</button> */}
           
            <div style={{
 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap:'12px',
        textAlign:'center'
      }}>
      <button
        type="submit"
        disabled={isLoading}
        className='custom-button'
        onClick={handleClick}
      >
        <svg className="svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
        </svg>
        {isLoading ? 'Processing' : 'Create Trip '}
      </button>
 
     {showFloatingText && (
 <div className="floating-text">
 <div className="road">
   <div id="car" className="car">
     <img src="/bus.png" alt="bus" />
   </div>
 </div>
 <div className="message">Happy Journey...</div>
</div>
 
)}
<button style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
        type="submit"
        disabled={isLoading}
        className='custom-button'
        onClick={handleClick}
      >  {isLoading ? 'Processing' : 'Do It Yourself ! '}</button>
      {/* <button style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
        type="submit"
        disabled={isLoading}
        className='custom-button'
        onClick={handleClick}
      >  {isLoading ? 'Processing' : 'Date'}</button> */}
      {/* <TravelDatePicker/> */}
    </div>
 
          </Form>
        </Col>
      </Row>
    </div>
  );
}
 
export default HomeComponent;