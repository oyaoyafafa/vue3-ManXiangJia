import axios from 'axios'

// 热门搜素
export const getHotSearchText = () => axios.get('/api/goodsmanage/app/hotWord/ls')

export const getSearchRes = ({
  pageNumber = 1,
  osType = 1,
  pageSize = 20,
  title,
  orderType, //1最新 2销量
  types = null, //分类筛选
  ips = null, //Ip人物筛选
  attributes = null, //属性筛选
  brands = null, //拼拍筛选
  minPrice = null, //最低价筛选
  maxPrice = null //最高价筛选
}) =>
  axios.get('/api/goodsmanage/app/classify/classifygoods/ls', {
    params: {
      pageSize,
      osType,
      pageNumber,
      orderType, //1最新 2销量
      title, //关键词
      types, //分类筛选
      ips, //Ip人物筛选
      attributes, //属性筛选
      brands, //拼拍筛选
      minPrice, //最低价筛选
      maxPrice //最高价筛选
    }
  })

export const getSearchFliterTag = () => axios.get('/api/goodsmanage/app/classify/screen/index/ls')
