const { Router } = require('express');
const { getEstados,addEstado,editarEstado,eliminarEstado
    } = require('../controllers/estadosController');
const router = Router();
router.get('/allestados', getEstados);
router.post('/addestado', addEstado);
router.post('/editar_estado', editarEstado);
router.post('/eliminar_estado', eliminarEstado);
module.exports = router;