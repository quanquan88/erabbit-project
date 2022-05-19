<template>
  <div class="top_cate">
    <div class="container">
      <!-- 面包屑 -->
      <l-bread>
        <l-bread-item to="/">首页</l-bread-item>
        <Transition name="fade-right" mode="out-in">
          <l-bread-item :key="topCate.id">{{ topCate.name }}</l-bread-item>
        </Transition>
      </l-bread>
      <!-- 轮播图 -->
      <l-carousel :bannerList="bannerList" autoPlay style="height: 500px" />
      <!-- 全部分类(start) -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCate.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 全部分类(end) -->
      <!-- 各个分类的商品推荐(start) -->
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{item.name}} -</h3>
          <p class="tag">{{item.desc}}</p>
          <l-more :path="`/category/sub/${item.id}`" />
        </div>
        <div class="body">
          <GoodsItem v-for="g in item.goods" :key="g.id" :goods="g" />
        </div>
      </div>
      <!-- 各个分类的商品推荐(end) -->
    </div>
  </div>
</template>

<script>
// api接口
import { findBanner } from "@/api/home";
import { findTopCategory } from '@/api/cate'
// vue
import { ref, computed, watch } from "vue";
// vuex
import { useStore } from "vuex";
// router
import { useRoute } from "vue-router";
// 局部组件
import GoodsItem from "./components/goods-item.vue";
export default {
  name: "topCate",
  components: {
    GoodsItem,
  },
  setup(props) {
    /** 获取轮播图数据 */
    let bannerList = ref([]);
    findBanner().then((res) => {
      bannerList.value = res.data.result;
    });

    /** 渲染面包屑和所有子分类 */
    const store = useStore();
    const route = useRoute();
    const topCate = computed(() => {
      let cate = {};
      const item = store.state.cate.cate.find((item) => {
        return item.id === route.params.id;
      });
      if (item) cate = item;
      return cate;
    });

    /** 获取推荐商品 */
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then(res => {
        subList.value = res.data.result.children
      })
    }
    // 监听商品id的变化
    watch(
      () => route.params.id, 
      (newVal) => {
        // 重新渲染
        // newVal && getSubList()
         if (newVal && `/cate/${newVal}` === route.path) getSubList()
      }, 
      // 先触发一次
      { immediate: true }
    )

    return {
      bannerList,
      topCate,
      subList
    };
  },
};
</script>

<style lang="less" scoped>
.top_cate {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>