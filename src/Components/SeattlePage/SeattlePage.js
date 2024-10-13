import React, { useEffect, useState } from 'react';
import './SeattlePage.css'; // Import the CSS file

const SeattlePage = () => {
    const [names, setNames] = useState([]); // State to hold names for the waitlist
    const [selectedPark, setSelectedPark] = useState(''); // Track selected park
    const [newName, setNewName] = useState(''); // State for new name input

    useEffect(() => {
        // Fetch names when the component mounts or the selected park changes
        const fetchNames = async () => {
            if (selectedPark) {
                const response = await fetch(`http://localhost:5000/get_names/${selectedPark}`);
                const data = await response.json();
                setNames(data);
            }
        };

        fetchNames();
    }, [selectedPark]); // Only run this effect when selectedPark changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newName.trim() === '') return;

        // Send the new name to the backend
        await fetch('http://localhost:5000/save_names', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ location: selectedPark, names: [...names, newName] }), // Send updated list
        });

        setNewName(''); // Clear the input after submitting
        setNames((prevNames) => [...prevNames, newName]); // Update names locally for instant feedback
    };

    return (
        <div className="container"> {/* Add the container class */}
            <h1>Seattle Parks Waitlist</h1>
            <select onChange={(e) => setSelectedPark(e.target.value)} value={selectedPark}>
                <option value="">Select a park</option>
                <option value="Park1">Christie Park</option>
                <option value="Park2">Cowen Park</option>
                <option value="Park3">Cascade Playground</option>
            </select>
            {selectedPark && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Enter your name"
                    />
                    <button type="submit">Sign Up</button>
                </form>
            )}
            <h2>Waitlist for {selectedPark}</h2>
            <ul>
                {names.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SeattlePage;



