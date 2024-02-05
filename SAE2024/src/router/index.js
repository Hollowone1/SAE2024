import { createRouter, createWebHistory } from 'vue-router'
import accueil from '@/views/AccueilView.vue'
import ConnexionView from '@/views/ConnexionView.vue'
import AuthView from "@/views/AuthView.vue";

const router = createRouter({
  history: createWebHistory(),
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

]})

export default router
