<template>
  <div class="app-header-sticky" :class="{ show:y>80 }">
    <div class="container" v-if="y>80">
      <RouterLink class="logo" to="/" />
      <HeaderNav />
      <div class="right">
        <RouterLink to="/" >品牌</RouterLink>
        <RouterLink to="/" >专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
// vue
import { ref, onMounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'

import HeaderNav from './headerNavs'
export default {
  name: 'headerStickyNav', //吸顶导航
  components: { HeaderNav },
  setup(props) {

    /**  手动实现
      // 定义一个滚轮高度
      const y = ref(0)

      // dom挂载完成之后
      onMounted(() => {
        // 滚轮触发事件
        window.onscroll = () => {
          const scrollTop = document.documentElement.scrollTop
          y.value = scrollTop
        }
      })
    */

    // 使用@vueuse/core获取滚动的高度
    const { y } = useWindowScroll()

    return {
      y
    }
  }
}
</script>

<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.3s linear;
  &.show {
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/images/logo.png) no-repeat  right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
