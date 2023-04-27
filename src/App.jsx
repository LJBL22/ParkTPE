import 'leaflet/dist/leaflet.css';
import './App.css';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { carIcon, parkingIcon, tw97ToWGS84 } from './utility';
import { useEffect, useState } from 'react';
import { useGeolocation, useCustomWindowSize } from './hooks';
import { getParkingLot, getSpacesLeft } from './api';
import CustomPopup from './Components/CustomPopup';

function App() {
  const defaultPosition = { lat: 25.044761, lng: 121.536651 };
  // for marker
  const [position, setPosition] = useState(defaultPosition);
  //for center 將 marker 的位置跟畫面中心的位置拆開
  const [centerPosition, setCenterPosition] = useState(defaultPosition);
  const [parkingLot, setParkingLot] = useState([]);
  const [spaceLeft, setSpaceLeft] = useState([]);
  useCustomWindowSize();
  useGeolocation(position, setPosition, setCenterPosition);

  function MapCenter() {
    const map = useMap();
    useEffect(() => {
      map.setView(centerPosition, map.getZoom()); // 使用 setView 方法設定新的中心位置
      // 檢視用 可知一直瘋狂在渲染...
      console.log('MapCenter rendered');
    }, []);
    return null;
  }

  function handleButtonClick() {
    setCenterPosition(position);
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

  // render 每一筆資料
  const renderMarkers = parkingLot
    // 篩掉非汽車的停車場
    .filter((marker) => marker.totalcar > 0)
    .map((marker) => {
      // 取值轉換 marker 的經緯度
      const { tw97x: x, tw97y: y } = marker;
      const WGS84 = tw97ToWGS84(x, y);
      const { lat, lng } = WGS84;
      const markerPosition = [lat, lng];

      // 取出剩餘車位資料
      const space = spaceLeft.find((s) => s.id === marker.id); // 比對 id 找出符合的 spaceLeft 元素
      const availableCar = space ? space.availablecar : null; // 符合則取值
      //展開同名 props
      return (
        <Marker key={marker.id} position={markerPosition} icon={parkingIcon}>
          <CustomPopup available={availableCar} fare='40' {...marker} />
        </Marker>
      );
    });

  return (
    <>
      <nav className='nav-top'>
        <h1>ParkTPE</h1>
      </nav>
      <div id='map'>
        <MapContainer
          center={centerPosition}
          // 要搭配 bound 來安排一下
          // minZoom={10}
          zoom={16}
          scrollWheelZoom={true}
        >
          {/* {isInitialLocation &&  */}
          <MapCenter />
          {/* // } */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          />
          {/* 定位使用者 */}
          <Marker position={position} icon={carIcon}>
            <Popup>
              <h2>👋🏻 我在這裡</h2>
            </Popup>
          </Marker>
          <button onClick={handleButtonClick}>設為中心</button>
          <MarkerClusterGroup chunkedLoading>
            {/* render api markers */}
            {renderMarkers}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </>
  );
}

export default App;
