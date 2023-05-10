<script setup lang="ts">
import { clubRecommendApi, clubListApi } from "@/api/community";
import { ref } from "vue";
const clubRecommendList = ref([])
const clubAllList = ref([])

clubRecommendApi().then((res: any) => {
  clubRecommendList.value = res.data.data.list

})
clubListApi().then((res: any) => {
  console.log(res);

  clubAllList.value = res.data.data
  console.log(clubAllList);
})

// const code = computed(() => {
 
// })

</script>

<template>
  <div class="club">
    <div class="rec_list">
      <p style="font-size: 14rem; color: #2c2c2c;">推荐</p>
      <ul>
        <li v-for="recItem in clubRecommendList">
          <van-image :src="recItem.logoImage + '?imageView=1&type=webp&thumbnail=247x0'
            " round width="50rem" height="50rem" />
          <p>{{ recItem.name }}</p>

        </li>
      </ul>
    </div>
    <div class="all_list">
      <van-index-bar highlight-color="black">
        <!-- firstCode -->
        <div v-for="(cluballItem ,index) in clubAllList">
          <van-index-anchor :index="cluballItem.firstCode"  v-show="clubAllList.filter(o => o.firstCode === cluballItem.firstCode).length > 1 ? (clubAllList.findIndex(o => o.firstCode === cluballItem.firstCode) ===index ?  1: 0 ) :  1"/>
          <van-cell>
            <van-image :src="cluballItem.logoImage + '?imageView=1&type=webp&thumbnail=247x0'
              " round width="30rem" height="30rem" />
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
/deep/.van-cell{
  border-bottom: 1rem solid #f4f4f4;
}
  /deep/.van-index-bar__sidebar {
    background-color: #e6e6e6;
    border-radius: 50rem;
    padding: 5rem 0;
    right: 2rem;

    span {
      padding: 0 3rem;
      color: #bfbfbf;
    }
  }
}
</style>