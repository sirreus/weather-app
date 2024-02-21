<script setup>
defineProps({
  data: {
    type: Object
  }
})
</script>
<template>
  <div class="hourly-weather-wrapper">
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
    <p class="temp">{{ Math.round(hourData.temp) }}&deg;</p>
  </div>
</template>

<style lang="scss" scoped>
.hourly-weather-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
}
</style>
