import React, { useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmitSeattle = () => {
        navigate('/seattle'); // Use a valid route path
    };
    const handleSubmitRenton = () => {
        navigate('/renton'); // Use a valid route path
    };
    const handleSubmitBellevue = () => {
        navigate('/bellevue'); // Use a valid route path
    };

    return (
    <div className='container'>
        <div className = "header">Pick a location!</div>
        <div>
            <button className="Seattle-button" onClick={handleSubmitSeattle}>Seattle</button>
        </div>
        <div>
            <button className="Renton-button" onClick={handleSubmitRenton}>Renton</button>
        </div>
        <div>
            <button className="Bellevue-button" onClick={handleSubmitBellevue}>Bellevue</button>
        </div>
    </div>
    );
};

export default HomePage;
