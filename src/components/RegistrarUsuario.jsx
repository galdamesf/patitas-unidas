import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrarUsuario() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const navigate = useNavigate();

  const handleRegistrar = async (e) => {
    e.preventDefault();
    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      await axios.post("http://127.0.0.1:5000/api/registrar_usuario", {
        nombre,
        apellido,
        correo,
        region,
        comuna,
        telefono,
        contrasena,
        confirmar_contrasena: confirmarContrasena,
      });
      alert("Usuario registrado con éxito");
      navigate("/login");
    } catch (error) {
      console.error(
        "Error registrando usuario:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container">
      <h2>Registrar Usuario</h2>
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
          <label htmlFor="apellido" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
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
          />
        </div>
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
          <label htmlFor="telefono" className="form-label">
            Teléfono
          </label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contrasena" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmarContrasena" className="form-label">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmarContrasena"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default RegistrarUsuario;
