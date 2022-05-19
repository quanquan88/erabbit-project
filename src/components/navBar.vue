<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li><a href="javascript:;"><i class="iconfont icon-icon_user"></i>{{ profile.account }}</a></li>
          <li><a href="javascript:;">退出登录</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-iconphone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    // 获取vuex
    const store = useStore()
    // 获取用户信息 使用计算属性成为响应式数据
    const profile = computed(() => {
      return store.state.user.profile
    })
    return {
      profile
    }
  },
};
</script>

<style lang="less" scoped>
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      // ~ 当前元素后所有的兄弟节点
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>