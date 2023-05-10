<template>
  <div>
    <input type="text" />
    <p>1111</p>
  </div>
</template>

<script setup>
import { bannerApi } from "@/api/manxiangjia";
bannerApi().then((res) => {
  console.log(res);
});
</script>

<style lang="less" scoped></style>
