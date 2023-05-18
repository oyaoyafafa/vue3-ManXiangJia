<template>
  <div>
    <header>
      <div class="back" @click="back"></div>
      <h1>收货地址</h1>
    </header>
    <main v-show="!Addaddress">
      <div v-if="!addresses?.length" class="no-address">
        <div class="icon"></div>
        <p class="text">暂时还有没有收货地址，快去添加吧</p>
        <div class="add-address" @click="Addaddress = true">去添加</div>
      </div>
      <div v-if="addresses?.length" class="show-address">
        <ul>
          <van-radio-group v-model="checked">
            <li v-for="(address, index) in addresses" :key="index">
              <h3 class="address">
                {{
                  address.province == address.city
                    ? `${address.province}${address.county}`
                    : `${address.province}${address.city}${address.county}`
                }}
              </h3>
              <p class="detail-address">{{ address.addressDetail }}</p>
              <div class="msg">
                <div>收货人：</div>
                <div class="uname">{{ address.name }}</div>
                <div class="phoneNum">{{ address.tel }}</div>
                <div class="delete" @click="userStore.removeAddress(index)"></div>
                <!-- <div class="edit"></div> -->
              </div>
              <div class="set-default">
                <van-radio :name="String(index)">设置为默认地址</van-radio>
              </div>
            </li>
          </van-radio-group>
        </ul>
      </div>
    </main>
    <main v-show="Addaddress">
      <van-address-edit
        ref="edit"
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['', '', '']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </main>
    <footer v-show="!Addaddress">
      <div @click="Addaddress = true">添加新地址</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const showAddress = ref(false)
const Addaddress = ref(false)

import { areaList } from '@vant/area-data'
// 地址vant组件属性
const searchResult = ref([])
const edit = ref(null)
const onDelete = () => {
  back()
}
const onChangeDetail = (val) => {
  if (val) {
    searchResult.value = [
      {
        name: '黄龙万科中心',
        address: '杭州市西湖区'
      }
    ]
  } else {
    searchResult.value = []
  }
}
// back返回
import { useRouter ,useRoute} from 'vue-router'
const $router = useRouter()
const $route = useRoute()

function back() {
  if (Addaddress.value) {
    Addaddress.value = false
  } else {
    if ($route.query.f) {
      $router.replace($route.query.f)
    } else {
      $router.replace('/about')
    }
  }
}

// 地址操作 添加 删除 
// addAddress, removeAddress 
import { toRaw } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.ts'
const userStore = useUserStore()
const { addresses } = storeToRefs(userStore)
const onSave = function (info) {
  userStore.addAddress(info)
  back()
}

// 默认地址索引
const { defaultAddressIndex } = storeToRefs(userStore)
const checked = ref(defaultAddressIndex)
watch(checked, (n) => {
  userStore.updateDefaultAddressIndex(n)
})
</script>

<style lang="less" scoped>
header {
  display: flex;
  position: sticky;
  background-color: #fff;
  top: 0;
  z-index: 2;
  h1 {
    height: 40rem;
    width: 100%;
    text-align: center;
    line-height: 40rem;
    font-size: 15rem;
    font-weight: 900;
  }
  .back {
    position: absolute;
    top: 50%;
    z-index: 3;
    transform: translateY(-50%);
    left: 5rem;
    width: 20rem;
    height: 20rem;
    background: url('@/../public/images/good_back.png') no-repeat;
    background-size: cover;
  }
}
main {
  height: calc(100vh - 100rem);
  overflow: scroll;
  background-color: #f5f6f5;
  .no-address {
    margin-top: 100rem;
    .icon {
      width: 100rem;
      height: 100rem;
      background: url('@/../public/images/list_no_data.png') no-repeat;
      background-size: cover;
      margin: 0 auto;
    }
    .text {
      font-size: 12rem;
      text-align: center;
      color: #9e9d9d;
    }
    .add-address {
      width: 150rem;
      height: 40rem;
      border-radius: 20rem;
      color: #676767;
      font-weight: 900;
      line-height: 40rem;
      text-align: center;
      font-size: 14rem;
      box-sizing: border-box;
      border: 1rem solid #e9e9eb;
      margin: 0 auto;
    }
  }
  .show-address {
    ul {
      margin-top: 10rem;
      li {
        background-color: #fff;
        padding: 10rem;
        margin-bottom: 10rem;
        border-radius: 6rem;
        .address {
          font-size: 15rem;
          font-weight: 600;
        }
        .msg {
          display: flex;
          align-items: center;
          padding-bottom: 5rem;
          border-bottom: 1rem solid #ddd;
          .phoneNum {
            margin-left: 15rem;
            flex: 1;
          }
          .delete {
            width: 16rem;
            height: 16rem;
            background: url('@/../public/images/address_del_icon.png') no-repeat;
            background-size: cover;
            margin-right: 10rem;
          }
          .edit {
            width: 16rem;
            height: 16rem;
            background: url('@/../public/images/address_alter_icon.png') no-repeat;
            background-size: cover;
            margin-right: 10rem;
          }
        }
        .set-default {
          margin-top: 5rem;
        }
      }
    }
  }
}

footer {
  height: 60rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    width: 345rem;
    height: 50rem;
    background-color: #18202d;
    color: #fff;
    border-radius: 3rem;
    font-size: 15rem;
    font-weight: 600;
    text-align: center;
    line-height: 50rem;
  }
}
/deep/.van-button--primary {
  background-color: #7d8187;
  border: 1rem solid #7d8187;
  color: #fff;
}
/deep/.van-switch--on {
  background-color: #7d8187;
}

/deep/.van-radio__icon--checked {
  .van-icon-success {
    background-color: #18202d;
    border: 1rem solid #18202d;
    color: #fff;
  }
}
</style>
