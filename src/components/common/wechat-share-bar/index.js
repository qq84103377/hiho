import wechatShareBar from './wechat-share-bar.vue'

wechatShareBar.install = function(Vue) {
    Vue.component(wechatShareBar.name, wechatShareBar);
}

export default wechatShareBar
