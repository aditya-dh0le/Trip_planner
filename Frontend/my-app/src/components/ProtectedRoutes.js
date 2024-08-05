// import {Outlet, Navigate} from 'react-router-dom'

// const ProtectedRoutes = ()=>{
//     const user = null;
//     return user ? <Outlet/> : <Navigate to="/login"/>
// }

// export default ProtectedRoutes;

import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoutes = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        // Make a request to verify the token
        const response = await axios.get('http://localhost:3500/api/check-auth', { withCredentials: true });
        if (response.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You might want to add a spinner or loading message
  }

  return authenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
