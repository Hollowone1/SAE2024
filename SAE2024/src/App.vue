<template>
  <div id="app">
    <Navigation/>
    <ToastContainer />
    <RouterView />
  </div>
</template>

<script>
import Navigation from './components/navigation.vue'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default {
  components: {
    Navigation,
    ToastContainer
  },
}
</script>

<style>
@import './assets/main.css';
</style>