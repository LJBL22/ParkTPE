import { useEffect, useState } from 'react';
import axios from 'axios';

export const useMap = () => {
  // 忠孝復興
  const defaultPosition = { lat: 25.044761, lng: 121.536651 };
  const [position, setPosition] = useState(defaultPosition);
  // 設定 useEffect，
  useEffect(() => {
    // 呼叫 navigator.geoLocation
    navigator.geolocation.getCurrentPosition(
      // 1st param: success callback function
      // 如果同意則更改 state
      ({ coords }) => {
        setPosition({ lat: coords.latitude, lng: coords.longitude });
        console.log('Current Position allowed');
      },
      // 2nd param: an optional callback function
      // 若無則使用預設值
      (blocked) => {
        if (blocked) {
          const fetch = async () => {
            try {
              const { data } = await axios.get('https://ipapi.co/json');
              setPosition({ lat: data.latitude, lng: data.longitude });
              // 檢查用，待刪除
              console.log('return position by IP');
            } catch (error) {
              console.error('[blocked and get api failed]', error);
            }
          };
          fetch();
        }
      }
    );
  }, []);
  return { position };
};
