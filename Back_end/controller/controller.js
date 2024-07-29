const places = require("../places.js");

const handleGetPlaces = async (req,res)=>{
    try {
      console.log('/GET /places');
      return res.json(places);
    } catch (error) {
      console.log('error');
      throw error;
    }
  }

const handleRegisterUser = async (req,res)=>{
  try {
    console.log('/POST /user/register');
    console.log(req.body);
    res.send('')
  } catch (error) {
    throw error;
  }
};

module.exports = {handleGetPlaces, handleRegisterUser}