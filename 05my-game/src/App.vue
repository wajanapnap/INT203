<script setup>
import {ref} from 'vue'
import colorGroupsJson from './data/color-groups.json'

const colorGroups = colorGroupsJson

const menuVisible =ref(true)
const gameVisible =ref(false)
const endGameVisible =ref(false)
const isGameEnd = ref(false)
const playerName = ref('')
let timeleft = ref()
let score = ref(0) 
let colorRandom = 0   
let normalColor = ref('')
let diffColor = ref('')
let gridCol = ''
let circleAmount = 4
let diffPos = 0
let circleSize = 'w-32 h-32'
let downloadTimer

const checkPlayerName = () => {
  if(playerName.value.length === 0 || playerName.value === '' ){ 
     playerName.value = 'Guest'
  }
  return playerName.value
} 

const toggletoMenu = () => {
  menuVisible.value = true
  gameVisible.value = false
  endGameVisible.value = false
  playerName.value = ''
  score = ref(0)  
} 

const toggletoEndGame = () => {
  menuVisible.value = false
  gameVisible.value = false
  endGameVisible.value = true
} 

const toggletoGame = () => {
  menuVisible.value = false
  gameVisible.value = true
  endGameVisible.value = false
  checkPlayerName()
  startGame()
} 

const startGame = () => {
  if(downloadTimer){
    clearInterval(downloadTimer)
    }

  score.value = 0
  circleAmount = 4 
  timeleft.value = 60 
  getNewColor(true)  
  
  downloadTimer = setInterval(() => {  
  if(timeleft.value === 1){
    clearInterval(downloadTimer)
    toggletoEndGame()
    }
    timeleft.value--
  }, 1000)
} 

const getNewColor = (firstLogin) => {
  if(!firstLogin){
      score.value++
    }
  if(score.value >= 25){
    circleAmount = 25
    circleSize = 'w-16 h-16'
    // gridCol = 'grid grid-cols-5 gap-2'
  }else if(score.value >= 15){
    circleAmount = 16
    circleSize = 'w-20 h-20'
    // gridCol = 'grid grid-cols-4 gap-2'
  }else if(score.value >= 5){
    circleAmount = 9
    circleSize = 'w-24 h-24'
    // gridCol = 'grid grid-cols-3 gap-2'
  }else{
    circleSize = 'w-32 h-32'
  }
  colorRandom = colorGroups[Math.floor(Math.random() * colorGroups.length)]
  normalColor = 'bg-[#' + colorRandom.normal + ']' + ' ' + circleSize
  diffColor = 'bg-[#' + colorRandom.diff + ']' + ' ' + circleSize

  diffPos = Math.floor(Math.random() * circleAmount)
  gridCol = 'grid grid-cols-'+ Math.sqrt(circleAmount,2).toString() + ' ' + 'gap-1'
}

getNewColor(true)

const restartGame = () =>{
  toggletoGame()
  startGame()
}
</script>

<template>

<div class="w-full h-screen flex justify-center bg-[#9CB1D4]">

  <div class="flex flex-col rounded-2xl m-auto bg-[#26282B]" v-show="menuVisible">

    <div class="flex mx-14 mt-12">
      <img src="./assets/Eccentric.svg" alt="" class="w-60 ">
    </div>
    <div class="flex flex-col justify-center m-8">
      <input type="text" placeholder="Type your name..." class="input w-full max-w-xs placeholder:text-center py-3 my-2"
             v-model="playerName" />
      <button class="btn bg-[#F0F31F] hover:bg-[#A2A418] text-zinc-900 font-bold py-3 my-2" @click="toggletoGame">
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
      <div class="font-bold text-3xl">{{playerName}}</div>
      <div class="h-4"></div>
      <div class="font-semibold">SCORE</div>
      <div class="font-bold text-4xl">{{score}}</div>
    </div>

    <div class="flex flex-col justify-center">
      <div class="flex flex-col rounded-2xl bg-[#26282B] mx-10 px-10 pt-6 pb-10" >  
        
        <!-- time -->
        <div class="flex justify-center">
          <span id="time" class="font-mono text-6xl text-white mb-12">{{timeleft}}</span>
        </div>

        <!-- circle -->
        <div :class="gridCol">
          <template v-for="(item,index) in circleAmount">
            <div v-if="diffPos !== index" class="rounded-full" :class="normalColor" :key="item.id"></div>
            <div @click="getNewColor(false)" v-if="diffPos === index" class="rounded-full" :class="diffColor" :key="item.id"></div>
          </template>
        </div>
        
      </div>

      <div class="flex flex-row justify-center mt-10">
        <button class="btn bg-[#F0F31F] hover:bg-[#A2A418] text-zinc-900 font-bold border-0 m-2" @click="toggletoMenu">MAIN MENU</button>
        <button class="btn bg-[#F652A0] hover:bg-[#A5356A] text-zinc-900 font-bold border-0 m-2" @click="startGame">RESTART GAME</button>
      </div>
    </div>

  </div>
  <!--end game -->
  
  <div class="w-full flex flex-row justify-center m-auto" v-show="endGameVisible">
    <div class="flex flex-col justify-center">

      <div class="flex flex-col rounded-2xl bg-[#26282B] mx-10 px-10 pt-6 pb-10" >  
        <div class="flex flex-col gap-6">

          <div class="flex-col text-center font-bold text-yellow-400 text-3xl">Congratulations!</div>
          <div class="flex-col text-center font-bold text-white text-3xl">{{playerName}}</div>
          <div class="flex-col text-center font-bold text-white text-3xl">You got <span class="text-4xl">{{score}}</span> points</div>

        </div>
      </div>

      <div class="flex flex-row justify-center mt-10">
        <button class="btn bg-[#F0F31F] hover:bg-[#A2A418] text-zinc-900 font-bold border-0 m-2" @click="toggletoMenu">MAIN MENU</button>
        <button class="btn bg-[#F652A0] hover:bg-[#A5356A] text-zinc-900 font-bold border-0 m-2" @click="restartGame">RESTART GAME</button>
      </div>

    </div>
  </div>
      
</div>

</template>

<style scoped>

</style>
