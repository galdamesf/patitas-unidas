import PropTypes from "prop-types";
import { Card, Col, Row, Button, Container } from "react-bootstrap";
import "../css/EstadisticasPerdidos.css";

const EstadisticasPerdidos = ({ stats }) => {
  // Función para abrir la ley Cholito en una nueva pestaña
  const openLeyCholito = () => {
    window.open(
      "https://www.chileatiende.gob.cl/fichas/51436-ley-de-tenencia-responsable-de-mascotas-y-animales-de-compania-ley-cholito",
      "_blank"
    );
  };
  const openExtraviado = () => {
    window.open("https://registratumascota.cl/consultas.xhtml", "_blank");
  };
  const openInformacion = () => {
    window.open(
      "https://laderasur.com/articulo/cuatro-millones-de-animales-sin-supervision-la-alarmante-crisis-del-abandono-de-perros-y-gatos-en-chile/?srsltid=AfmBOoqbzq6TbmVJeTgPP-M-Qe71FIMeIW87p_fV4EwS66qDlxJpTPbE",
      "_blank"
    );
  };

  return (
    <div className="estadisticas-container-fluid">
      {/* Sección Hero */}
      <div className="hero-section-estadisticas">
        <div className="container text-center text-white">
          <Row>
            <Col>
              <h1 className="estadisticas-title">ESTADÍSTICAS ANUALES</h1>
              <p className="estadisticas-description">
                Información sobre animales perdidos
              </p>
            </Col>
          </Row>
        </div>
      </div>

      {/* Nuevo bloque debajo de la hero-section */}
      <div className="hero-section-estadisticas">
        <div className="container text-center text-white">
          <Row>
            <Col>
              <h1 className="estadisticas-title"></h1>
              <p className="estadisticas-description"></p>
            </Col>
          </Row>
        </div>
      </div>

      {/* Card grande */}
      <div className="large-card-container">
        <Card className="estadisticas-card mb-4" style={{ width: "100%" }}>
          <Card.Body>
            <h2 className="heading-large">Cifras alarmantes</h2>
            <p className="paragraph-large">
              En Chile, el abandono de perros y gatos es una problemática que
              afecta a una gran cantidad de animales, humanos y al medio
              ambiente. El primer boletín técnico de estimación sobre la
              población animal en Chile, realizado por la Escuela de Medicina
              Veterinaria de la Universidad Católica y el Programa Mascota
              Protegida de la Subsecretaría de Desarrollo Regional y
              Administrativo (Subdere), estima que hay al menos 4.049.277
              animales -perros y gatos- sin dueño en las 35 comunas censadas.
              Estos alarmantes números revelan que uno de cada cuatro animales
              censados estaría sin supervisión en la vía pública, lo que se
              traduce a perros y gatos en situación de abandono. Además, por
              cada 2,4 perros con dueño, hay uno sin tutor, mientras que de cada
              7,1 gatos registrados en el censo, uno es callejero.
            </p>
          </Card.Body>
        </Card>
      </div>

      {/* Nueva Card abajo de Estadísticas Anuales */}
      <div className="additional-card-container mb-4">
        <Card className="estadisticas-card" style={{ width: "100%" }}>
          <Card.Body>
            <h2 className="heading-large">Concecuencias del abandono</h2>
            <p className="paragraph-large">
              {stats.adopted} El efecto negativo de esta mala práctica no solo
              está relacionado directamente en la calidad de vida de estos
              animales, sino que además incrementa la propagación de
              enfermedades zoonóticas, esto quiere decir que pueden transmitirse
              entre animales y seres humanos, siendo provocadas por virus,
              bacterias, parásitos u hongos. Según la Organización Mundial de la
              Salud (OMS), en los últimos diez años el 75% de las nuevas
              enfermedades emergentes al año son por zoonosis
            </p>
            <hr className="hr-dotted" />
            <h2 className="heading-large">Politicas publicas</h2>
            <p className="paragraph-large">
              El tema de la tenencia responsable es relativamente nuevo en el
              país. La Ley 20.380, sobre la Protección Animal, promulgada en
              2009, fue uno de los primeros antecedentes en este ámbito. Busca
              reconocer, proteger y respetar a los animales como seres vivos y
              parte de la naturaleza, para tratarlos bien y evitar sufrimientos
              innecesarios. La ley exige que los dueños de animales les den
              alimento y albergue adecuados, y que no limiten su movimiento de
              forma innecesaria o dolorosa. Esto también se aplica al transporte
              de animales. Sin embargo, esta ley carece de definiciones
              explícitas sobre el maltrato animal y la tenencia responsable, lo
              que ha llevado a interpretaciones erróneas. Muchas personas
              consideran que simplemente basta con mantener con vida a un
              animal, sin tener en cuenta sus necesidades y bienestar. Como
              consecuencia, esto terminó por explotar de la peor forma. Un caso
              que marcó un antes y un después en la lucha contra el abandono
              animal en Chile fue el brutal maltrato sufrido por el perro
              Cholito en la comuna de Recoleta. En enero de 2017, Cholito fue
              golpeado hasta la muerte por encargo de una locataria del sector.
              Este cruel episodio generó indignación en la ciudadanía y
              movilizaciones masivas en redes sociales y en las calles. Como
              respuesta al hecho, se aceleró la tramitación de la Ley 21.020 de
              Tenencia Responsable de Mascotas y Animales de Compañía, conocida
              popularmente como la Ley Cholito, la cual estableció mecanismos de
              registro, empadronamiento y esterilización de animales, así como
              obligaciones y responsabilidades para sus dueños.{stats.lostRate}%
              este año.
            </p>
            <hr className="hr-dotted" />
            <h2 className="heading-large">
              El rol que cumplen las fundaciones
            </h2>
            <p className="paragraph-large">
              Las fundaciones cumplen un papel primordial ante este problema
              porque se dedican a proteger y mejorar la calidad de vida de los
              animales, ya sea brindando atención veterinaria, alimentación,
              vacunación o esterilización y adopción responsable de animales que
              estén en situación de abandono o maltrato. Conversamos con
              representantes de tres fundaciones: Croqueton.cl, Ayuda Callejeros
              y Coordinadora Rescate Brigada Galgos, para conocer su labor y
              perspectiva sobre la problemática del abandono. Carla Araneda,
              vocera y encargada de rescate de Coordinadora Rescate Brigada
              Galgos, mencionó que su fundación recibe en promedio 60 casos de
              perros abandonados al mes, evaluando la posibilidad de rescatarlos
              o difundir sus casos según su capacidad. Por su parte, Sonia
              Urrutia, fundadora de Ayuda Callejeros señaló que rescatan entre
              70 y 90 perros abandonados al mes. Ambas destacaron la importancia
              de las fundaciones en la tarea de sacar animales de las calles y
              reubicarlos en hogares responsables.
            </p>
            <hr className="hr-dotted" />
            <h2 className="heading-large">Soluciones a futuro</h2>
            <p className="paragraph-large">
              El abandono de animales no puede resolverse únicamente a través de
              las acciones de las fundaciones. Es fundamental abordar el
              problema desde distintos frentes. Según mencionan las fuentes
              consultadas, la esterilización juega un rol clave, ya que ayuda a
              controlar la población de animales y evitar la reproducción
              descontrolada. El año pasado, la Subsecretaría de Desarrollo
              Regional realizó 146 mil esterilizaciones para perros y gatos con
              y sin dueño.
            </p>
            <hr className="hr-dotted" />
            <h2 className="heading-large">¡Necesitamos más educación!</h2>
            <p className="paragraph-large">
              la educación en los colegios sobre la tenencia responsable de
              animales es primordial para concientizar a las futuras
              generaciones sobre el respeto y cuidado hacia los animales. Este
              trabajo es realizado por fundaciones como Croqueton.cl, en el cual
              participan de forma activa en crear conversatorios para cursos de
              kinder y primero básico. La última actividad realizada por el
              equipo fue hace dos semanas en el colegio Pumahue, en la cual se
              buscó concientizar sobre el abandono y educar sobre el rescate
              animal. Sin olvidar que el trayecto educativo también debe incluir
              a adultos. Entre esto, la Subdere ha realizado charlas y
              capacitaciones a carabineros, directivos, profesionales y
              municipales, para que se cumpla la Ley 21.020 sobre la tenencia
              responsable. También, a inicios de mayo comenzó el Plan Nacional
              de Esterilizaciones de Responsabilidad Compartida del Programa de
              Tenencia Responsable de Animales de Compañía (PTRAC) financiado
              por también por la Subdere.
            </p>
          </Card.Body>
        </Card>
      </div>
      <div className="hero-section-estadisticas-2">
        <div className="container text-center text-white">
          <Row>
            <Col>
              <h1 className="estadisticas-title">
                Juntos podemos ser parte del cambio
              </h1>
              <p className="estadisticas-description">Unete a Patitas Unidas</p>
            </Col>
          </Row>
        </div>
      </div>
      <div className="hero-section-estadisticas-2">
        <div className="container text-center text-white">
          <Row>
            <Col>
              <h1 className="estadisticas-title"></h1>
              <p className="estadisticas-description"></p>
            </Col>
          </Row>
        </div>
      </div>
      <div className="hero-section-estadisticas-2">
        <div className="container text-center text-white">
          <Row>
            <Col>
              <h1 className="estadisticas-title"></h1>
              <p className="estadisticas-description"></p>
            </Col>
          </Row>
        </div>
      </div>

      {/* Cards de estadísticas */}
      <div className="estadisticas-cards-container">
        {stats.animals.map((animal) => (
          <Col md={6} lg={3} key={animal.id}>
            <Card
              className="estadisticas-card mb-4"
              style={{ width: "100%", maxWidth: "350px" }}
            >
              <Card.Img
                variant="top"
                className="estadisticas-card-image"
                src={animal.image}
                alt={animal.name}
              />
              <Card.Body>
                <h2 className="estadisticas-card-title">{animal.name}</h2>
                <p className="estadisticas-card-description">
                  {animal.description}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>

      {/* Sección de más información */}
      <Container className="mt-5 text-center">
        <Row>
          <Col>
            <h2 className="home-h2">¡Quiero saber más!</h2>
            <p className="home-p">
              Haz clic aquí para más detalles sobre las estadísticas.
            </p>
            <Button variant="info" onClick={openInformacion}>
              Más Información
            </Button>
            <Button variant="warning" onClick={openLeyCholito} className="ml-3">
              Ley Cholito
            </Button>
            <Button variant="danger" onClick={openExtraviado} className="ml-3">
              Extraviado
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

EstadisticasPerdidos.propTypes = {
  stats: PropTypes.shape({
    totalLost: PropTypes.number.isRequired,
    recovered: PropTypes.number.isRequired,
    recoveryRate: PropTypes.number.isRequired,
    adopted: PropTypes.number.isRequired, // Nueva estadística
    lostRate: PropTypes.number.isRequired, // Nueva estadística
    animals: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  goToMoreInfo: PropTypes.func.isRequired,
};

export default EstadisticasPerdidos;
