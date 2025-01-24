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
import Footer from "./components/Footer";
import EstadisticasPerdidos from "./components/EstadisticasPerdidos"; // Importa el componente

function App() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null); // Agregar estado para las estadísticas

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUser({
        id: decodedToken.id,
        email: decodedToken.email,
      });
    }

    // Simula la carga de estadísticas
    const loadStats = () => {
      setStats({
        totalLost: 150,
        recovered: 120,
        recoveryRate: 80,
        lostRate: 30, // Agregar lostRate aquí para evitar el warning
        adopted: 50,
        animals: [
          {
            id: 1,
            name: "Perro 1",
            image: "/perro1.jpg",
            description: "Perro perdido 1",
          },
          {
            id: 2,
            name: "Perro 2",
            image: "/perro2.jpg",
            description: "Perro perdido 2",
          },
        ],
      });
    };

    loadStats(); // Llama a la función para simular la carga de estadísticas
  }, []);

  const goToRegister = () => {
    // Aquí va la lógica para manejar la acción del botón
    alert("Redirigiendo a registro...");
  };

  const goToMoreInfo = () => {
    // Aquí va la lógica para manejar la acción del botón
    alert("Mostrando más información...");
  };

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
          <Route
            path="/hogar_temporal"
            element={<HogarTemporal dogs={[]} goToRegister={goToRegister} />} // Aquí se pasa el prop goToRegister
          />
          <Route
            path="/perfil_mascota/:id_mascota"
            element={<PerfilMascota />}
          />
          <Route
            path="/recuperar_contraseña"
            element={<RecuperarContraseña />}
          />
          <Route path="/" element={user ? <Home /> : <Login />} />

          {/* Ruta para el componente de estadísticas */}
          <Route
            path="/estadisticas"
            element={
              stats ? (
                <EstadisticasPerdidos
                  stats={stats}
                  goToMoreInfo={goToMoreInfo}
                />
              ) : (
                <p>Cargando estadísticas...</p> // Mientras se cargan los datos
              )
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
