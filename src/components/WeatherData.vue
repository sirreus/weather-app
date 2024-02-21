<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'
// import HourlyWeatherItem from './HourlyWeatherItem.vue'

const route = useRoute()

// GET WEATHER
const API_URL = 'https://api.openweathermap.org/data/2.5/onecall'
const API_KEY = '7efa332cf48aeb9d2d391a51027f1a71' //import.meta.env.VITE_OPEN_WEATHER_API_KEY

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `${API_URL}?lat=${route.query.lat}&lon=${route.query.lng}&exclude=minutely&appid=${API_KEY}&units=metric`
    )

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
  } catch (err) {
    console.log(err)
  }
}
const weatherData = await getWeatherData()

const currentDate = new Date(weatherData.currentTime).toLocaleDateString('en-us', {
  weekday: 'short',
  day: '2-digit',
  month: 'long'
})

const currentTime = new Date(weatherData.currentTime).toLocaleTimeString('en-us', {
  timeStyle: 'short'
})
</script>

<template>
  <div>
    <span class="date-time">
      {{ `${currentDate} at ${currentTime}` }}
    </span>

    <div class="current-weather">
      <div class="current-weather-icon-wrapper">
        <img
          class="current-weather-icon"
          :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
          alt=""
        />
        <span class="current-weather-icon-description">{{
          weatherData.current.weather[0].description
        }}</span>
      </div>

      <div class="current-wrapper-temp">
        <p class="temp">{{ Math.round(weatherData.current.temp) }}&deg;</p>
        <p>
          Feels like
          {{ Math.round(weatherData.current.feels_like) }} &deg;
        </p>
      </div>
    </div>

    <hr class="block-breaker" />

    <div class="hourly-weather-list-wrapper">
      <div class="hourly-weather-list">
        <div
          v-for="hourData in weatherData.hourly.slice(0, 12)"
          :key="hourData.dt"
          class="hourly-weather"
        >
          <!-- TODO: make it work. cannot read prop of undefined -->
          <!-- <HourlyWeatherItem :data="hourData" /> -->
          <p class="time">
            {{
              new Date(hourData.currentTime).toLocaleTimeString('en-us', {
                hour: 'numeric'
              })
            }}
          </p>
          <img
            class="weather-icon"
            :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
            alt=""
          />
          <p>{{ Math.round(hourData.temp) }}&deg;</p>
        </div>
      </div>
    </div>

    <hr class="block-breaker" />

    <div class="weekly-weather-list-wrapper">
      <div v-for="day in weatherData.daily" :key="day.dt" class="weekly-weather-item">
        <p class="day">
          {{
            new Date(day.dt * 1000).toLocaleDateString('en-us', {
              weekday: 'long'
            })
          }}
        </p>
        <img
          class="weather-icon-small"
          :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
          alt=""
        />
        <div class="week-day-temp">
          {{ `${Math.round(day.temp.max)} / ${Math.round(day.temp.min)}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.date-time {
  margin-left: 40px;
}
.current-weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32px 0;

  .current-weather-icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    .current-weather-icon {
      width: 68px;
      height: 68px;
      object-fit: none;
    }
    .current-weather-icon-description {
      margin-top: 8px;
    }
  }

  .current-wrapper-temp {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin: 16px 0;
    .temp {
      font-size: 42px;
      font-weight: 600;
      line-height: initial;
    }
  }
}

.block-breaker {
  border: 0.5px solid #ebebeba3;
}

.hourly-weather-list-wrapper {
  min-width: 320px;
  width: 400px;
  text-align: center;
  overflow: hidden;

  .hourly-weather-list {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    margin: 32px 0;

    // Hide scrollbar for Chrome, Safari and Opera
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    .hourly-weather {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: fit-content;
    }
  }
}

.weekly-weather-list-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32px 0;

  .weekly-weather-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 8px 0;

    & > p,
    img,
    div {
      flex: 1;
    }

    .weather-icon-small {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }

    .week-day-temp {
      text-align: end;
    }
  }
}
</style>
