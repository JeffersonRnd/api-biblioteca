const express = require('express');
const router = express.Router();
const controller = require('../controllers/prestamos.controller');

router.get('/',              controller.obtenerPrestamos);
router.get('/:id',           controller.obtenerPrestamo);
router.post('/',             controller.crearPrestamo);
router.put('/:id/devolver',  controller.devolverPrestamo);
router.delete('/:id',        controller.eliminarPrestamo);

module.exports = router;