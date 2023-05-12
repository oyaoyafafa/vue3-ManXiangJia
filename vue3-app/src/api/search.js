import axios from 'axios'

// 热门搜索列表
const hotSearchApi = () => axios.get('/api/goodsmanage/app/hotWord/ls', {
    params: {
        osType: 1
    }
})
//销量结果/最新
const searchResApi = () => axios.get('/api/goodsmanage/app/classify/classifygoods/ls', {
    params: {
        pageNumber: 1,
        pageSize: 20,
        orderType: 2, //1是最新,2是销量
        title: "蕾姆",//搜索关键词
        types: 12, //分类
        brands: 82, //品牌
        attributes: 4, //属性
        minPrice:0, //最低价
        maxPrice: 300.0 ,//最高价
        osType: 1,
    }
})
//筛选列表
const filterListApi = () => axios.get('/api/goodsmanage/app/classify/screen/index/ls', {
    params: {
        osType: 1
    }
})
// 社区搜索列表
const communitySearchResApi = (val) => axios.get('/api/userorg/app/user/likeuserdetail',{
    params:{
        homesickId:val,//输入的关键词,
        pageSize:20,
        pageNumber:1,
        osType:1
    }
})




export { hotSearchApi, searchResApi, filterListApi, communitySearchResApi }