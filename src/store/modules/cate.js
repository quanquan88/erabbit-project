// 导入全局常量
import { cateList } from '@/api/constants.js'
// 导入请求
import { cateApi } from '@/api/cate'

// 分类模块
export default {
    // 开启命名空间
    namespaced: true,
      state() {
        return {
          // 分类列表
          cate: cateList.map(v => ({ name: v }))
        }
    },
    mutations: {
        // 修改分类列表
        setCate(state, payload) {
          state.cate = payload
        },
        // 修改当前一级分类下的open数据为true
        show(state, item) {
            const category = state.cate.find(cate => cate.id === item.id)
            category.open = true
        },
        // 修改当前一级分类下的open数据为false
        hide(state, item) {
          const category = state.cate.find(cate => cate.id === item.id)
          category.open = false
        }

    },
    actions:{
        getCateList({ commit }){
          // 请求
          cateApi().then(res => {
            let { code,result } = res.data
            if (code == 1) {
              // 给每个分类加上开关标识
              result.map(v => {
                v.open = false
              })
              // 修改分类列表的值
              commit('setCate', result)
            }
          })
        }
    }
}