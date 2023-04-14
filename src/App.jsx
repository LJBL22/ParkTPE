import './App.css';
import { MapContainer, TileLayer } from 'react-leaflet';

function App() {
  // first get the viewport height and multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // then set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  return (
    <>
      <nav className='nav-top'>
        <h1>ParkTPE</h1>
      </nav>
      <div id='map'>
        <MapContainer
          center={[25.0410601, 121.5428832]}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          />
        </MapContainer>
      </div>
    </>
  );
}

export default App;
