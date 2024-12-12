import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para redirigir a la página de perfil

function RegistrarMascota() {
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [color, setColor] = useState("");
  const [estado, setEstado] = useState("Buscada");
  const [ultimaVisto, setUltimaVisto] = useState("");
  const [ubicacionActual, setUbicacionActual] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");

  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  const handleRegistrar = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    if (!token) {
      alert("Token no encontrado. Por favor, inicie sesión nuevamente.");
      navigate("/login"); // Redirigir al login si no hay token
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:5000/api/registrar_mascota",
        {
          nombre,
          raza,
          color,
          estado,
          ultima_visto: estado === "Buscada" ? ultimaVisto : null,
          ubicacion_actual: estado === "Encontrada" ? ubicacionActual : null,
          ubicacion: { region, comuna, calle, numero },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Mascota registrada con éxito");
      navigate("/perfil"); // Redirigir al perfil de la mascota
    } catch (error) {
      if (error.response && error.response.data.msg === "Token has expired") {
        alert("Tu sesión ha expirado. Por favor, inicie sesión nuevamente.");
        localStorage.removeItem("token"); // Borrar el token expirado
        navigate("/login"); // Redirigir al login
      } else {
        console.error(
          "Error registrando mascota:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  // Esta función se usa para formatear la fecha y hora sin los segundos
  const formatDate = (datetime) => {
    if (!datetime) return "";
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`; // Formato: yyyy-MM-ddTHH:mm
  };

  return (
    <div className="container">
      <h2>Registrar Mascota</h2>
      <form onSubmit={handleRegistrar}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="raza" className="form-label">
            Raza
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
            Color
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
          <label htmlFor="estado" className="form-label">
            Estado
          </label>
          <select
            id="estado"
            className="form-control"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Buscada">Buscada</option>
            <option value="Encontrada">Encontrada</option>
          </select>
        </div>
        {estado === "Buscada" && (
          <div className="mb-3">
            <label htmlFor="ultimaVisto" className="form-label">
              Última vez visto
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="ultimaVisto"
              value={formatDate(ultimaVisto)}
              onChange={(e) => setUltimaVisto(e.target.value)}
            />
          </div>
        )}
        {estado === "Encontrada" && (
          <div className="mb-3">
            <label htmlFor="ubicacionActual" className="form-label">
              Ubicación actual
            </label>
            <input
              type="text"
              className="form-control"
              id="ubicacionActual"
              value={ubicacionActual}
              onChange={(e) => setUbicacionActual(e.target.value)}
            />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="region" className="form-label">
            Región
          </label>
          <input
            type="text"
            className="form-control"
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="comuna" className="form-label">
            Comuna
          </label>
          <input
            type="text"
            className="form-control"
            id="comuna"
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="calle" className="form-label">
            Calle
          </label>
          <input
            type="text"
            className="form-control"
            id="calle"
            value={calle}
            onChange={(e) => setCalle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="numero" className="form-label">
            Número
          </label>
          <input
            type="text"
            className="form-control"
            id="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default RegistrarMascota;
