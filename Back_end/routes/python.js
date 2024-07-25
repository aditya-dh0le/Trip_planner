const express = require("express") 
const {handlePythonCall} = require('../controller/python');

const router = express.Router();

router.post('/', handlePythonCall);

  module.exports = router;