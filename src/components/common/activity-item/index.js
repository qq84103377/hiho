import activityItem from './activity-item.vue'

activityItem.install = function(Vue) {
    Vue.component(activityItem.name, activityItem);
}

export default activityItem
