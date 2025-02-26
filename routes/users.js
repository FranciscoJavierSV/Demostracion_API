const express = require('express'); // Importa Express
const router = express.Router(); // Crea un enrutador de Express
const usersController = require('../controllers/usersController'); // Importa el controlador de usuarios

// Ruta para obtener la lista de usuarios (GET /api/users)
router.get('/users', usersController.getUsers);

// Ruta para agregar un nuevo usuario (POST /api/users)
router.post('/users', usersController.addUser);

// Ruta para eliminar un usuario por ID (DELETE /api/users/:id)
router.delete('/users/:id', usersController.deleteUser);

module.exports = router; // Exporta el router para ser usado en la aplicación principal