import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
  Marker
} from "@vis.gl/react-google-maps";
import axios from "axios";

export default function DirectionsMap() {
  const [data, setData] = useState(null);
  const [positions, setPositions] = useState([]);
  const [cities, setCities] = useState({ src: "Mumbai", dest: "Nashik" }); // Default cities
  
  useEffect(() => {
    async function fetchData() {
      try {
        const citiesResponse = await axios.get('http://127.0.0.1:3500/cities');
        const dataResponse = await axios.get('http://127.0.0.1:3500/data');
        
        setCities(citiesResponse.data);
        setData(dataResponse.data);
        setPositions(dataResponse.data.destination.map(place => place.position));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div style={{ height: "70vh", width: "80%" }}>
      <APIProvider apiKey="AIzaSyCqKB7jWrQLdSWn7IKtolvxRyx3kDDS7cM">
        <Map
          center={data?.destination[0]?.position}
          zoom={8}
          disableDefaultUI={false}
          gestureHandling={'cooperative'}
        >
          <Directions cities={cities}/>
          {positions.map((place, index) => (
            <Marker key={index} position={place} />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}

function Directions({cities}) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState(null);
  const [city, setCity] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    setCity(cities);
  }, [routesLibrary, map, city]);

  useEffect(()=>{
    const fetchData = async ()=>{
      const citiesResponse = await axios.get('http://127.0.0.1:3500/cities');
      return citiesResponse.data;
    }
    setCity(fetchData);
  }, [])

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService.route({
      origin: city?.src || "Mumbai",
      waypoints: [],
      destination: city?.dest || "Nashik",
      travelMode: routesLibrary.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    }).then((response) => {
      directionsRenderer.setDirections(response);
      setRoutes(response.routes);
    });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, cities]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return <div className="directions"></div>;
}
