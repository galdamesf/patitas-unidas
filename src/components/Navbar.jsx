import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import "../css/Navbar.css"; // Asegúrate de que el archivo CSS esté bien configurado

function BasicNavbar() {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container fluid>
        {/* Logo al lado izquierdo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/src/img/Logo.png" // Ruta de tu logo
            alt="Logo Patitas Unidas"
            className="navbar-logo"
          />
          <span className="ms-2"></span> {/* Espacio entre logo y nombre */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicNavbar;
