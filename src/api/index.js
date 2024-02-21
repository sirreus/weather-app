import axios from 'axios'
import fixTime from '@/utils/fixTime'

const API_KEY = '7efa332cf48aeb9d2d391a51027f1a71'
const API_URL_ONECALL = 'https://api.openweathermap.org/data/2.5/onecall'
const API_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather'

async function oneCall(query) {
  const resp = await axios.get(
    `${API_URL_ONECALL}?lat=${query.lat}&lon=${query.lng}&exclude=minutely&appid=${API_KEY}&units=metric`
  )
  return fixTime(resp)
}

async function weather(query) {
  const resp = await axios.get(
    `${API_URL_WEATHER}?lat=${query.lat}&lon=${query.lng}&appid=${API_KEY}&units=metric`
  )
  return resp
}

export default { oneCall, weather }
