import axios from "axios";
const today = new Date()
const year = today.getFullYear()

const TaiwanCalenderUrl = `https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/${year}.json`

const month = () => {
  // index 0-11 for 12 months
  const doubleDigit = today.getMonth() + 1
  return doubleDigit < 10 ? `0${doubleDigit}` : doubleDigit
}

export const date = `${today.getFullYear()}${month()}${today.getDate()}`

export const getTaiwanCalender = async () => {
  try {
    const res = await axios.get(TaiwanCalenderUrl)
    const data = res.data
    return data
  } catch (error) {
    console.error('[Get Taiwan Calendar failed]: ', error);
  }
}
