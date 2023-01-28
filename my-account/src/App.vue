<script setup>
import lists from './data/lists.json'

var total = lists.map(list => list.amount).reduce((acc, amount) => acc + amount);
console.log(total)

const check = (price) => {   
    if (price > 0)
      return "bg-green-200"
      else if (price < 0)
      return "bg-red-200"
      else
      return "bg-white"
    }

</script>

<template>
  <div>

    <h1 class="flex justify-center font-bold mt-10">MY ACCOUNT</h1>

    <div class="md:hidden">
      <div class="w-full flex flex-col border-2 rounded-md mb-4 mt-4 p-2" v-for="(list,index) in lists" :key="index">    
        <div>Name: {{list.name}}</div>
        <div class="flex">Amount:<div :class="check(list.amount)" class="w-fit rounded-md ml-2">{{list.amount}}</div> </div>
      </div>

      <div class="flex font-bold border-2 rounded-md p-2 pl-12">Net total:<div class="w-2/3 font-bold pl-12">{{total}}</div></div>
    </div>

    
    <div class="md:flex flex-col hidden items-center rounded-md mb-4 mt-4 p-2">
      <table class="w-[45rem]">
        <thead>
          <tr class="border-y-2">
            <th class="text-left font-bold px-2">Name</th>
            <th class="text-right font-bold px-2">Amount</th>
          </tr>
        </thead>
        <tbody class="" v-for="(list,index) in lists" :key="index">
            <tr>
              <td class="text-left py-1 px-2" >{{list.name}}</td>              
              <td class="text-right py-1 px-2" ><div :class="check(list.amount)" class="w-fit ml-auto">{{list.amount}}</div></td>                 
            </tr>
        </tbody>
        <tr class="border-y-2 p-2">
            <td class="text-left font-bold px-2">Net total:</td>
            <td class="text-right font-bold px-2">{{total}}</td>
        </tr>
      </table>
    </div>
    


  </div>
  
</template>

<style scoped>
</style>
