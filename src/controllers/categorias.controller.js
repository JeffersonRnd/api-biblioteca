const Categoria = require('../models/categoria.model');

exports.obtenerCategorias = (req, res) => {
    Categoria.obtenerTodos((error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(resultado);
    });
};

exports.obtenerCategoria = (req, res) => {
    const id = req.params.id;

    Categoria.obtenerPorId(id, (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!resultado.length) return res.status(404).json({ error: 'Categoría no encontrada' });
        res.json(resultado[0]);
    });
};

exports.crearCategoria = (req, res) => {
    const data = req.body;

    if (!data.nombre) {
        return res.status(400).json({ error: 'El campo nombre es obligatorio' });
    }

    Categoria.crear(data, (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(201).json({ mensaje: 'Categoría creada', id: resultado.insertId });
    });
};

exports.actualizarCategoria = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if (!data.nombre) {
        return res.status(400).json({ error: 'El campo nombre es obligatorio' });
    }

    Categoria.actualizar(id, data, (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        if (resultado.affectedRows === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
        res.json({ mensaje: 'Categoría actualizada' });
    });
};

exports.eliminarCategoria = (req, res) => {
    const id = req.params.id;

    Categoria.eliminar(id, (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        if (resultado.affectedRows === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
        res.json({ mensaje: 'Categoría eliminada' });
    });
};