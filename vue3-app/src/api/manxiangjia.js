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


export { bannerApi, moplaySortApi, goodsRecommendApi, goodsAllApi,luckyStarApi,moplatAllSortApi,goodsPresaleApi }