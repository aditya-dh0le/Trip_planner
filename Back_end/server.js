const express = require("express");
const axios = require("axios");
const cors = require("cors");
const data = require("./data/data.js");
const fsPromises = require("fs").promises;
const path = require("path");

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const app = express();

let cities = {}

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}))

const loadData = async ()=>{
  let file_data = await fsPromises.readFile(path.join(__dirname, ".", "data", "data.json"), 'utf8')
  return file_data;
}

const loadCities = async ()=>{
  let file_data = await fsPromises.readFile(path.join(__dirname, ".", "data", "cities.json"), 'utf8')
  return file_data;
}

const loadCrew = async ()=>{
  let file_data = await fsPromises.readFile(path.join(__dirname, ".", "data", "crew.json"), 'utf8')
  return file_data;
}


app.use('/api', require('./routes/api.js'))

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

app.get('/crew', async (req,res)=>{
  try {
    let result = await loadCrew();
    return res.send(result);
  } catch (error) {
    throw error;
  }
})

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
