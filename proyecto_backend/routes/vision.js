const  { Router } = require('express');
const { getPrueba,visionReconocerObjetos } = require('../controllers/googleVisionController');
const router = Router();

/* router.post('/',chatGptDavinci);
router.post('/turbo',chatGptTurbo); */

router.get('/get-prueba',getPrueba);
router.post('/reconocer',visionReconocerObjetos);

module.exports = router;