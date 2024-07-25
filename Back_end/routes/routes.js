const express = require("express") 
const {handleGetPlaces} = require('../controller/controller');

const router = express.Router();

router.get('/', handleGetPlaces);

  module.exports = router;