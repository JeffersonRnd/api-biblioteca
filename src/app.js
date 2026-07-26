const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const librosRoutes     = require('./routes/libros.routes');
const usuariosRoutes   = require('./routes/usuarios.routes');
const prestamosRoutes  = require('./routes/prestamos.routes');
const categoriasRoutes = require('./routes/categorias.routes');

// Usar rutas
app.use('/libros',     librosRoutes);
app.use('/usuarios',   usuariosRoutes);
app.use('/prestamos',  prestamosRoutes);
app.use('/categorias', categoriasRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.json({ mensaje: 'API Biblioteca funcionando correctamente' });
});

// Ruta no encontrada
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;