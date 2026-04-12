const Prestamo = require('../models/prestamo.model');

exports.obtenerPrestamos = (req, res) => {
    Prestamo.obtenerTodos((error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(resultado);
    });
};

exports.obtenerPrestamo = (req, res) => {
    const id = req.params.id;

    Prestamo.obtenerPorId(id, (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!resultado.length) return res.status(404).json({ error: 'Préstamo no encontrado' });
        res.json(resultado[0]);
    });
};

exports.crearPrestamo = (req, res) => {
    const data = req.body;

    if (!data.id_usuario || !data.id_libro) {
        return res.status(400).json({ error: 'Los campos id_usuario e id_libro son obligatorios' });
    }

    Prestamo.crear(data, (error, resultado) => {
        if (error) return res.status(400).json({ error: error.message });
        res.status(201).json({ mensaje: 'Préstamo creado', id: resultado.insertId });
    });
};

exports.devolverPrestamo = (req, res) => {
    const id = req.params.id;

    Prestamo.devolver(id, (error, resultado) => {
        if (error) return res.status(400).json({ error: error.message });
        res.json({ mensaje: 'Devolución registrada correctamente' });
    });
};

exports.eliminarPrestamo = (req, res) => {
    const id = req.params.id;

    Prestamo.eliminar(id, (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        if (resultado.affectedRows === 0) return res.status(404).json({ error: 'Préstamo no encontrado' });
        res.json({ mensaje: 'Préstamo eliminado' });
    });
};