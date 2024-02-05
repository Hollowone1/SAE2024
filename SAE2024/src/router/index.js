import { createRouter, createWebHistory } from 'vue-router'
import accueil from '@/views/AccueilView.vue'
import ConnexionView from '@/views/ConnexionView.vue'
import AuthView from "@/views/AuthView.vue"
import GameView from "@/views/GameView.vue"

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
    },
    {
      path:'/nouvelle-partie',
      name:'nouvelle-partie',
      component: GameView
    },
      

]})

export default router
