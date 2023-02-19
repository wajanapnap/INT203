<script setup>
import {ref} from 'vue'
import colorGroupsJson from './data/color-groups.json'

const colorGroups = colorGroupsJson

const menuVisible =ref(true)
const gameVisible =ref(false)
const playerName = ref('')

const checkPlayerName = () => {
  if(playerName.value === null || playerName.value === '' ){ 
     playerName.value = 'Guest'
  } else {
    playerName.value
  }
  return playerName.value
} 

let timeleft = ref(60);
const downloadTimer = setInterval(function(){
  if(timeleft.value <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Time-out"
  } else {
    document.getElementById("countdown").innerHTML = timeleft.value
  }
  timeleft.value -= 1;
}, 1000);

const toggletoMenu = () => {
  menuVisible.value = !menuVisible.value
  gameVisible.value = !gameVisible.value
  playerName.value = ''
  score = ref(0)  
  } 

const toggletoGame = () => {
menuVisible.value = !menuVisible.value
gameVisible.value = !gameVisible.value
checkPlayerName()
document.getElementById("time").innerHTML = '<div id="countdown"></div>'
timeleft.value = 60

} 

const restartGame = () => {
  score.value = 0
  timeleft.value = 60
  maxCircle = 4
  changeColor(true)
  } 


console.log(timeleft.value)

let score = ref(0)    
let colorRandom = 0
let normalColor = ref('')
let diffColor = ref('')
let maxCircle = 4
let diffPos = 0
let gridCol = ''

const changeColor = (firstLogin) => {
  if(!firstLogin){
      score.value++
    }
  colorRandom = colorGroups[Math.floor(Math.random() * colorGroups.length)]
  normalColor = 'bg-[#' + colorRandom.normal + ']'
  diffColor = 'bg-[#' + colorRandom.diff + ']'
  if(score.value >= 25){
    maxCircle = 25
    // gridCol = 'grid grid-cols-5 gap-2'
  }else if(score.value >= 15){
    maxCircle = 16
    // gridCol = 'grid grid-cols-4 gap-2'
  }else if(score.value >= 5){
    maxCircle = 9
    // gridCol = 'grid grid-cols-3 gap-2'
  }
  // maxCircle = 25
  diffPos = Math.floor(Math.random() * maxCircle)
  gridCol = 'grid grid-cols-'+Math.sqrt(maxCircle,2).toString()+ ' gap-2'
}

changeColor(true)    
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
          <span id="time" class="font-mono text-6xl text-white mb-12">
            <!-- <div id="countdown"></div> -->
          </span>
        </div>

        <!-- circle -->
        <div :class="gridCol">
          <template v-for="(item,index) in maxCircle">
            <div v-if="diffPos !== index" class="rounded-full w-32 h-32" :class="normalColor"  :key="item.id">{{index}}</div>
            <div @click="changeColor(false)" v-if="diffPos === index" class="rounded-full w-32 h-32" :class="diffColor" :key="item.id">{{index}} </div>
          </template>
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
