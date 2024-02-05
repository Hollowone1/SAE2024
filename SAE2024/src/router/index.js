import { createRouter, createWebHistory } from 'vue-router'
import accueil from '../views/AccueilView.vue'
import ConnexionView from '../views/ConnexionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: accueil
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      children: [
        {
          path: 'login',
          name: 'auth/login',
          component: ConnexionView,
        }
  ]
}]})

export default router
