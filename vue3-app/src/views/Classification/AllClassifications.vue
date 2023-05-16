<template>
  <nav>
    <header>
      <img @click="routerBack" src="@/../public/images/picker_icon_back_black.png" alt="" />
      <h1>全部分类</h1>
    </header>
    <div class="input">
      <input type="text" placeholder="请输入您要查找的内容" />
      <div class="search">
        <img src="../../../public/images/search_icon.png" />
      </div>
    </div>
    <div class="menu_detail">
      <div class="menu_list">
        <van-sidebar v-model="tabValue">
          <van-sidebar-item
            v-for="item in sort"
            :title="item.name"
          />
        </van-sidebar>
      </div>
      <div class="goodListId">
        <div class="goods">
          <p>11111</p>
          <p>222222</p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { moplatAllSortApi } from '@/api/manxiangjia'
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const $router = useRouter()
const tabValue = ref(0)
const a = {}

const sort = ref<Array<any>>([])
moplatAllSortApi().then((res: any) => {
  sort.value = res.data.data
  console.log(res.data.data)
})
function routerBack() {
  $router.back()
}

</script>

<style lang="scss" scoped>
nav {
  header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 10rem;
    }
    h1 {
      margin-left: 130rem;
      font-size: 16rem;
      font-weight: bold;
    }
  }
  .input {
    width: 375rem;
    input {
      width: 360rem;
      border-radius: 25rem;
      margin-top: 10rem;
      padding: 5rem;
      margin-left: 7.5rem;
      background-color: #fafafa;
      padding-left: 30rem;
    }
    input::-webkit-input-placeholder {
      color: #cccccc;
    }
    .search {
      position: absolute;
      top: 15rem;
      left: 15rem;
      img {
        width: 15rem;
      }
    }
  }
  .menu_detail {
    .menu_list {
      text-align: center;
    }
    .goodListId{
      position: absolute;
      top: 0;
      right: 0;
      width: 300rem;
      background-color: pink;
      height: 600rem;
    }
  }
}
</style>
