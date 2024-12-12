import { useState } from "react";
import axios from "axios";

function BuscarMascota() {
  const [criterio, setCriterio] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleBuscar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/api/mascotas?criterio=${criterio}`
      );
      setResultados(response.data);
    } catch (error) {
      console.error("Error buscando mascotas:", error);
    }
  };

  return (
    <div className="container">
      <h2>Buscar Mascota</h2>
      <form onSubmit={handleBuscar}>
        <div className="mb-3">
          <label htmlFor="criterio" className="form-label">
            Criterio de búsqueda
          </label>
          <input
            type="text"
            className="form-control"
            id="criterio"
            value={criterio}
            onChange={(e) => setCriterio(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </form>
      <div className="mt-3">
        {resultados.map((mascota) => (
          <div key={mascota.id} className="card">
            <div className="card-body">
              <h5 className="card-title">{mascota.nombre}</h5>
              <p className="card-text">Raza: {mascota.raza}</p>
              <p className="card-text">Color: {mascota.color}</p>
              <p className="card-text">Ubicación: {mascota.ubicacion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuscarMascota;
