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
        <h1><i @click="$router.back()"> <svg t="1683880458227" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3542" width="20rem" height="20rem" fill="black">
                    <path
                        d="M305.519192 557.640404c-11.636364 0-23.40202-4.39596-32.323232-13.317172-17.842424-17.842424-17.842424-46.674747 0-64.517171L683.830303 69.30101c17.842424-17.842424 46.674747-17.842424 64.517172 0 17.842424 17.842424 17.842424 46.674747 0 64.517172L337.713131 544.323232c-8.921212 8.921212-20.557576 13.317172-32.193939 13.317172z m0 0"
                        fill="" p-id="3543"></path>
                    <path
                        d="M715.894949 968.145455c-11.636364 0-23.40202-4.39596-32.323232-13.317172L273.19596 544.323232c-17.842424-17.842424-17.842424-46.674747 0-64.517171 17.842424-17.842424 46.674747-17.842424 64.517171 0l410.505051 410.50505c17.842424 17.842424 17.842424 46.674747 0 64.517172-8.921212 8.921212-20.557576 13.317172-32.323233 13.317172z m0 0"
                        fill="" p-id="3544"></path>
                </svg></i><span>我的订单</span><i></i></h1>
        <van-tabs v-model:active="active" sticky animated swipeable color="#222a36">
            <van-tab title="全部">
                <OderPay :list="allList" />
            </van-tab>
            <van-tab title="待付款">
                <OderPay :list="allList.filter((o: any) => o.payStuats == 0)" />
            </van-tab>
            <van-tab title="已付款">
                <OderPay :list="allList.filter((o: any) => o.payStuats == 2)" />
            </van-tab>
            <van-tab title="已取消">
                <OderPay :list="allList.filter((o: any) => o.payStuats == 1)" />
            </van-tab>
        </van-tabs>
    </div>

</template>

  
<style lang="less" scoped>
h1 {
    padding: 10rem;
    display: flex;
    justify-content: space-between;
    background-color: #fff;

    span {
        font-size: 18rem;
        font-weight: bold;
    }
}

/deep/.van-tabs__content {

  overflow: scroll;}

</style>
  