import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../css/ListaMascotas.css"; // Asegúrate de tener el CSS actualizado

function ListaMascotas() {
  const [mascotas, setMascotas] = useState([]);
  const [criterio, setCriterio] = useState("");
  const [raza, setRaza] = useState("");
  const [color, setColor] = useState("");
  const [comuna, setComuna] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.id);
    }
  }, []);

  useEffect(() => {
    const fetchMascotas = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token no encontrado. Por favor, inicie sesión nuevamente.");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:5000/api/mascota", {
          params: { criterio, raza, color, comuna },
          headers: { Authorization: `Bearer ${token}` },
        });
        setMascotas(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Token no válido. Inicie sesión nuevamente.");
        } else {
          console.error("Error obteniendo mascotas:", error);
        }
      }
    };

    fetchMascotas();
  }, [criterio, raza, color, comuna]);

  return (
    <div className="lista-mascotas-container">
      <header className="lista-mascotas-header">
        <h1 className="lista-mascotas-app-name"></h1>
        <FaUserCircle
          className="lista-mascotas-profile-icon"
          onClick={() => navigate("/perfil")}
        />
      </header>
      {/* Jumbotron con imagen de fondo */}
      <div className="jumbotron jumbotron-fluid hero-section-lista">
        <div className="container text-center text-white">
          <h1 className="display-4">Lista de Mascotas Perdidas</h1>
        </div>
      </div>

      <div className="lista-mascotas-filter-container card shadow-sm p-4 mb-4">
        <h2 className="lista-mascotas-filter-title mb-4">Filtrar Mascotas</h2>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="criterio" className="lista-mascotas-form-label">
              Buscar por Nombre
            </label>
            <input
              type="text"
              className="form-control lista-mascotas-input"
              id="criterio"
              value={criterio}
              onChange={(e) => setCriterio(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="raza" className="lista-mascotas-form-label">
              Buscar por Raza
            </label>
            <input
              type="text"
              className="form-control lista-mascotas-input"
              id="raza"
              value={raza}
              onChange={(e) => setRaza(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="color" className="lista-mascotas-form-label">
              Buscar por Color
            </label>
            <input
              type="text"
              className="form-control lista-mascotas-input"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="comuna" className="lista-mascotas-form-label">
              Buscar por Comuna
            </label>
            <input
              type="text"
              className="form-control lista-mascotas-input"
              id="comuna"
              value={comuna}
              onChange={(e) => setComuna(e.target.value)}
            />
          </div>
        </div>
      </div>

      <ul className="lista-mascotas-list-group">
        {mascotas.map((mascota) => (
          <li key={mascota.id_mascota} className="lista-mascotas-list-item">
            {/* Imagen de la mascota */}
            <img
              src={
                mascota.imagen ||
                "http://res.cloudinary.com/dyxvazlpg/image/upload/v1735070220/yohwpmac5cjysaez1puf.jpg"
              } // Imagen de la mascota (si no existe, se usa una imagen por defecto)
              className="card-img-top"
              alt={mascota.nombre}
            />
            <h5 className="lista-mascotas-nombre">{mascota.nombre}</h5>
            <p>Raza: {mascota.raza}</p>
            <p>Color: {mascota.color}</p>
            <p>Estado: {mascota.estado}</p>
            {mascota.estado === "Buscada" && (
              <p>Última vez visto en: {mascota.ultima_visto}</p>
            )}
            {mascota.estado === "Encontrada" && (
              <p>Ubicación actual: {mascota.ubicacion_actual}</p>
            )}
            <p>
              Ubicación:{" "}
              {`${mascota.calle}, ${mascota.numero}, ${mascota.comuna}, ${mascota.region}`}
            </p>
            <p className="lista-mascotas-registrado-por">
              Registrado por: {mascota.nombre_usuario}{" "}
              {mascota.apellido_usuario}
            </p>
            {mascota.id_usuario !== userId && (
              <button
                className="btn lista-mascotas-btn"
                onClick={() =>
                  navigate(`/perfil_mascota/${mascota.id_mascota}`)
                }
              >
                Ver detalles
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaMascotas;
