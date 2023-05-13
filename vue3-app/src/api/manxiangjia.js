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

// 最近购买
// order/app/userorder/lately/ls  
const recentlyBuy = (id) => axios.get('/api/order/app/userorder/lately/ls',{
    params: {
        osType:1,
        id:id,
        pageSize:5
    }
})

// 动态
// userorg/app/article/good/articlelist
const dynamicApi = (id) => axios.get('/api/userorg/app/article/good/articlelist',{
    params: {
        osType:1,
        goodId:id,
        pageSize:5,
        pageNumber:1
    }
})

// 评论
// goodsmanage/app/goods/comment/list/ls
const commentApi = (id) => axios.get('/api/goodsmanage/app/goods/comment/list/ls',{
    params: {
        goodId:id,
    }
})

export { bannerApi, moplaySortApi, goodsRecommendApi, goodsAllApi,luckyStarApi,moplatAllSortApi,goodsPresaleApi,commodityDetails,commodityRecommend,recentlyBuy,dynamicApi,commentApi }