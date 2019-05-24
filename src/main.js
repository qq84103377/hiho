import Vue from 'vue'
import router from './router'
import store from './vuex/store'
import App from './App'
import components from './components/common'
import Navigation from 'vue-navigation'
import {getShopCartNum} from '@/api/cart'
import {Icon, ToastPlugin, AlertPlugin, ConfirmPlugin, dateFormat, DatetimePlugin, XButton, Tab, TabItem, Previewer,
    Countdown,Checker, CheckerItem,XDialog,XInput,Group,XTextarea,Swiper,SwiperItem,Cell,Sticky,Flexbox,
    FlexboxItem,Popup,CheckIcon,XImg,Clocker,Checklist,Toast,Actionsheet,Divider, Loading,Confirm,LoadingPlugin,Datetime,Qrcode,Badge } from 'vux'
import VueScroller from 'vue-scroller'
// common自定义指令
import * as directive from './directives/';
Object.keys(directive).forEach(k => Vue.directive(k, directive[k]));
Vue.use(Navigation, {router})
Vue.use(VueScroller)
Vue.config.productionTip = false
Vue.filter('dateFilter', function (value) {
    if (!value) return '未设置';
    // const date = new Date(value.replace(/\-/g, '/'));
    const newDate = dateFormat(value, 'YYYY/MM/DD');
    return newDate;
});
store.registerModule('vuxLoading', { // 名字自己定义
    state: {
        isLoading: false
    },
    mutations: {
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading
        }
    }
});

//获取购物车角标
// Vue.prototype.$getCartNum = (id) => {
//     getShopCartNum({userId:id}).then(res => {
//         if(res.code==0){
//             store.commit('setCartNum',res.data)
//         }
//     })
// }

router.beforeEach(function (to, from, next) {
    // store.commit('updateLoadingStatus', {isLoading: true});
    // 如果是登录页，先看看本地是否有localStorage，有的话直接调整，没有则进行登录动作
    const userInfo =JSON.parse(localStorage.getItem('userInfo'))
    if(to.path === '/login'){
        if(userInfo){
            if(userInfo.vipLevelId&&userInfo.vipLevelId!== '游客'){
                store.commit('setUserInfo',userInfo)
                next({
                    path: '/activity'
                });
            } else{
                next()
            }

        } else {
            next()
        }
    }
    // 不是登录页，则进行正常跳转
    else {
        if((!userInfo || (userInfo.vipLevelId&&userInfo.vipLevelId=== '游客'))&&to.path !== '/upgradeVIP'){
            next({
                path: '/login'
            })
        } else {
            store.commit('setUserInfo',userInfo)
            next()
        }

    }
})

router.afterEach(function (to) {
    store.commit('updateLoadingStatus', {isLoading: false})
});
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(components);
Vue.use(DatetimePlugin);
Vue.use(LoadingPlugin);
Vue.component('x-button', XButton)
Vue.component('tab', Tab);
Vue.component('tab-item', TabItem);
Vue.component('previewer', Previewer);
Vue.component('countdown', Countdown);
Vue.component('checker', Checker);
Vue.component('checker-item', CheckerItem);
Vue.component('x-dialog', XDialog);
Vue.component('x-input', XInput)
Vue.component('group', Group)
Vue.component('x-textarea', XTextarea);
Vue.component('swiper', Swiper);
Vue.component('swiper-item', SwiperItem);
Vue.component('cell', Cell);
Vue.component('sticky', Sticky)
// Vue.component('scroller', Scroller)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('popup', Popup)
Vue.component('check-icon', CheckIcon)
Vue.component('x-img', XImg);
Vue.component('clocker', Clocker);
Vue.component('checklist', Checklist);
Vue.component('toast', Toast)
Vue.component('actionsheet', Actionsheet)
Vue.component('loading', Loading)
Vue.component('divider', Divider)
Vue.component('confirm', Confirm)
Vue.component('datetime', Datetime)
Vue.component('qrcode', Qrcode)
Vue.component('badge', Badge)
Vue.component('icon', Icon)
// 加载不成功的时候显示默认图片
// XImg.props.defaultSrc.default = require('./assets/icon/commom_pic-placeholder@3x.png')
// XImg.props.container = 'vux-swiper-item'
// XImg.props.offset = -100
console.log(XImg.props.offset)
console.log(XImg.props)
Vue.prototype.$getUserInfo = () => {
    return store.getters.getUserInfo
}
Vue.prototype.$isPermissionAllow = (type, isToast = true) => {
    let permissionList = store.getters.getUserInfo.permissionList;
    if (permissionList.includes(type)) {
        return true
    } else {
        if (isToast) {
            Vue.$vux.toast.show({
                text: '抱歉，您没有操作权限！',
                type: 'cancel',
                width: '10em'
            });
            console.log(Vue.$vux);
        } else {
            return false
        }

    }
}
/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app-box')
