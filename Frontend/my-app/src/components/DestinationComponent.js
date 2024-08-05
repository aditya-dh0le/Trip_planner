// import ListGroup from 'react-bootstrap/ListGroup';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// let response = await axios.get('http://127.0.0.1:3500/data');

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

import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DestinationComponent() {
  const [data, setData] = useState({ destination: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3500/data');
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // Call the async function
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Destination</h2>
      <ListGroup as="ol">
        {data.destination.map((place, index) => (
          <ListGroup.Item key={index} as="li">
            <h5 style={{ fontWeight: 'bold' }}>{place.name}</h5>
            <div>{place.description}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
