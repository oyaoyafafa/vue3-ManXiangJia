<template>
  <section>
    <header>
      <img @click="routerBack" src="@/../public/images/back_black.png" alt="" />
      <h1>商品评价</h1>
    </header>
    <div class="count">
      <h1>{{ severStar * 20 }}%觉得很赞</h1>
      <div>
        <p>商品做工</p>
        <van-rate
          gutter="14rem"
          void-icon="star"
          size="14rem"
          readonly
          void-color="#cccccc"
          color="#6524e2"
          v-model="faceStar"
        />
      </div>
      <div>
        <p>商品服务</p>
        <van-rate
          gutter="14rem"
          void-icon="star"
          size="14rem"
          readonly
          void-color="#cccccc"
          color="#6524e2"
          v-model="severStar"
        />
      </div>
      <div>
        <p>商品颜值</p>
        <van-rate
          gutter="14rem"
          void-icon="star"
          size="14rem"
          readonly
          void-color="#cccccc"
          color="#6524e2"
          v-model="workStar"
        />
      </div>
    </div>
    <ul class="comment">
      <li v-for="item in comment">
        <div class="user">
          <img src="@/../public/images/default_header.png" alt="" />
          <div>
            <p>{{ item.tbAppUserDetail.nickName }}</p>
            <p>{{ item.content }}</p>
          </div>
        </div>
        <p class="time">{{ shijianc(item.creatTime) }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { commentApi } from '@/api/manxiangjia'
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const $router = useRouter()
// console.log($route.query.id)
const value = ref(3)

const comment = ref<any>([])
commentApi($route.query.goodId).then((res: any) => {
  console.log(res.data.data.list)
  comment.value = res.data.data.list
})

function routerBack() {
  $router.back()
}

const faceStar = computed(() => {
  return Math.floor(
    comment.value
      .filter((o: any) => o.faceStar)
      .reduce((sum: any, e: any) => sum + Number(e.faceStar || 0), 0) / comment.value.length
  )
})
const severStar = computed(() => {
  return Math.floor(
    comment.value
      .filter((o: any) => o.faceStar)
      .reduce((sum: any, e: any) => sum + Number(e.severStar || 0), 0) / comment.value.length
  )
})
const workStar = computed(() => {
  return Math.floor(
    comment.value
      .filter((o: any) => o.faceStar)
      .reduce((sum: any, e: any) => sum + Number(e.workStar || 0), 0) / comment.value.length
  )
})

function shijianc(time: any) {
  let date = new Date(time)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + M + D + h + m + s
}
</script>

<style lang="less" scoped>
header {
  width: 100vw;
  display: flex;
  align-items: center;
  padding: 5rem 10rem;
  height: 50rem;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 999;
  h1 {
    margin-left: 125rem;
    font-weight: bold;
    font-size: 14rem;
  }
  img {
    width: 20rem;
  }
}
.count {
  margin-top: 65rem;
  h1 {
    font-size: 16rem;
    font-weight: bold;
    margin: 25rem 0;
    margin-left: 10rem;
  }
  div {
    display: flex;
    margin-bottom: 15rem;
    p {
      margin-left: 10rem;
      margin-right: 25rem;
    }
  }
}
.comment {
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user {
      display: flex;
      align-items: center;
      height: 60rem;
      border-bottom: 1rem solid #f9f9fa;
      img {
        width: 30rem;
        margin-left: 10rem;
        margin-right: 10rem;
      }
      p {
        &:nth-child(1) {
          margin-top: 5rem;
          margin-bottom: 2rem;
        }
      }
    }
    .time {
      margin-right: 10rem;
      margin-top: 25rem;
      color: #b5b5b5;
    }
  }
}
</style>
