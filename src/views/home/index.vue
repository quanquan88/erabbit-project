<template>
    <div class="home-entry">
        <div class="container">
            <!-- 左侧分类 -->
            <HomeCategory />
            <!-- 轮播图 -->
            <HomeBanner />
        </div>
    </div>

    <!-- 新鲜好物 -->
    <HomeNew />
    <!-- 人气推荐 -->
    <HomeHot />
    <!-- 热门品牌 -->
    <HomeBrand />
    <!-- 商品区域 -->
    <HomeProduct />
    <!-- 最新专题 -->
    <HomeSpecial />
</template>

<script>
// 局部组件
import HomeCategory from './components/homeCate'
import HomeBanner from './components/homeBanner'
import HomeNew from './components/homeNew'
import HomeHot from './components/homeHot'
import HomeBrand from './components/homeBrand'
import HomeProduct from './components/homeProduct'
import HomeSpecial from './components/homeSpecial'
export default {
    name:'home',
    components:{
        HomeCategory,
        HomeBanner,
        HomeNew,
        HomeHot,
        HomeBrand,
        HomeProduct,
        HomeSpecial
    },
    setup () {
        
    
        return {}
    }
}
</script>

<style lang="less" scoped>

</style>