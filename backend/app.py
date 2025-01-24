from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_cors import CORS
import pymysql
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "super-secret-key"  # Cambia esta clave por una más segura
jwt = JWTManager(app)

# Configuración de la conexión a la base de datos
def get_db_connection():
    return pymysql.connect(
        host='localhost',
        user='root',          # El usuario por defecto en XAMPP es 'root'
        password='',          # La contraseña por defecto es vacía
        database='patitas_unidas',
        client_flag=pymysql.constants.CLIENT.MULTI_STATEMENTS
    )

@app.route('/api/registrar_usuario', methods=['POST'])
def registrar_usuario():
    try:
        nombre = request.json.get('nombre', None)
        apellido = request.json.get('apellido', None)
        correo = request.json.get('correo', None)
        region = request.json.get('region', None)
        comuna = request.json.get('comuna', None)
        telefono = request.json.get('telefono', None)
        contrasena = request.json.get('contrasena', None)
        confirmar_contrasena = request.json.get('confirmar_contrasena', None)

        if not nombre or not apellido or not correo or not region or not comuna or not telefono or not contrasena or not confirmar_contrasena:
            return jsonify({"error": "Todos los campos son obligatorios"}), 422

        if contrasena != confirmar_contrasena:
            return jsonify({"error": "Las contraseñas no coinciden"}), 422

        hashed_password = generate_password_hash(contrasena)

        connection = get_db_connection()
        cursor = connection.cursor()
        query = """
            INSERT INTO usuarios (nombre, apellido, correo, region, comuna, telefono, contrasena) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (nombre, apellido, correo, region, comuna, telefono, hashed_password))
        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({"msg": "Usuario registrado con éxito"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        correo = request.json.get('correo', None)
        contrasena = request.json.get('contrasena', None)

        connection = get_db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        query = "SELECT * FROM usuarios WHERE correo = %s"
        cursor.execute(query, (correo,))
        user = cursor.fetchone()
        cursor.close()
        connection.close()

        if user and check_password_hash(user['contrasena'], contrasena):
            access_token = create_access_token(identity=user['correo'])
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({"msg": "Correo o contraseña incorrectos"}), 401
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/registrar_mascota', methods=['POST'])
@jwt_required()
def registrar_mascota():
    try:
        nombre = request.json.get('nombre', None)
        raza = request.json.get('raza', None)
        color = request.json.get('color', None)
        estado = request.json.get('estado', None)
        ultima_visto = request.json.get('ultima_visto', None)
        ubicacion_actual = request.json.get('ubicacion_actual', None)
        imagen_url = request.json.get('imagen_url', None)  # Agregado para manejar la URL de la imagen
        ubicacion = request.json.get('ubicacion', None)

        region = ubicacion.get('region', None)
        comuna = ubicacion.get('comuna', None)
        calle = ubicacion.get('calle', None)
        numero = ubicacion.get('numero', None)

        user_email = get_jwt_identity()
        connection = get_db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        query_user = "SELECT id FROM usuarios WHERE correo = %s"
        cursor.execute(query_user, (user_email,))
        user = cursor.fetchone()
        user_id = user['id']

        query_ubicacion = "INSERT INTO ubicaciones (region, comuna, calle, numero) VALUES (%s, %s, %s, %s)"
        cursor.execute(query_ubicacion, (region, comuna, calle, numero))
        connection.commit()

        id_ubicacion = cursor.lastrowid

        query_mascota = """
            INSERT INTO mascotas (nombre, raza, color, estado, ultima_visto, ubicacion_actual, imagen_url, id_ubicacion, id_usuario) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query_mascota, (nombre, raza, color, estado, ultima_visto, ubicacion_actual, imagen_url, id_ubicacion, user_id))
        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({"msg": "Mascota registrada con éxito"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/mascota', methods=['GET'])
@app.route('/api/mascota/<int:id_mascota>', methods=['GET'])  # Ruta para obtener una mascota por su id
def obtener_mascotas(id_mascota=None):
    try:
        if id_mascota:
            # Si se pasa un id_mascota, obtenemos esa mascota específica
            connection = get_db_connection()
            cursor = connection.cursor(pymysql.cursors.DictCursor)
            query = """
                SELECT m.*, 
                       u.nombre AS nombre_usuario, 
                       u.apellido AS apellido_usuario, 
                       u2.region, u2.comuna, u2.calle, u2.numero 
                FROM mascotas m 
                JOIN usuarios u ON m.id_usuario = u.id 
                JOIN ubicaciones u2 ON m.id_ubicacion = u2.id_ubicacion 
                WHERE m.id_mascota = %s
            """
            cursor.execute(query, (id_mascota,))
            mascota = cursor.fetchone()
            cursor.close()
            connection.close()

            if mascota:
                return jsonify(mascota)
            else:
                return jsonify({"error": "Mascota no encontrada"}), 404
        else:
            # Si no se pasa un id_mascota, realizamos la búsqueda con criterios
            criterio = request.args.get('criterio', '')
            raza = request.args.get('raza', '')
            color = request.args.get('color', '')
            comuna = request.args.get('comuna', '')

            connection = get_db_connection()
            cursor = connection.cursor(pymysql.cursors.DictCursor)
            query = """
                SELECT m.*, 
                       u.nombre AS nombre_usuario, 
                       u.apellido AS apellido_usuario, 
                       u2.region, u2.comuna, u2.calle, u2.numero 
                FROM mascotas m 
                JOIN usuarios u ON m.id_usuario = u.id 
                JOIN ubicaciones u2 ON m.id_ubicacion = u2.id_ubicacion 
                WHERE m.nombre LIKE %s AND m.raza LIKE %s AND m.color LIKE %s AND u2.comuna LIKE %s
            """
            cursor.execute(query, ('%' + criterio + '%', '%' + raza + '%', '%' + color + '%', '%' + comuna + '%'))
            mascotas = cursor.fetchall()
            cursor.close()
            connection.close()

            return jsonify(mascotas)

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/api/usuario', methods=['GET'])
@jwt_required()
def obtener_usuario():
    try:
        user_email = get_jwt_identity()
        connection = get_db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        query_user = "SELECT nombre, correo, telefono FROM usuarios WHERE correo = %s"
        cursor.execute(query_user, (user_email,))
        user = cursor.fetchone()
        cursor.close()
        connection.close()
        return jsonify(user)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/mascotas_usuario', methods=['GET'])
@jwt_required()
def obtener_mascotas_usuario():
    try:
        user_email = get_jwt_identity()
        connection = get_db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        query_user = "SELECT id FROM usuarios WHERE correo = %s"
        cursor.execute(query_user, (user_email,))
        user = cursor.fetchone()
        user_id = user['id']
        
        query_mascotas = """
            SELECT m.*, u.region, u.comuna, u.calle, u.numero 
            FROM mascotas m 
            JOIN ubicaciones u ON m.id_ubicacion = u.id_ubicacion 
            WHERE m.id_usuario = %s
        """
        cursor.execute(query_mascotas, (user_id,))
        mascotas = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(mascotas)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)