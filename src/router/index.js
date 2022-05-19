import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/Layout'),
    // 二级路由
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/cate/:id',
        name: 'topCate',
        component: () => import('@/views/cate')
      },
      {
        path: '/cate/sub/:id',
        name: 'subCate',
        component: () => import('@/views/cate/sub')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次路由切换时滚动到页面顶部
  // scrollBehavior(){
  //   return { x: 0, y: 0 }
  // }
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

export default router
