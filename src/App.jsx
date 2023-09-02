import 'leaflet/dist/leaflet.css';
import './App.css';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { carIcon } from './utility';
import { useEffect, useState } from 'react';
import { useGeolocation, useCustomWindowSize } from './hooks';
import { getParkingLot, getSpacesLeft } from './api';
import { LocateBtn } from './Components/LocateBtn';
import useParkingContext from './hooks/use-parking-context';
import Markers from './Components/Markers';

function App() {
  const { position, defaultPosition } = useParkingContext();
  const [parkingLot, setParkingLot] = useState([]);
  const [spaceLeft, setSpaceLeft] = useState([]);
  useCustomWindowSize();
  useGeolocation();

  function MapCenter() {
    const map = useMap();
    useEffect(() => {
      map.setView(position, map.getZoom()); // 使用 setView 方法設定中心位置
    }, [position, map]);
    return null;
  }

  // get API data
  useEffect(() => {
    const getParkingLotDataAsync = async () => {
      try {
        const apiMarkers = await getParkingLot();
        setParkingLot(apiMarkers);
      } catch (error) {
        console.error(error);
      }
    };
    getParkingLotDataAsync();
  }, []);
  useEffect(() => {
    const getSpaceLeftAsync = async () => {
      try {
        const apiSpaceLeft = await getSpacesLeft();
        setSpaceLeft(apiSpaceLeft);
      } catch (error) {
        console.error(error);
      }
    };
    getSpaceLeftAsync();
  }, []);
  useEffect(() => {
    const intervalId = setInterval(async () => {
      // call API and update state
      try {
        const spacesLeftUpdated = await getSpacesLeft();
        setSpaceLeft(spacesLeftUpdated);
      } catch (error) {
        console.error('[Interval fetching spacesLeft failed]: ', error);
      }
    }, 120000); //該 API 實際的更新時間為每 2 分鐘一次
    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <nav className='nav-top'>
        <h1>Park&#x1F17F;TPE</h1>
      </nav>
      <div id='map'>
        <MapContainer center={defaultPosition} zoom={16} scrollWheelZoom={true}>
          <MapCenter />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          />
          {/* locate user */}
          <Marker position={position} icon={carIcon}>
            <Popup>
              <h2>👋🏻 我在這裡</h2>
            </Popup>
          </Marker>
          <LocateBtn />
          <MarkerClusterGroup chunkedLoading>
            <Markers parkingLot={parkingLot} spaceLeft={spaceLeft} />
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </>
  );
}

export default App;
