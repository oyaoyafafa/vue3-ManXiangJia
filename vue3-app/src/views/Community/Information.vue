<script setup lang="ts">
console.log('info');

import { informationBannerApi, informationListApi } from "@/api/community";
import { ref } from "vue";
const bannerList = ref([])
const downList = ref([])
informationBannerApi().then((res:any)=>{
  console.log("banner",res);
  bannerList.value = res.data.data
  
})
informationListApi().then((res:any)=>{
  console.log("",res);
  downList.value = res.data.data.list
})


</script>

<template>
  <div class="information">
    <!-- 情报 -->
    <div class="banner_list">
      <div ></div>
    </div>
  </div>
</template>

<style scoped>

</style>