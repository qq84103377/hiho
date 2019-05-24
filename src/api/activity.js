import axios from "../config/axios";
// 活动列表
export const getH5ActivityList = (params) => {
    return axios.post(`/web/h5/activity/getH5ActivityList`, params);
}

// 关注/取关活动
export const notice = (params) => {
    return axios.get(`/web/h5/goods/notice`, {params:params});
}


// 活动详情
export const getH5ActivityDetail = (params) => {
    return axios.get(`/web/h5/activity/getH5ActivityDetail`, {params:params});
}

// 加入购物车
export const addGoodsCartH5 = (params) => {
    return axios.post(`/web/h5/shopCart/addGoodsCartH5`, params);
}

// 商品列表
export const getH5GoodsList = (params) => {
    return axios.post(`/web/h5/goods/getH5GoodsList`, params);
}

// 活动商品列表
export const getH5GoodsListOfActivity = (params) => {
    return axios.get(`/web/h5/activity/getH5GoodsListOfActivity`, {params:params});
}

// base64转换
export const transferBase64 = (params) => {
    return axios.post(`/web/image/transferBase64`, params);
}

