<template>
  <div>
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <nav>
      <router-link to="/">漫想家</router-link>
      <router-link to="community">社区</router-link>
      <router-link to="pointShopping">积分商城</router-link>
      <router-link to="shoppingCart">购物袋</router-link>
      <router-link to="about">我的</router-link>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
