<template>
  <div class="box">
    <div>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>

    <nav>
      <router-link to="/home">
        <div class="home-icon"></div>
        <p>漫想家</p>
      </router-link>
      <router-link to="/community">
        <div class="community-icon"></div>
        <p>社区</p>
      </router-link>
      <router-link to="/pointShopping">
        <div class="pointShopping-icon"></div>
        <p>积分商城</p>
      </router-link>
      <router-link to="/shoppingCart">
        <div class="shoppingCart-icon"></div>
        <p>购物袋</p>
      </router-link>
      <router-link to="/about">
        <div class="about-icon"></div>
        <p>我的</p>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
 
console.log('wsc merge test111');

</script>

<style lang="scss" scoped>
.box {
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
      div {
        width: 20rem;
        height: 20rem;
      }
      .home-icon {
        background: url('@/../public/images/底部导航/ic_tab_shop_unselect.png') no-repeat;
        background-size: cover;
      }
      .community-icon {
        background: url('@/../public/images/底部导航/ic_tab_social_unselect.png') no-repeat;
        background-size: cover;
      }
      .pointShopping-icon {
        background: url('@/../public/images/底部导航/ic_tab_score_store_unselect.png') no-repeat;
        background-size: cover;
      }
      .shoppingCart-icon {
        background: url('@/../public/images/底部导航/ic_tab_shopping_unselect.png') no-repeat;
        background-size: cover;
      }
      .about-icon {
        background: url('@/../public/images/底部导航/ic_tab_mine_unselect.png') no-repeat;
        background-size: cover;
      }
      &.router-link-active {
        color: #404040;
        .home-icon {
          background: url('@/../public/images/底部导航/ic_tab_shop_select.png') no-repeat;
          background-size: cover;
        }
        .community-icon {
          background: url('@/../public/images/底部导航/ic_tab_social_select.png') no-repeat;
          background-size: cover;
        }
        .pointShopping-icon {
          background: url('@/../public/images/底部导航/ic_tab_score_store_select.png') no-repeat;
          background-size: cover;
        }
        .shoppingCart-icon {
          background: url('@/../public/images/底部导航/ic_tab_shopping_select.png') no-repeat;
          background-size: cover;
        }
        .about-icon {
          background: url('@/../public/images/底部导航/ic_tab_mine_select.png') no-repeat;
          background-size: cover;
        }
      }
    }
  }
}
</style>
