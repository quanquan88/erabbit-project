import { createStore } from 'vuex'

// 导入vux持久化模块
import createPersistedState from 'vuex-persistedstate'

// 导入用户信息模块
import user from './modules/user'
// 导入分类信息模块
import cate from './modules/cate'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cate
  },
  // 配置插件
  plugins: [
    // 默认存储在localStorage
    createPersistedState({
      // 本地存储名字
      key: 'vuex-persisted',
      // 指定需要存储的模块
      paths:['user']
    })]
})
