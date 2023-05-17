<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import OderPay from '@/components/HomeNav/OderPay.vue'
import { storeToRefs } from 'pinia'
import { shoppingCarStore } from '@/stores/shoppingCar'
const $route = useRoute()
const active = ref(Number($route.query.n))
const shoppingCar = shoppingCarStore()
const { pendingList } = storeToRefs(shoppingCar)


</script>
<template>
    <div>
        <van-tabs v-model:active="active">
            <van-tab title="待付款">
                <OderPay  :list="pendingList"/>
            </van-tab>
            <van-tab title="待发货">
                <OderPay  :list="[]" />
            </van-tab>
            <van-tab title="待收货">
                <OderPay :list="[]" />
            </van-tab>
            <van-tab title="已完成">
                <OderPay :list="[]"/>
            </van-tab>
        </van-tabs>
    </div>
</template>

  
<style lang="less" scoped></style>
  