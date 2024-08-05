import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function WeatherComponent() {
  const [weather, setWeather] = useState({
    temp: '',
    city: '',
    humidity: '',
    wind: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch the cities data
        const citiesResponse = await axios.get('http://127.0.0.1:3500/cities');
        const cities = citiesResponse.data;

        // API Key for OpenWeatherMap
        const apikey = 'ada01e49806a386e145baa2c01c5e0ff';

        // Fetch the weather data
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cities.dest}&appid=${apikey}`;
        const weatherResponse = await fetch(apiUrl);
        const weatherData = await weatherResponse.json();

        // Update the state with fetched data
        setWeather({
          temp: (weatherData.main.temp).toFixed(1) + '°C',
          city: weatherData.name,
          humidity: weatherData.main.humidity + '%',
          wind: weatherData.wind.speed + ' Km/h',
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching weather data: {error.message}</div>;

  return (
    <Card style={{ width: '18rem', border:"none" }}>
      <Card.Body>
        <Card.Subtitle className="fs-2 mb-4 text-muted">{weather.city}</Card.Subtitle>
        <Card.Title className='fs-6'>Weather</Card.Title>
        <Card.Text>
          Temperature: {weather.temp}
        </Card.Text>
        <Card.Text>
          Humidity: {weather.humidity}
        </Card.Text>
        <Card.Text>
          Wind: {weather.wind}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
