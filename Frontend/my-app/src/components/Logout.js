import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();

    const onLogout = async () => {
        try {
            await axios.post('http://localhost:3500/api/logout', {}, { withCredentials: true });
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
                <Button variant="outline-danger" className='ms-3 me-5' onClick={onLogout}>Logout</Button>
    );
};

export default Logout;
