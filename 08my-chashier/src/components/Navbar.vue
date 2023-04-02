<script setup>

</script>
 
<template>
    <div class="flex flex-row">
        <div class="flex w-fit justify-center text-lg font-bold p-5 text-yellow-500 bg-indigo-950">
            203_Store
        </div>
        <div class="flex w-full gap-x-4 p-5 text-lg font-semibold bg-indigo-100 ">
            <router-link to="/">Cashier</router-link> |
            <router-link :to="{name:'History'}">History</router-link>
        </div>
    </div>
</template>
 
<style>

</style>