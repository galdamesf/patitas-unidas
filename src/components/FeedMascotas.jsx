import { useState, useEffect } from "react";
import axios from "axios";

function FeedMascotas() {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mascotas");
        setMascotas(response.data);
      } catch (error) {
        console.error("Error fetching mascotas:", error);
      }
    };

    fetchMascotas();
  }, []);

  return (
    <div className="container">
      <h2>Feed de Mascotas Extraviadas</h2>
      <div className="mt-3">
        {mascotas.map((mascota) => (
          <div key={mascota.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{mascota.nombre}</h5>
              <p className="card-text">Raza: {mascota.raza}</p>
              <p className="card-text">Color: {mascota.color}</p>
              <p className="card-text">Ubicación: {mascota.ubicacion}</p>
              {mascota.foto_url && (
                <img
                  src={mascota.foto_url}
                  alt={mascota.nombre}
                  className="img-fluid"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedMascotas;
