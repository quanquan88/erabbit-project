<template>
    <!-- 菜单 -->
    <nav-bar />
    <!-- 吸顶导航条 -->
    <HeaderStickyNav />
    <!-- 头部 -->
    <app-header />
    <div class="body">
        <router-view></router-view>
    </div>
    <!-- 底部 -->
    <app-footer />
</template>

<script>
    // 全局组件
    import NavBar from '@/components/navBar'
    import AppHeader from '@/components/app-header'
    import AppFooter from '@/components/app-footer'
    import HeaderStickyNav from '@/components/headerStickyNav'

    // 仓库
    import { useStore } from 'vuex'
    export default {
        components:{
            NavBar,
            AppHeader,
            AppFooter,
            HeaderStickyNav
        },
        setup(){
            const store = useStore()
            // 调用获取分类列表请求
            store.dispatch('cate/getCateList')
        }
    }
</script>

<style lang="less" scoped>
.body{
    min-height: 500px;
}
</style>