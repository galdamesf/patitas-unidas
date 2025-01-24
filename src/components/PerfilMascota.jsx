import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/PerfilMascota.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function PerfilMascota() {
  const { id_mascota } = useParams();
  const navigate = useNavigate();
  const [mascota, setMascota] = useState(null);
  const [fotoPerro, setFotoPerro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/mascota/${id_mascota}`
        );
        setMascota(response.data);
      } catch (error) {
        console.error("Error al obtener la mascota:", error);
      }
    };

    const fetchFotoPerro = async () => {
      try {
        const response = await axios.get(
          "https://dog.ceo/api/breeds/image/random"
        );
        setFotoPerro(response.data.message);
      } catch (error) {
        console.error("Error al obtener la foto del perro:", error);
      }
    };

    fetchMascota();
    fetchFotoPerro();
  }, [id_mascota]);

  const esMascotaCompleta = (mascota) => {
    return mascota && mascota.nombre && mascota.raza && mascota.estado;
  };

  const handleShareFacebook = () => {
    const shareURL = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
    window.open(shareURL, "_blank");
  };

  const handleShareInstagram = () => {
    const instagramShareURL = `https://www.instagram.com/patitas_unidas_familia/profilecard/?igsh=aTI5cDZnbGs1dHlh&text=${encodeURIComponent(
      window.location.href
    )}`;
    alert("¡Enlace copiado al portapapeles! Pega el enlace en tu Instagram.");
    navigator.clipboard.writeText(instagramShareURL);
  };

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = fotoPerro;
    link.download = "foto_mascota.jpg";
    link.click();
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmitEmail = () => {
    // Aquí puedes agregar la lógica para enviar el correo, si es necesario
    console.log("Correo ingresado:", email);
    alert("¡Gracias! Nos pondremos en contacto contigo pronto.");
    setShowModal(false);
  };

  if (!mascota) {
    return <div>Cargando perfil de la mascota...</div>;
  }

  if (!esMascotaCompleta(mascota)) {
    return <div>Información de la mascota incompleta.</div>;
  }

  return (
    <div className="perfil-mascota">
      <div className="perfil-container">
        {/* Jumbotron con imagen de fondo */}
        <div className="jumbotron perfil-jumbotron">
          <div className="container text-center text-white">
            <h1 className="display-4">Mi Perfil</h1>
          </div>
        </div>
      </div>
      <div className="mascota-card">
        <div className="mascota-card-header">
          <img
            src={
              mascota.imagen ||
              "http://res.cloudinary.com/dyxvazlpg/image/upload/v1735070220/yohwpmac5cjysaez1puf.jpg"
            }
            alt={mascota.nombre}
            className="mascota-photo"
          />
        </div>
        <div className="mascota-card-body">
          <h2>{mascota.nombre}</h2>
          <p>
            <strong>Raza:</strong> {mascota.raza}
          </p>
          <p>
            <strong>Color:</strong> {mascota.color}
          </p>
          <p>
            <strong>Estado:</strong> {mascota.estado}
          </p>
          {mascota.estado === "Buscada" && (
            <p>
              <strong>Última vez vista:</strong> {mascota.ultima_visto}
            </p>
          )}
          {mascota.estado === "Encontrada" && (
            <p>
              <strong>Ubicación actual:</strong> {mascota.ubicacion_actual}
            </p>
          )}
          <p>
            <strong>Ubicación:</strong> {mascota.calle}, {mascota.numero},{" "}
            {mascota.comuna}, {mascota.region}
          </p>
          <p>
            <strong>Reportada por:</strong> {mascota.nombre_usuario}{" "}
            {mascota.apellido_usuario}
          </p>

          {/* Botones de compartir */}
          <div className="share-buttons">
            <button className="btn btn-facebook" onClick={handleShareFacebook}>
              Compartir en Facebook
            </button>
            <button
              className="btn btn-instagram"
              onClick={handleShareInstagram}
            >
              Copiar enlace para Instagram
            </button>
            <button className="btn btn-download" onClick={handleDownloadImage}>
              Descargar imagen
            </button>
          </div>

          {/* Botón de "Volver a la lista" y "Lo Encontré" juntos */}
          <div className="button-group">
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("/mascotas")}
            >
              Volver a la lista
            </button>
            <button
              className="btn btn-success mt-3 ml-3"
              onClick={handleShowModal}
            >
              Lo Encontré
            </button>
          </div>
        </div>
      </div>

      {/* Modal de "Lo Encontré" */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>¡Qué buena noticia!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Te pondremos en contacto con el dueño del perrito; recuerda tener
            cuidado con compartir tu información con extraños.
          </p>
          <p>¡Escribe tu correo y nos pondremos en contacto contigo!</p>
          <input
            type="email"
            className="form-control"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={handleEmailChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmitEmail}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Nueva tarjeta "Más Información" con descripción detallada */}
      <div className="mascota-info-card">
        <h3>Más Información</h3>
        <p>
          <strong>Descripción:</strong> Es un perro muy cariñoso, y se nos
          perdió hace una semana. Tiene collar con nuestros números telefónicos
          y un código QR para poder ver su perfil en redes sociales. Por favor,
          si lo encuentra, contáctenos de inmediato.
        </p>
        <p>
          <strong>Fecha de Nacimiento:</strong>{" "}
          {mascota.fecha_nacimiento || "No disponible"}
        </p>
        <p>
          <strong>Historial Médico:</strong>{" "}
          {mascota.historial_medico || "No disponible"}
        </p>
      </div>
    </div>
  );
}

export default PerfilMascota;
