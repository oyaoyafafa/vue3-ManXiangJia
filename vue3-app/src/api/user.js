import axios from 'axios'

//用户详情
const userInfoApi = (id) => axios.get('/api/userorg/app/user/userdetail', {
    params: {
        id,
        osType: 1
    }
})

//用户获赞
const userSupportApi = (id) => axios.get('/api/userorg/app/user/count', {
    params: {
        id,
        osType: 1,
    }
})

//用户喜欢列表等
const userLikeDetailtApi = (id) => axios.get('/api/userorg/app/article/likesupport', {
    params: {
        userId: id,
        pageSize: 10,
        pageNumber: 1,
        osType: 1,
    }
})
export { userInfoApi, userSupportApi, userLikeDetailtApi }