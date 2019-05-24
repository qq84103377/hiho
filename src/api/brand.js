import axios from "../config/axios";
// 品牌列表
export const brandListH5 = (params) => {
    return axios.get(`/web/h5/brand/getBrandListH5`, {params:params});
}
// 品牌详情
export const brandDetailH5 = (params) => {
    return axios.get(`/web/h5/brand/getBrandDetailH5`, {params:params});
}