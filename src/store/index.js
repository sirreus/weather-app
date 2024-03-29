import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const store = createStore({
  state: {
    cities: [],
  },
  getters: {
    getCities: (state) => state.cities,
    getCityById: (state) => (id) => state.cities.find((city) => city.id === id),
  },
  mutations: {
    saveCity(state, city) {
      state.cities.push(city);
    },
    removeCity(state, id) {
      state.cities = state.cities.filter((city) => city.id !== id);
    },
  },
  actions: {
    saveCity({ commit }, city) {
      commit("saveCity", city);
    },
    removeCity({ commit }, id) {
      commit("removeCity", id);
    },
  },
  plugins: [vuexLocal.plugin],
});

export default store;
