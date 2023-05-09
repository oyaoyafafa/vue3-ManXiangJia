<template>
  <div class="box">
    <header>
      <h1>我的漫想家</h1>
      <div class="login">
        <span class="userLogin">
          <img class="user" src="../../../public/images/我的/default_header.png" alt="" />
          <span v-if="!isLogin">
            <h1 style="font-weight: bold;">点击注册/登录</h1>
            <span>购物得积分</span>
          </span>
          <span v-if="isLogin">
            <h1 style="font-weight: bold;">漫想家92637277</h1>
            <span>ID 92637277 | 积分 0</span>
          </span>
        </span>
        <img class="setting" src="../../../public/images/我的/ic_mine_setting.png" alt="" />
      </div>
      <div v-if="!isLogin" class="userMsg">
        <div>
          <p>-</p>
          <p>粉丝</p>
        </div>
        <div>
          <p>-</p>
          <p>关注</p>
        </div>
        <div>
          <p>-</p>
          <p>动态</p>
        </div>
      </div>
      <div v-if="isLogin" class="userMsg">
        <div>
          <p>0</p>
          <p>粉丝</p>
        </div>
        <div>
          <p>0</p>
          <p>关注</p>
        </div>
        <div>
          <p>0</p>
          <p>动态</p>
        </div>
      </div>
    </header>
    <div class="order">
      <div class="head">
        <p>我的订单</p>
        <p>
          <span>全部订单</span>
          <img src="../../../public/images/我的/ic_triangle.png" alt="" />
        </p>
      </div>
      <div class="payMsg">
        <p>
          <img src="../../../public/images/我的/ic_mine_pay.png" alt="" />
          <span>待付款</span>
        </p>
        <p>
          <img src="../../../public/images/我的/ic_mine_delivered.png" alt="" />
          <span>待发货</span>
        </p>
        <p>
          <img src="../../../public/images/我的/ic_mine_received.png" alt="" />
          <span>待收货</span>
        </p>
        <p>
          <img src="../../../public/images/我的/ic_mine_finish.png" alt="" />
          <span>已完成</span>
        </p>
      </div>
    </div>
    <div class="newUser">
      <img src="../../../public/images/我的/ic_main_poster.jpg" alt="" />
    </div>
    <div class="common">
      <h1>常用功能</h1>
      <div class="funtion">
        <p>
          <img src="../../../public/images/我的/ic_mine_coupon.png" alt="" />
          <span>优惠券</span>
        </p>
        <p>
          <img src="../../../public/images/我的/ic_mine_my_collection.png" alt="" />
          <span>我的喜欢</span>
        </p>
        <p>
          <img src="../../../public/images/我的/ic_mine_pre_order.png" alt="" />
          <span>预售订单</span>
        </p>
        <p>
          <img src="../../../public/images/我的/ic_mine_my_repare.png" alt="" />
          <span>我的修复</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const isLogin = reactive(false)
</script>

<style lang="scss" scoped>
.box {
  background-color: #f4f5f5;
  width: 100vw;
  height: 100vh;
  header {
    width: 100%;
    background-color: #18202d;
    height: 33vh;
    padding-top: 20rem;
    color: #f5f5f6;
    h1 {
      text-align: center;
      font-size: 16rem;
    }
    .login {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 32rem 15rem;
      height: 30rem;
      .userLogin {
        display: flex;
        align-items: center;
        .user {
          width: 50rem;
          margin-right: 10rem;
        }
      }
      .setting {
        margin-bottom: 20rem;
        width: 16rem;
        height: 16rem;
      }
    }
    .userMsg {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: -10rem;
      div {
        text-align: center;
        p {
          &:nth-child(2) {
            color: #8e9299;
          }
        }
      }
    }
  }
  .order {
    width: 95%;
    height: 100rem;
    margin: 0 auto;
    border-radius: 2rem;
    box-shadow: 0 0px 5px rgba(0, 0, 0, 0.4);
    background-color: #ffffff;
    position: relative;
    top: -45rem;
    left: 0;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10rem 6rem;
      p {
        margin: 5rem;
        &:nth-child(1) {
          font-size: 14rem;
          font-weight: bold;
        }
        &:nth-child(2) {
          display: flex;
          align-items: center;
          color: #848990;
          line-height: 12rem;
          img {
            width: 10rem;
            height: 10rem;
            margin-left: 5rem;
          }
        }
      }
    }
    .payMsg {
      display: flex;
      justify-content: space-around;
      padding-top: 5rem;
      P {
        img {
          width: 18rem;
          height: 18rem;
          margin-bottom: 5rem;
        }
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #898d94;
      }
    }
  }
  .newUser {
    margin: 0 auto;
    margin-top: -40rem;
    width: 95%;
    img {
      border-radius: 2rem;
      width: 100%;
      // height: 65rem;
    }
  }
  .common {
    width: 95%;
    height: 100rem;
    margin: 0 auto;
    background-color: white;
    box-shadow: 0 0px 2px rgba(0, 0, 0, 0.4);
    h1 {
      margin:6rem 10rem;
      padding-top: 8rem;
      font-size: 14rem;
      font-weight: bold;
    }
    .funtion {
      display: flex;
      justify-content: space-around;
      padding-top: 5rem;
      P {
        img {
          width: 18rem;
          height: 18rem;
          margin-bottom: 5rem;
        }
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #898d94;
      }
    }
  }
}
</style>
