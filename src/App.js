import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage'; 
import SeattlePage from './Components/SeattlePage/SeattlePage'; 
import RentonPage from './Components/RentonPage/RentonPage';
import BellevuePage from './Components/BellevuePage/BellevuePage';

const center = {
  lat: 37.970833,
  lng: 23.726110,
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} /> {/* Renders the LoginSignup component */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/seattle" element={<SeattlePage />} />
        <Route path="/renton" element={<RentonPage />} />
        <Route path="/bellevue" element={<BellevuePage />} />
      </Routes>
    </Router>
  );
}

export default App;


