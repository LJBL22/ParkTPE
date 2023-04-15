import axios from "axios";

const parkingLotUrl = 'https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json'
const spacesLeftUrl = 'https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json'


export const getParkingLot = async () => {
  try {
    const res = await axios.get(parkingLotUrl)
    // 驗證用，待刪除
    console.log(res)
    const data = res.data.data.park
    // 驗證用，待刪除
    console.log(data[368].area)
    return data
  } catch {
    console.error('[Get parking lots failed]: ', error);
  }
}
export const getSpacesLeft = async () => {
  try {
    const res = await axios.get(spacesLeftUrl)
    // 驗證用，待刪除
    console.log(res)
    const data = res.data.data.park
    // 驗證用，待刪除
    console.log(data[38].id)
    return data
  } catch {
    console.error('[Get left-spaces failed]: ', error);
  }
}