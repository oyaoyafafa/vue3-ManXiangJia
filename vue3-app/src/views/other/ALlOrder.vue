<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import OderPay from '@/components/HomeNav/OderPay.vue'
import { storeToRefs } from 'pinia'
import { shoppingCarStore } from '@/stores/shoppingCar'
const $route = useRoute()
const active = ref(Number($route.query.n))
const shoppingCar = shoppingCarStore()
const { allList } = storeToRefs(shoppingCar)


</script>
<template>
    <div>
        <van-tabs v-model:active="active">
            <van-tab title="全部">
                <OderPay  :list="allList"/>
            </van-tab>
            <van-tab title="待付款">
                <OderPay  :list="allList.filter((o:any)=>o.payStuats == 0)"/>
            </van-tab>
            <van-tab title="已付款">
                <OderPay  :list="allList.filter((o:any)=>o.payStuats == 2)" />
            </van-tab>
            <van-tab title="已取消">
                <OderPay :list="allList.filter((o:any)=>o.payStuats == 1)" />
            </van-tab>
        </van-tabs>
    </div>
</template>

  
<style lang="less" scoped>


</style>
  