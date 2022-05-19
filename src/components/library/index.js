// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件

// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

// context(目录路径，是否加载子目录，加载文件的正则匹配)
const importFn = require.context('./', false, /\.vue$/)
// console.log(importFn.keys());

// 骨架
// import LSkeleton from './l-skeleton.vue'
// // 轮播图
// import LCarousel from './l-carousel.vue'
// // 查看更多
// import LMore from './l-more.vue'
// // 面包屑容器
// import LBread from './l-bread.vue'
// // 面包屑选项
// import LBreadItem from './l-bread-item.vue'

// 加载失败图片
import defaultImg from '@/assets/images/200.png' 

export default{
    install(app){
        // 在app上进行扩展，app提供 component directive 函数
        // 如果要挂载原型 app.config.globalProperties 方式
        // app.component(LSkeleton.name, LSkeleton)
        // app.component(LCarousel.name, LCarousel)
        // app.component(LMore.name, LMore)
        // app.component(LBread.name, LBread)
        // app.component(LBreadItem.name, LBreadItem)

        // 根据keys批量注册
        importFn.keys().forEach(path => {
            // 导入组件
            const component = importFn(path).default
            // 注册组件
            app.component(component.name, component)
        })

        // 定义指令
        defineDirective(app)
    }
}

const defineDirective = (app) => {
    // 图片懒加载指令
    app.directive('lazy', {
        // vue2.0监听使用指令的DOM是否创建好，钩子函数:inserted
        // vue3.0 的指令拥有的钩子函数和组件的一样，使用指令的DOM是否创建好，钩子函数: mounted
        mounted(el, binding) {
            // 创建一个观察者对象，用来观察当前元素
            let observe = new IntersectionObserver(([{ isIntersecting }]) => {
                // 检查到元素
                if (isIntersecting){
                    // 停止观察
                    observe.unobserve(el)
                    // 图片加载失败
                    el.onerror = () => {
                        el.src = defaultImg
                    }
                    // 将指令的值设置给当前元素的src值
                    el.src = binding.value
                }
            },{
                threshold: 0, //元素占视口的比例
            })

            // 对dom进行观察
            observe.observe(el)
        },
    })
}
