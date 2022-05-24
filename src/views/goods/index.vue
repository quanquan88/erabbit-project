<!--
 * @Author: quan
 * @Date: 2022-05-19 22:31:39
 * @LastEditors: quan
 * @LastEditTime: 2022-05-19 22:59:14
 * @Description: file content
-->
<template>
  <div class='xtx-goods-page'>
    <div class="container">
      <!-- 面包屑 -->
      <LBread>
        <LBreadItem to="/">首页</LBreadItem>
        <LBreadItem to="/">手机</LBreadItem>
        <LBreadItem to="/">华为</LBreadItem>
        <LBreadItem to="/">p30</LBreadItem>
      </LBread>

      <!-- 商品信息 -->
      <div class="goods-info"></div>
      <!-- 商品推荐(start) -->
      <GoodsRelevant />
      <!-- 商品详情(end) -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
// 局部组件
import GoodsRelevant from './components/goods-relevant'
// api接口
import { findGoods } from '@/api/product'
// 路由
import { useRoute } from 'vue-router'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant },
  setup(){
    const route = useRoute()
    /** 获取商品详情(start) */
    let goods = ref(null)
    findGoods(route.params.id).then(res => {
      console.log(res);
      goods.value = res.data.result
    })
    /** 获取商品详情(end) */

    return {
      goods
    }
  },
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
