import axios from "../config/axios";
// 发送验证码
export const sendVerificationSms = (params) => {
    return axios.get(`/web/sms/sendVerificationSms`, { params: params });
}
// 手机号登录
export const doH5Login = (params) => {
    return axios.get(`/web/h5/settings/doH5Login`, { params: params });
}
// 升级vip等级
export const updateLevelByCode = (params) => {
    return axios.get(`/web/h5/settings/updateLevelByCode`, { params: params });
}

// 保存用户信息
export const saveH5WxUserInfo = (params) => {
    return axios.post(`/web/h5/settings/saveH5WxUserInfo`, params);
}
// 用户地址列表
export const addressList = (params) => {
    return axios.get(`/web/h5/userAddress/getAddressListH5`,   { params: params });
}
// 设置用户默认地址
export const setDefaultAddressH5 = (params) => {
    return axios.get(`/web/h5/userAddress/setDefaultAddressH5`, { params: params });
}
// 新增/编辑用户地址
export const saveUserAddressH5 = (params) => {
    return axios.post(`/web/h5/userAddress/saveUserAddressH5`, params);
}
// 获取地址详情
export const getUserAddressH5 = (params) => {
    return axios.get(`/web/h5/userAddress/getUserAddressH5`, { params: params });
}
// 删除地址详情
export const removeAddressH5 = (params) => {
    return axios.get(`/web/h5/userAddress/removeAddressH5`, { params: params });
}
// 获取用户信息
export const getH5UserInfo = (params) => {
    return axios.get(`/web/h5/settings/getH5UserInfo`, { params: params });
}
// 修改手机号码
export const saveH5UserPhone = (params) => {
    return axios.get(`/web/h5/settings/saveH5UserPhone`, { params: params });
}
// 修改头像
export const saveH5UserHeadImg = (params) => {
    return axios.get(`/web/h5/settings/saveH5UserHeadImg`, { params: params });
}
// 邀请码判重
export const judgeInviteCode = (params) => {
    return axios.get(`/web/user/judgeInviteCode`, { params: params });
}
// 生成邀请码二维码
export const createInviteCodeWithQRCode = (params) => {
    return axios.get(`/web/image/createInviteCodeWithQRCode`, { params: params });
}
// 获取二维码
export const getQRCodeImg = (params) => {
    return axios.get(`/web/image/getQRCodeImg`, { params: params });
}
// 新增邀请码
export const addInviteCode = (params) => {
    return axios.get(`/web/user/addInviteCode`, { params: params });
}
// 邀请码列表
export const getH5InviteCodes = (params) => {
    return axios.get(`/web/h5/userInviteCode/getH5InviteCodes`, { params: params });
}
// 获取代购价列表
export const getH5UserPurchases = (params) => {
    return axios.get(`/web/h5/userPurchase/getH5UserPurchases`, { params: params });
}
// 新增代购价
export const addH5UserPurchase = (params) => {
    return axios.post(`/web/h5/userPurchase/addH5UserPurchase`, params);
}
// 编辑代购价
export const editH5UserPurchase = (params) => {
    return axios.post(`/web/h5/userPurchase/editH5UserPurchase`, params);
}
// 删除代购价
export const deletePurchase = (params) => {
    return axios.post(`/web/h5/userPurchase/deletePurchase`, params);
}
// 邀请用户业绩列表
export const getYearSalesPerformance = (params) => {
    return axios.get(`/web/h5/order/getYearSalesPerformance`, { params: params });
}
// 邀请用户业绩列表
export const getMonthSalesPerformance = (params) => {
    return axios.get(`/web/h5/order/getMonthSalesPerformance`, { params: params });
}
// 获取版本信息
export const getRecentUpdateMsg = (params) => {
    return axios.get(`/web/h5/version/getRecentUpdateMsg`, { params: params });
}

// 获取订单角标
export const getH5OrderNo = (params) => {
    return axios.get(`/web/h5/order/getH5OrderNo`, { params: params });
}

// 隐藏订单角标
export const hideOrderSymbol = (params) => {
    return axios.get(`/web/h5/order/hideOrderSymbol`, { params: params });
}

// 查询用户指南
export const searchGuides = (params) => {
    return axios.get(`/web/guide/searchGuides`, { params: params });
}

// 用户指南列表
export const getGuides = (params) => {
    return axios.get(`/web/guide/getGuides`, { params: params });
}

// 获取用户搜索历史
export const getSearchHistory = (params) => {
    return axios.get(`/web/searchHistory/getSearchHistory`, { params: params });
}

// 添加用户搜索历史
export const addSearchHistory = (params) => {
    return axios.get(`/web/searchHistory/addSearchHistory`, { params: params });
}
