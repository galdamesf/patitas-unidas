import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import "../css/PerfilUsuario.css";

function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eliminarActivo, setEliminarActivo] = useState(false); // Estado para manejar el color del botón
  const [fotosPerros, setFotosPerros] = useState({}); // Para almacenar las fotos de los perros

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token no encontrado. Por favor, inicie sesión nuevamente.");
        setLoading(false);
        return;
      }

      try {
        const usuarioResponse = await axios.get(
          "http://127.0.0.1:5000/api/usuario",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsuario(usuarioResponse.data);

        const mascotasResponse = await axios.get(
          "http://127.0.0.1:5000/api/mascotas_usuario",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMascotas(mascotasResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Token no válido. Inicie sesión nuevamente.");
        } else {
          setError("Error al cargar los datos.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para obtener imágenes aleatorias de perros
  useEffect(() => {
    const fetchFotosPerros = async () => {
      try {
        const response = await axios.get(
          "https://dog.ceo/api/breeds/image/random/10"
        );
        const perrosFotos = response.data.message;
        const perrosFotosMap = perrosFotos.reduce((acc, url, index) => {
          acc[index] = url;
          return acc;
        }, {});
        setFotosPerros(perrosFotosMap);
      } catch (error) {
        console.error("Error al obtener las fotos de perros:", error);
      }
    };

    fetchFotosPerros();
  }, [mascotas.length]);

  const handleEliminar = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token no encontrado. Por favor, inicie sesión nuevamente.");
      return;
    }

    setEliminarActivo(true); // Cambia el estado del botón a activo (color naranja)

    try {
      await axios.delete(`http://127.0.0.1:5000/api/eliminar_mascota/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Mascota eliminada con éxito");

      // Eliminar la mascota de la lista de mascotas de manera reactiva
      setMascotas((prevMascotas) =>
        prevMascotas.filter((mascota) => mascota.id_mascota !== id)
      );
    } catch (error) {
      alert("Error eliminando mascota.");
    } finally {
      setEliminarActivo(false); // Vuelve al color original después de la acción
    }
  };

  const isMascotaCompleta = (mascota) => {
    return mascota.nombre && mascota.raza && mascota.estado;
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="my-4">Perfil de Usuario</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Información del Usuario</h5>
          <p>
            <strong>Nombre:</strong> {usuario.nombre}
          </p>
          <p>
            <strong>Correo:</strong> {usuario.correo}
          </p>
          <p>
            <strong>Teléfono:</strong> {usuario.telefono}
          </p>
        </div>
      </div>

      <h3 className="my-4">Mascotas Registradas</h3>
      {mascotas.length === 0 ? (
        <p>No tienes mascotas registradas.</p>
      ) : (
        <div className="row">
          {mascotas.map((mascota, index) => (
            <div key={mascota.id_mascota} className="col-md-4 mb-4">
              <div className="card">
                {/* Aquí se agrega la imagen de la mascota */}
                <img
                  src={
                    mascota.imagen ||
                    "http://res.cloudinary.com/dyxvazlpg/image/upload/v1735070220/yohwpmac5cjysaez1puf.jpg"
                  } // Imagen de la mascota, con un placeholder por defecto
                  className="card-img-top"
                  alt={mascota.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title">{mascota.nombre}</h5>
                  <p className="card-text">
                    <strong>Raza:</strong> {mascota.raza}
                    <br />
                    <strong>Color:</strong> {mascota.color}
                    <br />
                    <strong>Ubicación:</strong>{" "}
                    {`${mascota.calle}, ${mascota.numero}, ${mascota.comuna}, ${mascota.region}`}
                  </p>
                  <button
                    className={`btn ${
                      eliminarActivo ? "btn-warning" : "btn-danger"
                    }`}
                    onClick={() => handleEliminar(mascota.id_mascota)}
                  >
                    Eliminar
                  </button>
                  {isMascotaCompleta(mascota) && (
                    <Link
                      to={`/perfil_mascota/${mascota.id_mascota}`}
                      className="btn btn-primary"
                    >
                      Ver Perfil
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PerfilUsuario;
