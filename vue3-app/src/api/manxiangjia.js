import axios from 'axios'

// 搜索框下面图片
const bannerApi = () => axios.get('/api/goodsmanage/app/viewpager/list/ls', {
    params: {
        osType: 1
    }
})

// 模玩分类
const moplaySortApi = () => axios.get('/api/goodsmanage/app/indexClassify/ls', {
    params: {
        osType: 1
    }
})

// 模玩全部分类
const moplatAllSortApi = () =>axios.get('/api/goodsmanage/app/classify/ls',{
    params:{
        osType:1
    }
})

// 幸运星
const luckyStarApi = () => axios.post('/api/goodsmanage/applet/lottery/new/nver/getLottery', {
    params: {
        type: 2,
        pageSize: 10,
        pageNumber: 2,
        osType: 1
    }
})
// 预售商品
const goodsPresaleApi = () =>axios.get('/api/goodsmanage/app/presellgoods/select',{
    params:{
        pageSize: 10,
        pageNumber: 1,
        osType: 1
    }
})

//商品推荐
const goodsRecommendApi = () => axios.get('/api/goodsmanage/app/goods/recommend/list/ls', {
    params: {
        osType: 1
    }
})

// 全部商品
const goodsAllApi = () => axios.get('/api/goodsmanage/app/classify/index/classifygoods/ls', {
    params: {
        pageNumber: 1,
        pageSize: 20,
        osType: 1
    }
})

// 商品详情
// CommodityDetails
// http://new.mxjclub.com/goodsmanage/app/goods/3241?osType=1
// userorg/app/article/4175
const commodityDetails = (id) => axios.get('/api/goodsmanage/app/goods/'+ id, {
    params: {
        osType:1,
    }
})

// http://new.mxjclub.com/goodsmanage/app/goods/detailrecommend/ls?id=3241&pageSize=3&pageNumber=1&osType=1
//商品详情-商品推荐
const commodityRecommend = (id) => axios.get('/api/goodsmanage/app/goods/detailrecommend/ls',{
    params: {
        osType:1,
        id:id,
        pageSize:3
    }
})

export { bannerApi, moplaySortApi, goodsRecommendApi, goodsAllApi,luckyStarApi,moplatAllSortApi,goodsPresaleApi,commodityDetails,commodityRecommend }