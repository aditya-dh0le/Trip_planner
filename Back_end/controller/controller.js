const places = require("../places.js");

const handleGetPlaces = async (req,res)=>{
    try {
      console.log('successfull');
      return res.json(places);
    } catch (error) {
      console.log('error');
      throw error;
    }
  }

module.exports = {handleGetPlaces}