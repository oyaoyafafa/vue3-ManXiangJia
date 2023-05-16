import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const shoppingCarStore = defineStore('shoppingCar', () => {
  let shoppingCarList = ref(JSON.parse(localStorage.getItem('shoppingCarList')) || [])
  // 添加进购物车
  const addShoppingCarList = ({ goods }:any) => {
    // console.log(goods.id)
    if (shoppingCarList.value.every((o: any) => o.goods.id !== goods.id)) {
      shoppingCarList.value = [{ goods, isCheck: false }, ...shoppingCarList.value]
    }

    localStorage.setItem('shoppingCarList', JSON.stringify(shoppingCarList.value))
  }
  //  删除
  const delGood = ({ id }:{id:number|string}) => {
    console.log(id);
    
    shoppingCarList.value = shoppingCarList.value.filter((o: any) => o.goods.id !== id)
    localStorage.setItem('shoppingCarList', JSON.stringify(shoppingCarList.value))
  }
  //   选中商品
  const checkGoods = ({ id, isCheck, allPrice }:any) => {
    console.log(allPrice)

    shoppingCarList.value = shoppingCarList.value.map((o: any) =>
      o.goods.id === id ? { ...o, isCheck, allPrice } : o
    )
  }
  //   添加商品数量
  const addGoods = ({ id, allPrice }:any) => {
    console.log(allPrice)

    shoppingCarList.value = shoppingCarList.value.map((o: any) =>
      o.goods.id === id ? { ...o, allPrice } : o
    )
  }
  // 全选商品
  const checkAllGoods = ({ isCheck }:any) => {
    console.log(isCheck)

    shoppingCarList.value = shoppingCarList.value.map((o: any) => ({ ...o, isCheck ,allPrice:o.goods.sellPrice}))
  }
  // 结算商品
  const orderCheckGoods = () => {
    shoppingCarList.value = shoppingCarList.value.filter((o: any) => !o.isCheck)
  }
  return {
    shoppingCarList,
    addShoppingCarList,
    checkGoods,
    checkAllGoods,
    orderCheckGoods,
    addGoods,
    delGood
  }
})
