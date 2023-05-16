<template>
  <div id="homesearch">
    <header>
      <img @click="routerBack" src="@/../public/images/ic_back_goods.png" alt="" />
      <p>{{ $route.query.name }}</p>
      <img src="@/../public/images/search_icon.png" alt="" />
    </header>
    <main>
      <div class="searchRes">
        <section class="togglelist">
          <div @click="showNewRes = true" :class="{ active: showNewRes }">最新</div>
          <div @click="showNewRes = false" :class="{ active: !showNewRes }">销量</div>
        </section>
        <section class="goodsList" ref="goodsList">
          <van-pull-refresh v-show="showNewRes" v-model="refreshingNew" @refresh="onRefresh('new')">
            <van-list
              v-model:loading="loadingNew"
              :finished="finishedNew"
              finished-text="没有更多了"
              @load="onLoad('new')"
            >
              <div class="newlist">
                <div class="new" v-for="goods in newSearchRes" :key="goods.id">
                  <div class="pic">
                    <van-image
                      width="177.5"
                      height="177.5"
                      :src="goods.listedImage"
                      fit="contain"
                    />
                  </div>
                  <p class="brief van-multi-ellipsis--l2">{{ goods.title }}</p>
                  <p class="price">
                    <span class="icon">￥</span>
                    <span>{{
                      (goods.sellNumber && goods.sellPrice.toFixed(1) != 0) || goods.type == 2
                        ? goods.sellPrice
                        : '---'
                    }}</span>
                  </p>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>

          <van-pull-refresh
            v-show="!showNewRes"
            v-model="refreshingHot"
            @refresh="onRefresh('hot')"
          >
            <van-list
              v-model:loading="loadingHot"
              :finished="finishedHot"
              finished-text="没有更多了"
              @load="onLoad('hot')"
            >
              <div class="hotlist">
                <div class="new" v-for="goods in hotSearchRes" :key="goods.id">
                  <div class="pic">
                    <van-image
                      width="177.5"
                      height="177.5"
                      :src="goods.listedImage"
                      fit="contain"
                    />
                  </div>
                  <p class="brief van-multi-ellipsis--l2">{{ goods.title }}</p>
                  <p class="price">
                    <span class="icon">￥</span>
                    <span>{{
                      (goods.sellNumber && goods.sellPrice.toFixed(1) != 0) || goods.type == 2
                        ? goods.sellPrice
                        : '---'
                    }}</span>
                  </p>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
// 搜索文本
const searchText = ref('')
// 筛选搜索的文本
const filterSearchText = ref('')
// 控制是否显示搜索结果
// const showRes = ref(false)

// 清空搜索文本
// function clearSearchText() {
//   searchText.value = ''
// }

// 获取热门搜索
import { useHomeSearchStore } from '@/stores/homeSearch.ts'
import { classifyApi } from '@/api/manxiangjia'
import { storeToRefs } from 'pinia'
const HomeSearchStore = useHomeSearchStore()
HomeSearchStore.setHotSearchText()
const { hotSearchText } = storeToRefs(HomeSearchStore)
// 获取搜索记录
// const { historySearch } = storeToRefs(HomeSearchStore)

// 搜索
import { useRouter } from 'vue-router'
const $router = useRouter()
const { newSearchRes, hotSearchRes } = storeToRefs(HomeSearchStore)

const loadingNew = ref(false)
const finishedNew = ref(false)
const refreshingNew = ref(false)

const loadingHot = ref(false)
const finishedHot = ref(false)
const refreshingHot = ref(false)
// classifyApi($route.query.id).then((res: any) => {
//   // console.log('buy', res.data.data.list)
//   buy.value = res.data.data.list
// })

function routerBack(){
    $router.back()
}

const onLoad = async (mode) => {
  if (mode === 'new') {
    let pageNumber = Math.floor(HomeSearchStore.newSearchRes.length / 20) + 1
    console.log('new触发onload', pageNumber)
    // { orderType, pageNumber, title }
    let p = await HomeSearchStore.setSearchRes({
      orderType: 1,
      pageNumber,
      title: searchText.value
    })
    if (refreshingNew.value) {
      HomeSearchStore.clearSearchRes(mode)
      refreshingNew.value = false
    }
    loadingNew.value = false
    if (!p.data.data.hasNextPage) {
      finishedNew.value = true
    }
  } else if (mode === 'hot') {
    let pageNumber = Math.floor(HomeSearchStore.hotSearchRes.length / 20) + 1
    console.log('hot触发onload', pageNumber)
    // { orderType, pageNumber, title }
    let p = await HomeSearchStore.setSearchRes({
      orderType: 2,
      pageNumber,
      title: searchText.value
    })
    if (refreshingHot.value) {
      HomeSearchStore.clearSearchRes(mode)
      refreshingHot.value = false
    }
    loadingHot.value = false
    if (!p.data.data.hasNextPage) {
      finishedHot.value = true
    }
  }
}
const onRefresh = (mode) => {
  console.log('触发onRefresh')
  // 清空列表数据
  // HomeSearchStore.clearSearchRes(mode)
  if (mode === 'new') {
    finishedNew.value = false
    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loadingNew.value = true
  } else if (mode === 'hot') {
    finishedHot.value = false
    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loadingHot.value = true
  }
  onLoad(mode)
}
// 筛选搜索
const showNewRes = ref(true)
// 保存切换高度
const goodsList = ref(null)
let tabScrollTop = {
  new: 0,
  hot: 0
}
watch(showNewRes, (n, o) => {
  switch (o) {
    case true:
      tabScrollTop.new = goodsList.value.scrollTop
      goodsList.value.scrollTop = tabScrollTop.hot
      break
    case false:
      tabScrollTop.hot = goodsList.value.scrollTop
      goodsList.value.scrollTop = tabScrollTop.new
      break
  }
})
// 弹出窗口与折叠栏参数
const show = ref(false)
function showPopup() {
  show.value = true
}
const activeNames = ref(['1'])
// 获取筛选标签
HomeSearchStore.setSearchFilterTag()
const { SearchFilterTag } = storeToRefs(HomeSearchStore)

const typeId = ref(null)
const brandId = ref(null)
const IPId = ref(null)
const attributeId = ref(null)
const maxPrice = ref('')
const minPrice = ref('')
// 筛选搜索
function toFilter() {
  HomeSearchStore.clearSearchRes()
  HomeSearchStore.setSearchRes({
    title: filterSearchText.value,
    orderType: 1, //1最新 2销量
    types: typeId.value, //分类筛选
    ips: IPId.value, //Ip人物筛选
    attributes: attributeId.value, //属性筛选
    brands: brandId.value, //拼拍筛选
    minPrice: minPrice.value, //最低价筛选
    maxPrice: maxPrice.value //最高价筛选
  })
  HomeSearchStore.setSearchRes({
    title: filterSearchText.value,
    orderType: 2, //1最新 2销量
    types: typeId.value, //分类筛选
    ips: IPId.value, //Ip人物筛选
    attributes: attributeId.value, //属性筛选
    brands: brandId.value, //拼拍筛选
    minPrice: minPrice.value, //最低价筛选
    maxPrice: maxPrice.value //最高价筛选
  })
}
</script>

<style lang="less" scoped>
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
</style>
