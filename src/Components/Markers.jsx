import { Marker } from 'react-leaflet';
import { parkingIcon, tw97ToWGS84 } from '../utility';
import CustomPopup from './CustomPopup';

const Markers = ({ parkingLot, spaceLeft }) => {
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

  return renderMarkers;
};

export default Markers;
