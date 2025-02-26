const db = require('../database/database'); // Importa la conexión a la base de datos SQLite

// Obtener todos los usuarios
exports.getUsers = (req, res) => {
    // Consulta SQL para obtener todos los registros de la tabla "users"
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message }); // Responde con error si la consulta falla
            return;
        }
        res.json(rows); // Devuelve la lista de usuarios en formato JSON
    });
};

// Agregar un nuevo usuario
exports.addUser = (req, res) => {   
    const { name } = req.body; // Extrae el nombre del cuerpo de la solicitud

    // Validar que el nombre no esté vacío
    if (!name) {
        res.status(400).json({ error: "El nombre es requerido" });
        return;
    }

    // Inserta el nuevo usuario en la base de datos
    db.run("INSERT INTO users (name) VALUES (?)", [name], function (err) {
        if (err) {
            res.status(500).json({ error: err.message }); // Error al insertar en la base de datos
            return;
        }

        // Obtener el último ID insertado
        db.get("SELECT id FROM users ORDER BY id DESC LIMIT 1", (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message }); // Error al obtener el ID
                return;
            }
            const lastInsertedId = row.id; // Obtiene el ID recién insertado
            res.json({ id: lastInsertedId, name }); // Devuelve el usuario agregado con su ID
        });
    });
};

// Eliminar un usuario por ID
exports.deleteUser = (req, res) => {
    const { id } = req.params; // Obtiene el ID del usuario desde la URL
    
    // Ejecuta la consulta para eliminar el usuario con el ID especificado
    db.run("DELETE FROM users WHERE id = ?", id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message }); // Error al eliminar el usuario
            return;
        }

        // Reorganiza los IDs de los usuarios restantes después de la eliminación
        db.serialize(() => {
            db.run("UPDATE users SET id = id - 1 WHERE id > ?", id, function (err) {
                if (err) {
                    res.status(500).json({ error: err.message }); // Error al actualizar los IDs
                    return;
                }
                
                res.json({ message: "Usuario eliminado", changes: this.changes }); // Confirma la eliminación
            });
        });
    });
};