import brandItem from './brand-item.vue'

brandItem.install = function(Vue) {
    Vue.component(brandItem.name, brandItem);
}

export default brandItem
