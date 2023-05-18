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
// 支付
const show = ref(false)
const crrentPayItem = ref(null)
import { showToast } from 'vant';
import 'vant/es/toast/style'
// 待付款->已付款
function submitOrder(item:any) {
  crrentPayItem.value = item
  show.value = true
}
function payOrder() {
    showToast('购买成功');
    show.value =false;
    shoppingCar.accountPaid(crrentPayItem)
}
// 取消订单
function giveUpOrder(item:any) {
  showToast('已取消订单');
  shoppingCar.giveUpOrder(item)
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
        <p v-show="item.payStuats !== 2">
          共计{{ item.allNum }}件商品,需要支付<span>¥{{ item.allPrice }}</span>
        </p>
        <p v-show="item.payStuats === 2">
          共计{{ item.allNum }}件商品,已支付<span>¥{{ item.allPrice }}</span>
        </p>
        <div class="btn">
          <div v-if="item.payStuats == 0" >
            <span @click="giveUpOrder(item)" class="canle">取消订单</span>
            <span @click="submitOrder(item)" class="submit">提交订单</span>
          </div>

          <div v-if="item.payStuats == 1" >
            <span   @click="delOrder({ id: item.time })" class="canle">删除订单</span>
          </div>
          <div v-if="item.payStuats == 2" >
            <span @click="giveUpOrder(item)" class="canle">取消订单</span>
          </div>
        </div>
      </li>
    </ul>
    <teleport to="body">
    <van-action-sheet v-model:show="show" title="请选择支付方式">
            <h1>¥ <span>{{ crrentPayItem?.allPrice }}</span></h1>
            <div>
                <div class="pay_type">
                    <div>
                        <i><svg t="1684312737576" class="icon" viewBox="0 0 1228 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="3131" width="20" height="20">
                                <path
                                    d="M530.8928 703.1296a41.472 41.472 0 0 1-35.7376-19.8144l-2.7136-5.5808L278.272 394.752a18.7392 18.7392 0 0 1-2.048-8.1408 19.968 19.968 0 0 1 20.48-19.3536c4.608 0 8.8576 1.4336 12.288 3.84l234.3936 139.9296a64.4096 64.4096 0 0 0 54.528 5.9392L1116.2624 204.8C1004.9536 80.896 821.76 0 614.4 0 275.0464 0 0 216.576 0 483.6352c0 145.7152 82.7392 276.8896 212.2752 365.5168a38.1952 38.1952 0 0 1 17.2032 31.488 44.4928 44.4928 0 0 1-2.1504 12.3904l-27.6992 97.4848c-1.3312 4.608-3.328 9.3696-3.328 14.1312 0 10.752 9.216 19.3536 20.48 19.3536 4.4032 0 8.0384-1.536 11.776-3.584l134.5536-73.3184c10.1376-5.5296 20.7872-8.96 32.6144-8.96 6.2976 0 12.288 0.9216 18.0736 2.5088 62.72 17.0496 130.4576 26.5728 200.5504 26.5728C953.7024 967.168 1228.8 750.592 1228.8 483.6352c0-80.9472-25.4464-157.1328-70.0416-224.1024l-604.9792 436.992-4.4544 2.4064a42.1376 42.1376 0 0 1-18.432 4.1984z"
                                    fill="#15BA11" p-id="3132"></path>
                            </svg></i>
                        微信支付
                    </div>
                    <input type="checkbox" name="" id="">
                </div>
                <div class="pay_type">
                    <div>
                        <i><svg t="1684312859361" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="4290" width="20" height="20">
                                <path
                                    d="M1024.0512 701.0304V196.864A196.9664 196.9664 0 0 0 827.136 0H196.864A196.9664 196.9664 0 0 0 0 196.864v630.272A196.9152 196.9152 0 0 0 196.864 1024h630.272a197.12 197.12 0 0 0 193.8432-162.0992c-52.224-22.6304-278.528-120.32-396.4416-176.64-89.7024 108.6976-183.7056 173.9264-325.3248 173.9264s-236.1856-87.2448-224.8192-194.048c7.4752-70.0416 55.552-184.576 264.2944-164.9664 110.08 10.3424 160.4096 30.8736 250.1632 60.5184 23.1936-42.5984 42.496-89.4464 57.1392-139.264H248.064v-39.424h196.9152V311.1424H204.8V267.776h240.128V165.632s2.1504-15.9744 19.8144-15.9744h98.4576V267.776h256v43.4176h-256V381.952h208.8448a805.9904 805.9904 0 0 1-84.8384 212.6848c60.672 22.016 336.7936 106.3936 336.7936 106.3936zM283.5456 791.6032c-149.6576 0-173.312-94.464-165.376-133.9392 7.8336-39.3216 51.2-90.624 134.4-90.624 95.5904 0 181.248 24.4736 284.0576 74.5472-72.192 94.0032-160.9216 150.016-253.0816 150.016z"
                                    fill="#009FE8" p-id="4291"></path>
                            </svg></i>
                        支付宝支付
                    </div>
                    <input type="checkbox" name="" id="">
                </div>
            </div>
            <span @click="payOrder" class="sure">确定</span>
        </van-action-sheet>
      </teleport>
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

.van-action-sheet__content {
    width: 375rem;
    background-color: #fff;
    border-top-right-radius: 10rem;
    border-top-left-radius: 10rem;
    h1 {
        font-size: 14rem;
        text-align: center;
        padding: 10rem;
        span {
            font-size: 22rem;
        }
    }

    .pay_type {
        display: flex;
        align-items: center;
        padding: 10rem;

        input[type="checkbox"] {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            outline: none;
            display: inline-block;
            vertical-align: middle;
            width: 18rem;
            height: 18rem;
            border-radius: 18rem;
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

        &>div {
            display: flex;
            align-items: center;
            flex: 1;
            font-size: 14rem;


            i {
                margin-right: 10rem;
            }
        }
    }

    .sure {
        display: block;
        width: 95%;
        margin: 5rem auto;
        text-align: center;
        padding: 10rem;
        background-color: #18202d;
        color: white;
    }
}
</style>
