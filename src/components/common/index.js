import activityItem from './activity-item'
import countTime from './activity-item/count-time.vue'
import addShopcar from './activity-item/add-shopcar'
import brandItem from './brand-item'
import wechatShareBar from './wechat-share-bar'

const components = [
    activityItem,
    countTime,
    addShopcar,
    brandItem,
    wechatShareBar
]

const install = function(Vue, opts = {}) {
    /* istanbul ignore if */
    if (install.installed) return;
    components.map(component => {
        console.log(component)
        Vue.component(component.name, component);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};

export default {
    install,
}
