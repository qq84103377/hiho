
export default [
    {
        path: '/mission',
        component: (resolve) => {
            require(['../../views/mission'], resolve);
        },
        meta: {
            belone: 'mission',
            isSearchHeader: true,
            title: '工单',
            hasScan: true
        }
    },
    {
        path: '/mission/detail',
        component: (resolve) => {
            require(['../../views/mission/detail'], resolve);
        },
        meta: {
            belone: 'mission',
            title: '工单详情'
        }
    },
    {
        path: '/mission/info',
        component: (resolve) => {
            require(['../../views/mission/info'], resolve);
        },
        meta: {
            belone: 'mission',
            title: '工单信息'
        }
    },
    {
        path: '/mission/warning/add',
        component: (resolve) => {
            require(['../../views/warning/add-form'], resolve);
        },
        meta: {
            belone: 'mission',
            title: '添加警报',
            isHideTabbar: true
        }
    },
    {
        path: '/mission/warning/relieve',
        component: (resolve) => {
            require(['../../views/warning/relieve-form'], resolve);
        },
        meta: {
            belone: 'mission',
            title: '解除警报',
            isHideTabbar: true
        }
    },
    {
        path: 'mission/report',
        component: (resolve) => {
            require(['../../views/report/index.vue'], resolve);
        },
        meta: {
            belone: 'mission',
            title: '上报数量',
            isHideTabbar: true,
            dontKeepAlive: true
        },
    },
    {
        path: 'mission/wymPreview',
        component: (resolve) => {
            require(['../../views/report/wymPreview.vue'], resolve);
        },
        meta: {
            belone: 'mission',
            title: '本次生成唯一码',
            isHideTabbar: true
        },
    },
    {
        path: 'mission/wymViewer',
        component: (resolve) => {
            require(['../../views/mission/wym-viewer.vue'], resolve);
        },
        meta: {
            belone: 'mission',
            title: '唯一码状态',
            isHideTabbar: true
        },
    },
    {
        path: 'mission/addInferior',
        component: (resolve) => {
            require(['../../views/mission/addInferior.vue'], resolve);
        },
        meta: {
            belone: 'mission',
            title: '添加次品',
            isHideTabbar: true
        }
    },
    {
        path: 'mission/defective',
        component: (resolve) => {
            require(['../../views/mission/defective.vue'], resolve);
        },
        meta: {
            belone: 'mission',
            title: '全部次品',
            isHideTabbar: true
        }
    },
    {

        path: 'mission/addWaste',
        component: (resolve) => {
            require(['../../views/mission/addWaste.vue'], resolve);
        },
        meta: {
            belone: 'mission',
            title: '添加废品',
            isHideTabbar: true
        }
    },
    {
        path: 'mission/waste',
        component: (resolve) => {
            require(['../../views/mission/waste.vue'], resolve);
        },
        meta: {
            belone: 'mission',
            title: '全部废品',
            isHideTabbar: true
        }
    },
    {
        path: 'mission/wymScanResult',
        component: (resolve) => {
            require(['../../views/mission/wymScanResult.vue'], resolve);
        },
        meta: {
            belone: 'mission',
            title: '扫码结果',
            isHideTabbar: true
        }
    },
    {
        path: 'mission/scanEntrance',
        component: (resolve) => {
            require(['../../views/mission/scan-entrance.vue'], resolve);
        },
        meta: {
            belone: 'mission',
            title: '扫码入口',
            isShowHeader: true,
            isHideTabbar: true,
            dontKeepAlive: true
        }
    },
    {
        path: 'mission/scannedList',
        component: (resolve) => {
            require(['../../views/mission/scanned-list.vue'], resolve);
        },
        meta: {
            belone: 'mission',
            title: '请选择节点',
            isShowHeader: false,
            isHideTabbar: true,
            dontKeepAlive: true
        }
    }
]
