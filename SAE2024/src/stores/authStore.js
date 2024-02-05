import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        apiKey: null
    }),
    actions: {
        setApiKey(apiKey) {
            this.apiKey = apiKey;
        }
    }
})