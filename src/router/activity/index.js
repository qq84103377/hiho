
export default [
    {
        path: '/activityDetail',
        component: () => import('@/views/activity/activityDetail'),
        meta: {
            belone: 'activity',
            title: '活动详情',
            isShowHeader: true,
            isHideTabbar: true
        }
    },
    {
        path: '/activityTransmit',
        name: 'activityTransmit',
        component: () => import('@/views/activity/activityTransmit'),
        meta: {
            belone: 'activity',
            title: '转发活动',
            isShowHeader: false,
            isHideTabbar: true
        }
    },
    {
        path: '/activity',
        name:'activityIndex',
        component: () => import('@/views/activity/index'),
        // component: (resolve) => {
        //     require(['@/views/activity/index'], resolve);
        // },
        meta: {
            belone: 'activity',
            title: '首页',
            isShowHeader: true,
            isLive: true,
            isHot: false,
            isPreview: false,
            isShowInfo: true
        }
    },
    {
        path: '/transmitList',
        name:'transmitList',
        component: (resolve) => {
            require(['@/views/activity/transmitList'], resolve);
        },
        meta: {
            belone: 'activity',
            title: '批量转发',
            isShowHeader: true,
            isHideTabbar: true,
            keepAlive:true
        }
    },
    {
        path: '/batchTransmit',
        component: (resolve) => {
            require(['@/views/activity/batchTransmit'], resolve);
        },
        meta: {
            belone: 'activity',
            title: '选择图片类型',
            isShowHeader: true,
            isHideTabbar: true
        }
    },
    // {
    //     path: '/activity',
    //     redirect: '/activity/live',
    //     component: (resolve) => {
    //         require(['@/views/activity'], resolve);
    //     },
    //     meta: {
    //         belone: 'activity',
    //         title: '首页',
    //         isShowHeader: true,
    //         isHideTabbar: false,
    //     },
    //     children: [
    //         {
    //             path: 'live',
    //             name: 'live',
    //             component: () => import('@/views/activity/components/live'),
    //             meta: {
    //                 belone: 'activity',
    //                 title: '首页',
    //                 isShowHeader: true,
    //                 isHideTabbar: false,
    //                 keepAlive:true
    //             }
    //         },
    //         {
    //             path: 'preview',
    //             name: 'preview',
    //             component: () => import('@/views/activity/components/preview'),
    //             meta: {
    //                 belone: 'activity',
    //                 title: '首页',
    //                 isShowHeader: true,
    //                 isHideTabbar: false,
    //                 keepAlive:true
    //             }
    //         },
    //         {
    //             path: 'hot',
    //             name: 'hot',
    //             component: () => import('@/views/activity/components/hot'),
    //             meta: {
    //                 belone: 'activity',
    //                 title: '首页',
    //                 isShowHeader: true,
    //                 isHideTabbar: false,
    //                 keepAlive:true
    //             }
    //         },
    //     ]
    // }
]
