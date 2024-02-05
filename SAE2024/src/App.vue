<script>
 import {RouterView } from 'vue-router'
 import Navigation from './components/navigation.vue'

 export default {
  components: {
    Navigation
  },
}
</script>

<template>
  <div id="app"></div>
  <Navigation/>
  <RouterView />
</template>

<style>
</style>
