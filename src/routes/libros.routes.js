const express = require('express');
const router = express.Router();
const controller = require('../controllers/libros.controller');

router.get('/',       controller.obtenerLibros);
router.get('/:id',    controller.obtenerLibro);
router.post('/',      controller.crearLibro);
router.put('/:id',    controller.actualizarLibro);
router.delete('/:id', controller.eliminarLibro);

module.exports = router;