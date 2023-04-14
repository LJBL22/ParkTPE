import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { parkingLot, available } from './dummyData';
import { tw97ToWGS84 } from './utility';

function App() {
  // 處理 safari 問題 first get the viewport height and multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // then set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // 預設的中心位置
  // const defaultPosition = [25.044761, 121.536651];
  const defaultPosition = [25.037146691182055, 121.56628039692905];

  // 先取一個 data 座標試試看
  // const getPosition = () => {
  // const x = parkingLot.data.park[1].tw97x;
  // const y = parkingLot.data.park[1].tw97y;
  const { id, name, payex, tw97x: x, tw97y: y } = parkingLot.data.park[1];
  const WGS84 = tw97ToWGS84(x, y);
  const { lat, lng } = WGS84;
  const markerPosition = [lat, lng];
  console.log(markerPosition);
  //   return newPosition;
  // };

  // const newPosition = getPosition();
  // console.log(newPosition);

  // 嘗試 render dummy markers
  // const renderMarkers = markers.map((marker)=> {
  //   return (
  //     <Marker key={} position={position}>
  //       <Popup>
  //         A pretty CSS3 popup. <br /> Easily customizable.
  //       </Popup>
  //     </Marker>
  //   );
  // })

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

          {/* 嘗試 抓取一個 dummy marker */}
          <Marker position={markerPosition}>
            <Popup>
              <h3>{name}</h3>
              <p>{payex}</p>
            </Popup>
          </Marker>
          {/* 嘗試 render dummy marker */}
          {/* {renderMarkers} */}
        </MapContainer>
      </div>
    </>
  );
}

export default App;
