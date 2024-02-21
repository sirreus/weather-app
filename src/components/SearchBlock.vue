<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const queryTimeout = ref(null)
const searchQuery = ref(null)
const searchResults = ref(null)
const searchError = ref(null)

// FIND CITY
const MAPBOX_API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
const API_TOKEN = import.meta.env.VITE_MAPBOX_API_TOKEN

const getSearchResults = () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(
          `${MAPBOX_API_URL}/${searchQuery.value}.json?access_token=${API_TOKEN}&types=place`
        )
        searchResults.value = result.data.features
      } catch {
        searchError.value = true
      }

      return
    }
    searchResults.value = null
  }, 300)
}

// routing to specific city weather view
const router = useRouter()
const previewCity = (searchResult) => {
  const [city, , country] = searchResult.place_name.split(',')
  router.push({
    name: 'cityWeather',
    params: { country: country.replaceAll(' ', ''), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true
    }
  })
}
</script>

<template>
  <form class="search-block">
    <input
      type="text"
      class="search-input"
      placeholder="Search for a city"
      v-model="searchQuery"
      @input="getSearchResults"
    />
    <ul class="search-results-list" v-if="searchResults">
      <p v-if="!searchError && searchResults.length === 0">
        No results match your query, try a different term.
      </p>
      <template v-else>
        <li
          v-for="searchResult in searchResults"
          :key="searchResult.id"
          @click="previewCity(searchResult)"
        >
          {{ searchResult.place_name }}
        </li>
      </template>
    </ul>
  </form>
</template>

<style lang="scss" scoped>
.search-block {
  position: relative;
  width: 320px;

  .search-input {
    width: inherit;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
  }

  .search-results-list {
    width: inherit;
    margin-top: 16px;
    padding: 0;
    li {
      list-style: none;
      cursor: pointer;

      :hover {
        font-weight: 600;
      }
    }
  }
}
</style>
