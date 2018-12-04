# vue前端架构分析demo源码
- 预览地址[:在线预览](http://120.79.172.214/vueshare)
- 为了方便演示,后端采用了springboot+springMvc+mybatis做了一个简单的demo,用来提供数据接口,已部署到阿里云上可以直接调用,写的比较随意代码就不贴出来了;
- 此项目采用技术栈:vue.js+vuex+vue-router+axios+ElementUi;
-  项目运行方式(如果没有安装vue,[需先安装vue环境](https://www.jianshu.com/p/96751fcdaaab))

```
git clone https://github.com/fighhin/vueshare.git

//安装依赖
npm install 

//运行项目
npm run dev 

//打包部署
npm run build 
```


## 技术点介绍

### 1.vue.js
>Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

```
<!--vue 模板语法区,此处相当于html区域,每个template下只能有一个唯一的div与其对应-->
<template>
    <div>
    </div>
</template>
<!--js代码区,用来编写vue生命周期以及vue属性等-->
<script>
    export default {
        name: "example",
        //用于组件间通信
        props:[],
        data(){
            //此处用于定义此组件需要用到的变量等,可以通过this.调用,用于前后端数据交互
            return{
            }
        },
        //方法区,此处可以编写业务逻辑方法
        method:{

        },
        //Dom加载前执行,可以用于数据初始化等操作
       mounted:{

       },
       //VM实例创建前执行,执行时间早于mounted
        created:{

        },
        //计算属性,用于处理一些复杂的逻辑运算并返回,避免在模板内处理太复杂的逻辑
        computed:{

        },
        //监听属性,用于实时监听数据的改变
        watch:{

        }
    }
</script>

<!--
css 区域,此处的css样式只能此页面调用,全局css可写到static文件夹中
-->
<style scoped>

</style>

```

### 2.vue-router Vue路由组件
- vue-router介绍
>Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有：
> - 嵌套的路由/视图表
> - 模块化的、基于组件的路由配置
> - 路由参数、查询、通配符
> - 基于 Vue.js 过渡系统的视图过渡效果
> - 细粒度的导航控制
> - 带有自动激活的 CSS class 的链接
> - HTML5 历史模式或 hash 模式，在 IE9 中自动降级
> - 自定义的滚动条行为
- 安装
 ```
 // 安装组件
npm install vue-router

//在main.js中导入
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用VueRouter实例
Vue.use(VueRouter)

 ```
 
- 使用示例

```
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')

// 现在，应用已经启动了！
```
### 3.vuex Vue状态管理模式

>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。
- 安装

```
npm install vuex

//在main.js中导入
import Vue from 'vue'
import VueX from 'vuex'

//使用VueX
Vue.use(VueX)
```
- 使用示例

```
//定义store示例以及变量count和改变其状态的方式increment
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

// 在需要使用的地方调用
store.commit('increment')

console.log(store.state.count) // -> 1

```

- 什么时候用vuex?
>虽然 Vuex 可以帮助我们管理共享状态，但也附带了更多的概念和框架。这需要对短期和长期效益进行权衡。如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 store 模式就足够您所需了。但是，如果您需要构建一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。引用 Redux 的作者 Dan Abramov 的话说就是：
> >Flux 架构就像眼镜：您自会知道什么时候需要它。

### 4.element-ui 饿了么公司开发的一套开源ui框架

- 安装

```
// 安装包
npm i element-ui -S

// main.js 文件导入

import ElementUI from 'element-ui';
//主题色设置
import 'element-ui/lib/theme-chalk/index.css';

//使用实例
Vue.use(ElementUI);
```
- 更多组件使用方式请参阅[官方文档](http://element-cn.eleme.io/2.3/#/zh-CN/component/installation)



### 5. axios 用于发送ajax请求的工具
>Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

> - 从浏览器中创建 XMLHttpRequests
> - 从 node.js 创建 http 请求
> - 支持 Promise API
> - 拦截请求和响应
> - 转换请求数据和响应数据
> - 取消请求
> - 自动转换 JSON 数据
> - 客户端支持防御 XSRF


- 安装

```
npm install axios

// 在需要用的地方导入
import axios from 'axios';
```
- 使用示例

```
// ajax 方式
axios({
  method: 'post',
  url: '/user/12345',
  params: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

// Promise ApI方式
export function postUrl (url,param) {
    return new Promise((resolve,reject) =>{
        axios.post(url,param).then(response =>{
                resolve(response.data);
            },err =>{
                reject(err);
            }).catch(error => {
                console.log(error);
        })
    })
}
此项目采用Promise ApI方式
```
### 6. 调试工具Vue Devtools
>Vue Devtools是vue官方提供的用于调试vue项目的插件,可以极大的方便我们调试vue项目,详情请看[github地址](https://github.com/vuejs/vue-devtools#vue-devtools),以及[安装教程](https://segmentfault.com/a/1190000009682735)


## 项目结构

```
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- utils.js                     // 构建工具相关
|   |-- vue-loader.conf.js           // webpack loader配置
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置,构建开发本地服务器
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|-- src                              // 源码目录
|   |-- components                   // vue公共组件
|   |-- router                       // vue的路由管理
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- .postcsssrc                       // postcss配置文件
|-- README.md                        // 项目说明
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息,包依赖信息等
```
