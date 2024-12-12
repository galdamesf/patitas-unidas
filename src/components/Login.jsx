import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        correo,
        contrasena,
      });
      const token = response.data.access_token;
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token almacenado:", token);
        navigate("/mascotas"); // Redirigir a /mascotas después del login
      } else {
        console.error("Token no recibido");
      }
    } catch (error) {
      console.error(
        "Login fallido:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="login-container">
      <h1 className="app-name">Patitas Unidas</h1>
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <div className="login-options">
          <Link to="/registrar_usuario">Registrarse</Link>
          <Link to="/recuperar_contraseña">¿Olvidó su contraseña?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
