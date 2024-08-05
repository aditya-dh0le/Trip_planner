import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import DirectionsMap from './MapComponent';
import DestinationComponent from './DestinationComponent';
import WeatherComponent from './WeatherComponent';
import BudgetComponent from './BudgetComponent';
import DetourRedirect from './DetourRedirect';
import DirectionsMap from './Map';

function GridComponent() {
  return (
    <Container>
      <Row className='mt-4'>
        <Col><DirectionsMap/></Col>
        <Col><WeatherComponent/><DetourRedirect/></Col>
      </Row>
      <Row className='mt-4 mb-4'>
        <Col><DestinationComponent/></Col>
        <Col><BudgetComponent/></Col>
      </Row>
    </Container>
  );
}

export default GridComponent;