import { createContext, useState } from 'react';

const ParkingContext = createContext();
const ParkingProvider = ({ children }) => {
  const defaultPosition = { lat: 25.044761, lng: 121.536651 };
  const [position, setPosition] = useState(defaultPosition);
  return (
    <ParkingContext.Provider value={{ position, setPosition, defaultPosition }}>
      {children}
    </ParkingContext.Provider>
  );
};

export { ParkingProvider };
export default ParkingContext;
