<template>
  <ul class="navs">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <!-- 循环的导航栏 -->
    <li v-for="(item,index) in list" :key="index" @mousemove="show(item)" @mouseleave="hide(item)">
      <router-link @click="hide(item)" :to="`/cate/${item.id}`">{{ item.name }}</router-link>
      <div class="layer" :class="{ open:item.open }">
        <ul>
          <li v-for="e in item.children" :key="e.id">
            <router-link @click="hide(item)" :to="`/cate/sub/${e.id}`">
              <img
                :src="e.picture"
                :alt="e.name"
              />
              <p>{{ e.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()

    // 得到分类列表
    const list = computed(() => {
      return store.state.cate.cate
    })
    // console.log(list);

    const show = (item) => {
      store.commit('cate/show', item)
    }
    const hide = (item) => {
      store.commit('cate/hide', item)
    }

    return {
      list,
      show,
      hide
    }
  }
};
</script>

<style lang="less" scoped>
.navs {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
    }
  }
}

// 二级导航
.layer {
  &.open{
    height: 132px;
    opacity: 1;
  }
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  z-index: 999;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>