const  { Router } = require('express');
const { chatGptDavinci,getAlgo,chatGptTurbo } = require('../controllers/openIAController');
const router = Router();

router.post('/',chatGptDavinci);
router.post('/turbo',chatGptTurbo);

router.get('/get-algo',getAlgo);

module.exports = router;