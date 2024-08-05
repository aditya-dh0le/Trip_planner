import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Base API URL
const apiUrl = 'http://127.0.0.1:3500/data';

function useFetchData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const timestamp = new Date().getTime(); // Add a timestamp
        const response = await axios.get(`${apiUrl}?_=${timestamp}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // Dependencies can be added if needed

  return { data, loading };
}

export function Enroute() {
  const { data, loading } = useFetchData();

  if (loading) return <div>Loading...</div>;

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

export function Destination() {
  const { data, loading } = useFetchData();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Destination</h2>
      <ListGroup as="ol">
        {data.destination.map((place, index) => (
          <ListGroup.Item key={index} as="li">
            <h5 style={{ fontWeight: 'bold' }}>{place.name}</h5>
            <div>{place.description}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export function Budget() {
  const { data, loading } = useFetchData();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Budget</h2>
      <ListGroup as="ol">
        {data.destination.map((place, index) => (
          <ListGroup.Item key={index} as="li">
            <div>
              <h5 style={{ fontWeight: 'bold' }}>{place.name}</h5>
              <div>Budget: {place.budget}</div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
