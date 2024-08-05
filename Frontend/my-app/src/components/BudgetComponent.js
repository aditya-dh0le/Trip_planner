import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BudgetComponent() {
  const [data, setData] = useState({ destination: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3500/data');
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // Call the async function
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div>
      <h2>Budget</h2>
      <ListGroup as="ol">
        {data.destination.map((place, index) => (
          <ListGroup.Item key={index} as="li">
            <div>
              <h5 style={{ fontWeight: "bold" }}>{place.name}</h5>
              {/* <div>Accommodation: {place.budget?.accommodation}</div>
              <div>Food: {place.budget?.food}</div>
              <div>Sightseeing: {place.budget?.sightseeing}</div> */}
              <div>
                {place.budget?.accommodation ? (
                  <>
                    <strong>Accommodation:</strong> {place.budget.accommodation}
                  </>
                ) : null}
              </div>

              <div>
                {place.budget?.food ? (
                  <>
                    <strong>Food:</strong> {place.budget.food}
                  </>
                ) : null}
              </div>

              <div>
                {place.budget?.sightseeing ? (
                  <>
                    <strong>Sightseeing:</strong> {place.budget.sightseeing}
                  </>
                ) : null}
              </div>
              <div>
                {place.budget?.transport ? (
                  <>
                    <strong>Transport:</strong> {place.budget.transport}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
