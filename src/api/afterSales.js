import axios from "../config/axios";
// 售后单列表
export const getRefundOrdersH5 = (params) => {
  return axios.post(`/web/h5/refund/getRefundOrdersH5`, params);
}
// 售后详情
export const refundDetailH5 = (params) => {
  return axios.get(`/web/h5/refund/getRefundDetailH5`, {params:params});
}
// 取消售后单
export const userCancelH5 = (params) => {
  return axios.get(`/web/h5/refund/userCancelH5`, {params:params});
}
// 获取物流公司
export const companyNamesH5 = () => {
  return axios.get(`/web/h5/logistics/getCompanyNamesH5`);
}
// 修改申请
export const editRefundOrderH5 = (params) => {
  return axios.post(`/web/h5/refund/editRefundOrderH5`, params);
}
// 修改物流信息
export const editLogisticsH5 = (params) => {
  return axios.post(`/web/h5/refund/editLogisticsH5`, params);
}