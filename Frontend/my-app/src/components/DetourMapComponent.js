import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
  Marker
} from "@vis.gl/react-google-maps";
import axios from "axios";

export default function DetourMapComponent() {
  const [cities, setCities] = useState({});
  const [data, setData] = useState({ destination: [], en_route: [] });
  const [positions, setPositions] = useState([]);
  const [detour, setDetour] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesResponse = await axios.get('http://127.0.0.1:3500/cities');
        const dataResponse = await axios.get('http://127.0.0.1:3500/data');
        
        setCities(citiesResponse.data);
        setData(dataResponse.data);

        const positionsData = dataResponse.data.destination.map(place => place.position);
        const detourData = dataResponse.data.en_route.map(place => ({ location: place.name }));
        
        setPositions(positionsData);
        setDetour(detourData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <APIProvider apiKey="AIzaSyCqKB7jWrQLdSWn7IKtolvxRyx3kDDS7cM">
        <Map
          center={data.destination[0]?.position}
          zoom={8}
          disableDefaultUI={false}
          gestureHandling={'cooperative'}
        >
          <Directions cities={cities} detour={detour} positions={positions} />
          {
            positions.map((place, index) => (
              <Marker key={index} position={place} />
            ))
          }
        </Map>
      </APIProvider>
    </div>
  );
}

function Directions({ cities, detour }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService.route({
      origin: cities.src || "Mumbai",
      waypoints: detour || [],
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
  }, [directionsService, directionsRenderer, cities, detour, routesLibrary]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
      {/* You can add more UI elements here if needed */}
    </div>
  );
}
