import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../css/ListaMascotas.css";

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
    <div className="container">
      <header className="header">
        <h1 className="app-name">Patitas Unidas</h1>
        <FaUserCircle
          className="profile-icon"
          onClick={() => navigate("/perfil")}
        />
      </header>
      <div className="filter-container">
        <div className="mb-3">
          <label htmlFor="criterio" className="form-label">
            Buscar por Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="criterio"
            value={criterio}
            onChange={(e) => setCriterio(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="raza" className="form-label">
            Buscar por Raza
          </label>
          <input
            type="text"
            className="form-control"
            id="raza"
            value={raza}
            onChange={(e) => setRaza(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="color" className="form-label">
            Buscar por Color
          </label>
          <input
            type="text"
            className="form-control"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="comuna" className="form-label">
            Buscar por Comuna
          </label>
          <input
            type="text"
            className="form-control"
            id="comuna"
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
          />
        </div>
      </div>
      <button className="btn-register" onClick={() => navigate("/registrar")}>
        Registrar Mascota
      </button>
      <ul className="list-group">
        {mascotas.map((mascota) => (
          <li key={mascota.id_mascota} className="list-group-item">
            <h5 className="mascota-nombre">{mascota.nombre}</h5>
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
            <p className="registrado-por">
              Registrado por: {mascota.nombre_usuario}{" "}
              {mascota.apellido_usuario}
            </p>
            {mascota.id_usuario !== userId && (
              <button
                className="btn btn-primary"
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
