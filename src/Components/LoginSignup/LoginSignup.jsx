import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

import user_icon from '../Assets/user_icon.png';
import password_icon from '../Assets/password_icon.png';

const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            // Use the IP address for the backend API
            const endpoint = action === "Sign Up" ? '/create_user' : '/login';
            const response = await fetch(`http://10.19.234.139:5000${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Network response was not ok");
            }

            const data = await response.json();
            // Handle successful response (e.g., navigate to home)
            navigate('/home');
        } catch (error) {
            console.error("Error during fetch:", error);
            alert(`Fetch error: ${error.message}`);
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={user_icon} alt="" />
                    <input 
                        type="text" 
                        placeholder='username' 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className='input'>
                    <img src={password_icon} alt="" />
                    <input 
                        type="password" 
                        placeholder='Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
            </div>
            {action === "Sign Up" ? null : (
                <div className="forgot-password">
                    Lost Password? <span>Click Here!</span>
                </div>
            )}
            <div className="submit-container">
                <div 
                    className={action === "Login" ? "submit gray" : "submit"} 
                    onClick={() => { setAction("Sign Up"); }}
                >
                    Sign Up
                </div>
                <div 
                    className={action === "Sign Up" ? "submit gray" : "submit"} 
                    onClick={() => { setAction("Login"); }}
                >
                    Login
                </div>
            </div>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default LoginSignup;