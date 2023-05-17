<template>
  <div id="login">
    <header>
      <section class="back">
        <div class="back-icon" @click="back"></div>
      </section>
      <section class="logo">
        <div class="logo-img"></div>
        <div class="logo-text">
          <span>现实有形</span>
          <span>漫想无限</span>
        </div>
      </section>
    </header>
    <main>
      <van-tabs v-model:active="active" animated swipeable>
        <van-tab :title="'手机快捷登录'">
          <div class="input">
            <section class="username1">
              <input type="number" placeholder="请输入手机号" v-model="username1" />
              <button @click="getCode">{{ buttontextContent }}</button>
            </section>
            <section class="password1">
              <input type="number" placeholder="请输入验证码" v-model="password1" />
            </section>
            <section class="agreement">
              <van-checkbox v-model="checked1">
                <p class="text">
                  <span>同意</span>
                  <span class="highlight">《用户注册协议》</span>
                  <span>和</span>
                  <span class="highlight">《隐私政策》</span>
                </p>
              </van-checkbox>
            </section>
            <section class="login">
              <button @click="login('code')">登录</button>
            </section>
            <section class="otherLogin">
              <div class="wx"></div>
              <div class="qq"></div>
            </section>
          </div>
        </van-tab>
        <van-tab :title="'账号密码登录'">
          <div class="input">
            <section class="username1">
              <input type="number" v-model="username2" placeholder="请输入手机号" />
            </section>
            <section class="password1">
              <input type="password1" v-model="password2" placeholder="请输入密码" />
            </section>
            <section class="agreement">
              <van-checkbox v-model="checked2">
                <p class="text">
                  <span>同意</span>
                  <span class="highlight">《用户注册协议》</span>
                  <span>和</span>
                  <span class="highlight">《隐私政策》</span>
                </p>
              </van-checkbox>
            </section>
            <section class="login">
              <button @click="login('password1')">登录</button>
            </section>
            <section class="otherLogin">
              <div class="wx"></div>
              <div class="qq"></div>
            </section>
          </div>
        </van-tab>
      </van-tabs>
    </main>
    <div class="mask" v-show="loading">
      <div>
        <van-loading />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import { useUserStore } from '@/stores/user.ts'
export default {
  setup() {
    const active = ref(0)
    const $route = useRoute()
    const $router = useRouter()

    const checked1 = ref(false)
    const checked2 = ref(false)
    const loading = ref(false)

    const username1 = ref('123456')
    const password1 = ref('111111')

    const username2 = ref('123456')
    const password2 = ref('111111')

    const userStore = useUserStore()
    // 登录功能
    function login(mode) {
      console.log('login')

      if (mode === 'code') {
        if (checked1.value === false) {
          showToast('请您详细阅读并同意用户注册协议和隐私政策')
          return
        }
        new Promise((resolve) => {
          loading.value = true
          setTimeout(() => {
            resolve('xxxxyyyyzzzz')
          }, 3000)
        }).then((res) => {
          loading.value = false
          if (password1.value == code.value) {
            // 登录成功
            // 1. 存储 token
            userStore.successLogin();
            localStorage.setItem('token', res)
            // 2. 跳转
            back()
          } else {
            // 登录失败
            localStorage.removeItem('token')
            showToast('验证码不正确')
          }
        })
      } else if (mode == 'password1') {
        if (checked2.value === false) {
          showToast('请您详细阅读并同意用户注册协议和隐私政策')
          return
        }
        new Promise((resolve) => {
          loading.value = true
          setTimeout(() => {
            resolve('xxxxyyyyzzzz')
          }, 3000)
        }).then((res) => {
          loading.value = false
          if (username2.value == '123456' && password2.value == '111111') {
            // 登录成功
            // 1. 存储 token
            userStore.successLogin();
            localStorage.setItem('token', res)
            // 2. 跳转
            back()
          } else {
            // 登录失败
            localStorage.removeItem('token')
            showToast('登录失败')
          }
        })
      }
    }
    // 回退页面功能
    function back() {
      if ($route.query.f) {
        $router.replace($route.query.f)
      } else {
        $router.replace('/')
      }
    }

    // 获取验证码
    const buttontextContent = ref('获取验证码')
    let awaitStatus = false
    const code = ref(null)

    function getCode(event) {
      if (awaitStatus) {
        return
      }
      awaitStatus = true
      console.log(event.target.textContent)
      // 定义所有可能出现的验证码字符：验证码字符库
      let allCode = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      // 定义所有可能出现的验证码字符 参一为所有验证码字符 参二为验证码位数 参三为禁止出现的验证码字符
      function createCode(allCode, count, banCode) {
        var code = allCode
        // 去除应该禁止的验证码字符
        for (var i = 0; i < banCode.length; i++) {
          code.splice(code.indexOf(banCode[i]), 1)
        }
        // 定义验证码 返回验证码
        var temp = ''
        for (var i = 0; i < count; i++) {
          temp += code[Math.floor(Math.random() * code.length)]
        }
        return temp
      }
      code.value = createCode(allCode, 6, '')
      console.log('code == ', code)
      buttontextContent.value = 60 + 's'
      let timer = setInterval(() => {
        if (buttontextContent.value.replace('s', '') != 1) {
          buttontextContent.value = buttontextContent.value.replace('s', '') - 1 + 's'
        } else {
          buttontextContent.value = '获取验证码'
          awaitStatus = false
          clearInterval(timer)
        }
      }, 1000)
    }

    return {
      checked1,
      checked2,
      login,
      active,
      username1,
      password1,
      username2,
      password2,
      showToast,
      loading,
      back,
      getCode,
      buttontextContent
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  padding: 10rem;
  position: relative;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

header {
  .back {
    .back-icon {
      margin: 10rem;
      width: 24rem;
      height: 24rem;
      background: url('@/../public/images/good_back.png') no-repeat;
      background-size: cover;
    }
  }
  .logo {
    width: calc(504rem * 0.35);
    margin: 0 auto;
    margin-top: 50rem;
    .logo-img {
      width: calc(504rem * 0.35);
      height: calc(165rem * 0.35);
      background: url('@/../public/images/img_login_cover.png') no-repeat;
      background-size: cover;
    }
    .logo-text {
      width: calc(504rem * 0.35);
      display: flex;
      padding: 0 5rem;
      justify-content: space-between;
      font-size: 15rem;
      margin-top: 10rem;
      span {
        font-weight: 600;
      }
    }
  }
}
/deep/main {
  .van-tab--line {
    .van-tab__text {
      color: #cccccc;
      font-weight: normal;
    }
    &.van-tab--active {
      .van-tab__text {
        color: #222;
        font-weight: 600;
      }
    }
  }
  .van-checkbox__icon--checked {
    i {
      background-color: #494949;
      border-color: #494949;
    }
  }
  .input {
    padding: 0 10rem;
    margin-top: 10rem;
    height: 190rem;
    height: 430rem;
    position: relative;
    .username1,
    .password1 {
      height: 50rem;
      border-bottom: 1rem solid #d6d5d5;
      font-size: 15rem;
      input {
        height: 100%;
        padding-left: 2rem;
        &::placeholder {
          color: #ccc;
        }
      }
    }
    .username1 {
      position: relative;
      button {
        width: 100rem;
        height: 100%;
        font-weight: 600;
        background-color: #fff;
        position: absolute;
        right: 0;
        top: center;
      }
    }
    .agreement {
      margin-top: 10rem;
      .text {
        margin-left: 5rem;
        font-size: 14rem;
        color: rgb(107, 107, 107);
        .highlight {
          color: #222;
          font-weight: 600;
        }
      }
    }
    .login {
      margin-top: 20rem;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16rem;
        margin: 0 auto;
        width: 300rem;
        height: 40rem;
        border-radius: 3rem;
        background-color: #7d8187;
        color: #fff;
      }
    }
    .otherLogin {
      display: flex;
      justify-content: space-around;
      position: fixed;
      width: 355rem;
      bottom: 50rem;
      > div {
        width: 48rem;
        height: 48rem;
      }
      .wx {
        background: url('@/../public/images/分享/ic_share_wechat.png') no-repeat;
        background-size: cover;
      }
      .qq {
        background: url('@/../public/images/分享/ic_share_qq.png') no-repeat;
        background-size: cover;
      }
    }
  }
}

footer {
}
</style>

<style lang="less">
.van-popup {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-toast__text {
    padding: 10rem;
    border-radius: 5rem;
    background-color: #333;
    color: #fff;
  }
}
</style>
