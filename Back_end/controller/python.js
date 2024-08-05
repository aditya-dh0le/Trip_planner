const express = require("express") ;
const axios = require("axios");

const info = {
    data: require("../data/data.json"),
    setData: function (data) {
      this.data = data;
    },
  };
  
  const fsPromises = require("fs").promises;
  const path = require("path");

  const handlePythonCall = async (req, res) => {
    const reqParams = {
      source: req.body.source,
      destination: req.body.destination
    };

    const reqData = {
        src: req.body.source,
        dest: req.body.destination
      };

    const pythonApiUrl = "http://127.0.0.1:5000/get_places";
  
    try {
      const response = await axios.post(pythonApiUrl, reqParams);
  
      info.setData(response.data);
  
      await fsPromises.writeFile(
        path.join(__dirname, "..", "data", "data.json"),
        JSON.stringify(info.data)
      );

      await fsPromises.writeFile(
        path.join(__dirname, "..", "data", "cities.json"),
        JSON.stringify(reqData)
      );
  
      return res.json(response.data);
    } catch (error) {
      console.error('Error making POST request:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {handlePythonCall}