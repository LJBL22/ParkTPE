import React from 'react';
import { MyLocationRounded } from '@mui/icons-material';
import styled from 'styled-components';
import axios from 'axios';
import useParkingContext from '../hooks/use-parking-context';

export const LocateBtn = () => {
  const { setPosition } = useParkingContext();
  function handleBtnClick() {
    // 檢查瀏覽器是否支援 & 需要是 HTTPS 協議
    if ('geolocation' in navigator) {
      // 呼叫 navigator.geoLocation
      navigator.geolocation.getCurrentPosition(
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
                console.error('[blocked and get IP-API failed]', error);
              }
            };
            fetch();
          }
        }
      );
    }
  }
  return (
    <StyledBtn onClick={() => handleBtnClick()}>
      <MyLocationRounded />
    </StyledBtn>
  );
};

const StyledBtn = styled.button`
  background-color: var(--color-theme);
  width: 1.65rem;
  height: 1.65rem;
  position: absolute;
  top: 5.25rem;
  left: 1rem;
  z-index: 400;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: var(--color-dark);
    width: 2rem;
    height: 2rem;
  }
`;
