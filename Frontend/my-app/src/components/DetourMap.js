"use client";

import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
  Marker
} from "@vis.gl/react-google-maps";
import axios from "axios";

let cities = await axios.get('http://127.0.0.1:3500/cities');
let response =  await axios.get('http://127.0.0.1:3500/data');
console.log(response.data);

cities = cities.data;
let data = response.data;
    
let positions = data.destination.map((place)=>{
  return place.position;
})

let detour = data.en_route.map((place)=>{
  return {"location":place.name}
})

console.log(detour);

export default function DetourMap() {

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <APIProvider apiKey="AIzaSyCqKB7jWrQLdSWn7IKtolvxRyx3kDDS7cM">
        <Map
          center={data.destination[0].position}
          zoom={8}
          disableDefaultUI={false}
          gestureHandling={'cooperative'}

        >
          <Directions />
          {
            positions.map((place, index)=>{
                return <Marker key={index} position={place} />
            })
          }
        </Map>
      </APIProvider>
    </div>
  );
}

function Directions() {
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
    });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
    </div>
  );
}
