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
        pageSize: 6,
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

//部落详情
const clubDetailApi = (id) => axios.get('api/userorg/app/tribe/detail', {
    params: {
        id,
        osType: 1
    }
})

//部落详情下方列表
const clubArtcleApi = (id,type) => axios.get('api/userorg/app/tribe/article', {
    params: {
        tribeId:id,
        orderType:type,
        pageSize: 10,
        pageNumber:1,
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


// 情报详情
const informationDetailApi = (id) => axios.get('/api/userorg/app/news/detail/ls', {
    params: {
       id
    }
})


// 商品详情
const communityGoodsDetailApi = (id) => axios.get('/api/userorg/app/article/'+id, {
    params: {
       osType:1
    }
})

//商品评论
const communityGoodsCommentApi = (id) => axios.get('/api/userorg/app/article/comment', {
    params: {
        articleId:id,
        pageNumber:1,
        pageSize:20,
        osType:1
    }
})

//情报文章评论
const communityInfoCommentApi = (id) => axios.get('/api/userorg/app/news/comment', {
    params: {
        newsId:id,
        pageNumber:1,
        pageSize:10,
    }
})



export { followRecommendApi, followListApi, recommendFallApi, clubRecommendApi, clubListApi, informationListApi, informationBannerApi ,communityGoodsDetailApi,communityGoodsCommentApi,clubDetailApi,clubArtcleApi,informationDetailApi,communityInfoCommentApi}