const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

// Endpoint to handle file upload
app.post("/api", async (req, res) => {
  try {

    const reqParams = {
        source: req.body.source,
        destination: req.body.destination
    }

    const pythonApiUrl = "http://127.0.0.1:5000/get_places";
    // const response = await axios.post(pythonApiUrl, reqParams);

    try {
        const response = await axios.post(pythonApiUrl, reqParams);
        console.log('Response from Python API:', response.data);
        return res.json(response.data);
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file.");
  }
});

app.get("/data", async (req, res) => {
  try {
    console.log('request');
    res.send('successfull');
  } catch (error) {
    return res.json({ message: error.message });
  }
});

app.get('/', (req,res)=>{
    console.log('working');
    res.send('connection successfull');
})

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
