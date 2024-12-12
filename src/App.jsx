import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import RegistrarUsuario from "./components/RegistrarUsuario";
import RegistrarMascota from "./components/RegistrarMascota";
import ListaMascotas from "./components/ListaMascotas";
import ActualizarMascota from "./components/ActualizarMascota";
import PerfilUsuario from "./components/PerfilUsuario";
import PerfilMascota from "./components/PerfilMascota";
import Home from "./components/Home";
import RecuperarContraseña from "./components/RecuperarContraseña";
import HogarTemporal from "./components/HogarTemporal";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUser({
        id: decodedToken.id,
        email: decodedToken.email,
      });
    }
  }, []);

  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registrar_usuario" element={<RegistrarUsuario />} />
          <Route path="/registrar" element={<RegistrarMascota />} />
          <Route path="/mascotas" element={<ListaMascotas />} />
          <Route path="/actualizar" element={<ActualizarMascota />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/hogar_temporal" element={<HogarTemporal dogs={[]} />} />
          <Route
            path="/perfil_mascota/:id_mascota"
            element={<PerfilMascota />}
          />

          <Route
            path="/recuperar_contraseña"
            element={<RecuperarContraseña />}
          />
          <Route
            path="/"
            element={user ? <Home /> : <Login />} // Redirige según el estado de autenticación
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
