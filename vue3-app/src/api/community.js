import axios from 'axios'
// 关注中没有关注的人,就可以调用推荐关注
const followRecommendApi = () => axios.get('/api/userorg/app/focus', {
    params: {
        osType: 1
    }
})

// 关注后的推荐列表
const followListApi = () => axios.get('/api/userorg/app/article/attentionlist', {
    params: {
        pageNumber: 1,
        pageSize: 10,
        osType: 1
    }
})

// 推荐的瀑布流
const recommendFallApi = () => axios.get('/api/userorg/app/article/randlist', {
    params: {
        osType: 1
    }
})


//部落上部分的列表推荐
const clubRecommendApi = () => axios.get('/api/userorg/app/tribe/recommend/ls', {
    params: {
        pageNumber: 1,
        pageSize: 10,
        osType: 1
    }
})


//部落下部分的列表
const clubListApi = () => axios.get('/api/userorg/app/tribe/ls', {
    params: {
        pageNumber: 1,
        pageSize: 10,
        osType: 1
    }
})


// 情报下部分的列表
const informationListApi = () => axios.get('/api/userorg/app/news/ls', {
    params: {
        pageSize: 10,
        pageNumber: 1
    }
})


// 情报上部分的列表
const informationBannerApi = () => axios.get('/api/userorg/app/news/recommend/ls', {
    params: {
        pageSize: 10,
        pageNumber: 1
    }
})





export { followRecommendApi, followListApi, recommendFallApi, clubRecommendApi, clubListApi, informationListApi, informationBannerApi }