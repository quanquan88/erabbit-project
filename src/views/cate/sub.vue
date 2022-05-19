<template>
  <div class="sub_cate">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="changeFilter" />
      
      <!-- 商品面板(排序+列表) -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="sortChange" />
        <!-- 列表 -->
        <ul>
          <li v-for="item in goodsList" :key="item.id" >
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <!-- 加载组件 -->
        <LInfiniteLoading :loading="loading" :finished="finished"  @infinite="getData" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
// 面包屑组件
import SubBread from "./components/sub-bread.vue";
// 筛选区组件
import SubFilter from "./components/sub-filter"
// 排序组件
import SubSort from './components/sub-sort.vue'
// 列表组件
import GoodsItem from './components/goods-item'
// api接口
import { findSubCategoryGoods } from '@/api/cate'
// 路由
import { useRoute } from 'vue-router'
export default {
  name: "subCate",
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup(){

    /* 获取数据(start) */
    const router = useRoute() // 路由
    let loading = ref(false) // 加载中状态
    let finished = ref(false) // 没有更多状态
    let goodsList = ref([]) // 商品列表
    let params = { // 请求参数
      page: 1,
      pageSize: 20,
      categoryId: router.params.id
    }
    // 获取数据
    const getData = () => {
      // 开启加载
      loading.value = true
      // 请求
      findSubCategoryGoods(params).then(res => {
        let result = res.data.result
        if (result.items.length) {
          goodsList.value.push(...result.items)
          params.page++
        } else {
          // 没有更多
          finished.value = true
        }
      })
      .finally(() => {
        // 关闭加载
        loading.value = false
      })
    }

    // 切换二级分类重新加载
    watch(
      () => router.params.id, 
      (newVal) => {
        if (newVal && router.path === ('/cate/sub/' + newVal)) {
          // 清空商品列表
          goodsList.value = []
          params = {
            page: 1,
            pageSize: 20,
            categoryId: newVal
          }
          // 关闭没有更多状态
          finished.value = false
        }
      }
    )
    /* 获取数据(end) */

    /** 排序(start) */
    // 监听排序改变
    const sortChange = e => {
      console.log(e);
      finished.value = false
      // 合并参数
      params = {...params, ...e}
      params.page = 1
      // 清空商品列表 即可触发加载事件
      goodsList.value = []
    } 
    // 监听筛选区改变
    const changeFilter = (filterParams) => {
      finished.value = false
      // 合并参数
      params = { ...params, ...filterParams }
      params.page = 1
      // 清空商品列表 即可触发加载事件
      goodsList.value = []
    }
    /** 排序(end) */


    return {
      loading,
      finished,
      goodsList,
      getData,
      sortChange,
      changeFilter
    }
  }
};
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>