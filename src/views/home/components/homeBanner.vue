<template>
    <div class="home-banner">
        <l-carousel :bannerList="bannerList" autoPlay />
    </div>
</template>

<script>
    import { ref, reactive, toRefs } from 'vue'
    // 接口
    import { findBanner } from '@/api/home'
    export default {
        name:'homeBanner',
        setup() {
          /** 获取轮播图数据 */
          let data = reactive({
            bannerList:[]
          })
          let obj = reactive([])
          findBanner().then(res => {
            let { code,result } = res.data
            if(code==1){
              data.bannerList = result
            }
          })

          // console.log(bannerList);

          return {
            ...toRefs(data)
          }
        }
    }
</script>

<style lang="less" scoped>
.home-banner {
  width: 100%;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}
// 覆盖样式
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>