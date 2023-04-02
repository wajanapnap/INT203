<script setup>
import { ref } from 'vue'
import { getMails } from './composable/getMails.js'
import SingleMail from './components/SingleMail.vue'
import BinaryPreview from './components/BinaryPreview.vue'

const mails = ref(getMails())
const selectedMail = ref([])
// const addSelectedMail = (mailId, eTarget, status) => {
const addSelectedMail = (user, e) => {
    onsole.log(user)
    console.log(e.mailId)
    console.log(e.eTarget)
    console.log(e.mailStatus)
    selectedMail.value.push(e.mailId)
}

const chooseBinaryFile = (e)=>{
    console.log(e.target.files[0])
    selectedMail.value = e.target.files[0]
}
</script>

<template>
  <div class="w-full p-3">        
    <div>            
      <h1 class="flex text-2xl tracking-wider font-semibold justify-center">
      ~ Mailing List ~
      </h1>        
    </div>
    <div>Selected Mail{{ selectedMail }}</div>

    <!-- <div class="grid grid-cols-8 gap-2">            
      <div class="justify-self-center font-semibold">Title</div>            
      <div class="col-span-6 justify-self-center font-semibold">Body</div>            
      <div class="justify-self-center font-semibold">Keywords</div>        
    
    <div class="grid grid-cols-8 gap-2" 
    v-for="(mail, index) in mails" 
    :key="mail.id" 
    :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'">  

    <SingleMail 
    :mail="mail"                
    :layout="{ type: 'grid', colSpanNo: 2, colSpanValue: 6 }" />
    </div>        -->
    
    <div class="w-full flex">            
      <div class="flex w-2/12 justify-center font-semibold">Title</div>            
      <div class="flex w-8/12 justify-center font-semibold">Body</div>            
      <div class="flex w-2/12 justify-center font-semibold">Keywords</div>        
    </div>

    <div            
    class="w-full flex"            
    v-for="(mail, index) in mails"            
    :key="mail.id"            
    :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'">            
    
    <SingleMail 
    :mail="mail" 
    @chooseMail="addSelectedMail('Umaporn', $event)" />        
    </div>
    
    <div>
      Choose Your File: 
      <input type="file" accept="image/*, . pdf"
      @change="chooseBinaryFile"/>

      <BinaryPreview
      :selectedBinaryObject="selectedBinaryFile"/>

    </div>
  </div>
</template>

<style scoped>

</style>
