import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// 檢查用，待刪除
import { getTaiwanCalender } from './api/calendar';
getTaiwanCalender();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
