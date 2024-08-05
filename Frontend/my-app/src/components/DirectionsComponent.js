import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
  Marker
} from "@vis.gl/react-google-maps";
import axios from "axios";

export default function Directions() {
    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

  const [data, setData] = useState(null);
  const [positions, setPositions] = useState([]);
  const [cities, setCities] = useState({ src: "Mumbai", dest: "Nashik" }); // Default cities
  
    useEffect(() => {
      if (!routesLibrary || !map) return;
      setDirectionsService(new routesLibrary.DirectionsService());
      setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);
  
    useEffect(() => {
      if (!directionsService || !directionsRenderer) return;
  
      directionsService.route({
        origin: cities.src || "Mumbai",
        waypoints: [],
        destination: cities.dest || "Nashik",
        travelMode: routesLibrary.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      }).then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      }).catch((error) => {
        console.error("Error fetching directions:", error);
      });
  
      return () => directionsRenderer.setMap(null);
    }, [directionsService, directionsRenderer, cities, routesLibrary]);
  
    useEffect(() => {
      if (!directionsRenderer) return;
      directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

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
  
    if (!leg) return null;
  
    return (
      <div className="directions">
        {/* You can add more UI elements here if needed */}
      </div>
    );
  }