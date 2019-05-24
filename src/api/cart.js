import axios from "../config/axios";

// 购物车列表信息
export const getShotCartsH5 = (params) => {
    return axios.get(`/web/h5/shopCart/getShopCartsH5`, {params: params});
}

// 购物车失效列表信息
export const getInvalidShopCartsH5 = (params) => {
    return axios.get(`/web/h5/shopCart/getInvalidShopCartsH5`, {params: params});
}

// 下单
export const placeOrderH5 = (params) => {
    return axios.post(`/web/h5/order/placeOrderH5`, params);
}

// 移出购物车
export const batchRemoveH5 = (params) => {
    return axios.post(`/web/h5/shopCart/batchRemoveH5`, params);
}

// 修改购物车备注
export const editRemark = (params) => {
    return axios.get(`/web/h5/shopCart/editRemark`, {params: params})
}

// 获取商品对应规格列表
export const editStockPage = (params) => {
    return axios.get(`/web/goods/editStockPage`, {params: params});
}

// 修改购物车规格
export const editShopCartSpecH5 = (params) => {
    return axios.get(`/web/h5/shopCart/editShopCartSpecH5`, {params: params});
}

// 查询支付状态
export const queryPaymentStatus = (params) => {
    return axios.get(`/web/h5/finPayment/queryPaymentStatus`, {params: params});
}

// 订单支付
export const payOrderH5 = (params) => {
    return axios.get(`/web/h5/finPayment/payOrderH5`, {params: params})
}

// 购物车角标
export const getShopCartNum = (params) => {
    return axios.get(`/web/h5/shopCart/getShopCartNum`, {params: params})
}
// 立即下单
export const placeOrderNow = (params) => {
    return axios.get(`/web/h5/order/placeOrderNow`, {params: params})
}

// 立即下单返回时库存回滚
export const addStock = (params) => {
    return axios.get(`/web/goodsspec/addStock`, {params: params})
}
