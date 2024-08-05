import React from "react";
import { Button,Card } from "react-bootstrap";
import "../App.css";
import { useNavigate } from "react-router-dom";

// function DetourRedirect() {
//   const navigate = useNavigate();

//   function handleLinkClick() {
//     navigate("/test");
//   }

//   return (
//     <div>
//       <Button
//         variant="link"
//         onClick={handleLinkClick}
//         className="mt-5 mb-3 fs-2"
//         style={{ textDecoration: "none" }}
//       >
//         Take a detour 🚗
//       </Button>
//     </div>
//   );
// }

function DetourRedirect() {
    const navigate = useNavigate();
  
    function handleLinkClick() {
      navigate("/test");
    }
  
    return (
      <Card className="text-center mt-5" style={{border:"none"}}>
        <Card.Body>
          <Card.Text className="mb-3 fs-5">
            Visit exciting places on your trip to your destination ?
          </Card.Text>
          <Button
            variant="link"
            onClick={handleLinkClick}
            className="fs-2"
            style={{ textDecoration: "none" }}
          >
            Take a detour 🚗
          </Button>
        </Card.Body>
      </Card>
    );
  }
  

export default DetourRedirect;
