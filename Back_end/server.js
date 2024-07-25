const express = require("express");
const axios = require("axios");
const cors = require("cors");
const data = require("./data/data.js");
const fsPromises = require("fs").promises;
const path = require("path");

const app = express();

let cities = {}

app.use(express.json());
app.use(cors());

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

app.get('/', (req,res)=>{
    console.log('working');
    res.send('connection successfull');
})

app.post('/cities', (req,res)=>{
  try {
    console.log(req.body);
    cities = req.body;
    res.send('done');
  } catch (error) {
    throw error;
  }
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
    // console.log(...result, ...cities);
    console.log(result);
    return res.send(result);
  } catch (error) {
    throw error;
  }
})


const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
