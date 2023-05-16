<script setup lang="ts">
import { ref, computed } from 'vue';
import { shoppingCarStore } from '@/stores/shoppingCar'
const shoppingCar = shoppingCarStore()
const { checkGoods, addGoods, delGood } = shoppingCar
const itemInfo = defineProps<{
    item: any,
    isCheck: any
}>()

// 步进器
const value = ref(1);
// const checked = ref(false)
// const checked = ref(itemInfo.isCheck)

// const checked =  computed(() => {
//     return itemInfo.isCheck
// })


const price = computed(() => {
    return value.value * itemInfo?.item?.integralNum
})

const toCheck = ({ id, isCheck, allPrice }: any) => {
    checkGoods({ id, isCheck, allPrice })
}
const addGood = ({ id, allPrice }: any) => {
    addGoods({ id, allPrice })
}
const toDel = ({ id }: { id: number }) => {

    delGood({ id })
}



</script>
<template>
    <div class="goodsItem">
        <div class="check_box">
            <input type="checkbox" :checked="isCheck" name="" id=""
                @change="toCheck({ id: itemInfo?.item?.id, isCheck: $event.target.checked, allPrice: price })">
        </div>
        <van-swipe-cell>
            <van-card :price="price" :desc="itemInfo?.item?.title" :title="itemInfo?.item?.title" class="goods-card"
                :thumb="itemInfo?.item?.listedImage">

                <template #footer>
                    <van-stepper v-model="value" @click="addGood({ id: itemInfo?.item?.id, allPrice: price })" />
                </template>
            </van-card>
            <template #right>
                <van-button square text="删除" type="danger" class="delete-button"
                    @click="toDel({ id: itemInfo?.item?.id })" />
            </template>
        </van-swipe-cell>
    </div>
</template>

<style lang="less">
.goodsItem {
    margin-bottom: 10rem;
    border-radius: 20rem;
    padding: 10rem;
    display: flex;
    align-items: center;
    background: #fff;

    .check_box {
        width: 10%;
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
</style>

<style>
.goods-card {
    margin: 0;
    background-color: white;
}

.delete-button {
    height: 100%;
}
</style>