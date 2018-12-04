import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/userManage',
                    component: resolve => require(['../components/module/User'], resolve),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/bookManage',
                    component: resolve => require(['../components/module/Book'], resolve),
                    meta: { title: '书籍管理' }
                },
                {
                    path: '/bookContent',
                    component: resolve => require(['../components/module/BookContent'], resolve),
                    meta: { title: '书籍详情' }
                },

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/module/Login.vue'], resolve)
        },

        {
            path: '/404',
            component: resolve => require(['../components/module/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/module/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
