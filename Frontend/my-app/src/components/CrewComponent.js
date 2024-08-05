import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
// import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CrewComponent() {

    const [data, setData] = useState({ destination: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:3500/crew');
          setData(response.data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log("crew ai data: ", data);

  return (
  <Container>
        {
        data.crew.map((day)=>{
            return <>
            <h3 style={{ color:"#7C00FE" }}>Day {day.day}</h3>
            <ListGroup className='mb-4'>
            <ListGroup.Item >
            <span style={{ fontWeight: "bold", color:"#F5004F" }}>Morning</span>: <span className='fs-5'>{day.itinerary.morning}</span>            
            </ListGroup.Item>
            <ListGroup.Item>
            <span style={{ fontWeight: "bold", color:"#F5004F" }}>Afternoon</span>: <span className='fs-5'>{day.itinerary.afternoon}</span>
            </ListGroup.Item>
            <ListGroup.Item>
            <span style={{ fontWeight: "bold", color:"#F5004F" }}>Evening</span>: <span className='fs-5'>{day.itinerary.evening}</span>
            </ListGroup.Item>
            <ListGroup.Item>
            <span style={{ fontWeight: "bold", color:"#F5004F" }}>Night</span>: <span className='fs-5'>{day.itinerary.night}</span>
            </ListGroup.Item>
            </ListGroup>
            <Row className='mt-4 mb-4'>
                <Col style={{ fontWeight: "bold", color:"#180161" }} className='p-3'>{day.detailed_budget_description}</Col>
            </Row>
            </>
        })
      }

  </Container>
  );
}

export default CrewComponent;