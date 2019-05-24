import axios from "../config/axios";
// 获取融云token
export const getRongYunToken = (params) => {
    return axios.get(`/web/message/getRYToken`, {params:params});
}

// 消息中心列表
export const getMessages = (params) => {
    return axios.get(`/web/message/getMessages`, {params:params});
}

// 设置消息已读
export const setHasRead = (params) => {
    return axios.get(`/web/message/setHasRead`, {params:params});
}

// 消息中心未读消息数量
export const getMsgIcons = (params) => {
    return axios.get(`/web/message/getMsgIcons`, {params:params});
}

// 消息屏蔽设置
export const imMessageReceiveSetting = (params) => {
    return axios.get(`/web/h5/settings/imMessageReceiveSetting`, {params:params});
}

// 获取用户消息设置
export const getMsgSettings = (params) => {
    return axios.get(`/web/h5/settings/getMsgSettings`, {params:params});
}

// 设置单个消息已读
export const setSingleHasRead = (params) => {
    return axios.get(`/web/message/setSingleHasRead`, {params:params});
}

// 上线获取活动信息
export const getOnlineImMsgs = (params) => {
    return axios.get(`/web/message/getOnlineImMsgs`, {params:params});
}


// 添加更新版本通知消息
export const addVersionUpdateMsg = (params) => {
    return axios.post(`/web/h5/version/addVersionUpdateMsg`, params);
}
