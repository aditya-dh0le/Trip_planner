import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {WeatherCard} from './Weather';
import { Destination,Budget } from './City';
import DirectionsMap from './Map';
import DetourRedirect from './DetourRedirect';

function Grid() {
  return (
    <Container>
      <Row className='mb-4'>
        <Col><DirectionsMap/></Col>
        <Col>
        <WeatherCard/>
        <DetourRedirect/>
        </Col>
      </Row>
      
      <Row className='mb-4'>
        <Col><Destination/></Col>
        <Col><Budget/></Col>
      </Row>
    </Container>
  );
}

export default Grid;