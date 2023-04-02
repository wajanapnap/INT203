<script setup>
import { ref, onMounted } from "vue";
import { getHistory } from "../composable/History";

const priceList = ref([]);
onMounted(async () => {
    priceList.value = await getHistory();
})

const sumPrice = () => {
  let price = 0;
  for (let i = 0; i < priceList.value.length; i++) {
    price += parseInt(priceList.value[i].total);
  }
  return price;
};

const deletePrice = async (id) => {
    try {
        const res = await fetch(`http://localhost:5000/history/${id}`, {
            method: 'DELETE'
        })
        if (res.ok) {
            priceList.value = priceList.value.filter((price) => {
                return price.id !== id
            })
        } else throw new error('Error, cannot delete data!')
    } catch (error) {
        console.log(error)
    }
};
</script>

<template>
  <div>
    <h1 class="text-center text-zinc-800 text-3xl font-semibold mx-48">
      History
    </h1>

    <div
      class="flex flex-col justify-center rounded-2xl bg-zinc-200 mx-48 my-5 px-0.5 py-10 gap-y-4"
    >
      <!-- list -->
      <div class="flex flex-col text-lg bg-white p-10 gap-y-4 gap-x-2"  
          v-for="(price, index) in priceList"
          :key="index">
        <div class="flex flex-row font-bold">
          <div class="flex w-1/12"></div>
          <div class="flex w-3/12">Date</div>
          <div class="flex w-3/12">Customer</div>
          <div class="flex w-3/12">Discount</div>
          <div class="flex w-1/12">Purchase</div>
        </div>
        <div class="flex flex-row">
          <div class="flex w-1/12"> <router-link :to="{ path: '/cashier/' + price.id }">edit</router-link></div>
          <div class="flex w-3/12">
            {{price.date}}
          </div>
          <div class="flex w-3/12">{{ price.isMember }}</div>
          <div class="flex w-3/12 text-red-600">{{ price.discount ? price.discount + '%' : '-'}}  </div>
          <div class="flex w-1/12">{{ price.total }} ฿</div>
          <div class="flex w-1/12 text-right text-red-600" @click="deletePrice(price.id)">delete</div>
        </div>
        <div class="flex flex-row justify-end">
          <div class="flex"></div>
          <div class="flex mt-6 gap-x-2 text-xl font-semibold">
            Total
            <span> {{sumPrice()}} ฿ </span>
          </div>
          <div class="flex w-1/12"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<style></style>
