const sales = {
    state: {
        afterSalesListType: '',
        afterSalesListSubType: ''
    },

    mutations: {
        setAfterSalesListType: (state, type) => {
            state.afterSalesListType = type
        },
        setAfterSalesListSubType: (state, type) => {
            state.afterSalesListSubType = type
        }
    },
    actions: {}
}

export default sales
