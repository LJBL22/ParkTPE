import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'leaflet/dist/leaflet.css';
// 檢查用，待刪
import { getParkingLot, getSpacesLeft } from './api';
getParkingLot();
getSpacesLeft();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
