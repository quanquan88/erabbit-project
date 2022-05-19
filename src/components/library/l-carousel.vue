<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <li 
        class="carousel-item" 
        :class="{ fade:index===i }" 
        v-for="(item,i) in bannerList"
        :key="i"
      >
        <RouterLink to="/">
          <img
            :src="item.imgUrl"
            alt=""
          />
        </RouterLink>
      </li>
    </ul>
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a @click="toggle(1)" href="javascript:;" class="carousel-btn next"
      ><i class="iconfont icon-angle-right1"></i
    ></a>
    <div class="carousel-indicator">
      <span @click="index=i" v-for="(item,i) in bannerList" :key="i" :class="{ active:index===i }"></span>
    </div>
  </div>
</template>

<script>
import { ref, watch, onUnmounted } from 'vue'
export default {
  name: "LCarousel",
  props:{
    bannerList:{
      type:Array,
      default:() => []
    },
    // 自动轮播间隔时间
    duration: {
      type: Number,
      default: 3000
    },
    // 是否自动轮播
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    // 当前展示的轮播项
    let index = ref(0)

    /** 自动轮播的逻辑 */
    let timer = null
    // 自动轮播
    const autoPlayFn = () => {
      // 防止定时器重复添加
      clearInterval(timer)
      timer = setInterval(() => {
        index.value++
        // 到最后一张自动回到第一张
        if(index.value >= props.bannerList.length){
          index.value = 0
        }
      },props.duration)
    }
    // 监听bannerList有数据时，且autoPlay为true
    watch(
      () => props.bannerList,
      (newVal,oldVal) => {
        if(newVal.length && props.autoPlay){
          // 调用自动轮播
          autoPlayFn()
        }
      },
      {
        immediate: true, //立即执行一次
      }
    )
    // 鼠标移入移除/暂停关闭
    const stop = () => {
      if(timer) clearInterval(timer)
    }
    const start = () => {
      if(props.bannerList.length && props.autoPlay){
        // 调用自动轮播
        autoPlayFn()

      }
    }
    // 点击上/下一张
    const toggle = (step) => {
      // 选中的轮播项
      const newIndex = index.value + step
      // 大于最后一项 回到第一项
      if (newIndex >= props.bannerList.length) {
        index.value = 0
        return
      }
      // 小于第一项 回到最后一项
      if (newIndex < 0) {
        index.value = props.bannerList.length - 1
        return
      }
      index.value = newIndex
    }
    // 组件删除，清除定时器
    onUnmounted(() => {
      // 清除定时器
      stop()
    })

    return {
      index,
      stop,
      start,
      toggle
    }
  }
};
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
