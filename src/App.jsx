import 'leaflet/dist/leaflet.css';
import './App.css';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { carIcon, parkingIcon, tw97ToWGS84 } from './utility';
import { useEffect, useRef, useState } from 'react';
import { useGeolocation, useCustomWindowSize } from './hooks';
import { getParkingLot, getSpacesLeft } from './api';
import CustomPopup from './Components/CustomPopup';

function App() {
  // 試試看讓 center 回歸 center \不要暴力的用 position 當 center
  const defaultCenter = { lat: 25.044761, lng: 121.536651 };
  const [center, setCenter] = useState(defaultCenter);
  const [parkingLot, setParkingLot] = useState([]);
  const [spaceLeft, setSpaceLeft] = useState([]);
  useCustomWindowSize();
  // const position = useGeolocation();
  const mapRef = useRef(null);
  const [position, setPosition] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
  });

  // 把 success & error 從 useEffect 獨立出來撰寫較清晰
  // onSuccess 如果同意則抓取定位
  const onSuccess = (position) => {
    setPosition({
      loaded: true,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    });
    console.log('onSuccess work');
    console.log('new position', position);
  };

  const onError = (error) => {
    setPosition({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    let watcher = null;
    console.log('watcher index');
    // 檢查瀏覽器是否支援 & 需要是 HTTPS 協議
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
    }
    // 呼叫 navigator.geoLocation
    watcher = navigator.geolocation.watchPosition(
      onSuccess,
      // 處理錯誤
      (error) => {
        console.error('Error:', error);
        // 如果阻擋則取 IP 位置
        if (error.code === error.PERMISSION_DENIED) {
          const fetch = async () => {
            try {
              const { data } = await axios.get('https://ipapi.co/json');
              setPosition({
                loaded: true,
                coordinates: {
                  lat: location.data.latitude,
                  lng: location.data.longitude,
                },
              });
            } catch (error) {
              console.error('[blocked and get IPApi failed]', error);
            }
          };
          fetch();
        }
      }
    );

    // 釋放記憶體空間、避免佔用資源
    return () => {
      if (watcher) {
        navigator.geolocation.clearWatch(watcher);
      }
    };
  }, []);
  // 最後感覺是 useMap 的問題，但...也不知道怎麼處理。只能遺憾在此了
  const map = L.map('map');

  useEffect(() => {
    if (position.loaded) {
      setCenter(position);
      map.setView(center, map.getZoom()); // 使用 setView 方法設定中心位置
      console.log('map center = position');
    }
  }, []);
  // function MapCenter() {
  //   const map = useMap();
  //   useEffect(() => {
  //     map.setView(position, map.getZoom()); // 使用 setView 方法設定中心位置
  //     console.log('map center render');
  //   }, []);
  //   return null;
  // }

  // useEffect(() => {
  //   if (!mapRef.current) return;
  //   // const setMapView = async () => {
  //   if (mapRef.current && position.loaded) {
  //     const map = mapRef.current.leafletElement;
  //     map.setView([position.coordinates.lat, position.coordinates.lng], 16);
  //   }
  //   console.log(mapRef);
  //   console.log('setView called');
  //   // };
  //   // setMapView();
  //   // console.log([position.coordinates.lat, position.coordinates.lng]);
  // }, [mapRef, position.loaded, position.coordinates]);

  // const MapCenter = () => {
  //   const map = useMap();
  //   if (position.loaded && !position.error) {
  //     map.setView(
  //       [position.coordinates.lat, position.coordinates.lng],
  //       map.getZoom()
  //     );
  //     console.log('map center render');
  //   } else {
  //     console.log('map center no map ref');
  //     // ;(position.error.message);
  //   }
  // };

  // const handleClick = () => {
  //   map.
  // };

  // useEffect(() => {
  //   locateUser();
  //   console.log('well?s');
  // }, []);

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
        <MapContainer
          center={center}
          zoom={16}
          scrollWheelZoom={true}
          // ref={mapRef}
          // whenCreated={(mapInstance) => {
          //   mapRef.current = mapInstance;
          // }}
        >
          {/* <MapCenter /> */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          />
          {/* locate user */}
          {position.loaded && !position.error && (
            <Marker
              position={[position.coordinates.lat, position.coordinates.lng]}
              icon={carIcon}
            >
              <Popup>
                <h2>👋🏻 我在這裡</h2>
              </Popup>
            </Marker>
          )}
          {/* <button onClick={handleClick}>Locate Me</button> */}
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
