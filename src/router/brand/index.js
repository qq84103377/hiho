
export default [
    {
        path: '/brand',
        component: (resolve) => {
            require(['@/views/brand'], resolve);
        },
        meta: {
            belone: 'brand',
            title: '品牌',
            isShowHeader: true,
            isShowInfo: true
        }
    },
    {
        path: '/brandDetail',
        component: () => import('@/views/brand/brandDetail'),
        meta: {
            belone: 'brand',
            title: '品牌主页',
            isShowHeader: true,
            isHideTabbar: true,
            isSelect: true
        }
    }
]
