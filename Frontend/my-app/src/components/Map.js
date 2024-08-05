// "use client";

// import { useEffect, useState } from "react";
// import {
//   APIProvider,
//   Map,
//   useMapsLibrary,
//   useMap,
//   Marker
// } from "@vis.gl/react-google-maps";
// import axios from "axios";

// let cities = await axios.get('http://127.0.0.1:3500/cities');
// let response =  await axios.get('http://127.0.0.1:3500/data');
// console.log(response.data);

// cities = cities.data;
// // let data = response.data;
    
// // let positions = data.destination.map((place)=>{
// //   return place.position;
// // })

// export default function DirectionsMap() {
// const [position, setPositions] = useState(null);
// const [data, setData] = useState(null)
//   useEffect(() => {
//     async function getPlaces() {
      
//       let response =  await axios.get('http://127.0.0.1:3500/data');
//       console.log(response?.data);

// cities = cities?.data;
// setData(response?.data)
//     console.log('Check data1..', data)
// let positions = data.destination.map((place)=>{
//   return place?.position;
// })
// setPositions(positions)
// console.log('Check positions', positions)
//     }
// getPlaces()

//     return () => {
      
//     };
//   }, []);

//   return (
//     <div style={{ height: "70vh", width: "80%" }}>
//       <APIProvider apiKey="AIzaSyCqKB7jWrQLdSWn7IKtolvxRyx3kDDS7cM">
//         <Map
//           center={data.destination[0].position}
//           zoom={8}
//           disableDefaultUI={false}
//           gestureHandling={'cooperative'}

//         >
//           <Directions />
//           {
//             position.map((place, index)=>{
//                 return <Marker key={index} position={place} />
//             })
//           }
//         </Map>
//       </APIProvider>
//     </div>
//   );
// }

// function Directions() {
//   const map = useMap();
//   const routesLibrary = useMapsLibrary("routes");
//   const [directionsService, setDirectionsService] = useState(null);
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);
//   const [routes, setRoutes] = useState([]);
//   const [routeIndex, setRouteIndex] = useState(0);
//   const selected = routes[routeIndex];
//   const leg = selected?.legs[0];

//   useEffect(() => {
//     if (!routesLibrary || !map) return;
//     setDirectionsService(new routesLibrary.DirectionsService());
//     setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
//   }, [routesLibrary, map]);

//   useEffect(() => {
//     if (!directionsService || !directionsRenderer) return;

//     directionsService.route({
//       origin: cities.src || "Mumbai",
//       waypoints: [],
//       destination: cities.dest || "Nashik",
//       travelMode: routesLibrary.TravelMode.DRIVING,
//       provideRouteAlternatives: true,
//     }).then((response) => {
//       directionsRenderer.setDirections(response);
//       setRoutes(response.routes);
//     });

//     return () => directionsRenderer.setMap(null);
//   }, [directionsService, directionsRenderer]);

//   useEffect(() => {
//     if (!directionsRenderer) return;
//     directionsRenderer.setRouteIndex(routeIndex);
//   }, [routeIndex, directionsRenderer]);

//   if (!leg) return null;

//   return (
//     <div className="directions">
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import {
//   APIProvider,
//   Map,
//   useMapsLibrary,
//   useMap,
//   Marker
// } from "@vis.gl/react-google-maps";
// import axios from "axios";

// export default function DirectionsMap() {
//   const [data, setData] = useState(null);
//   const [positions, setPositions] = useState([]);
//   const [cities, setCities] = useState({ src: "Mumbai", dest: "Nashik" }); // Default cities
  
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // Fetch cities and data
//         const citiesResponse = await axios.get('http://127.0.0.1:3500/cities');
//         const dataResponse = await axios.get('http://127.0.0.1:3500/data');
        
//         // Update state with the fetched data
//         setCities(citiesResponse.data);
//         setData(dataResponse.data);
//         setPositions(dataResponse.data.destination.map(place => place.position));
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
    
//     fetchData();
//   }, []); // Empty dependency array ensures this runs only once on component mount

//   return (
//     <div style={{ height: "70vh", width: "80%" }}>
//       <APIProvider apiKey="AIzaSyCqKB7jWrQLdSWn7IKtolvxRyx3kDDS7cM">
//         <Map
//           center={data?.destination[0]?.position}
//           zoom={8}
//           disableDefaultUI={false}
//           gestureHandling={'cooperative'}
//         >
//           <Directions cities={cities} />
//           {positions.map((place, index) => (
//             <Marker key={index} position={place} />
//           ))}
//         </Map>
//       </APIProvider>
//     </div>
//   );
// }

// function Directions({ cities }) {
//   const map = useMap();
//   const routesLibrary = useMapsLibrary("routes");
//   const [directionsService, setDirectionsService] = useState(null);
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);
//   const [routes, setRoutes] = useState([]);
//   const [routeIndex, setRouteIndex] = useState(0);
//   const selected = routes[routeIndex];
//   const leg = selected?.legs[0];

//   useEffect(() => {
//     if (!routesLibrary || !map) return;
//     setDirectionsService(new routesLibrary.DirectionsService());
//     setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
//   }, [routesLibrary, map]);

//   useEffect(() => {
//     if (!directionsService || !directionsRenderer) return;

//     directionsService.route({
//       origin: cities.src || "Mumbai",
//       waypoints: [],
//       destination: cities.dest || "Nashik",
//       travelMode: routesLibrary.TravelMode.DRIVING,
//       provideRouteAlternatives: true,
//     }).then((response) => {
//       directionsRenderer.setDirections(response);
//       setRoutes(response.routes);
//     });

//     return () => directionsRenderer.setMap(null);
//   }, [directionsService, directionsRenderer, cities]);

//   useEffect(() => {
//     if (!directionsRenderer) return;
//     directionsRenderer.setRouteIndex(routeIndex);
//   }, [routeIndex, directionsRenderer]);

//   if (!leg) return null;

//   return <div className="directions"></div>;
// }

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

export default function DirectionsMap() {

  return (
    <div style={{ height: "70vh", width: "80%" }}>
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
      waypoints: [],
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
