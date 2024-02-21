<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const { city } = defineProps({
  city: {
    type: Object
  }
})

const store = useStore()
const router = useRouter()

const removeCity = () => {
  store.dispatch('removeCity', city.id)
}

const goToCityWeather = () => {
  router.push({
    name: 'cityWeather',
    params: { country: city.country, city: city.name },
    query: {
      id: city.id,
      lat: city.lat,
      lng: city.lng
    }
  })
}
</script>

<template>
  <div class="saved-city-wrapper">
    <div class="info-block" @click="goToCityWeather">
      <p>{{ city.name }}</p>
      <img class="go-to-city-weather" src="../assets/right-arrow-icon.svg" alt="right arrow icon" />
    </div>
    <img
      class="remove-city-btn"
      src="../assets/delete-icon.svg"
      @click="removeCity"
      alt="delete icon"
    />
  </div>
</template>

<style lang="scss" scoped>
.saved-city-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;

  .info-block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 8px;
    margin: 16px 0;
    border: 0.5px solid #ebebeba3;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      border: 0.5px solid white;
    }

    .go-to-city-weather {
      display: block;
      width: 16px;
      height: 16px;
    }
  }

  .remove-city-btn {
    display: block;
    width: 16px;
    height: 16px;
    cursor: pointer;
    margin-left: 16px;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
