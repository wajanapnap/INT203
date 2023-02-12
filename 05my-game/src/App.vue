<script setup>
import {ref} from 'vue'

const manuVisible =ref(true)
const gameVisible =ref(false)

const toggleManu = () => {
  manuVisible.value = !manuVisible.value
  gameVisible.value = !gameVisible.value
  } 

</script>

<template>

<div class="w-full h-screen flex justify-center bg-[#9CB1D4]">

  <div class="flex flex-col rounded-2xl m-auto bg-[#26282B]" v-show="manuVisible">

    <div class="flex mx-14 mt-12">
      <img src="./assets/Eccentric.svg" alt="" class="w-60 ">
    </div>
    <div class="flex flex-col justify-center m-8">
      <input type="text" placeholder="Type your name..." class="input w-full max-w-xs placeholder:text-center py-3 my-2" />
      <button class="btn bg-[#F0F31F] hover:bg-[#A2A418] text-zinc-900 font-bold py-3 my-2" @click="toggleManu">
        LET'S START!
      </button>
      <!-- line -->
      <div class="bg-[#9EA4B2] h-0.5 m-2"></div>
      <label for="my-modal" class="btn border rounded-lg bg-[#F0F31F] hover:bg-[#A2A418] font-bold text-zinc-900 py-3 my-2">How to play</label>
      <input type="checkbox" id="my-modal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg text-center">
            How to play
          </h3>
          <p class="py-4 text-center">
            Click on the <b>different</b> shade of color in a short period of time.
            Once you find the different shade, 
            you click it and score one point if it is the different one.
          </p>
          <div class="modal-action">
            <label for="my-modal" class="btn">
              OK
            </label>
          </div>
        </div>
      </div>
      <div class="h-4"></div>
    </div>
  </div>

  <!--game -->
  <div class="w-full flex flex-row justify-center m-auto" v-show="gameVisible">

    <div class="flex flex-col">
      <div class="font-semibold">PLAYER</div>
      <div class="font-bold text-3xl">GUEST</div>
      <div class="h-4"></div>
      <div class="font-semibold">SCORE</div>
      <div class="font-bold text-4xl">0</div>
    </div>

    <div class="flex flex-col justify-center">
      <div class="flex flex-col rounded-2xl bg-[#26282B] mx-10 px-10 pt-6 pb-10" >  
        
        <!-- time -->
        <div class="flex justify-center">
          <span class="countdown font-mono text-6xl text-white mb-12">
            <span style="--value:60;"></span>
          </span>
        </div>

        <!-- circle -->
        <div class="grid grid-cols-2 gap-2">
            <div class="bg-green-500 rounded-full w-32 h-32"></div>
            <div class="bg-green-500 rounded-full w-32 h-32"></div>
            <div class="bg-green-400 rounded-full w-32 h-32"></div>
            <div class="bg-green-500 rounded-full w-32 h-32"></div>
        </div>
        
      </div>

      <div class="flex flex-row justify-center mt-10">
        <button class="btn bg-[#F0F31F] hover:bg-[#A2A418] text-zinc-900 font-bold border-0 m-2" @click="toggleManu">MAIN MANU</button>
        <button class="btn bg-[#F652A0] hover:bg-[#A5356A] text-zinc-900 font-bold border-0 m-2">RESTART GAME</button>
      </div>
    </div>

  </div>

</div>

</template>

<style scoped>

</style>
