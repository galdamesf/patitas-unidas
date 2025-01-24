import { useState } from "react";
import axios from "axios";

function ActualizarMascota() {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [color, setColor] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [fotos, setFotos] = useState([]); // Cambio aquí, para manejar varios archivos

  const handleActualizar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token no encontrado. Por favor, inicie sesión nuevamente.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("raza", raza);
      formData.append("color", color);
      formData.append(
        "ubicacion",
        JSON.stringify({ region, comuna, calle, numero })
      );

      // Agregar las fotos seleccionadas
      fotos.forEach((foto) => formData.append("fotos", foto));

      await axios.put(
        `http://127.0.0.1:5000/api/actualizar_mascota/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Aseguramos que el contenido sea multipart
          },
        }
      );
      alert("Mascota actualizada con éxito");
    } catch (error) {
      console.error(
        "Error actualizando mascota:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleFotosChange = (e) => {
    setFotos([...e.target.files]); // Guardar todos los archivos seleccionados
  };

  return (
    <div className="container">
      <h2>Actualizar Mascota</h2>
      <form onSubmit={handleActualizar}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            ID de Mascota
          </label>
          <input
            type="text"
            className="form-control"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
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

        {/* Cambiado a 'multiple' para permitir seleccionar varios archivos */}
        <div className="mb-3">
          <label htmlFor="fotos" className="form-label">
            Fotos de la Mascota
          </label>
          <input
            type="file"
            className="form-control"
            id="fotos"
            multiple // Permite seleccionar varios archivos
            onChange={handleFotosChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Actualizar
        </button>
      </form>
    </div>
  );
}

export default ActualizarMascota;
