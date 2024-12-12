import PropTypes from "prop-types";
import { Card, Col, Row, Button, Container } from "react-bootstrap";
import "../css/HogarTemporal.css";

const TemporaryHome = ({ dogs, goToRegister }) => {
  return (
    <div className="temporary-home-container">
      {/* Jumbotron */}
      <div className="hero-section-temporary">
        <div className="container text-center text-white">
          <Row>
            <Col>
              <h1 className="temporary-home-title">HOGAR DE ACOGIDA</h1>
              <p className="temporary-home-description">
                APOYA A UN PERRITO DE LA CALLE
              </p>
            </Col>
          </Row>
        </div>
      </div>

      {/* Card grande */}
      <div className="large-card-container">
        <Card className="temporary-home-card mb-4" style={{ width: "100%" }}>
          <Card.Body>
            <h2 className="heading-large">
              01 ¿Qué implica ser hogar temporal?
            </h2>
            <p className="paragraph-large">Alimentarlo</p>
            <p className="paragraph-large">
              Darle sus medicamentos en caso de ser necesario
            </p>
            <p className="paragraph-large">
              Llevarlo al veterinario en caso de ser necesario
            </p>
            <p className="paragraph-large">
              Llevarlo a las jornadas de adopción que se realizan en diferentes
              fundaciones
            </p>
            <p className="paragraph-large">
              Sacarle lindas fotos para que podamos crear su perfil y difundir
              en internet y redes sociales
            </p>
            <p className="paragraph-large">¡Darle mucho amor y cariño!</p>
            <hr className="hr-dotted" />
            <h2 className="heading-large">02 ¡Eres fundamental!</h2>
            <p className="paragraph-large">
              Cumples un rol fundamental en la vida de un animalito rescatado,
              puesto que tú puedes ser la diferencia entre que se recupere en un
              espacio seguro o tenga que volver a la calle. Tienes la gran
              satisfacción de haber proporcionado un hogar, alimento y mucho
              amor a un peludo para que tenga una segunda oportunidad de vivir y
              conseguir una familia definitiva.
            </p>
            <hr className="hr-dotted" />
            <h2 className="heading-large">03 ¿Cómo ayudar?</h2>
            <p className="paragraph-large">
              Ayudas a romper el ciclo de violencia y abandono. Al ofrecer hogar
              temporal a un animal, este será esterilizado por lo cual evitas
              que este ciclo de reproducción y abandono se repita. Te vuelves
              parte de una gran cadena de buenas acciones junto a las personas
              que donan dinero, comida o medicinas; aquellas que difunden los
              casos a través de sus redes sociales, los veterinarios que muchas
              veces donan su talento para salvar una vida, aquellas personas que
              donan transporte o son voluntarios y por supuesto tú, que brindas
              hogar temporal. Todas las personas involucradas en un rescate son
              claves.
            </p>
            <hr className="hr-dotted" />
            <h2 className="heading-large">04 Nuevos Cambios</h2>
            <p className="paragraph-large">
              Cambiarás tu forma de relacionarte con los animales porque
              aprenderás lo que es el amor incondicional de un animal… la
              compañía, la lealtad y esa mirada de gratitud cuando por fin vaya
              con su familia adoptiva es algo que no tiene precio.
            </p>
          </Card.Body>
        </Card>
      </div>

      {/* Cards de perros */}
      <div className="temporary-home-cards-container">
        {dogs.map((dog) => (
          <Col md={6} lg={3} key={dog.id}>
            <Card
              className="temporary-home-card mb-4"
              style={{ width: "100%", maxWidth: "350px" }}
            >
              <Card.Img
                variant="top"
                className="temporary-home-card-image"
                src={dog.image}
                alt={dog.name}
              />
              <Card.Body>
                <h2 className="temporary-home-card-title">{dog.name}</h2>
                <p className="temporary-home-card-description">
                  {dog.description}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>

      {/* Sección de registro */}
      <Container className="mt-5 text-center">
        <Row>
          <Col>
            <h2 className="home-h2">¡Quiero ser hogar de acogida!</h2>
            <p className="home-p">
              Regístrate para ayudar a perritos sin hogar.
            </p>
            <Button variant="success" onClick={goToRegister}>
              Regístrate
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

TemporaryHome.propTypes = {
  dogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  goToRegister: PropTypes.func.isRequired,
};

export default TemporaryHome;
