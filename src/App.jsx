import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { parkingLot, available } from './dummyData';
import { tw97ToWGS84 } from './utility';

function App() {
  // 處理 safari 問題 first get the viewport height and multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // then set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // 預設的中心位置：忠孝復興
  // const defaultPosition = [25.044761, 121.536651];
  const defaultPosition = [25.037146691182055, 121.56628039692905];

  // 嘗試 render dummy markers & spaces
  // 取出停車場資料
  const markers = parkingLot.data.park;
  // 取出剩餘車位資料
  const spacesLeft = available.data.park;

  // render 每一筆資料
  const renderMarkers = markers.map((marker) => {
    // 取值轉換 marker 的經緯度：將取出的值定義變數 x y
    const { tw97x: x, tw97y: y } = marker;
    // 引入函式轉換 WGS84
    const WGS84 = tw97ToWGS84(x, y);
    // 物件取值經緯度（為數字）
    const { lat, lng } = WGS84;
    // 定義該 marker 的 position
    const markerPosition = [lat, lng];

    // 嘗試取出剩餘車位資料
    // 如果 spacesLeft 裡面的每筆資料 (index) 的 id 跟 掃描 markers 裡面的每筆資料 (index) 的 id，相符，則取出 availablecar 的值。
    return (
      <Marker key={marker.id} position={markerPosition}>
        <Popup>
          <h2>{marker.name}</h2>
          <p>
            {spacesLeft.map((space) => {
              return space.id === marker.id ? (
                <span key={space.id}>剩餘車位{space.availablecar}</span>
              ) : (
                ''
              );
            })}
            <span>/{marker.totalcar}</span>
          </p>
          {/* 測試刻意增加大量文字，會超過畫面 */}
          <p>{marker.payex}</p>
        </Popup>
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
          center={defaultPosition}
          // 要搭配 bound 來安排一下
          // minZoom={10}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          />
          {/* 設定使用者一進入畫面的位置 */}

          {/* 嘗試 render dummy marker */}
          {renderMarkers}
        </MapContainer>
      </div>
    </>
  );
}

export default App;
