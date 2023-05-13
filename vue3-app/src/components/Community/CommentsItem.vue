<script setup lang="ts">
defineProps<{
    commentsItem: any
}>()
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const toDetail = (id: any) => {
  $router.push({
    path: '/infodetail',
    query: {
      id
    }
  })
}
</script>

<template>
  <div class="comments" @click="toDetail(commentsItem.id)">
    <van-image
      width="33rem"
      height="33rem"
      round
      :src="(commentsItem?.detail?.header ||commentsItem?.tbAppUserDetail?.header )+ '?imageView=1&type=webp&thumbnail=247x0'"
    />
    <div class="user">
      <h3 class="user_name">{{( commentsItem?.detail?.nickName ||commentsItem?.tbAppUserDetail?.nickName )}}</h3>
      <p>
        <span>{{ commentsItem.content }}</span
        >{{ commentsItem.createTime }}
      </p>
    </div>
    <div>
      <van-icon name="like-o" />
      <span class="like_num">{{ commentsItem.supportNum }}</span>
    </div>
    <!-- 情报 -->
  </div>
</template>

<style lang="less" scoped>
.comments {
      display: flex;
      align-items: flex-start;
      margin-top: 10rem;
    }
    .user {
      margin-left: 10rem;
      flex: 1;
      h3 {
        font-size: 13rem;
        color: #a2a2a2;
      }
      p {
        font-size: 12rem;
        color: #a2a2a2;
        span {
          font-size: 13rem;
          color: black;
          margin-right: 10rem;
        }
      }
    }
</style>
