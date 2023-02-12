<script setup>
import {ref} from 'vue'

const darkTheme =ref(false)
const yourColor =ref('#5a72d3')

const studentId = ref('')
const entryYear = ref('')
const findEntryYear = (e, digits) => {
    entryYear.value = studentId.value.substring(0, digits)
    alert(e.target.id)
    alert(e.target.name)
    alert(e.target.tagName)
}

const dinamicImage = "images/minji.png"
</script>

<template>

  <div class="w-full h-screen flex flex-col"
       :style="
       darkTheme 
        ?[{'background-color': '#282828'},{'color': 'white'}]
        :[{'background-color': 'white'},{'color': '#282828'}]">

        <div class="w-full flex-col">
          <div class="flex">
            <p>Static image:</p>
            <img src="./assets/logo.svg" alt="" class="w-20 h-20">
          </div>
          <div class="flex">
            <p>Dinamic image:</p>
            <img :src="dinamicImage" alt="" class="w-20">
          </div>
        </div>



    <div class="w-full flex justify-end space-x-2 p-2">
      <span>Dark mode</span>
      <input type="checkbox" class="toggle" checked v-model="darkTheme"/>
    </div>
    <div class="w-full h-1/3 flex space-x-2 p-2 favoriteColor">
      <span>Your Favorite Color</span>
      <input type="color" v-model="yourColor"/>
      {{ yourColor }}
    </div>

    <div class="w-full flex flex-col">
      <div class="flex space-x-2">
        <span>Your student id:</span>
        <input
          type="text"
          v-model="studentId"
          placeholder="64xxxxxxxxx"
          class="border border-gray-200"
        />
        <button
          @click="findEntryYear($event, 2)"
          class="bg-emerald-500 text-white p-1 rounded-md"
          id="btn-001"                    
          name="findEntryYearBtn">
          OK
        </button>
      </div>
      <div class="flex">
        <p>
          Your entry year: <span>{{ entryYear }}</span>
        </p>
      </div>
    </div>

  </div>

</template>

<style scoped>
.favoriteColor {
  background-color: v-bind(yourColor);
}
</style>
