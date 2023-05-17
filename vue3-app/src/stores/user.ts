import { ref, toRaw, isRef } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // 登录数据
  const login = ref(localStorage.getItem('token') ? true : false)
  const userdata = ref({
    userId: '70885160',
    username: '漫想家70885160'
  })
  function successLogin() {
    login.value = true
  }
  // 用户地址
  let addresses = ref(
    localStorage.getItem('vue3-address')
      ? JSON.parse(localStorage.getItem('vue3-address') || '[]')
      : []
  )

  // 地址 增 删
  function addAddress(info: any) {
    // 去除info指向
    let addressItem = JSON.parse(JSON.stringify(info))
    // 添加到pinia
    addresses.value = [addressItem, ...addresses.value]
    // 去重
    addresses.value = [
      ...new Set([
        ...addresses.value.map((o: any) => {
          return JSON.stringify(o)
        })
      ])
    ]
    addresses.value = addresses.value.map((o: any) => {
      return JSON.parse(o)
    })
    localStorage.setItem('vue3-address', JSON.stringify([...addresses.value]))
  }
  function removeAddress(index: number) {
    addresses.value = addresses.value.filter((o: any, i: number) => {
      return i != index
    })
    localStorage.setItem('vue3-address', JSON.stringify(addresses.value))
  }
  // 默认地址索引
  let defaultAddressIndex = ref(localStorage.getItem('vue3-DefaultAddressIndex')||0)
  // 更新默认地址索引
  function updateDefaultAddressIndex(index: number) {
    defaultAddressIndex.value = index;
    localStorage.setItem('vue3-DefaultAddressIndex',String(index))
    
  }
 
  return {
    login,
    userdata,
    successLogin,
    addresses,
    addAddress,
    removeAddress,
    defaultAddressIndex,
    updateDefaultAddressIndex
  }
})
