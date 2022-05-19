import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入自己的ui组件库
import MyUI from '@/components/library'

// 重置样式
import 'normalize.css'
// 公共样式
import '@/assets/css/common.less'

createApp(App).use(store).use(router).use(MyUI).mount('#app')
