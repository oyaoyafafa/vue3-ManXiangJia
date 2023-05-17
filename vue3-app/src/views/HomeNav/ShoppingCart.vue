<template>
  <div>
    <header>
      <h1>购物车</h1>
    </header>
    <section>
      <van-pull-refresh class="content" v-model="loading" success-text="刷新成功" @refresh="onRefresh">
        <div class="shop">
          <div v-if="!isAdd" class="nothing">
            <img src="../../../public/images/分享/shopcar.png" alt="" />
            <p>购物车好空~</p>
            <p>快去看看更多好宝贝吧~</p>
          </div>
          <div v-else class="hasLot">
            <shoppingCarItem v-for="item in shoppingCarList" :item="item.goods" :isCheck="item.isCheck" />
          </div>
          <van-divider class="line"
            :style="{ width: '80%', color: '#1e2532', borderColor: '#111111', padding: '0 10px' }">
            为你推荐
          </van-divider>
          <ul class="recommend">
            <li v-for="item in commend" @click="toCommodity(item.goodId)">
              <div>
                <img :src="item.tbGoods.listedImage" alt="" />
              </div>
              <p>{{ item.tbGoods.title }}</p>
              <p style="font-weight: bold">￥{{ item.tbGoods.sellPrice }}</p>
            </li>
          </ul>
        </div>
      </van-pull-refresh>
    </section>
    <div class="to_order" v-show="isAdd">
      <div class="all">
        <input type="checkbox" :checked="isCheckAll" name="" id=""
          @change="toCheck({ isCheck: $event.target?.checked })" />
        全选
      </div>
      <div class="order">
        <p>合计<span>¥{{ allPrice }}</span></p>
        <span class="order_btn" @click="toOrder">结算</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shoppingCartRecommendApi } from '@/api/shoppingCart'
import { savePosition } from '@/js/pageBarScrollTop.js'
import { ref, watch, computed } from 'vue'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'

const loading = ref(false)
const commend = ref<Array<any>>([])

const onRefresh = () => {
  setTimeout(() => {
    showToast('刷新成功')
    loading.value = false
  }, 1000)
}
function toCommodity(id: any) {
  // console.log("id",id)
  $router.push({
    path: '/commodity',
    query: {
      id: id
    }
  })
}

shoppingCartRecommendApi().then((res: any) => {
  commend.value = res.data.data.list
})

// 控制首页五个页面的滚动高度------------------------------------------------------------
savePosition();

// 购物车列表
import shoppingCarItem from '@/components/HomeNav/shoppingCarItem.vue'
import { shoppingCarStore } from '@/stores/shoppingCar'
import { storeToRefs } from 'pinia'
import { showFailToast } from 'vant';
import 'vant/es/toast/style'


const $router = useRouter()
// 购物车是否有物品
const isAdd = computed(() => {
  if (shoppingCarList.value.length) {
    return true
  } else {
    return false
  }
})
// 全选按钮
const isCheckAll = computed(() => {
  return shoppingCarList.value.every((o: any) => o.isCheck)
})

const allPrice = computed(() => {
  return shoppingCarList.value.filter((o: any) => o.isCheck).reduce((sum: any, e: any) => sum + Number(e.allPrice || 0), 0)
})
const shoppingCar = shoppingCarStore()
const { shoppingCarList } = storeToRefs(shoppingCar)
const { checkAllGoods, orderCheckGoods ,setAllList} = shoppingCar
// 全选
const checked = ref(false)
const toCheck = ({ isCheck }: any) => {
  checkAllGoods({ isCheck })
}

const toOrder = () => {
  orderCheckGoods()

  if (shoppingCarList.value.filter((o: any) => o.isCheck).length) {
    setAllList()
    $router.push({
      path: '/settlement',
    })
  } else {
    showFailToast("请选择商品结算哦")
  }
}



</script>

<style lang="less" scoped>
div {

  // width: 100vw;
  header {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    height: 60rem;

    // padding-top: 20rem;
    h1 {
      font-weight: bold;
      color: #0f0f0f;
      font-size: 16rem;
      line-height: 60rem;
      text-align: center;
    }
  }

  section {
    margin-top: 60rem;
    margin-bottom: 60rem;
    background-color: #f3f3f3;
    // height: 100vh;
    width: 100%;

    .shop {
      width: 350rem;
      margin: 0 auto;
      margin-bottom: 120rem;

      .nothing {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          margin-top: 40rem;
          width: 100rem;
          height: 70rem;
        }

        p {
          font-weight: bold;

          &:nth-child(2) {
            margin-bottom: -5rem;
          }
        }
      }

      .hasLot {
        margin: 10rem 0rem;
        border-radius: 10rem;
      }

      .line {
        margin: 0 auto;
        margin-top: 90rem;
      }

      .recommend {
        margin-top: 10rem;
        height: 450rem;
        display: flex;
        flex-wrap: wrap;

        li {
          width: 170rem;
          height: 210rem;
          display: flex;
          flex-direction: column;

          background-color: white;
          margin-bottom: 10rem;
          border-radius: 5rem;

          p {
            padding-bottom: 5rem;

            &:nth-child(2) {
              margin-left: 8rem;
              line-height: 12rem;
              height: 20rem;
              transform: scale(0.8);
              transform-origin: 10rem 0;
              width: 115%;
              margin-bottom: 10rem;
              font-weight: bold;
            }

            &:nth-child(3) {
              margin-left: 5rem;
            }
          }

          div {
            overflow: hidden;
            width: 100%;

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              margin-bottom: 60rem;
            }
          }

          &:nth-child(2n-1) {
            margin-right: 10rem;
          }
        }
      }
    }
  }

  .to_order {
    width: 100vw;
    position: fixed;
    bottom: 59rem;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 10rem;

    .all {
      flex: 1;
      display: flex;
      align-items: center;

      input {
        margin-right: 10rem;
      }
    }

    .order {
      display: flex;
      align-items: center;

      p {
        padding: 10rem;
        margin-right: 10rem;

        span {
          font-size: 14rem;
          font-weight: bold;
        }
      }

      .order_btn {
        background-image: linear-gradient(#5e636c, #1e2632);
        color: #fff;
        padding: 5rem 15rem;
        border-radius: 50rem;
      }
    }
  }

  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    width: 24rem;
    height: 24rem;
    border-radius: 50%;
    background-size: 100% auto;
    box-sizing: border-box;
    background-position: 0 0;
    background-color: white;
    border: solid 1px rgb(195, 196, 200);
  }

  /* 复选框鼠标按下时增加的样式 */
  // input[type="checkbox"]:active {
  //   background-position: 0 -48px;
  //   background-color: #80a231;
  //   border: 0;
  // }
  /*复选框选中后增加的样式*/
  input[type="checkbox"]:checked {
    background-position: 0 -48px;
    // background-color: #000;
    background-image: url(https://hsp-prod.oss-cn-shanghai.aliyuncs.com/mall/h5/select.png);
    background-size: cover;
    background-position: center;
  }
}
</style>
