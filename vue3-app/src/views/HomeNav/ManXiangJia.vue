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


// 控制首页五个页面的滚动高度------------------------------------------------------------
import {savePosition} from '@/js/pageBarScrollTop.js'
savePosition();
</script>

<style lang="less" scoped></style>
