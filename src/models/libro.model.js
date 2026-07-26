const db = require('../config/database');

const Libro = {

    obtenerTodos: (callback) => {
        const sql = `
            SELECT l.*, c.nombre AS categoria_nombre
            FROM libros l
            LEFT JOIN categorias c ON l.categoria_id = c.id_categoria
            ORDER BY l.fecha_registro DESC
        `;
        db.query(sql, callback);
    },

    obtenerPorId: (id, callback) => {
        const sql = `
            SELECT l.*, c.nombre AS categoria_nombre
            FROM libros l
            LEFT JOIN categorias c ON l.categoria_id = c.id_categoria
            WHERE l.id_libro = ?
        `;
        db.query(sql, [id], callback);
    },

    crear: (data, callback) => {
        const sql = `
            INSERT INTO libros (titulo, autor, isbn, categoria_id, anio_publicacion, cantidad, disponibles, descripcion)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(sql, [
            data.titulo,
            data.autor       || null,
            data.isbn        || null,
            data.categoria_id || null,
            data.anio_publicacion || null,
            data.cantidad    ?? 1,
            data.disponibles ?? 1,
            data.descripcion || null
        ], callback);
    },

    actualizar: (id, data, callback) => {
        const sql = `
            UPDATE libros
            SET titulo = ?, autor = ?, isbn = ?, categoria_id = ?, anio_publicacion = ?,
                cantidad = ?, disponibles = ?, descripcion = ?
            WHERE id_libro = ?
        `;
        db.query(sql, [
            data.titulo,
            data.autor        || null,
            data.isbn         || null,
            data.categoria_id || null,
            data.anio_publicacion || null,
            data.cantidad     ?? 1,
            data.disponibles  ?? 1,
            data.descripcion  || null,
            id
        ], callback);
    },

    eliminar: (id, callback) => {
        const sql = "DELETE FROM libros WHERE id_libro = ?";
        db.query(sql, [id], callback);
    }

};

module.exports = Libro;