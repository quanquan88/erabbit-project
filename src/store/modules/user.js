// 用户模块
export default {
  // 开启命名空间
  namespaced: true,
  state() {
    return {
      // 用户信息
      profile: {}
    }
  },
  mutations:{
    // 修改用户信息
    setUser(state, payload) {
      state.profile = payload
    }
  }
}
