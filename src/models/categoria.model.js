const db = require('../config/database');

const Categoria = {

    obtenerTodos: (callback) => {
        const sql = "SELECT * FROM categorias ORDER BY nombre ASC";
        db.query(sql, callback);
    },

    obtenerPorId: (id, callback) => {
        const sql = "SELECT * FROM categorias WHERE id_categoria = ?";
        db.query(sql, [id], callback);
    },

    crear: (data, callback) => {
        const sql = "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)";
        db.query(sql, [data.nombre, data.descripcion || null], callback);
    },

    actualizar: (id, data, callback) => {
        const sql = "UPDATE categorias SET nombre = ?, descripcion = ? WHERE id_categoria = ?";
        db.query(sql, [data.nombre, data.descripcion || null, id], callback);
    },

    eliminar: (id, callback) => {
        const sql = "DELETE FROM categorias WHERE id_categoria = ?";
        db.query(sql, [id], callback);
    }

};

module.exports = Categoria;