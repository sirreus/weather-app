function fixTime(weatherData) {
  // cal current date & time
  const localOffset = new Date().getTimezoneOffset() * 60000
  const utc = weatherData.data.current.dt * 1000 + localOffset
  weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset

  // cal hourly weather offset
  weatherData.data.hourly.forEach((hour) => {
    const utc = hour.dt * 1000 + localOffset
    hour.currentTime = utc + 1000 * weatherData.data.timezone_offset
  })
  return weatherData.data
}

export default fixTime
