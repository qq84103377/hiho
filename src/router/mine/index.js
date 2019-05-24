
export default [
    {
        path: '/mine',
        component: (resolve) => {
            require(['@/views/mine'], resolve);
        },
        meta: {
            belone: 'mine',
            isShowHeader: false,
            title: '我的',
            isHideTabbar: false,
            isShowInfo: true
        }
    },
    {
        path: '/mine/myEdit',
        component: () => import('@/views/mine/myEdit'),
        meta: {
            belone: 'mine',
            isShowHeader: true,
            title: '个人信息',
            isHideTabbar: true
        }
    },
    {
        path: '/mine/editTel',
        component: () => import('@/views/mine/editTel'),
        meta: {
            belone: 'mine',
            isShowHeader: true,
            title: '修改手机号',
            isHideTabbar: true
        }
    },
    {
        path: '/mine/addressList',
        component: () => import('@/views/mine/address/addressList'),
        meta: {
            belone: 'mine',
            isShowHeader: true,
            title: '地址管理',
            isHideTabbar: true,
            isShowInfo: true
        }
    },
    {
        path: '/mine/addressEdit',
        component: () => import('@/views/mine/address/addressEdit'),
        meta: {
            belone: 'mine',
            isShowHeader: false,
            title: '收货人信息',
            isHideTabbar: true
        }
    },
    {
        path: '/mine/myVip',
        component: () => import('@/views/mine/myVip'),
        meta: {
            belone: 'mine',
            isShowHeader: true,
            title: '我的VIP',
            isHideTabbar: true,
            isShowInfo: true
        }
    },
    {
        path: '/mine/myShare',
        component: () => import('@/views/mine/share/myShare'),
        meta: {
            belone: 'mine',
            isShowHeader: true,
            title: '邀请好友',
            isHideTabbar: true,
            isShowInfo: true
        }
    },
    {
        path: '/mine/myShare/shareList',
        component: () => import('@/views/mine/share/shareList'),
        meta: {
            belone: 'mine',
            isShowHeader: true,
            title: '邀请记录',
            isHideTabbar: true
        }
    },
    {
        path: '/mine/purchasePriceMag',
        component: () => import('@/views/mine/purchasePriceMag'),
        meta: {
            belone: 'mine',
            isShowHeader: true,
            title: '代购价管理',
            isHideTabbar: true,
            isShowInfo: true
        }
    },
    {
        path: '/mine/salesPerformance',
        component: () => import('@/views/mine/salesPerformance'),
        meta: {
            belone: 'mine',
            isShowHeader: true,
            title: '邀请用户-销售业绩',
            isHideTabbar: true,
            isShowInfo: true
        }
    },
    {
        path: '/mine/customerService',
        component: () => import('@/views/mine/customerService'),
        meta: {
            belone: 'mine',
            isShowHeader: false,
            title: '咨询客服',
            isHideTabbar: true,
            isShowInfo: true
        }
    },
    {
        path: '/mine/userGuide',
        component: () => import('@/views/mine/userGuide'),
        meta: {
            belone: 'mine',
            isShowHeader: true,
            title: '使用指南',
            isHideTabbar: true,
            isShowInfo: false
        }
    },
    {
        path: '/mine/questionDetail',
        component: () => import('@/views/mine/userGuide/detail'),
        meta: {
            belone: 'mine',
            isShowHeader: true,
            title: '问题详情',
            isHideTabbar: true,
            isShowInfo: false
        }
    },
    {
        path: '/mine/searchList',
        component: () => import('@/views/mine/userGuide/searchList'),
        meta: {
            belone: 'mine',
            isShowHeader: false,
            isHideTabbar: true,
            isShowInfo: false
        }
    }
]
