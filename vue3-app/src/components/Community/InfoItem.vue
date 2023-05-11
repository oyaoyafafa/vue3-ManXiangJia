<script setup lang="ts">
defineProps<{
  downItem: any
}>()
</script>

<template>
  <!-- :style="{
          backgroundImage: `url(${downItem.topImage}?fop=imageView/0/w/76/h/76)`
        }" -->
  <div class="information">
    <!-- <div
      class="img"
      :style="{
        backgroundImage: `url(${downItem.topImage}?fop=imageView/0/w/76/h/76)`
      }"
    >
    </div> -->
    <div class="img">
      <img :src="downItem.topImage + '?fop=imageView/0/w/76/h/76)'" alt="" />
    </div>
    <div class="tit">
      <h3>{{ downItem.title }}</h3>
      <p>
        <span>浏览量{{ downItem.browseNumber }}</span>
        <span>点赞{{ downItem.supportNumber }}</span>
      </p>
    </div>
    <!-- 情报 -->
  </div>
</template>

<style lang="less" scoped>
.information {
  display: flex;
  margin-bottom: 15rem;
  .img {
    width: 106rem;
    height: 86rem;
    overflow: hidden;
    margin-right: 10rem;
    img {
      border-radius: 8rem;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  // .img {
  //   width: 106rem;
  //   height: 86rem;
  //   border-radius: 8rem;
  //   background-position: center, center;
  //   background-repeat: no-repeat;
  //   background-size: cover;
  //   margin-right: 10rem;
  // }
  .tit {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    h3 {
      font-size: 16rem;
      font-weight: 500;
    }
    p {
      color: #ccc;
      font-size: 12rem;
      span {
        margin-right: 20rem;
      }
    }
  }
}
</style>
