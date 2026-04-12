const express = require('express');
const router = express.Router();
const controller = require('../controllers/categorias.controller');

router.get('/',       controller.obtenerCategorias);
router.get('/:id',    controller.obtenerCategoria);
router.post('/',      controller.crearCategoria);
router.put('/:id',    controller.actualizarCategoria);
router.delete('/:id', controller.eliminarCategoria);

module.exports = router;