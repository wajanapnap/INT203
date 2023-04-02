<script setup>
import { ref, onMounted } from "vue"
import { getCashier } from "../composable/Cashier"

const props = defineProps({
  id: {
    type: String,
  },
})
const price = ref(0)
const priceList = ref([])
const isMember = ref("guest")
const totalPrice = ref(0)

onMounted(async () => {
  if (props.id) {
    const cashier = await getCashier(props.id)
    priceList.value = cashier.priceList
    isMember.value = cashier.isMember
  }
});

const addPrice = (price) => {
  priceList.value.push(price)
  console.log(priceList.value)
};

const deletePrice = (index) => {
  priceList.value.splice(index, 1)
  console.log(priceList.value)
};

const sumPrice = () => {
  let price = 0
  for (let i = 0; i < priceList.value.length; i++) {
    price += parseInt(priceList.value[i])
  }
  totalPrice.value = price
  return price
};

const calPercent = () => {
  let percent = 0
  if (isMember.value !== "guest") {
    if (sumPrice() >= 30000) {
      percent = 30
    } else if (sumPrice() >= 15000) {
      percent = 20
    } else if (sumPrice() >= 8000) {
      percent = 10
    } else if (sumPrice() >= 5000) {
      percent = 5
    } else {
      percent = 0
    }
    return percent
  }
  // console.log("test");
}

const percentColor = (showPercent) => {
  if (calPercent() === showPercent) {
    return "bg-green-300 text-green-900"
  } else {
    return "bg-zinc-300 text-zinc-500"
  }
};

const discount = () => {
  if (isMember.value !== "guest") {
    let discountValue = 0
    if (calPercent() === 30) {
      discountValue = totalPrice.value * 0.3
      totalPrice.value = totalPrice.value - discountValue
    } else if (calPercent() === 20) {
      discountValue = totalPrice.value * 0.2
      totalPrice.value = totalPrice.value - discountValue
    } else if (calPercent() === 10) {
      discountValue = totalPrice.value * 0.1
      totalPrice.value = totalPrice.value - discountValue
    } else if (calPercent() === 5) {
      discountValue = totalPrice.value * 0.05
      totalPrice.value = totalPrice.value - discountValue
    }
    totalPrice.value = totalPrice.value.toFixed(2)
    return discountValue.toFixed(2)
  }
};
// discount()
// console.log(totalPrice.value)
const addEditNewHistory = async (id) => {
  // console.log(newList)
  //date time
  const url = 'http://localhost:5000/history'
  const method = 'POST'
  if(id && id != 0){
    url = `http://localhost:5000/history/${id}`
    method = 'PUT'
  }
  const priceCreate = {};
  priceCreate.date = new Date().toLocaleString();
  // add discount to updatedList
  priceCreate.discount = calPercent()
  // add total to updatedList
  priceCreate.total = totalPrice.value
  priceCreate.isMember = isMember.value
  priceCreate.priceList = priceList.value
  if (totalPrice.value.total !== 0) {
    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(priceCreate),
      });
      if (res.ok) {
        console.log("add successfully")
        // const addedList = await res.json()
        // list.value.push(addedList)
        // console.log(list.value)
        priceList.value = []
        isMember.value = 'guest'
      } else {
        throw new Error("cannot add")
      }
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<template>
  <div>
    <h1 class="text-blue-800 text-3xl font-semibold mx-60">Cashier</h1>

    <div
      class="flex flex-col justify-center rounded-2xl bg-zinc-200 mx-60 mt-5 mb-20 px-12 py-10 gap-y-6"
    >
      <!-- input -->
      <div class="flex flex-row justify-center gap-x-4 text-lg">
        <input
          type="text"
          onkeypress="return event.charCode >= 48 && event.charCode <= 57"
          name="price"
          id="price"
          class="w-5/6 bg-white rounded-md py-1.5 pl-1 text-gray-900"
          v-model="price"
        />
        <button
          type="submit"
          class="w-1/6 rounded-md bg-zinc-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
          @click="addPrice(price) ; sumPrice()"
        >
        Add
        </button>
      </div>
      <div class="rounded-md bg-white">
        <div
          class="flex flex-row text-lg font-base p-4"
          v-for="(price, index) in priceList"
          :key="index"
        >
          <div class="flex w-1/12">
            {{ index + 1 }}
          </div>
          <div class="flex w-9/12">{{ price }} ฿</div>
          <button class="flex w-1/12 text-red-600 font-semibold" @click="deletePrice(index)">Delete</button>
        </div>
      </div>

      <!-- customer -->
      <div class="flex flex-row gap-x-3 text-lg font-semibold">
        <div class="flex leading-6 text-gray-900">Customer :</div>
        <div class="flex gap-x-3">
          <div class="flex items-center gap-x-2">
            <input
              id="push-guest"
              name="push-notifications"
              value="guest"
              v-model="isMember"
              type="radio"
              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label for="push-guest" class="block leading-6 text-gray-900">
              Guest
            </label>
          </div>
          <div class="flex items-center gap-x-2">
            <input
              id="push-member"
              name="push-notifications"
              value="member"
              v-model="isMember"
              type="radio"
              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label for="push-member" class="block leading-6 text-gray-900">
              Member
            </label>
          </div>
        </div>
      </div>

      <!-- discount -->
      <div class="flex flex-col gap-y-4 text-lg font-semibold">
        <div class="flex leading-6 text-gray-900">Discount (Member only) :</div>
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
            Sub Total : <span>{{ sumPrice() }} ฿</span>
          </div>
          <div class="font-semibold text-red-600">
            Discount : <span> {{ discount() || 0 }} ฿</span>
          </div>
          <div class="font-bold text-3xl text-green-700">
            Total : <span> {{ totalPrice }} ฿</span>
          </div>
        </div>
        <div class="flex justify-end text-lg mt-10">
          <div class="w-5/6"></div>
          <button
            type="submit"
            class="w-1/6 rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="addEditNewHistory(props.id || 0)"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>