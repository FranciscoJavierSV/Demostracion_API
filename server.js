// Importación de módulos necesarios
const fs = require('fs'); // Módulo para manipulación de archivos
const os = require('os'); // Módulo para obtener información del sistema operativo

require('dotenv').config(); // Carga las variables de entorno desde un archivo .env
const express = require('express'); // Framework para crear el servidor web
const cors = require('cors'); // Middleware para permitir peticiones desde otros dominios (CORS)
const path = require('path'); // Módulo para manejar rutas de archivos y directorios
const usersRoutes = require('./routes/users'); // Importación de las rutas de usuarios

const app = express(); // Creación de la aplicación Express
const PORT = process.env.PORT || 3000; // Puerto del servidor, usa el de .env o el 3000 por defecto

// Función para obtener la IP local automáticamente
function getLocalIP() {
    const interfaces = os.networkInterfaces(); // Obtiene todas las interfaces de red del sistema
    for (let name in interfaces) {
        for (let net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) { // Filtra solo las IPv4 externas
                return net.address; // Retorna la dirección IP encontrada
            }
        }
    }
    return 'localhost'; // Si no encuentra una IP, usa 'localhost'
}

const LOCAL_IP = getLocalIP(); // Obtiene la IP local
const API_URL = `http://${LOCAL_IP}:${PORT}`; // Construye la URL del servidor

// Leer el archivo .env actual y actualizar solo la IP sin borrar otras variables
let envContent = fs.readFileSync('.env', 'utf8').split('\n'); // Lee el contenido del .env y lo separa por líneas
let newEnvContent = envContent.map(line => 
    line.startsWith('SERVER_IP=') ? `SERVER_IP=${LOCAL_IP}` : line // Si ya existe SERVER_IP, la reemplaza
).join('\n');

// Si no existe la variable SERVER_IP, la agrega al final del archivo
if (!envContent.some(line => line.startsWith('SERVER_IP='))) {
    newEnvContent += `\nSERVER_IP=${LOCAL_IP}`;
}

// Escribe el contenido actualizado en el archivo .env
fs.writeFileSync('.env', newEnvContent);

// Middleware
app.use(express.json()); // Habilita el soporte para JSON en las solicitudes
app.use(cors()); // Habilita CORS para permitir peticiones desde otros dominios
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos desde la carpeta "public"

// Ruta principal del servidor
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Envía el archivo index.html al acceder a "/"
});

app.use('/api', usersRoutes); // Usa las rutas definidas en usersRoutes para las peticiones a "/api"

// Inicia el servidor y lo escucha en todas las interfaces disponibles ('0.0.0.0')
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en ${API_URL}`); // Muestra la URL del servidor en la consola
});