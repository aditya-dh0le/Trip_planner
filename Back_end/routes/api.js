const express = require("express") 
const {handlePythonCall} = require('../controller/python');
const {handleRegisterUser, handleUserLogin, handleUserAuth, handleUserLogout} = require('../controller/controller');

const router = express.Router();

router.post('/python', handlePythonCall);
router.post('/register', handleRegisterUser);
router.post('/login', handleUserLogin);
router.get('/check-auth', handleUserAuth);
router.post('/logout', handleUserLogout);

module.exports = router;