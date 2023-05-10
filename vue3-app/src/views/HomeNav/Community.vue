<template>
  <div class="all">
    <div class="top_nav">
      <van-tabs v-model:active="active">
        <van-tab title="关注 " to="/community/follow" />
        <van-tab title="推荐 " to="/community" />
        <van-tab title="部落 " to="/community/club" />
        <van-tab title="情报 " to="/community/information" />
      </van-tabs>
      <van-icon name="search" />
    </div>
    <!-- <nav>
      <router-link to="/community/follow">关注</router-link>
      <router-link to="/community">推荐</router-link>
      <router-link to="/community/club">部落</router-link>
      <router-link to="/community/information">情报</router-link>
    </nav> -->


    <div>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const active = ref(1);
</script>

<style lang="less" scoped>
.all {
  padding: 10rem;
  padding-bottom: 70px;

  .top_nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    /deep/ .van-tabs {
      margin-bottom: 15rem;
      width: 50%;

      span {
        font-size: 14rem;
        color: #808080;
        font-weight: bold;
      }

      .van-tab--active span {
        font-size: 16rem;
        color: black;
        font-weight: bolder;
      }

      .van-tabs__nav--line {
        padding-bottom: 15rem;
      }

      .van-tabs__line {
        bottom: 15rem;
        background: #1c2431;
        width: 25rem;
      }
    }

    .van-icon {
      font-size: 24rem;
      padding-right: 8rem;
      font-weight: bolder;
      margin-top: -13rem;
    }
  }
}</style>
