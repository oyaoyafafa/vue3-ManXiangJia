<script setup lang="ts">
import { computed, ref } from 'vue'
import { timestampToTime } from '@/js/tool.js'

const list = defineProps<{
  list: any
}>()
console.log(list.list.pending)
const goods = computed(() => {
  return list.list.value.map((o: any) => o)
})

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
</script>
<template>
  <div>
    <ul>
      <li v-for="item in list.list">
        <p class="pending">
          <span>{{ showOrderStatus(item.payStuats) }}</span>
          <span>下单时间{{ timestampToTime(item.time) }}</span>
        </p>
        <div>
          <van-card
            :num="goods.num"
            :price="goods.allPrice"
            :desc="goods?.goods?.title"
            :title="goods?.goods?.brandName"
            v-for="goods in item?.pending"
            :thumb="goods?.goods?.listedImage"
          />
        </div>
        <p>
          共计{{ item.allNum }}件商品,需要支付<span>¥{{ item.allPrice }}</span>
        </p>
        <div class="btn">
          <div>
            <span class="canle">取消订单</span>
            <span class="submit">提交订单</span>
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
