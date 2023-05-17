import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const shoppingCarStore = defineStore('shoppingCar', () => {
  let shoppingCarList = ref(JSON.parse(localStorage.getItem('shoppingCarList')) || [])
  let orderList = ref([])
  let pendingList = ref(JSON.parse(localStorage.getItem('pendingList')) || [])
  let allList = ref(JSON.parse(localStorage.getItem('allList')) || [])

  // 添加进购物车
  const addShoppingCarList = ({ goods }: any) => {
    // console.log(goods.id)
    if (shoppingCarList.value.every((o: any) => o.goods.id !== goods.id)) {
      shoppingCarList.value = [{ goods, isCheck: false }, ...shoppingCarList.value]
    }

    localStorage.setItem('shoppingCarList', JSON.stringify(shoppingCarList.value))
  }
  //  删除
  const delGood = ({ id }: { id: number | string }) => {
    console.log(id)

    shoppingCarList.value = shoppingCarList.value.filter((o: any) => o.goods.id !== id)
    localStorage.setItem('shoppingCarList', JSON.stringify(shoppingCarList.value))
  }
  //   选中商品
  const checkGoods = ({ id, isCheck, allPrice, num }: any) => {
    console.log(allPrice)

    shoppingCarList.value = shoppingCarList.value.map((o: any) =>
      o.goods.id === id ? { ...o, isCheck, allPrice, num } : o
    )
  }
  //   添加商品数量
  const addGoods = ({ id, allPrice, num }: any) => {
    console.log(allPrice)

    shoppingCarList.value = shoppingCarList.value.map((o: any) =>
      o.goods.id === id ? { ...o, allPrice, num } : o
    )
  }
  // 全选商品
  const checkAllGoods = ({ isCheck }: any) => {
    console.log(isCheck)

    shoppingCarList.value = shoppingCarList.value.map((o: any) => ({
      ...o,
      isCheck,
      allPrice: o.allPrice || o.goods.sellPrice,
      value: o.num
    }))
  }
  // 结算商品
  const orderCheckGoods = () => {
    orderList.value = shoppingCarList.value.filter((o: any) => o.isCheck)
  }
  // 购买商品
  const BuyGoods = ({ goods, allPrice, num }: any) => {
    orderList.value = [{ goods, allPrice, num }]
  }
  // 待支付
  const setPendingGoods = ({ allPrice, allNum }: any) => {
    pendingList.value = [
      {
        isPay: true,
        time: Date.now(),
        allPrice,
        allNum,
        pending: orderList.value
      },
      ...pendingList.value
    ]
    // pendingList.value =  allList.value.filter((o: any) => o.isPay)
    localStorage.setItem('pendingList', JSON.stringify(pendingList.value))
  }
  // const changeF
  // 所有订单
  const setAllList = () => {
    const time = Date.now()
    allList.value = [
      {
        payStuats: 0,
        isPay: false,
        time,
        pending: orderList.value
      },
      ...allList.value
    ]
    setTimeout(() => {
      allList.value = allList.value.map((o:any) => (o.time === time ? { ...o, payStuats: 1 } : o))
      localStorage.setItem('allList', JSON.stringify(allList.value))
      console.log(allList.value);
      
    }, 10000)
    localStorage.setItem('allList', JSON.stringify(allList.value))
    
  }

  return {
    shoppingCarList,
    orderList,
    pendingList,
    allList,
    addShoppingCarList,
    checkGoods,
    checkAllGoods,
    orderCheckGoods,
    addGoods,
    delGood,
    BuyGoods,
    setPendingGoods,
    setAllList
  }
})
