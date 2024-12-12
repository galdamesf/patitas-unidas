import { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/Home.css"; // Asegúrate de tener el CSS actualizado
import misionPaginaImage from "../img/Perritos2.jpg";
import importanciaAdoptarImage from "../img/Perritos3.jpg";
import ayudaBrindamosImage from "../img/Perritos4.jpg";
import opcionesBusquedaImage from "../img/Perritos5.jpg";
import sabiasQueImage from "../img/Perritos8.jpg";

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToRegister = () => {
    navigate("/registrar_usuario");
  };

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <div className="jumbotron jumbotron-fluid hero-section-home">
        <div className="container text-center text-white">
          <Row>
            <Col>
              <h1 className="display-4 hero-title">
                ¡Encuentra a tu mascota perdida!
              </h1>
              <p className="lead hero-description">
                Busca perros perdidos en tu área y contacta a sus dueños.
                ¡Juntos podemos reunirte con tu amigo peludo!
              </p>
              <Button
                variant="primary"
                onClick={goToLogin}
                size="lg"
                style={{ backgroundColor: "#0069d9", borderColor: "#0069d9" }} // Color restaurado
              >
                Iniciar sesión
              </Button>
            </Col>
          </Row>
        </div>
      </div>

      {/* Sección de Registro */}
      <Container className="mt-5 text-center">
        <Row>
          <Col>
            <h2 className="home-h2">¿No tienes cuenta?</h2>
            <p className="home-p">
              Regístrate para ayudar a encontrar a más mascotas perdidas.
            </p>
            <Button variant="success" onClick={goToRegister}>
              Regístrate
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Cards Section */}
      <Container className="mt-5">
        <Row>
          {/* Card 1: Misión de la página */}
          <Col md={6} lg={3}>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                className="hero-image-home"
                src={misionPaginaImage}
                alt="Misión de la página"
              />
              <Card.Body>
                <Card.Title>Nuestra Misión</Card.Title>
                <Card.Text>
                  Ayudar a reunificar a las mascotas perdidas con sus dueños a
                  través de una plataforma fácil de usar. Creemos que cada
                  mascota merece regresar a su hogar.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 2: Importancia de adoptar */}
          <Col md={6} lg={3}>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                className="hero-image-home"
                src={importanciaAdoptarImage}
                alt="Importancia de adoptar"
              />
              <Card.Body>
                <Card.Title>Importancia de Adoptar</Card.Title>
                <Card.Text>
                  Adoptar es salvar vidas. Al adoptar, no solo ayudas a un
                  animal a encontrar un hogar, sino que también estás
                  contribuyendo a reducir la sobrepoblación de animales en
                  refugios.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 3: Ayuda que brindamos */}
          <Col md={6} lg={3}>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                className="hero-image-home"
                src={ayudaBrindamosImage}
                alt="Ayuda que brindamos"
              />
              <Card.Body>
                <Card.Title>Ayuda que Brindamos</Card.Title>
                <Card.Text>
                  Proporcionamos recursos y herramientas para ayudar a los
                  dueños de mascotas a encontrar a sus perros perdidos. Además,
                  colaboramos con refugios y organizaciones para apoyar a las
                  mascotas que necesitan un hogar.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 4: Opciones de búsqueda */}
          <Col md={6} lg={3}>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                className="hero-image-home"
                src={opcionesBusquedaImage}
                alt="Opciones de Búsqueda"
              />
              <Card.Body>
                <Card.Title>Opciones de Búsqueda</Card.Title>
                <Card.Text>
                  Ofrecemos varias opciones de búsqueda para facilitar la
                  localización de perros perdidos. Puedes buscar por ubicación,
                  características, o incluso por razas específicas para hacer la
                  búsqueda más eficiente.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Card 5: ¿Sabías que...? */}
      <div className="container">
        <div className="row">
          <Col md={6} lg={12}>
            <Card className="mb-12 wide-card-home">
              <Card.Img
                variant="top"
                className="hero-image-home"
                src={sabiasQueImage}
                alt="Sabías que"
              />
              <Card.Body>
                <Card.Title>¿Sabías que...?</Card.Title>
                <Card.Text>
                  A pesar de los esfuerzos realizados, persisten desafíos en la
                  implementación de políticas públicas y la concientización de
                  la sociedad sobre los más de cuatro millones de perros y gatos
                  sin dueño en Chile.
                </Card.Text>
                <Button
                  variant="info"
                  onClick={() => navigate("/hogar_temporal")}
                >
                  Conoce más
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default Home;
