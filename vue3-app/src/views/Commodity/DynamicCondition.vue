<template>
  <nav>
    <header>
      <img @click="routerBack" src="@/../public/images/back_black.png" alt="" />
      <p>全部动态</p>
    </header>
    <div class="bgImg">
      <img src="@/../public/images/list_no_data.png" alt="" />
      <p>空空如也</p>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const $router = useRouter()

// const presale = ref<Array<any>>([])
// goodsPresaleApi().then((res: any) => {
//   presale.value = res.data.data.list
//   console.log(res.data.data.list)
// })
function routerBack() {
  $router.back()
}
</script>

<style lang="less">
nav {
  background-color: #f9f9f9;
  height: 100vh;
  header{
    display: flex;
    align-items: center;
    width: 100vw;
    height: 40rem;
    p{
        font-weight: bold;
        font-size: 16rem;
    }
    img{
        width: 20rem;
    }
  }
  .bgImg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #c5c5c5;
    padding-top: 100rem;
    img {
      width: 100rem;
    }
  }
}
</style>
