const sqlite3 = require('sqlite3').verbose(); // Importa SQLite3 en modo "verbose" para mejor depuración

// Abre o crea la base de datos en la ruta especificada
const db = new sqlite3.Database('./database/users.db', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos', err.message); // Muestra un error si la conexión falla
    } else {
        console.log('Base de datos conectada.'); // Mensaje de éxito al conectar

        // Crea la tabla "users" si no existe
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,  -- ID autoincremental único
            name TEXT NOT NULL                     -- Nombre del usuario (obligatorio)
        )`);
    }
});

module.exports = db; // Exporta la conexión a la base de datos para usarla en otros archivos