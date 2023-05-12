<template>
  <div class="box">
    <div>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
      </router-view>

      <!-- <router-view></router-view> -->
    </div>

    <nav>
      <router-link to="/" @click.native="changePageNum(1)">
        <img
          v-if="pageNum === 1"
          src="../../../public/images/底部导航/ic_tab_shop_select.png"
          alt=""
        />
        <img v-else src="../../../public/images/底部导航/ic_tab_shop_unselect.png" alt="" />
        <p>漫想家</p>
      </router-link>
      <router-link to="/community" @click.native="changePageNum(2)">
        <img
          v-if="pageNum === 2"
          src="../../../public/images/底部导航/ic_tab_mine_select.png"
          alt=""
        />
        <img v-else src="../../../public/images/底部导航/ic_tab_mine_unselect.png" alt="" />
        <p>社区</p>
      </router-link>
      <router-link to="/pointShopping" @click.native="changePageNum(3)">
        <img
          v-if="pageNum === 3"
          src="../../../public/images/底部导航/ic_tab_score_store_select.png"
          alt=""
        />
        <img v-else src="../../../public/images/底部导航/ic_tab_score_store_unselect.png" alt="" />
        <p>积分商城</p>
      </router-link>
      <router-link to="/shoppingCart" @click.native="changePageNum(4)">
        <img
          v-if="pageNum === 4"
          src="../../../public/images/底部导航/ic_tab_social_select.png"
          alt=""
        />
        <img v-else src="../../../public/images/底部导航/ic_tab_social_unselect.png" alt="" />
        <p>购物袋</p>
      </router-link>
      <router-link to="/about" @click.native="changePageNum(5)">
        <img
          v-if="pageNum === 5"
          src="../../../public/images/底部导航/ic_tab_mine_select.png"
          alt=""
        />
        <img v-else src="../../../public/images/底部导航/ic_tab_mine_unselect.png" alt="" />
        <p>我的</p>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
// 控制下面导航的高亮
const pageNum = ref(1)
function changePageNum(topageNum) {
  pageNum.value = topageNum
}


</script>

<style lang="scss" scoped>
.box {
  // background-color: pink;
  height: 100vh;
  width: 100vw;

  nav {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60rem;
    background-color: #ffffff;

    a {
      color: #cfcfd4;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        display: block;
        width: 20rem;
        height: 20rem;
      }

      &.router-link-exact-active {
        color: #404040;
      }
    }
  }
}
</style>
