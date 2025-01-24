import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url


# Configuración de Cloudinary
cloudinary.config(
    cloud_name="dyxvazlpg",
    api_key="661164559778782",
    api_secret="cuo7_vUWOw1vzgDiAlm0rXd0XJE",
    secure=True
)

# Subir una imagen
upload_result = cloudinary.uploader.upload(
    "http://res.cloudinary.com/dyxvazlpg/image/upload/v1735070220/yohwpmac5cjysaez1puf.jpg", 
    public_id="Mascota1"
)

print(upload_result["secure_url"])

# Generar URL optimizada
optimize_url, _ = cloudinary_url("shoes", fetch_format="auto", quality="auto")
print(optimize_url)

# Generar URL con recorte automático y tamaño personalizado
auto_crop_url, _ = cloudinary_url("shoes", width=500, height=500, crop="auto", gravity="auto")
print(auto_crop_url)
