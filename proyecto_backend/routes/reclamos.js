const { Router } = require('express');
const { getReclamos,
    getReclamo,
    getReclamoPorFecha,
    getReclamoPorEstado,
    getReclamoPorCategoria,
    cambiarEstado,
    cambiarArea,
    enviarMail,
    cambiarComentario,
    getReclamosArea
    } = require('../controllers/reclamoController');
const router = Router();

router.get('/:area', getReclamos);
router.get('/reclamo-id/:id', getReclamo);
router.post('/reclamos-fecha', getReclamoPorFecha);
router.post('/reclamos-estado', getReclamoPorEstado);
router.get('/reclamos-categoria', getReclamoPorCategoria);
router.post('/reclamos-update-estado-id', cambiarEstado);
router.post('/reclamo-change-comentario', cambiarComentario);
router.post('/reclamo-change-area', cambiarArea);
router.post('/reclamoArea', getReclamosArea);



router.post('/enviar-mail-dos', enviarMail);

module.exports = router;
