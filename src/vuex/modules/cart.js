import {getShopCartNum} from '@/api/cart'
const cart = {
  state: {
    cartNum: 0
  },

  mutations: {
      setCartNum: (state, data) => {
          state.cartNum = data
    }
  },
  actions: {
      async getCartNum({ state, commit }, params) {
          const res = await getShopCartNum({userId:params})
          commit('setCartNum', res.data);
          return res;
      }
  }
}

export default cart
