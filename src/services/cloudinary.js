import axios from "axios";

// Esta función manejará la carga de imágenes a Cloudinary
export const subirImagen = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile); // Archivo de imagen
  formData.append("upload_preset", "patitas_unidas"); // Upload preset (asegúrate de que sea "unsigned")

  try {
    // Realiza la petición POST a Cloudinary
    const response = await axios.post(
      "http://res.cloudinary.com/dyxvazlpg/image/upload/v1735070220/yohwpmac5cjysaez1puf.jpg",
      formData
    );
    // Retorna la URL segura de la imagen cargada
    console.log("Imagen subida con éxito:", response.data.secure_url);
    return response.data.secure_url; // Esto retorna la URL segura
  } catch (error) {
    console.error(
      "Error al subir la imagen:",
      error.response?.data || error.message
    );
    throw error; // Relanza el error para manejarlo en el
  }
};
