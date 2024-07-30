import React from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

    const submitForm = async (e) =>{
        e.preventDefault();
        const formadata = new FormData(e.target);
        const payload = Object.fromEntries(formadata);
        await axios.post('http://127.0.0.1:3500/api/python', payload);
        navigate('/test');
    }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row className="w-50">
        <Col>
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Source</Form.Label>
              <Form.Control type="text" placeholder="" name='source'/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Destination</Form.Label>
              <Form.Control type="text" placeholder="" name='destination'/>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
