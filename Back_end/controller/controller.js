const places = require("../places.js");
const User = require('../models/user')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const {setUserID, getUserID} = require('../service/auth');

mongoose.connect('mongodb://127.0.0.1:27017/auth');

const handleGetPlaces = async (req,res)=>{
    try {
      console.log('/GET /places');
      return res.json(places);
    } catch (error) {
      console.log('error');
      throw error;
    }
  }

<<<<<<< HEAD
const handleRegisterUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = new User({ name, email, password });
    await user.save(); // Use save method to create a new user
    console.log('Received data:', { name, email, password });

    res.json({ status: 'OK' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(400).json({ message: 'Error creating user' });
  }
}

const handleUserLogin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log(req.body);
    
    const user = await User.findOne(
      {
        email: email,
        password: password
      }
    );
    
    if(user){
      const token = setUserID({email: user.email});
      res.cookie('authToken', token, { httpOnly: true, secure: false});
      res.status(200).send({ status: "OK" });
    }else{
      return res.json({status: "error"});
    }

  } catch (error) {
    res.sendStatus(400); 
  }
};

const handleUserAuth = (req, res) => {
  const token = req.cookies.authToken || null;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const user = getUserID(token);

  if (user) {
    res.status(200).json({ message: 'Authenticated' });
  } else {
    res.status(401).json({ message: 'Invalid token' });
  }
}

const handleUserLogout = (req, res) => {
  res.clearCookie('authToken'); // Clear the authToken cookie
  res.send({ status: 'OK' });
}

module.exports = {handleGetPlaces, handleRegisterUser, handleUserLogin, handleUserAuth, handleUserLogout}
=======
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
>>>>>>> 04c3a70fa957a2ef3ef2e207a8e183a0bd3ac4b9
