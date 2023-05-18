<script setup lang="ts">
import { timestampToTime } from '@/js/tool.js'
import { shoppingCarStore } from '@/stores/shoppingCar'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const shoppingCar = shoppingCarStore()
const { orderList } = storeToRefs(shoppingCar)
const { cancelOrder } = shoppingCar


const list = defineProps<{
  list: any
}>()
console.log(list.list.pending)


function showOrderStatus(code: number) {
  switch (code) {
    case 0:
      return '待付款'
      break
    case 1:
      return '已取消'
      break
    case 2:
      return '已付款'
      break
  }
}

const delOrder = ({ id }: any) => {
  cancelOrder({ id })

}
</script>
<template>
  <div style="background-color: #f3f3f3;">

    <ul>
     <li class="no_order" v-show="!list.list.length">
      <svg t="1684376511885" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4741" width="48" height="48"><path d="M807.424 389.12V208.896c0-55.296-50.176-80.384-75.264-80.384H296.448c-34.816 0-70.144 34.816-75.264 100.352v510.976c0 80.384 55.296 80.384 75.264 80.384h155.136c14.848 0 25.088 14.848 25.088 30.208s-10.24 30.208-25.088 30.208H291.84c-45.056 0-125.44-30.208-125.44-110.08V224.256c0-104.96 65.024-150.528 125.44-150.528h445.44c70.144 0 125.44 45.056 125.44 130.048V389.12c0 14.848-10.24 30.208-25.088 30.208-19.968-5.12-30.208-14.848-30.208-30.208z" fill="#2E77ED" p-id="4742"></path><path d="M341.504 228.864h350.72c14.848 0 25.088 10.24 25.088 25.088 0 14.848-10.24 25.088-25.088 25.088H341.504c-14.848 0-25.088-10.24-25.088-25.088 0.512-14.848 10.24-25.088 25.088-25.088zM341.504 379.392h350.72c14.848 0 25.088 10.24 25.088 25.088 0 14.848-10.24 25.088-25.088 25.088H341.504c-14.848 0-25.088-10.24-25.088-25.088 0.512-15.36 10.24-25.088 25.088-25.088zM341.504 529.408h150.528c14.848 0 25.088 10.24 25.088 25.088 0 14.848-10.24 25.088-25.088 25.088H341.504c-14.848 0-25.088-10.24-25.088-25.088 0.512-14.848 10.24-25.088 25.088-25.088z" fill="#2E77ED" p-id="4743"></path><path d="M724.992 488.96l-170.496 207.872c-3.584 4.608-6.144 10.24-6.144 16.384l-0.512 93.696c0 16.384 15.36 29.184 31.232 25.6l91.648-18.944c6.144-1.024 11.264-4.608 14.848-9.216l170.496-207.872c9.216-11.264 7.68-27.648-3.584-36.864l-91.136-74.752c-10.752-8.704-27.136-7.168-36.352 4.096z m-70.656 274.432l-19.456 8.192c-18.944 7.68-38.912-8.192-35.84-28.16l3.072-22.016c0.512-4.608 2.56-9.216 5.632-12.8l118.784-144.896c9.216-11.264 25.6-12.8 36.864-3.584l16.896 13.824c11.264 9.216 12.8 25.6 3.584 36.864l-119.296 145.408c-3.072 2.56-6.144 5.12-10.24 7.168z" fill="#FFBB12" p-id="4744"></path></svg> <span>这里暂时还没有订单哦~~~</span>
    </li>
      <li v-show="list.list.length" v-for="item in list.list">
        <p class="pending">
          <span>{{ showOrderStatus(item.payStuats) }}</span>
          <span>下单时间{{ timestampToTime(item.time) }}</span>
        </p>
        <div>
          <van-card :num="goods.num" :price="goods.allPrice" :desc="goods?.goods?.title" :title="goods?.goods?.brandName"
            v-for="goods in item?.pending" :thumb="goods?.goods?.listedImage" />
        </div>
        <p v-show="item.payStuats === 1">
          共计{{ item.allNum }}件商品,需要支付<span>¥{{ item.allPrice }}</span>
        </p>
        <p v-show="item.payStuats !== 1">
          共计{{ item.allNum }}件商品,已支付<span>¥{{ item.allPrice }}</span>
        </p>
        <div class="btn">
          <div>
            <span class="canle" @click="delOrder({ id: item.time })">删除订单</span>
            <span class="submit" v-show="item.payStuats === 1">提交订单</span>
            <span class="submit" v-show="item.payStuats !== 1">已成功付款</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>


ul {
  padding: 10rem;
  background: #f3f3f3;
.no_order{
  display: flex;
  align-items: center;
  span{
    font-size: 22rem;
    padding: 10rem;
  }
}
  li {
    background-color: #fff;
    margin-bottom: 10rem;
    border-radius: 15rem;

    p {
      display: flex;
      justify-content: space-between;
      padding: 10rem;

      span {
        font-size: 14rem;
        margin-right: 5rem;
        margin-left: 5rem;
      }
    }

    .btn {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 10rem;

      .canle {
        padding: 5rem 15rem;
        min-width: 100rem;
        border-radius: 50rem;
        border: 1px solid black;
        margin-right: 10rem;
      }

      .submit {
        padding: 5rem 15rem;
        min-width: 100rem;
        border-radius: 50rem;
        background-image: linear-gradient(#5e636c, #1e2632);
        color: white;
      }
    }
  }
}
</style>
