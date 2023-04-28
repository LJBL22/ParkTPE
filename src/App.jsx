import 'leaflet/dist/leaflet.css';
import './App.css';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { carIcon, parkingIcon, tw97ToWGS84 } from './utility';
import { useEffect, useState } from 'react';
import { useGeolocation, useCustomWindowSize } from './hooks';
import { getParkingLot, getSpacesLeft } from './api';
import CustomPopup from './Components/CustomPopup';
import { LocateBtn, Btn2 } from './Components/LocateBtn';

function App() {
  const defaultPosition = { lat: 25.044761, lng: 121.536651 };
  // const [position, setPosition] = useState(defaultPosition);
  const [parkingLot, setParkingLot] = useState([]);
  const [spaceLeft, setSpaceLeft] = useState([]);
  // const [clicked, setClicked] = useState(false); // 新增點擊狀態
  useCustomWindowSize();
  const position = useGeolocation();

  function MapCenter() {
    const map = useMap();
    useEffect(() => {
      map.setView(position, map.getZoom()); // 使用 setView 方法設定中心位置
    }, [position, map]);
    return null;
  }
  function handleBtnClick() {
    // setClicked(true);
    console.log('click 1 time');
    // useGeolocation(position, setPosition); // 調用 useGeolocation 更新位置
  }
  function handleBtn2Click() {
    console.log('handleBtn2Click');
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
          <CustomPopup available={availableCar} {...marker} />
        </Marker>
      );
    });

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
          <MarkerClusterGroup chunkedLoading>
            {/* render api markers */}
            {renderMarkers}
          </MarkerClusterGroup>
        </MapContainer>
        <LocateBtn onClick={handleBtnClick} /> {/* 新增按鈕 */}
        <Btn2 onClick={handleBtn2Click} /> {/* 新增按鈕 */}
      </div>
    </>
  );
}

export default App;
