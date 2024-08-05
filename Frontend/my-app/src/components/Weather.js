import axios from 'axios';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

let cities = await axios.get('http://127.0.0.1:3500/cities');
cities = cities.data;

const apikey = 'ada01e49806a386e145baa2c01c5e0ff';
let weather = {}
const chckWeather = async  ()=>{
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cities.dest}&appid=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        weather = {
            temp : (data.main.temp).toFixed(1) + '°C',
          city: data.name,
          humidity: data.main.humidity + '%',
          wind: data.wind.speed + 'Km/h',
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

await chckWeather();

export const Weather = () => {
  return (
    <div>
            <h2>Weather</h2>
    <div>
        <div>
        City : {weather.city}
        </div>
        <div>
        Temp : {weather.temp}
        </div>
        <div>
        Humidity : {weather.humidity}
        </div>
        <div>
        Wind : {weather.wind}
        </div>
    </div>
    </div>
  )
}

export function WeatherCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Subtitle className="fs-2 mb-4 text-muted">{weather.city}</Card.Subtitle>

        <Card.Title className='fs-6'>Weather</Card.Title>
        
        <Card.Text>
        Temperature : {weather.temp}
        </Card.Text>
        
        <Card.Text>
        Humidity : {weather.humidity}
        </Card.Text>

        <Card.Text>
        Wind : {weather.wind}
        </Card.Text>

      </Card.Body>
    </Card>
  );
}

// export default BasicExample;

// export default Weather