<script setup lang="ts">
defineProps<{
  item: any
}>()
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
// console.log();

const toDetail = (id:any) => {
  $router.push({
    path: '/communitygoodsdetail',
    query: {
      id
    }
  })
}
</script>

<template>
  <div class="item" v-masonry-tile @click="toDetail(item.id)">
    <van-image
      :src="
        item.images[0].videoImage || item.images[0].url + '?imageView=1&type=webp&thumbnail=247x0'
      "
      width="173rem"
      height="auto"
    />
    <div class="desc">
      <h3>{{ item.title }}</h3>
      <div class="author">
        <van-image
          :src="item.isUserDetail.header + '?imageView=1&type=webp&thumbnail=247x0'"
          round
          width="15rem"
          height="15rem"
        />
        <p>{{ item.isUserDetail.nickName }}</p>
        <span><van-icon name="like-o" class="like_o" />{{ item.supportNum }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.item {
  width: 49%;
  margin-bottom: 15rem;

  .desc {
    width:173rem ;

    h3 {
      font-size: 14rem;
      font-weight: 600;
      margin-bottom: 5rem;
      display: -webkit-box; // 将元素作为弹性伸缩盒子模型显示
      overflow: hidden; // 文本溢出限定的宽度就隐藏内容
      text-overflow: ellipsis; // 多行文本的情况下，用省略号 “…” 隐藏溢出范围的文本
      -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
      -webkit-line-clamp: 2;
    }

    .author {
      display: flex;
      align-items: center;

      p {
        font-size: 12rem;
        color: #929292;
        flex: 1;
      }

      span {
        font-size: 12rem;

        .like_o {
          font-size: 16rem;
        }
      }
    }
  }

  /deep/ img {
    border-top-left-radius: 5rem;
    border-top-right-radius: 5rem;
  }
}
</style>
