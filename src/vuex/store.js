import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'
import order from './modules/order'
import sales from './modules/sales'
import getters from './getters'
import cart from './modules/cart'
import message from './modules/message'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        order,
        sales,
        cart,
        message
    },
    getters
})

export default store
