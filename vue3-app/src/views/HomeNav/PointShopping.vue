<template>
  <div>PointShopping</div>
</template>

<script setup>
import { pointListApi } from "@/api/pointShopping";
pointListApi().then(res =>{
    console.log(res);
})
</script>

<style lang="scss" scoped></style>
