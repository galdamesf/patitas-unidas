import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/RecuperarContraseña.css"; // Asegúrate de crear los estilos para este formulario

function RecuperarContraseña() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleRecuperarContraseña = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/recuperar-contraseña",
        { correo }
      );
      setMensaje("Revisa tu correo para instrucciones de recuperación.");
      setCorreo("");
    } catch (error) {
      console.error(
        "Error al recuperar la contraseña:",
        error.response ? error.response.data : error.message
      );
      setMensaje("Hubo un error, por favor intenta de nuevo.");
    }
  };

  return (
    <div className="recuperar-container">
      <h1>Recuperar Contraseña</h1>
      <form onSubmit={handleRecuperarContraseña}>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            Correo
          </label>
          <input
            type="email"
            className="form-control"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Recuperar Contraseña
        </button>
      </form>
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
    </div>
  );
}

export default RecuperarContraseña;
