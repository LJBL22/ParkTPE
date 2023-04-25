import { useEffect } from 'react';
import axios from 'axios';

export const useGeolocation = (position, setPosition) => {
  useEffect(() => {
    let watcher = null;
    // 檢查瀏覽器是否支援 & 需要是 HTTPS 協議
    if ('geolocation' in navigator) {
      // 呼叫 navigator.geoLocation
      watcher = navigator.geolocation.watchPosition(
        // 如果同意則抓取定位
        ({ coords }) => {
          setPosition({ lat: coords.latitude, lng: coords.longitude });
        },
        // 處理錯誤
        (error) => {
          console.error('Error:', error);
          // 如果阻擋則取 IP 位置
          if (error.code === error.PERMISSION_DENIED) {
            const fetch = async () => {
              try {
                const { data } = await axios.get('https://ipapi.co/json');
                setPosition({ lat: data.latitude, lng: data.longitude });
              } catch (error) {
                console.error('[blocked and get IPApi failed]', error);
              }
            };
            fetch();
          }
        }
      );
      // 測試用，待刪除
      console.log(position);
    }
    // 釋放記憶體空間、避免佔用資源
    return () => {
      if (watcher) {
        navigator.geolocation.clearWatch(watcher);
      }
    };
  }, [setPosition]);
};

export const useCustomWindowSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  // 搭配CSS，處理 safari 特性
  // 處理調整螢幕大小
  useEffect(() => {
    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    // 添加 resize 事件監聽器
    window.addEventListener('resize', handleResize);
    // cleanup function: 移除 resize 事件監聽器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};
