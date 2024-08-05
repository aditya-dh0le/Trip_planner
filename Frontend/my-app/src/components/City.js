// import ListGroup from 'react-bootstrap/ListGroup';
// import Container from 'react-bootstrap/Container';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// let response = await axios.get('http://127.0.0.1:3500/data');
// const apikey = 'ada01e49806a386e145baa2c01c5e0ff';

// async function getData() {
//   let apidata = await axios.get('http://127.0.0.1:3500/data');
//   console.log('Check response', apidata)
//   if(apidata) {
//     return apidata
//   }
// }

// export function Weather() {
//     let [data, setData] = useState(response.data);

//   return (
//     <>
//     <Destination/>
//     <Enroute/>
//     <Budget/>    
//     </>
//   );
// }

// export function Enroute() {
//   const [data, setData] = useState(response.data);

//   useEffect(() => {
//   }, []);

//   return (
//     <Container className="mt-5 mb-5">
//       <div>
//         <h2>En-Route</h2>
//         <ListGroup>
//           {data.en_route.map((place, index) => (
//             <ListGroup.Item key={index}>
//               <h5 style={{ fontWeight: 'bold', color: '#007bff' }}>{place.name}</h5>
//               <div>{place.description}</div>
//             </ListGroup.Item>
//           ))}
//         </ListGroup>
//       </div>
//     </Container>
//   );
// }

// export function Destination() {
//   const [data, setData] = useState(response.data);

//   useEffect(() => {
//   }, []);

//   return (
//     <div>
//       <h2>Destination</h2>
//       <ListGroup as="ol">
//         {data.destination.map((place, index) => (
//           <ListGroup.Item key={index} as="li">
//             <h5 style={{ fontWeight: 'bold'}}>{place.name}</h5>
//             <div>{place.description}</div>
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//     </div>
//   );
// }

// export function Budget() {
//   const [data, setData] = useState(response.data);

//   useEffect(() => {}, []);

//   return (
//     <div>
//       <h2>Budget</h2>
//       <ListGroup as="ol">
//         {data.destination.map((place, index) => (
//           <ListGroup.Item key={index} as="li">
//             <div>
//               <h5 style={{ fontWeight: 'bold'}}>{place.name}</h5>
//               <div>Budget: {place.budget}</div>
//             </div>
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//     </div>
//   );
// }
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

let response = await axios.get('http://127.0.0.1:3500/data');
const apikey = 'ada01e49806a386e145baa2c01c5e0ff';

export function Weather() {
    let [data, setData] = useState(response.data);

  return (
    <>
    <Destination/>
    <Enroute/>
    <Budget/>    
    </>
  );
}

export function Enroute() {
  const [data, setData] = useState(response.data);

  useEffect(() => {
  }, []);

  return (
    <Container className="mt-5 mb-5">
      <div>
        <h2>En-Route</h2>
        <ListGroup>
          {data.en_route.map((place, index) => (
            <ListGroup.Item key={index}>
              <h5 style={{ fontWeight: 'bold', color: '#007bff' }}>{place.name}</h5>
              <div>{place.description}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  );
}

export function Destination() {
  const [data, setData] = useState(response.data);

  useEffect(() => {
  }, []);

  return (
    <div>
      <h2>Destination</h2>
      <ListGroup as="ol">
        {data.destination.map((place, index) => (
          <ListGroup.Item key={index} as="li">
            <h5 style={{ fontWeight: 'bold'}}>{place.name}</h5>
            <div>{place.description}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export function Budget() {
  const [data, setData] = useState(response.data);

  useEffect(() => {}, []);

  return (
    <div>
      <h2>Budget</h2>
      <ListGroup as="ol">
        {data.destination.map((place, index) => (
          <ListGroup.Item key={index} as="li">
            <div>
              <h5 style={{ fontWeight: 'bold'}}>{place.name}</h5>
              {/* <div>Budget: {place.budget}</div> */}
              
              <div>
                Accommodation: {place.budget?.accommodation}
              </div>

              <div>
                Food: {place.budget?.food}
              </div>

              <div>
                Sightseeing: {place.budget?.sightseeing}
              </div>

              <div>
                Transport: {place.budget?.transport}
              </div>

            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}