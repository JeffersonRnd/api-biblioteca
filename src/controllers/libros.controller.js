const Libro = require('../models/libro.model');

exports.obtenerLibros = (req, res) => {
    Libro.obtenerTodos((error, resultados) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(resultados);
    });
};

exports.obtenerLibro = (req, res) => {
    const id = req.params.id;

    Libro.obtenerPorId(id, (error, resultados) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!resultados.length) return res.status(404).json({ error: 'Libro no encontrado' });
        res.json(resultados[0]);
    });
};

exports.crearLibro = (req, res) => {
    const data = req.body;

    if (!data.titulo) {
        return res.status(400).json({ error: 'El campo titulo es obligatorio' });
    }

    Libro.crear(data, (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(201).json({ mensaje: 'Libro creado', id: resultado.insertId });
    });
};

exports.actualizarLibro = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if (!data.titulo) {
        return res.status(400).json({ error: 'El campo titulo es obligatorio' });
    }

    Libro.actualizar(id, data, (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        if (resultado.affectedRows === 0) return res.status(404).json({ error: 'Libro no encontrado' });
        res.json({ mensaje: 'Libro actualizado' });
    });
};

exports.eliminarLibro = (req, res) => {
    const id = req.params.id;

    Libro.eliminar(id, (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        if (resultado.affectedRows === 0) return res.status(404).json({ error: 'Libro no encontrado' });
        res.json({ mensaje: 'Libro eliminado' });
    });
};