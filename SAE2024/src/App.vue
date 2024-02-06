<template>
  <div id="app">
    <Navigation/>
    <RouterView />
  </div>
</template>

<script>
import Navigation from './components/navigation.vue'

export default {
  components: {
    Navigation,
  },
}
</script>

<style>
@import './assets/main.css';
</style>