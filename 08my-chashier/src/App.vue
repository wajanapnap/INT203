<script setup>
import { createRouter, createWebHistory } from 'vue-router'
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue'



</script>

<template>
 <div>
  <div>
    <Navbar class="mb-5"/>
    <RouterView :key="$route.path" />
  </div>

 </div>

</template>

<style scoped>

</style>
