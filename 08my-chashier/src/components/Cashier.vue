<script setup>
import {ref, computed} from 'vue'

const price = ref(0)
const priceList = ref([])

const addPrice = (price) => {    
    priceList.value.push(price)
    console.log(priceList.value)
}

const deletePrice = (index) => {
    priceList.value.splice(index,1)
    sumPrice()
    console.log(priceList.value)
}

const isMember = ref(true)
const totalPrice = ref(0)

const sumPrice = () =>{    
    let price = 0
    for (let i = 0; i < priceList.value.length; i++) {
        price += parseInt(priceList.value[i])
    }
    totalPrice.value = price
    console.log(totalPrice.value)
}

const calPercent = () => {
    let percent = 0
    if(isMember.value !== false){          
        if(totalPrice.value >= 30000){
            percent = 30
        }else if(totalPrice.value >= 15000){
            percent = 20
        }else if(totalPrice.value >= 8000){
            percent = 10
        }else if(totalPrice.value >= 5000){
            percent = 5
        }else{
            percent = 0
            }   
        return percent
    }
}

const percentColor = (showPercent) => {    
    if(calPercent()===showPercent){
        return 'bg-green-300 text-green-900'            
        }else{
            return 'bg-zinc-300 text-zinc-500'    
        } 
}

const discount = () => {
    if(isMember.value !== false){  
        if(calPercent()===30){            
            totalPrice.value = totalPrice.value-(totalPrice.value*0.3)
        }else if(calPercent()===20){
            totalPrice.value = totalPrice.value-(totalPrice.value*0.2)
        }else if(calPercent()===10){
            totalPrice.value = totalPrice.value-(totalPrice.value*0.1)
        }else if(calPercent()===5){
            totalPrice.value = totalPrice.value-(totalPrice.value*0.05)
        }else{
            totalPrice.value
            }
        return totalPrice.value
    }
}
discount()
console.log(totalPrice.value)
    

</script>
 
<template>
    <div>
        <h1 class="text-blue-800 text-3xl font-semibold mx-60">
            Cashier
        </h1>
        
        <div class="flex flex-col justify-center rounded-2xl bg-zinc-200 mx-60 mt-5 mb-20 px-12 py-10 gap-y-6">

            <!-- input -->
            <div class="flex flex-row justify-center gap-x-4 text-lg">
                <input type="text" name="price" id="price" class="w-5/6 bg-white rounded-md py-1.5 pl-1 text-gray-900"
                    v-model="price">
                <button type="submit" class="w-1/6 rounded-md bg-zinc-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
                    @click="addPrice(price) ; sumPrice() " >
                    Add
                </button>
            </div>        
            <div>
                <div class="flex flex-row rounded-md bg-white text-lg font-base p-10"
                    v-for="(price, index) in priceList" :key="index">
                    <div class="flex w-1/12">
                        {{index + 1}}
                    </div>
                    <div class="flex w-9/12">
                        {{price}} ฿
                    </div>
                    <div class="flex w-1/12"
                        @click="deletePrice(index)">
                        bin icon
                    </div>
                </div>
            </div>

            <!-- customer -->
            <div class="flex flex-row gap-x-3 text-lg font-semibold" >
                <div class="flex leading-6 text-gray-900">Customer : 
                </div>
                <div class="flex gap-x-3">
                    <div class="flex items-center gap-x-2">
                        <input id="push-guest" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
                        <label for="push-guest" class="block leading-6 text-gray-900">
                            Guest
                        </label>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <input id="push-member" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
                        <label for="push-member" class="block leading-6 text-gray-900">
                            Member
                        </label>
                    </div>
                </div>
            </div>

            <!-- discount -->
            <div class="flex flex-col gap-y-4 text-lg font-semibold" >
                <div class="flex leading-6 text-gray-900">Discount (Member only) :
                </div>
                <div class="flex flex-row gap-x-4">
                    <div class="rounded-md px-6 py-3 text-xl" :class="percentColor(5)">
                        5 %
                    </div>
                    <div class="rounded-md px-6 py-3 text-xl" :class="percentColor(10)">
                        10 %
                    </div>
                    <div class="rounded-md px-6 py-3 text-xl" :class="percentColor(20)">
                        20 %
                    </div>
                    <div class="rounded-md px-6 py-3 text-xl" :class="percentColor(30)">
                        30 %
                    </div>
                </div>
            </div>

            <!-- total -->
            <div class="flex flex-col justify-end">
                <div class="flex flex-col justify-end text-2xl text-right gap-y-4">
                    <div class="font-semibold text-zinc-700">
                        Sub Total : <span>1000 ฿</span>
                    </div>
                    <div class="font-semibold text-red-600">
                        Discount : <span> -100 ฿</span>
                    </div>
                    <div class="font-bold text-3xl text-green-700">
                        Total : <span> 90000000000 ฿</span>
                    </div>
                </div>
                <div class="flex justify-end text-lg mt-10">
                    <div class="w-5/6"></div>
                    <button type="submit" class="w-1/6 rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Confirm            
                    </button>
                </div>
                
            </div>            
        </div>        
    </div>
</template>
 
<style>

</style>