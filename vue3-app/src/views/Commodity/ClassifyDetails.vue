<template>
  <div id="homesearch">
    <header>
      <img @click="routerBack" src="@/../public/images/ic_back_goods.png" alt="" />
      <p>{{ $route.query.name }}</p>
      <img @click="toHomesearch" src="@/../public/images/search_icon.png" alt="" />
    </header>
    <main>
      <div class="title">
        <div :class="{}">最新</div>
        <div>销量</div>
      </div>
    </main>
    <footer>
      <div @click="toOrder(goods.id)" class="goods" v-for="goods in classify">
        <div>
          <img :src="goods.listedImage" alt="" />
        </div>
        <div>
          <p>{{ goods.title }}</p>
          <h1>￥{{ goods.sellPrice }}</h1>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { classifyApi } from '@/api/manxiangjia'
import { ref, reactive } from 'vue'
const $route = useRoute()
const $router = useRouter()

const isShow = ref(false)

function routerBack() {
  $router.back()
}
const classify = ref<any>([])
classifyApi($route.query.id, $route.query.name, $route.query.orderType).then((res: any) => {
  console.log(res.data.data.list)
  classify.value = res.data.data.list
})

function toOrder(id: any) {
  // console.log("id",id)
  $router.push({
    path: '/order',
    query: {
      id: id
    }
  })
}

function toHomesearch() {
  $router.push({
    path: '/homesearch'
  })
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5rem;
  p {
    font-size: 16rem;
  }
  img {
    &:nth-child(1) {
      width: 30rem;
    }
    &:nth-child(3) {
      width: 20rem;
    }
  }
}
main {
  .title {
    display: flex;
    font-size: 14rem;
    justify-content: space-around;
    div {
      padding: 6rem 0;
      border-bottom: 4rem solid #18202d;
    }
  }
}
footer {
  margin-top: 15rem;
  display: flex;
  flex-wrap: wrap;
  .goods {
    width: 187rem;
    div {
      &:nth-child(1) {
        width: 100%;
        border: 1rem solid #f6f6f8;
        height: 187rem;
        img {
          // width: 120rem;
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      &:nth-child(2) {
        width: 100%;
        height: 70rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        line-height: 14rem;
        P {
          padding-right: 10rem;
          padding-top: 10rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; // 控制多行的行数
          -webkit-box-orient: vertical;
        }
        h1 {
          font-size: 14rem;
          font-weight: bold;
          padding-bottom: 8rem;
        }
      }
    }
  }
  // div {
  //   width: 186rem;
  //   &:nth-child(2n-1){
  //     margin-right: 3rem;
  //   }
  //   img {
  //     width: auto;
  //     height: auto;
  //     max-width: 100%;
  //     max-height: 100%;
  //     position: relative;
  //     top: 50%;
  //     left: 50%;
  //     transform: translate(-50%, -50%);
  //   }
  // }
}
</style>

<!-- <style lang="less" scoped>
#homesearch {
  header {
    display: flex;
    align-items: center;
    position: sticky;
    background-color: #fff;
    top: 0;
    z-index: 1;
    .searchInput {
      width: 320rem;
      height: 60rem;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 95%;
        height: 30rem;
        border-radius: 15rem;
        background-color: #ebecec;
        display: flex;
        align-items: center;
        position: relative;
        .searchIcon {
          height: 13rem;
          width: 13rem;
          margin: 0 8rem;
          background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==');
        }
        input {
          position: sticky;
          flex: 1;
          display: inline-block;
          height: 100%;
          border: none;
          background-color: transparent;
          outline: none;
          padding-right: 21rem;
          line-height: 18rem;
          color: #333;
        }
        .cancel-Search {
          position: absolute;
          right: 8rem;
          top: 8.5rem;
          height: 13rem;
          width: 13rem;
          background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==');
        }
      }
    }
    .back {
      width: 55rem;
      text-align: center;
      color: #777;
      font-size: 14rem;
    }
  }
  main {
    padding: 10rem;
    padding-top: 0rem;

    .hotSearchs,
    .SearchHistory {
      h3 {
        color: #333;
        font-weight: 600;
      }
      ul {
        margin-top: 10rem;
        display: flex;
        flex-wrap: wrap;
        li {
          font-size: 12rem;
          box-sizing: border-box;
          border: 1rem solid #ddd;
          border-radius: 15.5rem;
          padding: 5rem 8rem;
          margin-right: 5rem;
          margin-bottom: 5rem;
        }
      }
    }
    .searchRes {
      .togglelist {
        display: flex;
        justify-content: space-around;
        position: sticky;
        top: 60rem;
        background-color: #fff;
        z-index: 1;
        > div {
          font-size: 15rem;
          height: 30rem;
          text-align: center;
          display: flex;
          align-items: center;
          &.active {
            border-bottom: 3rem solid #333;
            font-weight: 600;
          }
          .icon {
            width: 15rem;
            height: 15rem;
            background: url('@/../public/images/up_down.png') no-repeat;
            background-size: cover;
          }
        }
      }
      .goodsList {
        height: calc(100vh - 60rem - 40rem);
        overflow: scroll;
        // &::-webkit-scrollbar{
        //   display: none;
        // }
        .newlist,
        .hotlist {
          display: flex;
          flex-wrap: wrap;
          .new {
            width: 50%;
            box-sizing: border-box;
            border-bottom: 1rem solid rgb(235, 233, 233);
            overflow: hidden;
            .pic {
              box-sizing: border-box;
              border-bottom: 1rem solid #f5f6f5;
              width: 177.5rem;
              height: 177.5rem;
              overflow: hidden;
            }
            .brief {
              height: 48.375rem;
              padding: 10rem;
              padding-bottom: 0;
              font-size: 12rem;
            }
            .price {
              padding-left: 10rem;
              span {
                font-size: 15rem;
                font-weight: 600;
                margin-left: -4rem;
                &.icon {
                  display: inline-block;
                  transform-origin: left center;
                  transform: scale(0.8);
                  margin: 0;
                }
              }
            }
            &:nth-child(2n-1) {
              border-right: 1rem solid rgb(235, 233, 233);
            }
          }
        }
      }
    }
  }
}

/deep/.filter {
  .van-popup {
    padding: 10rem;

    .van-collapse {
      position: relative;
    }
  }
  .van-cell {
    padding: 0;
  }

  .van-cell--clickable {
    .van-badge__wrapper {
      display: none;
    }
  }
  .van-collapse-item {
    .van-badge__wrapper {
      display: block;
      margin: 0;
      &::after {
        border-bottom: none;
      }
    }

    .van-cell__title {
      text-align: left;
      display: flex;
      span {
        display: block;
        width: 100%;
      }
      &::after {
        display: inline-block;
        width: 32rem;
        text-align: right;
        content: '全部';
      }
    }
  }
  .van-collapse-item--border {
    border-top: none;
  }
  .van-collapse-item__content {
    padding: 0;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        background-color: #ebebeb;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        margin-bottom: 5rem;
        width: 90rem;
        border-radius: 3rem;
        &:nth-child(3n + 2) {
          margin: 0 5rem 5rem 5rem;
        }
        &.active {
          background-color: #333333;
          color: #fff;
        }
      }
    }
  }
}

.button {
  display: flex;
  position: fixed;
  right: -300rem;
  bottom: 0;
  width: 300rem;
  z-index: 2002;
  transition: all 0.5s ease;
  > div {
    background-color: #fff;
    height: 40rem;
    line-height: 40rem;
    text-align: center;
    font-size: 15rem;
    flex: 0.5;
    color: #c4c4c4;
    &:last-child {
      color: #fff;
      background-image: linear-gradient(to bottom right, #6ee5e0, #7543ff);
    }
  }
  &.active {
    right: 0;
  }
}
.fliter-price {
  h3 {
    text-align: left;
    font-size: 14rem;
  }
  .priceInput {
    display: flex;
    input {
      background-color: #ebebeb;
      width: 128rem;
      text-align: center;
    }
    span {
      display: inline-block;
      font-size: 14rem;
      padding: 0 5rem;
    }
  }
  .priceList {
    margin-top: 10rem;
    display: flex;
    flex-wrap: wrap;
    li {
      background-color: #ebebeb;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: normal;
      margin-bottom: 5rem;
      width: 90rem;
      border-radius: 3rem;
      &:nth-child(3n + 2) {
        margin: 0 5rem 5rem 5rem;
      }
    }
  }
}
</style> -->
