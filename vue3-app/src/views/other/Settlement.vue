<script setup lang="ts">
import { shoppingCarStore } from '@/stores/shoppingCar'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const shoppingCar = shoppingCarStore()
const { orderList ,allList} = storeToRefs(shoppingCar)
const {setPendingGoods} = shoppingCar
const allPrice = computed(() => {
    return orderList.value.filter((o: any) => o.isCheck).reduce((sum: any, e: any) => sum + Number(e.allPrice || 0), 0)
})
const allNum = computed(() => {
    return orderList.value.filter((o: any) => o.isCheck).reduce((sum: any, e: any) => sum + Number(e.num || 0), 0)
})
const show = ref(false)
// const { checkAllGoods, orderCheckGoods } = shoppingCar
const toPay = ({allPrice,allNum}:any) => {
    show.value = !show.value
    setPendingGoods({allPrice,allNum})
}
</script>
<template>
    <div id="settlement">
        <van-sticky>
            <h1 class="back">
                <i class="back_btn" @click="$router.back()">
                    <svg t="1683880458227" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3542" width="20rem" height="20rem" fill="black">
                        <path
                            d="M305.519192 557.640404c-11.636364 0-23.40202-4.39596-32.323232-13.317172-17.842424-17.842424-17.842424-46.674747 0-64.517171L683.830303 69.30101c17.842424-17.842424 46.674747-17.842424 64.517172 0 17.842424 17.842424 17.842424 46.674747 0 64.517172L337.713131 544.323232c-8.921212 8.921212-20.557576 13.317172-32.193939 13.317172z m0 0"
                            fill="" p-id="3543"></path>
                        <path
                            d="M715.894949 968.145455c-11.636364 0-23.40202-4.39596-32.323232-13.317172L273.19596 544.323232c-17.842424-17.842424-17.842424-46.674747 0-64.517171 17.842424-17.842424 46.674747-17.842424 64.517171 0l410.505051 410.50505c17.842424 17.842424 17.842424 46.674747 0 64.517172-8.921212 8.921212-20.557576 13.317172-32.323233 13.317172z m0 0"
                            fill="" p-id="3544"></path>
                    </svg>
                </i>
                <p>确认订单</p>
                <i>
                    <svg t="1684307533651" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3454" width="28rem" height="28rem">
                        <path
                            d="M832 762.24 832 768c0 96.64-83.84 176-192 189.44L640 928c0-17.92-14.08-32-32-32l-128 0C462.08 896 448 910.08 448 928l0 64C448 1009.92 462.08 1024 480 1024l128 0c159.36 0 288-114.56 288-256l0-5.76M896 762.24c37.12-13.44 64-48.64 64-90.24l0-128c0-41.6-26.88-76.8-64-90.24L896 448c0-211.84-172.16-384-384-384C300.16 64 128 236.16 128 448l0 5.76C90.88 467.2 64 502.4 64 544l0 128C64 725.12 106.88 768 160 768S256 725.12 256 672l0-128c0-41.6-26.88-76.8-64-90.24L192 448c0-176.64 143.36-320 320-320 176.64 0 320 143.36 320 320l0 5.76c-37.12 13.44-64 48.64-64 90.24l0 128c0 41.6 26.88 76.8 64 90.24M192 672C192 689.92 177.92 704 160 704S128 689.92 128 672l0-128C128 526.08 142.08 512 160 512S192 526.08 192 544L192 672zM896 672c0 17.92-14.08 32-32 32S832 689.92 832 672l0-128C832 526.08 846.08 512 864 512S896 526.08 896 544L896 672z"
                            fill="#272636" p-id="3455"></path>
                    </svg>

                </i>
            </h1>
        </van-sticky>
        <ul class="addres">
            <li>

                <p> <svg t="1684309049691" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1988" width="10" height="10">
                        <path d="M512 512m-448 0a7 7 0 1 0 896 0 7 7 0 1 0-896 0Z" fill="#010101" p-id="1989"></path>
                    </svg><span>请选择收货地址</span> </p>
                <i>
                    <svg t="1684307670205" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4529" width="22" height="22">
                        <path d="M658.56 557.392L322.536 221.384l45.248-45.256 336.016 336.008z" p-id="4530"></path>
                        <path d="M704.088 512.2L364.12 852.16l-45.256-45.248 339.976-339.976z" p-id="4531"></path>
                    </svg>
                </i>
            </li>
        </ul>
        <div class="goods">
            <div>
                <p>漫想家</p>
                <van-card :num="item.num" :price="item.allPrice" :desc="item?.goods?.title" :title="item?.goods?.brandName"
                    v-for="item in orderList" :thumb="item?.goods?.listedImage" />
            </div>
        </div>
        <div class="fee">
            <div>
                <p class="sent_fee"><span>运费</span><span style="margin-left: 80%;font-size: 14rem;color: black;">¥0</span>
                </p>
                <p class="input"><span>留言</span><input type="text" placeholder="填写内容需与商家协商并确认"></p>
                <h4 class="all_price">共计{{ orderList.length }}商品,小计<span style="font-size: 14rem;color: black;">¥{{ allPrice
                }}</span></h4>
            </div>
        </div>
        <div class="footer">
            <h1>付款成功后不支持无理由退换货</h1>
            <p>1.模玩玩具类商品均不支持7天无理由退换货。(关于色差，关于瑕疵 详见买家须知)。</p>
            <p> 2.商品价格存在波动性，同时每 个款式每个规格的商品出售时仅有一件等情况，故不支持退还差价
                与7天无理由退货。</p>
            <p> 3.收件时，请本人在快递面前验货，确认无误后再签收。商品到货 48小时无异议将自动签收成功。</p>
            <p> 4.温馨提示:商品价格由市场供需决定，可能存在波动，请理性消费</p>
        </div>
        <div class="to_pay">
            <div class="price">
                <p>合计</p>
                <span>¥{{ allPrice }}</span>
            </div>
            <span class="pay_btn" @click="toPay({allPrice,allNum})">去支付</span>
        </div>
        <van-action-sheet v-model:show="show" title="请选择支付方式">
            <h1>¥ <span>{{ allPrice }}</span></h1>
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
            <span class="sure">确定</span>
        </van-action-sheet>

    </div>
</template>

  
<style lang="less" scoped>
.back {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rem;
    background-color: #fff;

    p {
        flex: 1;
        font-size: 18rem;
        font-weight: bold;
        margin-top: -5rem;
        text-align: center;
    }
}

.addres {
    background-color: #f3f3f3;
    padding: 15rem 10rem;

    li {
        padding: 20rem 10rem;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 10rem;
        list-style: circle;

        p {
            display: flex;
            align-items: center;

            span {
                font-size: 14rem;
                font-weight: bold;
                margin-left: 10rem;
            }

            svg {
                margin-top: -3rem;
            }

        }
    }
}

.goods {
    background-color: #f3f3f3;
    padding: 15rem 10rem;

    &>div {
        background-color: #f7f8fa;
        border-radius: 15rem;
    }


    p {
        padding: 10rem;
        font-size: 14rem;
        font-weight: bold;
    }
}

.fee {
    padding: 15rem 10rem;
    background-color: #f3f3f3;

    &>div {
        background-color: #fff;
        padding: 10rem;
        border-radius: 15rem;

        p {
            display: flex;
            padding: 2rem;
            color: #acacac;

            span {
                width: 20%;
            }

        }

        .all_price {
            padding: 5rem;
            text-align: right;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            color: #acacac;
        }

    }
}

.footer {
    padding: 10rem;
    background-color: #f3f3f3;

    h1 {
        font-size: 16rem;
        font-weight: bold;
        padding: 10rem 0;
    }

    p {
        color: #8b8b8b;
        padding: 5rem;
    }
}

.to_pay {
    padding: 10rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    width: 100%;

    .price {
        display: flex;
        align-items: center;

        span {
            font-size: 16rem;
            color: #1e2632;
            margin-left: 5rem;
        }
    }

    .pay_btn {
        background-image: linear-gradient(#5e636c, #1e2632);
        color: #fff;
        padding: 5rem 15rem;
        border-radius: 50rem;
    }
}

/deep/ .van-action-sheet__content {
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
        //     background-position: 0 -48px;
        //     background-color: #80a231;
        //     border: 0;
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
    .sure{
        display: block;
        width: 95%;
        margin: 5rem auto;
        text-align: center;
        padding: 10rem;
        background-color:#18202d;
        color: white;
    }
}
</style>
  