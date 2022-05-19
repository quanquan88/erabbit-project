import axios from 'axios'

// 引入仓库
import store from '@/store'
// 引入router
import router from '@/router'

// 根地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'

const instance = axios.create({
    // 请求根地址
    baseURL,
    // 请请求超时时间
    timeout:5000
})

// 设置请求拦截器
instance.interceptors.request.use(config => {
    // 获取用户信息
    const { profile } = store.state.user
    // 判断是否有token
    if (profile.token){
        config.headers.Authorization = `Base ${profile.token}`
    }

    return config
},err => {
    return Promise.reject(err)
})

// 设置返回拦截器
instance.interceptors.response.use(res => {
    return res
},err => {
    // 401状态码，进入该函数
    if(err.response && err.response.status === 401){
        // 清空无效用户
        store.commit('user/setUser',{})
        // 跳转到登录页
        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
        // encodeURIComponent 转化url编码，防止解析地址出问题
        // 跳转需要传参(当前路由地址)给登录页
        router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(err)
})

/**
 * url 请求地址
 * method 请求方式
 * data 请求参数
 */
export default (url, method, data) => {
    return instance({
        url,
        method,
        [method.toLocaleLowerCase()==='get'?'params':'data']: data
    })
}