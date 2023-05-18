<template>
  <div>
    <h1>
      <span @click="$router.push('/about')"></span>
      我的关注
    </h1>
    <main>
      <ul>
        <CommunitySearchRes v-for="seachResItem in attentionList" :seachResItem="seachResItem" />
      </ul>
    </main>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { attentionList } = storeToRefs(userStore)
import {useRouter} from 'vue-router'
const $router = useRouter()
</script>

<style lang="less" scoped>
h1 {
  width: 375rem;
  height: 40rem;
  font-size: 15rem;
  text-align: center;
  line-height: 40rem;
  font-weight: 600;
  position: relative;
  span {
    position: absolute;
    left: 10rem;
    top: 10rem;
    display: inline-block;
    width: 20rem;
    height: 20rem;
    background: url('@/../public/images/back_black.png') no-repeat;
    background-size: cover;
  }
}
main {
    padding-top: 15rem;
    height: calc(100vh - 40rem - 15rem);
    overflow: scroll;
    background-color: #f5f6f5;
}
</style>
