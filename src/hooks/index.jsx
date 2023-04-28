import { useEffect, useState } from 'react';
import axios from 'axios';

export const useGeolocation = () => {
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
  return position;
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
