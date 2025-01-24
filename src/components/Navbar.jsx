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
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/perfil">
              Mi Perfil
            </Nav.Link>
            <NavDropdown title="Mascotas" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/buscar">
                Buscar
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/estadisticas">
                Perdidos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/hogar_temporal">
                Hogar Temporal
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/tips">
                Patitas Unidas Tips
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Botón Registrar Mascota en la esquina derecha */}
          <Nav>
            <Nav.Link
              as={Link}
              to="/registrar"
              className="registro-mascota-btn"
            >
              Registrar Mascota
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicNavbar;
