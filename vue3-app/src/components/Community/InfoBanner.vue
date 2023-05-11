<script setup lang="ts">
defineProps<{
  bannerItem: any
}>()
</script>

<template>
    <li
    class="information"
      :style="[
        {
          backgroundImage: `url(${bannerItem.topImage}?imageView=1&type=webp&thumbnail=247x0)`
        },
        { width: '340rem' }
      ]"
    >
     <span class="to_see">去看看</span>
    <!-- <van-skeleton>
        <template #template>
          <div :style="{ display: 'flex', width: '100%' }">
            <van-skeleton-image />
            <div :style="{ flex: 1, marginLeft: '16px' }">
              <van-skeleton-paragraph row-width="60%" />
              <van-skeleton-paragraph />
              <van-skeleton-paragraph />
              <van-skeleton-paragraph />
            </div>
          </div>
        </template>
      </van-skeleton> -->
    <!-- 情报 -->
   </li>
</template>

<style lang="less" scoped>
.information {
  margin-right: 5rem;
  height: 189rem;
  border-radius: 15rem;
  background-position: center;
  background-size: cover;
  position: relative;
  .to_see{
    background-color: #fff;
    padding:5rem 10rem;
    color:#7237e4 ;
    border-radius: 50rem;
    position: absolute;
    bottom: 15rem;
    right:15rem ;
  }
}
</style>
