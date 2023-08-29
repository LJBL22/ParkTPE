import { useContext } from 'react';
import ParkingContext from '../Context';

export default function useParkingContext() {
  return useContext(ParkingContext);
}
