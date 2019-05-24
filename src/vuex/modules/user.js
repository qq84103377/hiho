const user = {
    state: {
        userInfo: {},
        orderInfo: {},
        addressInfo: {},
        previewerInfo: {}
    },

    mutations: {
        setUserInfo: (state, userInfo) => {
            state.userInfo = userInfo
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
        },
        setOrderInfo: (state, orderInfo) => {
            state.orderInfo = orderInfo
            // localStorage.setItem('orderInfo', JSON.stringify(orderInfo))
        },
        setAddressInfo: (state, addressInfo) => {
            state.addressInfo = addressInfo
            // localStorage.setItem('orderInfo', JSON.stringify(orderInfo))
        },
        setPreviewerInfo: (state, previewerInfo) => {
            state.previewerInfo = previewerInfo
        }
    },
    actions: {}
}

export default user
