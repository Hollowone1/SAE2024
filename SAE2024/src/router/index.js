import {createRouter, createWebHistory} from 'vue-router'
import accueil from '@/views/AccueilView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from "@/views/RegisterView.vue"
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
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/nouvelle-partie',
            name: 'nouvelle-partie',
            component: GameView,
            meta: { requiresAuth: true }
        },
    ]
})

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user')

    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/login')
        return
    }
    next()
});

export default router
