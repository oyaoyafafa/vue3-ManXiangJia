import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getHotSearchText, getSearchRes, getSearchFliterTag } from '@/api/homeSearch'

export const useHomeSearchStore = defineStore('homeSearch', () => {
  // 搜索记录
  let historySearch = ref(JSON.parse(localStorage.getItem('vue3-homesearch')||'[]') || [] )
  function addHistorySearch(text:string) {
    historySearch.value = [...new Set([text,...historySearch.value])].slice(0,12)
    localStorage.setItem(
      "vue3-homesearch",
      JSON.stringify(historySearch.value)
    );
  }
  function deleteHistorySearch() {
    historySearch.value = [];
    localStorage.setItem(
      "vue3-homesearch",
      JSON.stringify(historySearch.value)
    );
  }
  // 热门搜索
  let hotSearchText = ref([])
  function setHotSearchText() {
    getHotSearchText().then((res:any) => {
      hotSearchText.value = res.data.data
    })
  }
  // 最终显示结果 不过滤情况下为搜索结果
  // 最新搜索结果
  const newSearchRes = ref([])
  // 销量搜索结果
  const hotSearchRes = ref([])
  function setSearchRes({
    pageNumber,
    orderType,//1最新 2销量
    title,//关键词
    types,//分类筛选
    ips,//Ip人物筛选
    attributes,//属性筛选
    brands,//拼拍筛选
    minPrice,//最低价筛选
    maxPrice//最高价筛选
  }) {
    return new Promise((resolve, reject) => {
      return getSearchRes({
        pageNumber,
        orderType,//1最新 2销量
        title,//关键词
        types,//分类筛选
        ips,//Ip人物筛选
        attributes,//属性筛选
        brands,//拼拍筛选
        minPrice,//最低价筛选
        maxPrice//最高价筛选
      }).then((res:any) => {
        if (orderType === 1) {
          newSearchRes.value = [...newSearchRes.value, ...res.data.data.list]
          resolve(res)
        } else if (orderType === 2) {
          hotSearchRes.value = [...hotSearchRes.value, ...res.data.data.list]
          resolve(res)
        }
      })
    })
  }

  // 筛选标签
  const SearchFilterTag = ref({})
  // 筛选搜索结果
  // 获取全部筛选标签
  function setSearchFilterTag() {
    getSearchFliterTag().then((res:any) => {
      SearchFilterTag.value = res.data.data
    })
  }

  // 清除搜索结果
  function clearSearchRes(mode:string) {
    if (mode === 'new') {
      newSearchRes.value = []
    } else if (mode === 'hot') {
      hotSearchRes.value = []
    } else {
      newSearchRes.value = []
      hotSearchRes.value = []
    }
  }

  return {
    historySearch,
    addHistorySearch,
    deleteHistorySearch,
    hotSearchText,
    setHotSearchText,
    setSearchRes,
    newSearchRes,
    hotSearchRes,
    clearSearchRes,
    setSearchFilterTag,
    SearchFilterTag,
  }
})
