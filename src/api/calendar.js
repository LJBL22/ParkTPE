import axios from "axios";

const today = new Date()
const year = today.getFullYear()

const TaiwanCalenderUrl = `https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/${year}.json`

const month = () => {
  // index 0-11 for 12 months
  const doubleDigit = today.getMonth() + 1
  return doubleDigit < 10 ? `0${doubleDigit}` : doubleDigit
}

const date = `${today.getFullYear()}${month()}${today.getDate()}`
// 檢查用，待刪除
console.log(date)

export const getTaiwanCalender = async () => {
  try {
    const res = await axios.get(TaiwanCalenderUrl)
    const data = res.data
    // const test = res.data[115].date
    // console.log(test)
    console.log(data)
    return data
  } catch (error) {
    console.error('[Get Taiwan Calendar failed]: ', error);
  }
}
