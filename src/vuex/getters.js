const getters = {
    userInfo: state => state.user.userInfo,
    orderListType: state => state.order.orderListType,
    previewerInfo: state => state.user.previewerInfo,
    afterSalesListType: state => state.sales.afterSalesListType,
    afterSalesListSubType: state => state.sales.afterSalesListSubType,
    cartNum: state => state.cart.cartNum,

}
export default getters
