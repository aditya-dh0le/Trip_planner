import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logout from './Logout';

import Pdf from './Pdf';

function NavbarComponent() {
  return (
    <Navbar className="bg-body-tertiary mb-4">
      <Container>
        <Navbar.Brand className="fs-1 ms-5 brand" href="#home">TripEase</Navbar.Brand>
      </Container>
      <Pdf/>
      <Logout/>
    </Navbar>
  );
}

export default NavbarComponent;