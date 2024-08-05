// App.js
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormComponent from './components/Form';
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from 'react-router-dom';
import {Enroute} from './components/City';
import Register from './components/Register';
import Grid from './components/Grid';
import NavbarComponent from './components/Navbar';
import DetourMap from './components/DetourMap';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import RapidApi from './components/RapidApi';
import GridComponent from './components/GridComponent';
import DetourComponent from './components/DetourComponent';
import CrewComponent from './components/CrewComponent';
import LoginComponent from './components/LoginComponent';
import HomeComponent from './components/HomeComponent';

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<><Login/></>
    },
    {
      path:"/home",
      element:<><FormComponent/></>
    },
    {
      path:"/business",
      element:<><NavbarComponent/><Grid/></>
    },
    {
      path:"/register",
      element:<><Register/></>
    },
    {
      path:"/test",
      element:<></>
    }
  ])

  return (
    <div className="App">
      {/* <RouterProvider router={router}/> */}
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/" element={<HomeComponent />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<FormComponent />} />
          {/* <Route path="/business" element={<><NavbarComponent /><Grid /></>} /> */}
          <Route path="/test" element={<><NavbarComponent /><GridComponent/></>} />
          <Route path="/detour" element={<><NavbarComponent /><DetourComponent/></>} />
          <Route path="/crew" element={<><NavbarComponent /><CrewComponent/></>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
