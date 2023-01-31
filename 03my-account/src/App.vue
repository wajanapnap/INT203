<script setup>
import lists from './data/lists.json'

var total = lists.map(list => list.amount).reduce((acc, amount) => acc + amount);

const comma = (num) => {
  return num.toLocaleString("en")
}

</script>

<template>
  <div>

    <h1 class="flex justify-center font-bold mt-10">MY ACCOUNT</h1>

    <div class="md:hidden">
      <div class="w-full flex flex-col " v-for="(list,index) in lists " :key="index"> 
        <div class="border-2 rounded-md mb-2 mt-2 p-2" v-if="list.amount !==0"> 
          <div>Name: {{list.name}}</div>
          <div class="flex">Amount:<div :class="list.amount > 0 ? 'bg-green-200' : 'bg-red-200'"  class="w-fit rounded-md ml-2">{{comma(list.amount)}}</div></div>
        </div>  
      </div>

      <div class="flex font-bold border-2 rounded-md p-2 pl-12">Net total:<div class="w-2/3 font-bold pl-12">{{comma(total)}}</div></div>
    </div>

    
    <div class="md:flex flex-col hidden mt-4 p-2">
      <table class="w-[45rem]">
        <thead>
          <tr class="border-y-2">
            <th class="text-left font-bold px-2">Name</th>
            <th class="text-right font-bold px-2">Amount</th>
          </tr>
        </thead>
        <tbody class="" v-for="(list,index) in lists" :key="index">
            <tr v-if="list.amount !==0">
              <td class="text-left px-2" >{{list.name}}</td>              
              <td class="text-right px-2" ><div :class="list.amount > 0 ? 'bg-green-200' : 'bg-red-200'" class="w-fit ml-auto">{{comma(list.amount)}}</div></td>                 
            </tr>
        </tbody>
        <tr class="border-y-2 p-2">
            <td class="text-left font-bold px-2">Net total:</td>
            <td class="text-right font-bold px-2">{{comma(total)}}</td>
        </tr>
      </table>
    </div>
    

  </div>
  
</template>

<style scoped>
</style>
