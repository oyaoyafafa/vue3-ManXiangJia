import axios from 'axios'

// 积分兑换列表
const pointListApi = () => axios.post('/api/userorg/app/exchangegoods/applet/nver/list', {
    params: { "pageSize": 10, "pageNumber": 1, "osType": 1 }
})

export { pointListApi }