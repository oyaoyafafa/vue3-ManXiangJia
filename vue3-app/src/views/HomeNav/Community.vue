<template>
  <div>
    <nav>
      <router-link to="/community/follow">关注</router-link>
      <router-link to="/community">推荐</router-link>
      <router-link to="/community/club">部落</router-link>
      <router-link to="/community/information">情报</router-link>
    </nav>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
