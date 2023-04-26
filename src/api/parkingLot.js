import axios from "axios";

const parkingLotUrl = 'https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json'
const spacesLeftUrl = 'https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json'

export const getParkingLot = async () => {
  try {
    const res = await axios.get(parkingLotUrl)
    const data = res.data.data.park
    return data
  } catch (error) {
    console.error('[Get API: parkingLot failed]: ', error);
  }
}
export const getSpacesLeft = async () => {
  try {
    const res = await axios.get(spacesLeftUrl)
    const data = res.data.data.park
    return data
  } catch (error) {
    console.error('[Get left-spaces failed]: ', error);
  }
}
