<script setup>
import IcRoundSearch from './components/icons/IcRoundSearch.vue'
import groupworks from './data/groupworks.json'
import {ref, computed} from 'vue'

const courseTitle ='<span class="text-orange-500">INT203-Client Side Programming II</span>'
const courseId = 'INT201'
const searchDisabled = false
const getFooter = (type) => {
    let footer = 'School of Information Technology, KMUTT'    
    if (type.toLowerCase() === 'long')
        footer = `INT203-Client Side Programming II, ${footer}`    
        return footer}


const notActiveData = 1
const activeData = ref(1)

const increamentReactiveData= () =>{
    // return (activeData.value = activeData.value + 1)
    return ++activeData.value
}

const searchKeyword=ref('')
const agree = ref(false)

const searchVisible =ref(true)
const toggle = () => {searchVisible.value = !searchVisible.value}

const groups = groupworks
const filterGroupWorks = computed(() => {
  return groups.filter((group) =>
    group.projectName.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

</script>

<template>
  <!--Outer div--> 
  <div class="w-full">
      
    <div class="flex flex-col">
      <div class="flex items-center space-x-3">
        <p>Not Reactive Data: {{ notActiveData }}
        </p>
        <button 
        @click="++notActiveData" 
        class="border border-gray-200 rounded-md">+
        </button>
      </div>
      <div class="flex items-center space-x-3">
        <p>Active Data: {{ activeData }}
        </p>
        <button 
        @click="increamentReactiveData"
        class="border border-gray-200 rounded-md">+
        </button>
      </div>

      <div class="flex items-center space-x-3">
        <input type="checkbox" id= "agree" v-model= "agree" /> 
        <label for="checkbox"> I <span>{{ agree ? 'agree' : 'not agree'}}</span> the terms and use </label>
      </div>

    </div>
      
    
    <!-- column#1 (header) -->
    <div class="w-full flex-col">
      <div class="w-full flex flex-row">
        <img src="./assets/logo.svg" class="w-14 h-12 m-3" />
        <div class="w-full flex flex-col p-2">                    
          <h1 class="tracking-widest text-emerald-500 text-xl">Vue3 Group Projects</h1>                    
          <h3 class="italic" v-html="courseTitle"></h3>                
        </div>

        <div class="w-full flex p-2 m-2 justify-end" >
          <IcRoundSearch @click="toggle"/>                     
          <div class="w-3/5 space-x-2 flex items-center" v-show="searchVisible">                       
            <input 
              v-model.trim="searchKeyword"
              class="w-full p-1 outline-none rounded-lg border border-gray-200"                            
              type="text" 
              placeholder="Type your keyword here..."/> 
              {{ searchKeyword }}                       
            <button class="border p-1 rounded-lg" 
                    :class="searchDisabled ? 'border-red-500' : 'border-green-500'">Search</button>                    
          </div>                
        </div>            
      </div> 

    <!-- column#2 (table) -->
    <div class="w-full flex-col p-2 m-8">
      <table>
        <thead class="bg-gray-50 border-b-2 border-gray-200">                        
          <tr>                            
            <th class="text-left font-semibold tracking-widest p-3">Section</th>                            
            <th class="text-left font-semibold tracking-widest p-3">Project Name</th>                            
            <th class="text-left font-semibold tracking-widest p-3">GitHub Repository</th>                            
            <th class="text-left font-semibold tracking-widest p-3">Group Members</th>                        
          </tr>                    
        </thead>
        <tbody>
          <tr :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'"
            v-for="(groupwork, index) in filterGroupWorks" :key="index">                            
            <td class="text-center">{{ groupwork.section }}</td>
            <td>{{ groupwork.projectName }}</td>
            <td><a class="text-purple-800" :href="groupwork.githubRepo" target="_blank">{{ groupwork.githubRepo }}</a></td>
            <td><div v-for="student in groupwork.students" :key="student.id">
                <p>{{ student.id }} {{ student.name }}</p></div></td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- column#3 (footer) -->            
    <div class="w-full flex justify-center">{{ getFooter('short') }}
    </div>
    </div>
  </div>
</template>

<style scoped>
</style>
