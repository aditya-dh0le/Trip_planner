import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';

export default function EnrouteComponent() {
  const [data, setData] = useState({ en_route: [] }); // Initialize with empty array for en_route

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3500/data', {
          headers: {
            'Authorization': `Bearer ada01e49806a386e145baa2c01c5e0ff`
          }
        });
        setData(response.data); // Set the data state with the fetched response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function inside useEffect
  }, []); // Empty dependency array means this useEffect runs once on component mount

  return (
    <Container className="mt-5 mb-5">
      <div>
        <h2>En-Route</h2>
        <ListGroup>
          {data.en_route.map((place, index) => (
            <ListGroup.Item key={index}>
              <h5 style={{ fontWeight: 'bold', color: '#007bff' }}>{place.name}</h5>
              <div>{place.description}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  );
}
