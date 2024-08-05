const express = require("express") 
const {handleGetPlaces, handleRegisterUser} = require('../controller/controller');

const router = express.Router();

router.post('/register', handleRegisterUser);

  module.exports = router;