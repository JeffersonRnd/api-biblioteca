const db = require('../config/database');

const Usuario = {

    obtenerTodos: (callback) => {
        const sql = "SELECT * FROM usuarios ORDER BY fecha_registro DESC";
        db.query(sql, callback);
    },

    obtenerPorId: (id, callback) => {
        const sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
        db.query(sql, [id], callback);
    },

    crear: (data, callback) => {
        const sql = `
            INSERT INTO usuarios (nombre, apellido, dni, correo, telefono, estado)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(sql, [
            data.nombre,
            data.apellido,
            data.dni          || null,
            data.correo       || null,
            data.telefono     || null,
            data.estado       || 'activo'
        ], callback);
    },

    actualizar: (id, data, callback) => {
        const sql = `
            UPDATE usuarios
            SET nombre = ?, apellido = ?, dni = ?, correo = ?, telefono = ?, estado = ?
            WHERE id_usuario = ?
        `;
        db.query(sql, [
            data.nombre,
            data.apellido,
            data.dni      || null,
            data.correo   || null,
            data.telefono || null,
            data.estado   || 'activo',
            id
        ], callback);
    },

    eliminar: (id, callback) => {
        const sql = "DELETE FROM usuarios WHERE id_usuario = ?";
        db.query(sql, [id], callback);
    }

};

module.exports = Usuario;