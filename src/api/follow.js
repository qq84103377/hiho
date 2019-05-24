
import axios from "../config/axios";
// 发送验证码
export const h5GoodsList = (params) => {
    return axios.post(`/web/h5/goods/getH5GoodsList`, params);
}
// 全部清除
export const cancelNoticeOfInvalidGoods = (params) => {
    return axios.get(`/web/h5/goods/cancelNoticeOfInvalidGoods`, {params: params});
}

// 清除关注的失效活动
export const clearInvalidNoticeAct = (params) => {
    return axios.get(`/web/h5/userNotice/clearInvalidNoticeAct`, {params: params});
}
