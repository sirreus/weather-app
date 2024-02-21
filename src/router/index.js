import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import WeatherView from '@/views/WeatherView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      meta: {
        title: 'Weather Forecast'
      }
    },
    {
      path: '/weather/:country/:city',
      name: 'cityWeather',
      component: WeatherView,
      meta: {
        title: 'Weather'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.city ? `${to.params.city}, ${to.params.country} | The Local Weather` : to.meta.title
  }`
  next()
})

export default router
