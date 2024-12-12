import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/PerfilMascota.css"; // Asegúrate de crear este archivo CSS para los estilos

function PerfilMascota() {
  const { id_mascota } = useParams();
  const navigate = useNavigate(); // Hook para redireccionar
  const [mascota, setMascota] = useState(null);

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

    fetchMascota();
  }, [id_mascota]);

  const esMascotaCompleta = (mascota) => {
    return mascota && mascota.nombre && mascota.raza && mascota.estado;
  };

  if (!mascota) {
    return <div>Cargando perfil de la mascota...</div>;
  }

  if (!esMascotaCompleta(mascota)) {
    return <div>Información de la mascota incompleta.</div>;
  }

  return (
    <div className="mascota-card">
      <div className="mascota-card-header">
        <img
          src={mascota.foto || "https://via.placeholder.com/150"}
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
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/mascotas")}
        >
          Volver a la lista
        </button>
      </div>
    </div>
  );
}

export default PerfilMascota;
