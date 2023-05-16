<template>
  <nav>
    <header>
      <img @click="routerBack" src="@/../public/images/ic_back_goods.png" alt="" />
      <p>{{ $route.query.name }}</p>
      <img src="@/../public/images/search_icon.png" alt="" />
    </header>
    <van-tabs v-model:active="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
    </van-tabs>
  </nav>
</template>

<script setup lang="ts">
import { classifyApi } from '@/api/manxiangjia'
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const $router = useRouter()
const $route = useRoute()
const goods = ref<Array<any>>([])
const active = ref(0)

classifyApi($route.query.id, $route.query.name).then((res: any) => {
  console.log(res.data.data.list)
  goods.value = res.data.data.list
})

function routerBack() {
  $router.back()
}
</script>

<style lang="scss" scoped>
nav {
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5rem;
    img {
      &:nth-child(1) {
        width: 30rem;
      }
      &:nth-child(3) {
        width: 20rem;
      }
    }
  }
}
</style>
