import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
/*import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';*/

const center = {
  lat: 37.970833,
  lng: 23.726110,
};

function App() {
  return (
    <div>
      <LoginSignup/>
    </div>
    
  );
}

export default App;

/*
<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={{ height: "400px", width: "100%" }}
                    center={center}
                    zoom={15}
                >
                    <Marker position={center} />
                </GoogleMap>
      </LoadScript>
*/
