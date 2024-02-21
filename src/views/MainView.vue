<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import SearchBlock from '@/components/SearchBlock.vue'
import SavedCityShortInfo from '@/components/SavedCityShortInfo.vue'

const store = useStore()
const savedCities = ref([])

watch(
  store,
  () => {
    savedCities.value = computed(() => store.getters.getCities)
  },
  { immediate: true }
)

console.log(savedCities.value)
</script>

<template>
  <header>
    <h1>Weather Forecast</h1>
  </header>
  <main>
    <SearchBlock />
    <div v-if="savedCities.value.length > 0">
      <hr id="diver" />
      <label>Saved locations</label>
      <div v-for="city in savedCities.value" :key="city.id">
        <SavedCityShortInfo :city="city" />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
hr#diver {
  margin: 32px 0 16px 0;
  border: 0.5px solid #ebebeba3;
}
</style>
