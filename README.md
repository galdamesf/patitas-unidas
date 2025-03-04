# Patitas Unidas (aplicación para encontrar mascotas pérdidas)

Esta aplicación facilita la comunicación entre dueños de mascotas perdidas y personas que las han encontrado. Utilizando tecnología moderna, permite una búsqueda rápida y efectiva para recuperar a las mascotas. 

# Tecnologias Usadas

Frontend:

- El frontend de esta aplicación utiliza HTML, CSS y JavaScript, junto con Bootstrap para diseño responsivo y React Vite para una experiencia interactiva. Esta combinación permite una interfaz intuitiva y fluida para los usuarios.


BackEnd:

- El backend está desarrollado en python utilizando frameworks como Flask, que proporcionan una arquitectura flexible y escalable. Esta elección asegura un procesamiento rápido y eficiente de las solicitudes.


Autenticación:

- La seguridad de los usuarios es vital, por lo que se implementó JWT (JSON Web Tokens) para la autenticación. Este método previene el acceso no autorizado y asegura un intercambio seguro de datos entre el cliente y el servidor. 


Base de Datos:

- Se utilizó MySQL como base de datos, lo que permite un manejo eficiente de grandes colúmenes de datos. Además, su capacidad para realizar consultas complejas mejora la recuperación de información sobre mascotas pérdidas y encontradas.

# Integración con Cloudinary

- Para mostrar las fotos de las máscotas pérdidas, heoms logrado una integración con Cloudinary, una plataforma de gestión de imágenes en la nube que permite el almacenamiento, optimización y distribución eficiente de medios.

- Esta integración mejora significativamente la fluidez del sistema, permitiendo una carga rápida de las imágenes y garantizando una experiencia de usuario más ágil y eficiente. 

# Integración de Google Maps

- Se integra un mapa para poder generar la busqueda de la mascota pérdida, la cual genera un código QR al momento de hacer el registro de la mascota en la aplicación. Este código QR pérmite que cualquier usuario pueda escanear el código QR y contactar al dueño del animal extraviado.

- La integración de Google Maps está en desarrollo. 
