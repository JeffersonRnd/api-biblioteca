const Usuario = require('../models/usuario.model');

exports.obtenerUsuarios = (req, res) => {
    Usuario.obtenerTodos((error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(resultado);
    });
};

exports.obtenerUsuario = (req, res) => {
    const id = req.params.id;

    Usuario.obtenerPorId(id, (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        if (!resultado.length) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(resultado[0]);
    });
};

exports.crearUsuario = (req, res) => {
    const data = req.body;

    if (!data.nombre || !data.apellido) {
        return res.status(400).json({ error: 'Los campos nombre y apellido son obligatorios' });
    }

    Usuario.crear(data, (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(201).json({ mensaje: 'Usuario creado', id: resultado.insertId });
    });
};

exports.actualizarUsuario = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if (!data.nombre || !data.apellido) {
        return res.status(400).json({ error: 'Los campos nombre y apellido son obligatorios' });
    }

    Usuario.actualizar(id, data, (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        if (resultado.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ mensaje: 'Usuario actualizado' });
    });
};

exports.eliminarUsuario = (req, res) => {
    const id = req.params.id;

    Usuario.eliminar(id, (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        if (resultado.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ mensaje: 'Usuario eliminado' });
    });
};