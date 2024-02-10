import {createRouter, createWebHistory} from 'vue-router'
import accueil from '@/views/AccueilView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from "@/views/RegisterView.vue"
import GameView from "@/views/GameView.vue"
import ProfilView from "@/views/ProfilView.vue"
import {useAuthStore} from "@/stores/authStore.js";
import SelectSerieView from "@/views/SelectSerieView.vue";

const router = createRouter({
    history: createWebHistory(),
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
            component: SelectSerieView,
            // meta: { requiresAuth: true }
        },
        {
            path: '/game',
            name: 'game',
            component: GameView,
        },
        {
            path: '/profil',
            name: 'profil',
            component: ProfilView,
            // meta: { requiresAuth: true }
        },
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) {
        next({ path: '/login' });
    } else {
        next();
    }
});

export default router
