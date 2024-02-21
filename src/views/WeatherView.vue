<script setup>
import WeatherData from '@/components/WeatherData.vue'
import { computed, ref, watch } from 'vue'
import { uid } from 'uid'
import { useRoute, RouterLink } from 'vue-router'
import { useStore } from 'vuex'

const cityName = ref(null)
const savedCities = ref([])
const isSave = ref(false)
const route = useRoute()
const store = useStore()

cityName.value = route.params.city
const currentCity = {
  id: uid(),
  name: route.params.city,
  country: route.params.country,
  lat: route.query.lat,
  lng: route.query.lng
}
const saveCity = () => {
  store.dispatch('saveCity', currentCity)
  isSave.value = true
}

watch(
  store,
  () => {
    savedCities.value = computed(() => store.getters.getCities)
  },
  { immediate: true }
)

const isCitySaved = () => {
  return store.state.cities.findIndex((savedCity) => savedCity.id === route.query.id) !== -1
}
isSave.value = isCitySaved()
</script>

<template>
  <main>
    <header>
      <RouterLink :to="{ name: 'main' }">
        <img
          class="go-back-btn"
          id="action"
          src="../assets/backward-arrow-icon.svg"
          @click="goBack"
          alt="backward arrow"
      /></RouterLink>

      <h1>{{ cityName }} | Local Weather</h1>
      <img
        class="save-city-btn"
        id="action"
        v-if="!isSave"
        src="../assets/plus-add-icon.svg"
        @click="saveCity"
        alt="save city"
      />
    </header>

    <Suspense>
      <template #default>
        <WeatherData />
      </template>
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </main>
</template>

<style lang="scss" scoped>
main {
  position: relative;
}
header {
  display: flex;
  flex-direction: row;
  align-items: center;

  h1 {
    margin: 0 16px;
  }

  img#action {
    display: block;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .go-back-btn {
    margin: 8px 8px 8px 0;
  }

  .save-city-btn {
    margin: 8px;
    &:hover {
      border-radius: 50%;
      box-shadow: 0 0 8px 2px #dbdbdba3;
    }
  }
}
</style>
