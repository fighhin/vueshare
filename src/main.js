import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import  store from './store'

Vue.use(ElementUI, { size: 'small' });
// Vue.prototype.$axios = axios;




new Vue({
    router,
    render: h => h(App),
    store
}).$mount('#app');

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    let user = sessionStorage.getItem('username');
    //跳转到登陆界面直接放行
    if (to.path == "/login"){
        next();
    }
    //只有fighhin用户才能查看这个页面
    if (to.path == "/bookManage"&& user!= "fighhin"){
        next("/403");
    }
    next();
})
