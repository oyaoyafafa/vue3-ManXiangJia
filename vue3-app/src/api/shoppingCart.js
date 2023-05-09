import axios from 'axios'

// 购物车推荐
const shoppingCartRecommendApi = () => axios.post('/api/goodsmanage/app/goods/recommendGood/list/ls', {
    params: {
        pageSize: 20,
        pageNumber: 1,
        osType: 1
    }
})

export { shoppingCartRecommendApi }