const { Router } = require('express');
const { getAreas,addArea,editarArea,eliminarArea,getArea,addCategoriaAlArea,getCategoriasArea
    } = require('../controllers/areaController');
const router = Router();
router.get('/allareas', getAreas);
router.post('/addarea', addArea);
router.post('/editar_area', editarArea);
router.post('/eliminar_area', eliminarArea);
router.get('/area-id/:id', getArea);
router.post('/addcategoria', addCategoriaAlArea);
router.post('/getcategoriaArea', getCategoriasArea);


module.exports = router;