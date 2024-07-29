const express = require("express");
const axios = require("axios");
const cors = require("cors");
const data = require("./data/data.js");
const fsPromises = require("fs").promises;
const path = require("path");

// 
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const {setUserID, getUserID} = require('./service/auth');

const app = express();

let cities = {}

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}))

mongoose.connect('mongodb://127.0.0.1:27017/auth');

const loadData = async ()=>{
  let file_data = await fsPromises.readFile(path.join(__dirname, ".", "data", "data.json"), 'utf8')
  return file_data;
}

const loadCities = async ()=>{
  let file_data = await fsPromises.readFile(path.join(__dirname, ".", "data", "cities.json"), 'utf8')
  return file_data;
}

app.use("/api/python", require('./routes/python.js'));

app.use('/places', require('./routes/routes.js'));

app.use('/user', require('./routes/user.js'));

app.get('/', (req,res)=>{
    console.log('working');
    res.send('connection successfull');
})

app.get('/cities', async (req,res)=>{
  try {
    let citiesData = await loadCities();
    res.send(citiesData);
  } catch (error) {
    throw error;
  }
})

app.get('/data', async (req,res)=>{
  try {
    let result = await loadData();
    return res.send(result);
  } catch (error) {
    throw error;
  }
})

app.post('/api/register', async (req, res) => {
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
});

app.post('/api/login', async (req, res) => {
  const { name, email, password } = req.body;
  // console.log('Received data:', { name, email, password });

  try {
    
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
});

app.get('/api/check-auth', (req, res) => {
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
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('authToken'); // Clear the authToken cookie
  res.send({ status: 'OK' });
});

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
