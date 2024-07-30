// import React from 'react';
// import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Register() {
//   const navigate = useNavigate();

//   const submitForm = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const payload = Object.fromEntries(formData);
//     await axios.post('http://127.0.0.1:3500/api/python', payload);
//     navigate('/business');
//   };

//   return (
//     <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
//       <Card className="mb-4" style={{ width: '100%', maxWidth: '500px', border:"none"}}>
//         <Card.Body className="text-center">
//           <Card.Title className='brand fs-1' style={{color:"#EF5A6F"}}>TripEase</Card.Title>
//           <Card.Text>
//             Welcome to TripEase!
//           </Card.Text>
//           <Card.Text>
//             Please enter your source and destination.
//           </Card.Text>
//         </Card.Body>
//       </Card>
      
//       <Row className="w-50">
//         <Col>
//           <Form onSubmit={submitForm}>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Source</Form.Label>
//               <Form.Control type="text" placeholder="" name='source'/>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Destination</Form.Label>
//               <Form.Control type="text" placeholder="" name='destination'/>
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Register;

import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FormComponent() {
  const [isLoading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    
    try {
      await axios.post('http://127.0.0.1:3500/api/python', payload);
      navigate('/business');
    } catch (error) {
      // Handle error if needed
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false); // Reset loading state after form submission
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card className="mb-4" style={{ width: '100%', maxWidth: '500px', border: "none" }}>
        <Card.Body className="text-center">
          <Card.Title className='brand fs-1' style={{ color: "#EF5A6F" }}>TripEase</Card.Title>
          <Card.Text>
            Welcome to TripEase!
          </Card.Text>
          <Card.Text>
            Please enter your source and destination.
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

            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Happy Journey...' : 'Submit'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default FormComponent;
