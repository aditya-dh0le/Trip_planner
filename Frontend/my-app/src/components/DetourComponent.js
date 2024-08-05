import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DetourMapComponent from './DetourMapComponent';
import DetourMap from './DetourMap';
import EnrouteComponent from './EnrouteComponent';

export default function DetourComponent() {
  return (
    <Container>
      <Row>
        <Col><DetourMap/></Col>
      </Row>
      <Row>
        <Col><EnrouteComponent/></Col>
      </Row>
    </Container>
  );
}