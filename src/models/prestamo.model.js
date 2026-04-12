const db = require('../config/database');

const Prestamo = {

    obtenerTodos: (callback) => {
        const sql = `
            SELECT p.*,
                   u.nombre, u.apellido, u.dni,
                   l.titulo, l.autor
            FROM prestamos p
            JOIN usuarios u ON p.id_usuario = u.id_usuario
            JOIN libros   l ON p.id_libro   = l.id_libro
            ORDER BY p.fecha_prestamo DESC
        `;
        db.query(sql, callback);
    },

    obtenerPorId: (id, callback) => {
        const sql = `
            SELECT p.*,
                   u.nombre, u.apellido, u.dni,
                   l.titulo, l.autor
            FROM prestamos p
            JOIN usuarios u ON p.id_usuario = u.id_usuario
            JOIN libros   l ON p.id_libro   = l.id_libro
            WHERE p.id_prestamo = ?
        `;
        db.query(sql, [id], callback);
    },

    crear: (data, callback) => {
        // Verificar disponibilidad y crear préstamo en una transacción
        db.getConnection((err, connection) => {
            if (err) return callback(err);

            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    return callback(err);
                }

                // 1. Verificar que el libro tenga disponibles > 0
                connection.query(
                    "SELECT disponibles FROM libros WHERE id_libro = ? FOR UPDATE",
                    [data.id_libro],
                    (err, rows) => {
                        if (err) return connection.rollback(() => { connection.release(); callback(err); });

                        if (!rows.length || rows[0].disponibles <= 0) {
                            return connection.rollback(() => {
                                connection.release();
                                callback(new Error('El libro no tiene ejemplares disponibles'));
                            });
                        }

                        // 2. Insertar el préstamo
                        connection.query(
                            `INSERT INTO prestamos (id_usuario, id_libro, fecha_devolucion, estado)
                             VALUES (?, ?, ?, ?)`,
                            [
                                data.id_usuario,
                                data.id_libro,
                                data.fecha_devolucion || null,
                                data.estado || 'prestado'
                            ],
                            (err, result) => {
                                if (err) return connection.rollback(() => { connection.release(); callback(err); });

                                // 3. Decrementar disponibles
                                connection.query(
                                    "UPDATE libros SET disponibles = disponibles - 1 WHERE id_libro = ?",
                                    [data.id_libro],
                                    (err) => {
                                        if (err) return connection.rollback(() => { connection.release(); callback(err); });

                                        connection.commit((err) => {
                                            connection.release();
                                            if (err) return callback(err);
                                            callback(null, result);
                                        });
                                    }
                                );
                            }
                        );
                    }
                );
            });
        });
    },

    devolver: (id, callback) => {
        db.getConnection((err, connection) => {
            if (err) return callback(err);

            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    return callback(err);
                }

                // 1. Obtener el préstamo
                connection.query(
                    "SELECT * FROM prestamos WHERE id_prestamo = ?",
                    [id],
                    (err, rows) => {
                        if (err) return connection.rollback(() => { connection.release(); callback(err); });

                        if (!rows.length) {
                            return connection.rollback(() => {
                                connection.release();
                                callback(new Error('Préstamo no encontrado'));
                            });
                        }

                        const prestamo = rows[0];

                        // 2. Marcar como devuelto
                        connection.query(
                            `UPDATE prestamos
                             SET estado = 'devuelto', fecha_devolucion_real = CURDATE()
                             WHERE id_prestamo = ?`,
                            [id],
                            (err) => {
                                if (err) return connection.rollback(() => { connection.release(); callback(err); });

                                // 3. Incrementar disponibles
                                connection.query(
                                    "UPDATE libros SET disponibles = disponibles + 1 WHERE id_libro = ?",
                                    [prestamo.id_libro],
                                    (err) => {
                                        if (err) return connection.rollback(() => { connection.release(); callback(err); });

                                        connection.commit((err) => {
                                            connection.release();
                                            if (err) return callback(err);
                                            callback(null, { mensaje: 'Devolución registrada' });
                                        });
                                    }
                                );
                            }
                        );
                    }
                );
            });
        });
    },

    eliminar: (id, callback) => {
        const sql = "DELETE FROM prestamos WHERE id_prestamo = ?";
        db.query(sql, [id], callback);
    }

};

module.exports = Prestamo;