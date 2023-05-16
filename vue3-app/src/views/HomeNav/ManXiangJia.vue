<template>
  <div>
    <!-- <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" /> -->
    <div class="input">
      <input type="text" placeholder="输入搜索内容" @click="$router.push('/homesearch')" />
      <div class="search">
        <img src="../../../public/images/ic_search_shop.png" alt="" />
      </div>
    </div>
    <div class="banner" v-for="banners in banner">
      <img :src="banners.image" alt="" />
    </div>
    <div class="classify">
      <div class="head">
        <h1>模玩分类</h1>
        <p>
          全部分类
          <img src="../../../public/images/sel_company.png" alt="" />
        </p>
      </div>
      <!-- <div class="class">
        <span v-for="things in classify">
          {{ things.name }}
        </span>
      </div> -->
      <!-- <div class="swiper-container swiper-selectedSong">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide select-item class"
            v-for="things in classify"
          >
          {{ things.name }}
        </div>
        </div>
      </div> -->
    </div>
    <div class="newUser">
      <img src="../../../public/images/我的/ic_main_poster.jpg" alt="" />
    </div>
    <footer>
      <div class="lucky">
        <div class="tooBig">
          <img src="../../../public/images/ic_lucky_number.png" alt="" />
          <p>拼手气得限定</p>
          <img src="../../../public/images/ic_lucky_number_gift.png" alt="" />
        </div>
        <div>
          <img src="../../../public/images/ic_repair.png" alt="" />
          <p>首创修复服务</p>
          <img src="../../../public/images/ic_repair_icon.png" alt="" />
        </div>
        <div>
          <img src="../../../public/images/ic_pre_sell.png" alt="" />
          <p>预售商品</p>
          <img src="../../../public/images/ic_pre_sell_hot.png" alt="" />
        </div>
      </div>
      <div class="recommend">
        <h1>商品推荐</h1>
        <ul class="commendList">
          <li v-for="item in recommend" @click="toCommodity(item.goodId)">
            <div>
              <img :src="item.tbGoods.listedImage" alt="" />
            </div>
            <p>{{ item.tbGoods.title }}</p>
            <p style="font-weight: bold">￥{{ item.tbGoods.sellPrice }}</p>
          </li>
        </ul>
      </div>
      <div class="all">
        <h1>全部商品</h1>
        <ul>
          <li @click="toCommodity(thing.id)" v-for="thing in all">
            <img :src="thing.listedImage" alt="" />
            <div class="price">
              <p>{{ thing.title }}</p>
              <p v-if="thing.sellPrice === 0">￥---</p>
              <p v-else>￥{{ thing.sellPrice }}</p>
            </div>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { bannerApi, moplaySortApi, goodsRecommendApi, goodsAllApi } from '@/api/manxiangjia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { savePosition } from '@/js/pageBarScrollTop.js'
import { onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';

onMounted(() => {
  new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    slidesPerView: 'auto',
    paginationClickable: true, // spaceBetween: 30, // freeMode: true,
    observer: true, // 修改swiper自己或子元素时，自动初始化swiper
    observeParents: true // 修改swiper的父元素时，自动初始化swiper
  })
})

const banner = ref<Array<any>>([])
// 大图
const classify = ref<Array<any>>([])
// 模玩分类
const recommend = ref<Array<any>>([])
// 商品推荐
const all = ref<Array<any>>([])
// 全部商品

bannerApi().then((res: any) => {
  banner.value = res.data.data
  console.log(res.data.data)
})
// 大图
moplaySortApi().then((res: any) => {
  console.log(res.data.data)
  classify.value = res.data.data
})
// 模玩分类
goodsRecommendApi().then((res: any) => {
  console.log(res.data.data)
  recommend.value = res.data.data
})
// 商品推荐
goodsAllApi().then((res: any) => {
  console.log('all', res.data.data.list)
  all.value = res.data.data.list
})
// 全部商品

// 控制首页五个页面的滚动高度------------------------------------------------------------
savePosition()

const $router = useRouter()
function toCommodity(id: any) {
  // console.log("id",id)
  $router.push({
    path: '/commodity',
    query: {
      id: id
    }
  })
}
</script>

<style lang="less" scoped>
.input {
  position: fixed;
  width: 375rem;
  height: 40rem;
  background-color: white;
  top: 0;
  left: 0;
  z-index: 999;
  input {
    width: 360rem;
    border: 1px solid #ebebeb;
    border-radius: 25rem;
    margin-top: 10rem;
    padding: 5rem;
    box-shadow: 0 0px 5px rgba(0, 0, 0, 0.4);
    margin-left: 7.5rem;
  }
  input::-webkit-input-placeholder {
    color: #cccccc;
  }
  .search {
    position: absolute;
    top: 16rem;
    right: 15rem;
    background-color: #f4f5f5;
    border-radius: 25rem;
    padding: 0rem 10rem;
    img {
      width: 15rem;
    }
  }
}
.banner {
  width: 360rem;
  height: 136rem;
  margin: 0 auto;
  margin-top: 56rem;
  overflow: hidden;
  img {
    width: 100%;
  }
}
.classify {
  width: 360rem;
  margin: 0 auto;
  margin-top: 16rem;
  overflow: hidden;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-weight: bold;
      font-size: 14rem;
    }
    p {
      &:nth-child(2) {
        display: flex;
        align-items: center;
        color: #95999e;
        img {
          width: 10rem;
          margin-left: 5rem;
        }
      }
    }
  }
  .class {
    display: flex;
    // justify-content: start;
    flex-wrap: nowrap;
    width: 360rem;
    margin: 16rem auto;
    span {
      border: 1px solid #f4f5f5;
      margin-right: 15rem;
      padding: 10rem 30rem;
      background-color: #f4f5f5;
      white-space: nowrap;
      border-radius: 5rem;
    }
  }
}
.newUser {
  width: 360rem;
  margin: 0 auto;
  img {
    width: 100%;
  }
}
footer {
  width: 100vw;
  // height: 100vh;
  // margin-bottom: 200rem;
  background-color: #f6f6f7;
  padding-bottom: 80rem;
  .lucky {
    display: flex;
    width: 360rem;
    margin: 0 auto;
    justify-content: space-around;
    margin-top: 15rem;
    .tooBig {
      margin-top: -3rem;
      img {
        transform: scale(0.8);
      }
      p {
        margin-left: 5rem;
      }
    }
    div {
      width: 113rem;
      background-color: #ffffff;
      &:nth-child(2) {
        margin: 0 10rem;
      }
      p {
        color: #92969c;
        transform: scale(0.8);
      }
      img {
        &:nth-child(1) {
          width: 55rem;
          margin-left: 10rem;
        }
        &:nth-child(3) {
          width: 20rem;
          margin-left: 90rem;
          margin-bottom: 5rem;
        }
      }
    }
  }
  .recommend {
    width: 360rem;
    margin: 0 auto;
    margin-top: 20rem;
    h1 {
      font-weight: bold;
      font-size: 14rem;
    }
    .commendList {
      margin-top: 10rem;
      display: flex;
      flex-wrap: wrap;
      li {
        // width: 170rem;
        width: 116.6rem;
        height: 160rem;
        display: flex;
        flex-direction: column;
        background-color: white;
        margin-bottom: 10rem;
        border-radius: 5rem;
        &:nth-child(2) {
          margin: 0 5rem;
        }
        p {
          padding-bottom: 5rem;
          &:nth-child(2) {
            margin-left: 8rem;
            line-height: 12rem;
            height: 20rem;
            transform: scale(0.8);
            transform-origin: 10rem 0;
            width: 115%;
            margin-bottom: 10rem;
            margin-top: 10rem;
          }
          &:nth-child(3) {
            margin-left: 5rem;
          }
        }
        div {
          overflow: hidden;
          width: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            margin-bottom: 60rem;
          }
        }
      }
    }
  }
  .all {
    width: 360rem;
    margin: 0 auto;
    margin-top: 20rem;
    h1 {
      font-weight: bold;
      font-size: 14rem;
      margin-bottom: 10rem;
    }
    ul {
      display: flex;
      // justify-content: space-between;
      flex-wrap: wrap;
      li {
        background-color: white;
        width: 175rem;
        margin-bottom: 10rem;
        &:nth-child(2n-1) {
          margin-right: 10rem;
        }
        img {
          width: 150rem;
        }
        .price {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 60rem;
          p {
            margin-left: 10rem;
            &:nth-child(1) {
              line-height: 14rem;
              transform: scale(0.9);
              margin-left: 5rem;
            }
            &:nth-child(3) {
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
