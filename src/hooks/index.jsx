import { useEffect } from 'react';
import axios from 'axios';

export const useGeolocation = (position, setPosition) => {
  useEffect(() => {
    if ('geolocation' in navigator) {
      // 呼叫 navigator.geoLocation
      navigator.geolocation.getCurrentPosition(
        // 如果同意則抓取定位
        ({ coords }) => {
          setPosition({ lat: coords.latitude, lng: coords.longitude });
          console.log('Current Position allowed');
        },
        // 如果阻擋則取 IP 位置
        (blocked) => {
          if (blocked) {
            const fetch = async () => {
              try {
                const { data } = await axios.get('https://ipapi.co/json');
                setPosition({ lat: data.latitude, lng: data.longitude });
              } catch (error) {
                console.error('[blocked and get api failed]', error);
              }
            };
            fetch();
          }
        },
        // 處理錯誤
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }, []);
};

export const useCustomWindowSize = () => {
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
