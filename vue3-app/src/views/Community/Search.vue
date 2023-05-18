<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { communitySearchResApi } from '@/api/search'
import CommunitySearchRes from '@/components/Community/CommunitySearchRes.vue'

const $router = useRouter()
const value = ref('')
const loading = ref(true)
const seachResList = ref([])
const seachHistoryList = ref(JSON.parse(localStorage.getItem('seachHistoryList')||'[]') || [])

watch(
  () => seachHistoryList.value,
  (newV) => {
    console.log(newV)
    localStorage.setItem('seachHistoryList', JSON.stringify(newV))
  }
)

const onSearch = (val: any) => {
  // console.log(val)
  communitySearchResApi(val)
    .then((res: any) => {
      seachResList.value = res.data.data.list
    })
    .finally(() => {
      loading.value = false
    })
  if (seachHistoryList.value.every((o:any) => o.msg !== val)) {
    seachHistoryList.value =  [{ id: Date.now(), msg: val },...seachHistoryList.value,]
  }
}

const onHisSearch =(a:any)=>{
  onSearch(a)
}

const clearHis = ()=>{
  seachHistoryList.value = []
}

const onCancel = () => {
  if (seachResList.value.length||!loading.value) {
    seachResList.value = []
    loading.value = true
  } else {
    $router.back()
  }
}


</script>

<template>
  <div class="information">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        autofocus
      />
    </form>
    <!-- <van-loading vertical v-show="!loading ">
      <template #icon>
        <van-icon name="star-o" size="30" />
      </template>
    </van-loading> -->
    <div class="search_res">
      <ul>
        <CommunitySearchRes v-for="seachResItem in seachResList" :seachResItem="seachResItem" />
      </ul>
    </div>

    <div class="search_history" v-show="loading">
      <h3>
        <span>历史搜索</span>
        <i @click="clearHis">
          <svg
            t="1683855481940"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1506"
            width="20rem"
            height="20rem"
          >
            <path
              d="M847.743 223.953H640.639c-3.132-68.921-60.177-124.029-129.858-124.029s-126.726 55.108-129.858 124.029H173.256c-17.673 0-32 14.327-32 32s14.327 32 32 32h674.487c17.673 0 32-14.327 32-32s-14.327-32-32-32z m-336.962-60.03c34.379 0 62.689 26.426 65.718 60.029H445.064c3.029-33.603 31.338-60.029 65.717-60.029zM767.743 351.79c-17.673 0-32 14.327-32 32v478.173H288.256V383.79c0-17.673-14.327-32-32-32s-32 14.327-32 32v510.173c0 17.673 14.327 32 32 32h511.487c17.673 0 32-14.327 32-32V383.79c0-17.673-14.327-32-32-32z"
              fill="#515151"
              p-id="1507"
            ></path>
            <path
              d="M449.306 732.802V448.208c0-17.673-14.327-32-32-32s-32 14.327-32 32v284.593c0 17.673 14.327 32 32 32s32-14.326 32-31.999zM640.84 732.802V448.208c0-17.673-14.327-32-32-32s-32 14.327-32 32v284.593c0 17.673 14.327 32 32 32s32-14.326 32-31.999z"
              fill="#515151"
              p-id="1508"
            ></path>
          </svg>
        </i>
      </h3>
      <ul>
        <li v-for="seachHistoryItem in seachHistoryList" @click="onHisSearch(seachHistoryItem.msg)">
          {{ seachHistoryItem.msg }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.search_history {
  padding: 10rem;
  h3 {
    display: flex;
    align-items: center;
    span {
      flex: 1;
      font-size: 14rem;
      font-weight: bold;
    }
  }
  ul {
    display: flex;
    align-items: center;
    padding-top: 10rem;
    li {
      min-width: 40rem;
      text-align: center;
      margin-right: 5rem;
      padding: 2rem 5rem;
      color: #7a7a7a;
      border-radius: 50rem;
      border: 1px solid #d4d4d4;
    }
  }
}
</style>
