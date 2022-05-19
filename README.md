# erabbit-project

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

# 配置@有路径提示

+ 新建`jsconfig.json`文件

  ```json
  {
      "compilerOptions": {
          "baseUrl": ".",
          "paths": {
              "@/*":["./src/*"]
          }
      },
      "exclude": ["node_modules","dist"]
  }
  ```

# 关闭eslint语法检查

+ 在`.eslintrc.js`中注释掉 `'@vue/standard'`

  ```javascript
  module.exports = {
    root: true,
    env: {
      node: true
    },
    extends: [
      'plugin:vue/vue3-essential',
      // '@vue/standard'  关闭语法检查
    ],
    parserOptions: {
      parser: 'babel-eslint'
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
  }
  
  ```

# vue动画

+ 当vue中，显示隐藏，创建移除，一个元素或者一个组件的时候，可以通过transition实现动画。

  ![1616576876892](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1616576876892.c417f529.png)

+ 基本使用

  ```vue
  <transition name="fade">
    <p v-if="show">100</p>
  </transition>
  ```

  ```less
  .fade-leave {
      opacity: 1
  }
  .fade-leave-active {
      transition: all 1s;
  }
  .fade-leave-to {
      opcaity: 0
  }
  ```

- 进入（显示，创建）
  - v-enter 进入前 （vue3.0 v-enter-from）
  - v-enter-active 进入中
  - v-enter-to 进入后
- 离开（隐藏，移除）
  - v-leave 进入前 （vue3.0 v-leave-from）
  - v-leave-active 进入中
  - v-leave-to 进入后

> 多个transition使用不同动画，可以添加nam属性，name属性的值替换v即可。

# 图片懒加载

> **目的：** 当图片进入可视区域内去加载图片，且处理加载失败，封装成指令。

+ 介绍一个webAPI(原生)：[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)

  ```javascript
  // 创建观察对象实例
  const observer = new IntersectionObserver(callback[, options])
  // callback 被观察dom进入可视区离开可视区都会触发
  // - 两个回调参数 entries , observer
  // - entries 被观察的元素信息对象的数组 [{元素信息},{}]，信息中isIntersecting判断进入或离开
  // - observer 就是观察实例
  // options 配置参数
  // - 三个配置属性 root rootMargin threshold
  // - root 基于的滚动容器，默认是document
  // - rootMargin 容器有没有外边距
  // - threshold 交叉的比例
  
  // 实例提供两个方法
  // observe(dom) 观察哪个dom
  // unobserve(dom) 停止观察那个dom
  ```

# 面包屑的高级创建

+ 使用render函数自己进行拼接创建。

  [createElement](https://cn.vuejs.org/v2/guide/render-function.html#createElement-参数) ，[render ](https://cn.vuejs.org/v2/api/#render)`render选项与h函数`

+ 指定组件显示的内容

  + el 选项，通过一个选择器找到容器，容器内容就是组件内容
  + template 选项，`<div>组件内容</div>` 作为组件内容
  + render选项，它是一个函数，函数回默认传人createElement的函数（h），这个函数用来创建结构，再render函数返回渲染为组件内容。它的优先级更高。

+ vue3使用reder创建组件

  ```vue
  <script>
  import { h } from 'vue'
  export default {
    name: "LBread",
    render(){
      /**
       * h()函数的参数
       *   1.标签名称
       *   2.标签属性对象
       *   3.子节点
       */
      // 获取默认插槽内容
      let items = this.$slots.default()
      // 添加子节点
      let dymanicItems = []
      items.forEach((item,i) => {
        dymanicItems.push(item)
        if(i < items.length-1){
          dymanicItems.push(h('i',{ class:'iconfont icon-angle-right1' }))
        }
      })
      return h('div',{ class:'xtx-bread' }, dymanicItems)
    }
  };
  </script>
  ```

# 自动批量注册组件

- 使用 `require` 提供的函数 `context` 加载某一个目录下的所有 `.vue` 后缀的文件。

- 然后`context`函数会返回一个导入函数`importFn`

  - 它又一个属性 `keys()` 获取所有的文件路径

- 通过文件路径数组，通过遍历数组，再使用 `importFn` 根据路径导入组件对象

- 遍历的同时进行全局注册即可

- 落的代码

  ```javascript
  // context(目录路径，是否加载子目录，加载文件的正则匹配)
  const importFn = require.context('./', false, /\.vue$/)
  
  export default{
      install(app){
  
          // 根据keys批量注册
          importFn.keys().forEach(path => {
              // 导入组件
              const component = importFn(path).default
              // 注册组件
              app.component(component.name, component)
          })
      }
  }
  ```

  

