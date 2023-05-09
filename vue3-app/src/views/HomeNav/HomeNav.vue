<template>
  <div class="box">
    <div>
        <router-view></router-view>
    </div>
    <nav>
      <router-link to="/">漫想家</router-link>
      <router-link to="/community">社区</router-link>
      <router-link to="/pointShopping">积分商城</router-link>
      <router-link to="/shoppingCart">购物袋</router-link>
      <router-link to="/about">我的</router-link>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
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
    height: 70rem;
    background-color: #ffffff;
    a {
      color: #cfcfd4;
      font-weight: bold;
      &.router-link-exact-active {
        color: #404040;
      }
    }
  }
}
</style>
