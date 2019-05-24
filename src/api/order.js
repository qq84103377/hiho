import axios from "../config/axios";
// 获取订单列表
export const getH5OrderList = (params) => {
    return axios.post(`/web/h5/order/getH5OrderList`, params )
}
// 获取订单详情
export const getOrderDetail = (params) => {
    return axios.get(`/web/order/getOrderDetail`, { params : params} )
}
// 取消订单
export const cancelOrder = (params) => {
    return axios.post(`/web/h5/order/cancelOrder`, params )
}

// 订单重新付款
export const repay = (params) => {
    return axios.get(`/web/h5/order/repay`, { params : params} )
}

// 修改订单备注
export const saveOrderRemark = (params) => {
    return axios.get(`/web/h5/order/saveOrderRemark`, { params : params} )
}

// 修改订单规格
export const saveOrderSpec = (params) => {
    return axios.get(`/web/h5/order/saveOrderSpec`, { params : params} )
}

// 修改订单规格
export const applyRefundH5 = (params) => {
    return axios.post(`/web/h5/refund/applyRefundH5`, params )
}

// 退款查询是否订单最后一件商品
export const checkIfLastRefundH5 = (params) => {
    return axios.get(`/web/h5/refund/checkIfLastRefundH5`, { params : params} )
}
