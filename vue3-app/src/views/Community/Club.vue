<script setup lang="ts">
import { clubRecommendApi, clubListApi } from '@/api/community'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const clubRecommendList = ref<
  Array<{
    logoImage: any
    id: number
    name: string
  }>
>([])
const clubAllList = ref<
  Array<{
    logoImage: any
    id: number
    name: string
    firstCode:number
  }>
>([])
const loading = ref(true)

Promise.all([clubRecommendApi(), clubListApi()])
  .then(([res, res1]) => {
    // console.log( "rec",res,res1);
    clubRecommendList.value = res.data.data.list
    clubAllList.value = res1.data.data
  })
  .finally(() => {
    loading.value = false
  })

const toDetail = (id: any) => {
  $router.push({
    path: '/clubdetail',
    query: {
      id
    }
  })
}
console.log('club')

// 控制首页五个页面的滚动高度------------------------------------------------------------
import { savePosition } from '@/js/pageBarScrollTop.js'
savePosition()
</script>

<template>
  <div class="club" style="overflow-x:hidden">
    <van-loading color="#0094ff" class="van_loading" v-show="loading" />
    <div class="rec_list" v-show="!loading">
      <p style="font-size: 14rem; color: #2c2c2c">推荐</p>
      <ul>
        <li v-for="recItem in clubRecommendList" @click="toDetail(recItem.id)">
          <van-image
            :src="recItem.logoImage + '?imageView=1&type=webp&thumbnail=247x0'"
            round
            width="50rem"
            height="50rem"
          />
          <p>{{ recItem.name }}</p>
        </li>
      </ul>
    </div>
    <div class="all_list" v-show="!loading">
      <van-index-bar highlight-color="black">
        <!-- firstCode -->
        <div v-for="(cluballItem, index) in clubAllList">
          <van-index-anchor
            :index="cluballItem.firstCode"
            v-show="
              clubAllList.filter((o) => o.firstCode === cluballItem.firstCode).length > 1
                ? clubAllList.findIndex((o) => o.firstCode === cluballItem.firstCode) === index
                  ? 1
                  : 0
                : 1
            "
          />
          <van-cell @click="toDetail(cluballItem.id)">
            <van-image
              :src="cluballItem.logoImage "
              round
              width="30rem"
              height="30rem"
            />
            <p>{{ cluballItem.name }}</p>
          </van-cell>
        </div>

        <!-- {{  cluballItem.name}} -->
        <!-- </van-cell> -->
      </van-index-bar>
    </div>
  </div>
</template>

<style lang="less" scoped>
/deep/ .van_loading{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.rec_list {
  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 20rem;

    li {
      width: 33.3%;
      display: flex;
      flex-flow: column;
      align-items: center;
      margin-bottom: 20rem;
    }
  }
}

.all_list {
  /deep/.van-index-anchor {
    background-color: #f4f4f4;
    font-size: 12rem;
    color: #bebebe;
    font-weight: normal;
    width: 100vw;
    transform: translateX(-10rem);
    line-height: 18rem;
    z-index: -99;
  }

  /deep/.van-cell__value {
    display: flex;
    align-items: center;
    color: black;

    .van-image {
      margin-right: 10rem;
    }
  }


  /deep/.van-index-anchor {
    width: 100vw;
    transform: translateX(-10rem);
  }
  /deep/.van-cell {
    border-bottom: 1rem solid #f4f4f4;
  }
  /deep/.van-index-bar__sidebar {
    background-color: #e6e6e6;
    border-radius: 50rem;
    padding: 5rem 0;
    right: 382rem;

    span {
      padding: 0 3rem;
      color: #bfbfbf;
    }
  }
}
// .club {
//   height: calc(100vh - 44rem - 60rem);
//   overflow: scroll;
// }
</style>
