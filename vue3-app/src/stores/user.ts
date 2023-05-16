import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // 登录数据
  const login = ref(false)
  let userdata = reactive({
    userId: '70885160',
    username: '漫想家70885160'
  })
  function successLogin() {
    login.value = true
  }

  return { login, userdata, successLogin }
})
