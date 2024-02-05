<script>
import {RouterLink,RouterView } from 'vue-router'
import Navigation from './components/navigation.vue'

export default {
  components: {
    RouterView,
    Navigation
  },
}
</script>



<template>
  <Navigation/>
  <RouterView />
</template>

<style scoped>
</style>
