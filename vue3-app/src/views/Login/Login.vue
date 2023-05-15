<template>
  <div class="box">
    <header>
      <section class="back">
        <div class="back-icon"></div>
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
            <section class="username">
              <input type="number" value="" placeholder="请输入手机号" />
              <button>获取验证码</button>
            </section>
            <section class="password">
              <input type="number" value="" placeholder="请输入验证码" />
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
              <button>登录</button>
            </section>
            <section class="otherLogin">
              <div class="wx"></div>
              <div class="qq"></div>
            </section>
          </div>
        </van-tab>
        <van-tab :title="'账号密码登录'">
          <div class="input">
            <section class="username">
              <input type="number" value="" placeholder="请输入手机号" />
            </section>
            <section class="password">
              <input type="password" value="" placeholder="请输入密码" />
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
              <button>登录</button>
            </section>
            <section class="otherLogin">
              <div class="wx"></div>
              <div class="qq"></div>
            </section>
          </div>
        </van-tab>
      </van-tabs>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const checked1 = ref(false)
    const checked2 = ref(false)
    return { checked1,checked2 }
  }
}
</script>

<style lang="less" scoped>
.box {
  padding: 10rem;
}
header {
  .back {
    .back-icon {
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
    .username,
    .password {
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
    .username {
      position: relative;
      button {
        height: 100%;
        background-color: #fff;
        font-weight: 600;
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
