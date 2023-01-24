<script setup>
import { ref } from 'vue'
const counter = ref(1)
console.log(counter)
function increment() {
  return counter.value++
}
const decrement = () => {
  if (counter.value === 0) counter.value = 0
  else counter.value--
}
</script>

<template>
  <div class="w-screen h-screen flex">
    <div class="w-2/5 h-full bg-emerald-400 flex items-center">
      <h1 class="text-xs font-semibold text-white p-5 lg:text-2xl">
        Hello, Vue3 Composition API
      </h1>
    </div>
    <div class="w-3/5 bg-white flex flex-col m-2 items-center justify-center">
      <h1 class="text-black text-xs lg:text-2xl">Counter: {{ counter }}</h1>
      <div class="space-x-5">
        <button @click="increment" class="btn btn-primary btn-sm">+</button>
        <button @click="decrement" class="btn btn-primary btn-sm">-</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>