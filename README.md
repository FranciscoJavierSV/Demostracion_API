#Practica
#Alumno Francisco Javier Sanchez Vallin
#Sistemas Computacionales 4C

# Demostracion_API-GET-POST-
proyecto basico de conectar un server y probar una API en NODE.js

# 📌 Servidor2 - API con Node.js y SQLite

Este proyecto es una API creada con **Node.js**, **Express** y **SQLite** para gestionar usuarios. 🚀

## 📥 Instalación

### Requisitos previos
- Tener **Node.js** instalado en tu sistema.
- Tener **npm** (incluido con Node.js).

### Pasos de instalación
1. Clonar o descargar el proyecto:
   git clone https://github.com/FranciscoJavierSV/Demostracion_API-GET-POST-/tree/main
   cd Servidor2

2. Instalar dependencias:
   npm install

3. Configurar el entorno:
   - Crea un archivo `.env` en la raíz del proyecto y define el puerto si es necesario:
     echo "PORT=3000" > .env

   - El servidor actualizará automáticamente la variable SERVER_IP con la IP local.

## 📁 Estructura del Proyecto

Servidor2/
│── controllers/      # Controladores de la lógica de negocio
│   ├── usersController.js
│── database/         # Base de datos y conexión
│   ├── database.js
│   ├── users.db      # Archivo de la base de datos SQLite
│── public/           # Archivos estáticos como HTML, CSS, JS
│   ├── index.html
│── routes/           # Definición de rutas
│   ├── users.js
│── .env              # Variables de entorno
│── server.js         # Archivo principal del servidor
│── package.json      # Configuración de dependencias

## ▶️ Uso del Servidor

### Iniciar el servidor
Ejecuta el siguiente comando para arrancar el servidor:

   npm start

Si tienes `nodemon` instalado, puedes usar:

   npx nodemon server.js

El servidor estará disponible en:
   http://localhost:3000

## 🛠️ Endpoints Disponibles

### 📌 Obtener todos los usuarios
GET `/api/users`
- Retorna la lista de usuarios en la base de datos.

### 📌 Agregar un usuario
POST `/api/users`
- Body (JSON):
  {
    "name": "Nombre del usuario"
  }

### 📌 Eliminar un usuario por ID
DELETE `/api/users/:id`
- Reemplaza `:id` con el ID del usuario a eliminar.


