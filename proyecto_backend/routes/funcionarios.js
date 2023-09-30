const { Router } = require('express');
const { addFuncionario,
    loginFuncionario,
    getFuncionario,
    getFuncionarios,
    addFuncionario1,
    editarFuncionario,
    eliminarFuncionario } = require('../controllers/funcionarioController');
const router = Router();
router.post('/login-funcionario', loginFuncionario);
router.post('/register-funcionario', addFuncionario);
router.get('/getFuncionario-id', getFuncionario);
router.get('/getallfuncionario', getFuncionarios);
router.post('/addFuncionario', addFuncionario1);
router.post('/editarFuncionario', editarFuncionario);
router.post('/eliminarFuncionario', eliminarFuncionario);

module.exports = router;
