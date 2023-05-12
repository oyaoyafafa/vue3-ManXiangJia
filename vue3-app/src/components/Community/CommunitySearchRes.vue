<script setup lang="ts">
defineProps<{
  seachResItem: any
}>()
</script>

<template>
  <div class="information">
    <van-image round width="40rem" height="40rem" :src="seachResItem.header" />
    <div class="nick_name">
      <h3>
        {{ seachResItem.nickName }}
        <svg
          t="1683808942811"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3599"
          width="16rem"
          height="16rem"
        >
          <path
            d="M512 671.67m-160 0a160 160 0 1 0 320 0 160 160 0 1 0-320 0Z"
            fill="#FFFFFF"
            p-id="3600"
          ></path>
          <path
            d="M512 671.67m-160 0a160 160 0 1 0 320 0 160 160 0 1 0-320 0Z"
            fill="#FFFFFF"
            p-id="3601"
          ></path>
          <path
            d="M670.39 513.28c-34.67-34.67-78.7-56.58-126.39-63.35V235.05l83.3 83.29c12.44 12.45 32.81 12.45 45.25 0 12.45-12.44 12.45-32.81 0-45.25L536.79 137.32c-6.46-6.46-15.06-9.56-23.57-9.31-0.4-0.01-0.81-0.02-1.22-0.02-0.25 0-0.51 0-0.76 0.01a0.064 0.064 0 0 0-0.06 0c-8.3-0.09-16.62 3.02-22.92 9.32L352.49 273.09c-12.44 12.44-12.44 32.81 0 45.25 12.45 12.45 32.81 12.45 45.26 0L480 236.09v213.84c-47.69 6.77-91.72 28.68-126.39 63.35C311.3 555.59 288 611.84 288 671.67c0 59.84 23.3 116.09 65.61 158.4 42.31 42.3 98.56 65.6 158.39 65.6s116.08-23.3 158.39-65.6C712.7 787.76 736 731.51 736 671.67c0-59.83-23.3-116.08-65.61-158.39zM512 831.67c-88.37 0-160-71.63-160-160 0-88.36 71.63-160 160-160s160 71.64 160 160c0 88.37-71.63 160-160 160z"
            fill="#2B97D0"
            p-id="3602"
          ></path>
        </svg>
      </h3>
      <p>
        漫想家ID<span>{{ seachResItem.homesickId }}</span>
      </p>
    </div>
    <div class="follow_btn">
      <span class="no_follow">关注</span>
      <!-- <span class="followed" >已关注</span> -->
    </div>
  </div>
</template>

<style lang="less" scoped>
.information {
  display: flex;
  align-items: center;
  padding: 0 10rem;
  margin-bottom: 10rem;
  .nick_name {
    flex: 1;
    margin-left: 10rem;
    h3 {
      font-size: 14rem;
      font-weight: bold;
      display: flex;
      align-items: center;
    }
  }
  .follow_btn {
    .no_follow{
        background-image: linear-gradient(#5e636c , #1e2632);
    color: #fff;
    padding: 5rem 15rem;
    border-radius: 50rem;
    }
   .followed{
    padding: 5rem 10rem;
    border-radius: 50rem;

    color: #646464;
    border: 1px solid #ccc;
   }
  }
}
</style>
