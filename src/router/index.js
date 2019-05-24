import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'

// 子路由
// import Mission from './mission'
// import Node from './node'
import Activity from './activity'
import Brand from './brand'
import Cart from './cart'
import Mine from './mine'
import Follow from './follow'
import Order from './order'
import Info from './info'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            // name: 'Home',
            component: Home,
            redirect: '/login',
            // meta: {
            //     belone: 'order'
            // },
            children: [
                ...Activity,
                ...Brand,
                ...Cart,
                ...Mine,
                ...Follow,
                ...Order,
                ...Info,
                {
                    path: '/upgradeVIP',
                    component: (resolve) => {
                        require(['../views/login/upgradeVIP.vue'], resolve);
                    },
                    meta: {
                        belone: 'upgradeVIP',
                        title: '我的VIP',
                        isShowHeader: false,
                        isHideTabbar: true
                    }
                },
            ]
        },
        {
            path: '/login',
            component: (resolve) => {
                require(['../views/login'], resolve);
            }
        },
        {
            path: '/register',
            component: (resolve) => {
                require(['../views/register/register.vue'], resolve);
            }
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
