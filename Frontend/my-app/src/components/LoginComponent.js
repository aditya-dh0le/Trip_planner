import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file
 
function LoginComponent() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 
    useEffect(() => {
        // Add a class to trigger the animation
        const planeElement = document.getElementById('plane');
        if (planeElement) {
            planeElement.classList.add('animate-plane');
        }
    }, []);
 
    async function loginUser(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);
 
        try {
            let response = await axios.post('http://localhost:3500/api/login', payload, {
                withCredentials: true
            });
            console.log(response);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    }
 
    return (
        <div style={{
            backgroundColor: 'white',
            height: '100vh',
            width: '100vw', // Full viewport width
            backgroundImage: 'url(/bgg.jpg)', // Replace with your image URL
            backgroundSize: 'cover', // Cover the entire element
            backgroundPosition: 'center', // Center the image within the element
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }} className="login-container">
            <div id="plane" className="plane">
                <img src="/plane.png" alt="plane" /> {/* Add your plane image here */}
            </div>
            <div className="text-center mb-4">
                <h1 className="heading">TripEase</h1>
                <p className="subheading">Log in to Go</p>
            </div>
            <div className="login-card">
                <Form onSubmit={loginUser}>
                    <div className="input-container">
                        <label className="label" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
 
                    <div className="input-container">
                        <label className="label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
 
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}
 
export default LoginComponent;