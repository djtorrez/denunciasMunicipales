const { Router } = require('express');
const { getUser
    } = require('../controllers/userController');
const router = Router();
router.get('/usuario/:documentoId', getUser);
module.exports = router;