const { Router } = require('express');
const { getCategorias,addCategoria,editarCategoria,eliminarCategoria
    } = require('../controllers/categoriasController');
const router = Router();
router.get('/allcategorias', getCategorias);
router.post('/addcategoria', addCategoria);
router.post('/editar_categoria', editarCategoria);
router.post('/eliminar_categoria', eliminarCategoria);

module.exports = router;