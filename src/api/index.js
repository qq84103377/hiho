import axios from '../config/axios';

// 工位登录
export const doWorkbayLogin = (params) => {
    return axios.post('v1/api/login/workbayLogin', params);
}

// 老板登录
export const doLogin = (params) => {
    return axios.post('v1/api/login/doLogin', params);
}

// 工单搜索下拉列表
export const searchMissionDropDownList = (params) => {
    return axios.post('v1/api/fac/mission/searchMissionDropDownList', params);
}

// 任务列表查询
export const queryFacMissionList = (params) => {
    return axios.post('v1/api/fac/mission/queryFacMissionList', params);
}

// 任务工单所有节点进度
export const getFacMissionNodeInfoListById = (params) => {
    return axios.get(`v1/api/fac/mission/getFacMissionNodeInfoListById`, { params: params });
}

// 任务信息查询
export const getFacMission = (params) => {
    return axios.get(`v1/api/fac/mission/getFacMission`, { params: params });
}

// 获取工单节点实例信息
export const getTaskInstanceWorkflow = (params) => {
    return axios.post(`v1/api/facTaskInstanceWorkflow/getTaskInstanceWorkflow`, params);
}

// 查询单个货品sku
export const getFacGoodsSku = (params) => {
    return axios.get(`v1/api/fac/goods/getFacGoodsSku`, { params: params });
}

// 查询牛厂货品所有图片
export const getGoodsImgList = (params) => {
    return axios.get(`v1/api/fac/goods/getFacGoodsPictureList`, { params: params });
}

// 可选提醒人员列表
export const getListUserOfFac = (params) => {
    return axios.get(`v1/api/imMessage/listUserOfFac`, { params: params });
}

// 可选提醒节点列表
export const getListNodesOfMission = (params) => {
    return axios.get(`v1/api/imMessage/listNodesOfMission`, { params: params });
}

// 节点进度修改接口
export const updateTaskInstanceWorkflow = (params) => {
    return axios.post(`v1/api/fac/mission/updateTaskInstanceWorkflow`, params);
}

// 获取工单或工单节点警报消息
export const getMessageByMissionId = (params) => {
    return axios.get(`v1/api/imMessage/getMessageByMissionId`, { params: params });
}

// 获取工单或工单节点警报消息
export const addNodeAlert = (params) => {
    return axios.put(`v1/api/fac-mission-prcd-nodes/${params.instanceId}/alert`, params);
}

// 获取工单或工单节点警报消息
export const cancelNodeAlert = params => {
    return axios.put(`v1/api/fac-mission-prcd-nodes/${params.instanceId}/alert-cancel`, params)
};

// 数据型节点上报接口
export const addReportDataDetail = (params) => {
    return axios.post(`v1/api/fac/mission/addReportDataDetail`, params);
}

// 分页查询节点动态数据接口
export const queryFactoryMissionOpLogPage = (params) => {
    return axios.post(`v1/api/fac/mission/queryFactoryMissionOpLogPage`, params);
}

// 数据型节点上报数据修改接口
export const updateReportDataDetail = params => {
    return axios.post(`v1/api/fac/mission/updateReportDataDetail`, params);
};

// 撤销上报数据
export const deleteReportDataDetail = params => {
    return axios.post(`v1/api/fac/mission/deleteReportDataDetail`, params)
};

// 工厂设置

// 获取用户个人信息
export const getMyInfo = (params) => {
    return axios.post(`v1/api/facUser/getMyInfo`, params);
}

//
// 查询单个工位
export const getOneWorkbay = (params) => {
    return axios.post(`v1/api/facUser/getOneWorkbay`, params);
}


// 获取工厂信息
export const getFacInfo = (params) => {
    return axios.get(`v1/api/fac/getFacInfo`, { params: params });
}

// 获取工厂列表
export const getEasyFactorys = (params) => {
    return axios.get(`v1/api/fac/getEasyFactorys`, { params: params });
}

// 更新用户个人信息
export const updateMyInfo = (params) => {
    return axios.post(`v1/api/facUser/updateMyInfo`, params);
}

// 修改工位信息
export const updateWorkbay = (params) => {
    return axios.post(`v1/api/facUser/updateWorkbay`, params);
}


// 工位重置密码
export const resetWorkbayPsw = (params) => {
    return axios.post(`v1/api/fac/resetWorkbayPsw`, params);
}

// 上传图片接口
export const uploadImg = (params) => {
    return axios.post(`https://upload-z2.qiniup.com`, params);
}

// 获取七牛云上传token
export const getUploadToken = (params) => {
    return axios.get(`v1/api/public/getUploadToken`, { params: params });
};

// 工单报表统计
export const queryFacMissionReportList = (params) => {
    return axios.post(`v1/api/fac/reportStatistics/queryFacMissionReportListForAPP`, params);
};

// 获取融云token
export const getRongYunToken = (params) => {
    return axios.get(`v1/api/rong/getToken`, { params: params })
};

// 获取工单消息列表
export const getMissionMessageList = params => {
    return axios.post(`v1/api/imMessage/getMissionMessageList`, params)
};

// 获取消息列表
export const getMessageList = params => {
    return axios.post(`v1/api/imMessage/listMessage`, params)
};

// 添加、推送消息
export const addMessage = params => {
    return axios.post(`v1/api/imMessage/addMessage`, params)
};

// 可选提醒节点列表
export const getNodeList = params => {
    return axios.get(`v1/api/imMessage/listNodesOfMission`, { params: params })
};

// 获取可选提醒人员列表
export const getPersonList = params => {
    return axios.get(`v1/api/imMessage/listUserOfFac`, { params: params })
};

// 获取节点负责人Id数组
export const getLeadersOfNode = params => {
    return axios.get(`v1/api/imMessage/getLeadersOfNode`, { params: params })
};

// 删除消息
export const deleteMessage = params => {
    return axios.get(`v1/api/imMessage/deleteMessage`, { params: params })
};

// PDA扫描获取missionId
export const getMissionIdBySerialNum = params => {
    return axios.get(`v1/api/print/getMissionDetails`, { params: params })
};

// 工单员工工价计算报表统计
export const queryFacEmolumentReportList = params => {
    return axios.post(`v1/api/fac/reportStatistics/queryFacEmolumentReportList`, params)
};

// 牛厂查询报表列表
export const selectFacForms = params => {
    return axios.post(`v1/api/fac/form/manage/selectFacForms`, params)
};

// 通过sku条形码获取体系层sku信息
export const getSkuBarcodeInfo = params => {
    return axios.get(`v1/api/fac/barcode/getSkuBarcodeInfo`, { params: params })
}

// 获取工厂分组列表
export const getEasyGroups = params => {
    return axios.get(`v1/api/fac/getEasyGroups`, { params: params })
}

// 获取体系层所有员工信息
export const querySysUnitAllUser = params => {
    return axios.post(`v1/api/unit/querySysUnitAllUser`, params)
};

// 货品生产进度报表
export const queryProgress = params => {
    return axios.post(`v1/api/fac/reportStatistics/queryProgress`, params)
};

/**工单详情新接口 */
// GET /new-mf-fac/v1/api/fac-mission-prcd-nodes/工单ID/progresses 获取节点信息
export const missionNodeInfo = params => {
    return axios.get(`v1/api/fac-mission-prcd-nodes/${params.missionId}/progresses`, { params: params })
};

// GET /new-mf-fac/v1/api/fac-mission-prcd-nodes/工单ID 获取当前工单节点模板的数据
export const editMissionNodeInfo = params => {
    return axios.get(`v1/api/fac-mission-prcd-nodes/${params.missionId}`, { params: params })
};

// GET  /new-mf-fac/v1/api/fac-mission-prcd-nodes/工单节点ID/progress 点击节点获取节点数据
export const instanceMissionNodeInfo = params => {
    return axios.get(`v1/api/fac-mission-prcd-nodes/${params.instanceWorkflowId}/progress`, { params: params })
};
// PUT /new-mf-fac/v1/api/fac-mission-prcd-nodes/工单节点ID/total 总数型节点提交上报数量
export const totalityReportNum = params => {
    return axios.put(`v1/api/fac-mission-prcd-nodes/${params.instanceWorkflowId}/total`, params)
}

// /v1/api/fac-mission-prcd-nodes/节点id（status/information） 修改工单详情节点状态或者是节点信息
export const nodeInfoEdit = params => {
    return axios.put(`v1/api/fac-mission-prcd-nodes/${params.id}/${params.editType}`, params)
};

// 质检型节点 上报API
export const qualityCheckingReport = params => {
    return axios.put(`v1/api/fac-mission-prcd-nodes/${params.instanceId}/quality-checking-report`, params)
};
// 尾部入库型获取仓库列表
export const reportStoreList = params =>
    axios.get(`v1/api/storehouses/${params.unitId}`, params)

// PUT /new-mf-fac/v1/api/fac-mission-prcd-nodes/工单工序节点ID/actual-cutting-wym
export const nodeReport = params =>
    axios.put(`v1/api/fac-mission-prcd-nodes/${params.instanceId}/${params.nodeType}`, params)

// /v1/api/fac/defectiveLabel/facDefectiveLabels  组织层查询所有的次品标签
export const facDefectiveLabels = params => {
    return axios.get(`v1/api/fac/defectiveLabel/facDefectiveLabels`, { params: params })
};
// 处理次品
export const operaDefective = params => {
    return axios.put(`v1/api/fac-mission-prcd-nodes/${params.instanceId}/quality-checking-${params.type}`, params)
}

// PUT /new-mf-fac/v1/api/fac-mission-prcd-nodes/工单工序节点ID/material 到料控件的 上报API
export const materialReport = params => {
    return axios.put(`v1/api/fac-mission-prcd-nodes/${params.instanceId}/material`, params)
};

// /v1/api/fac-mission-prcd-nodes/previewWYM 预览唯一码
export const previewWYM = params => {
    return axios.post(`v1/api/fac-mission-prcd-nodes/previewWYM`, params);

};
// / /v1 / api / fac - mission - prcd - nodes / WYMList  裁床唯一码列表
export const WYMList = params => {
    return axios.post(`v1/api/fac-mission-prcd-nodes/WYMList`, params);

};
// /v1/api/fac-mission-prcd-nodes/WYMStatus 其余节点唯一码列表
export const WYMStatus = params =>
    axios.post(`v1/api/fac-mission-prcd-nodes/WYMStatus`, params);

// /v1/api/fac-mission-prcd-node-reports/scan/扫的码?userId=用户ID&unitId=单位ID"

export const scanRequest = params =>
    axios.get(`v1/api/fac-mission-prcd-node-reports/scan/${params.barCode}`, { params: params })
