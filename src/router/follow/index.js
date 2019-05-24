
export default [
    {
        path: '/follow',
        component: (resolve) => {
            require(['@/views/follow'], resolve);
        },
        meta: {
            belone: 'follow',
            isSearchHeader: true,
            title: '关注',
            isShowHeader: true,
            isGood: true,
            isBrand: false,
            isShowInfo: true
            // isActivity: false
        }
    },
    {
        path: 'failedGoods',
        name: 'failedGoods',
        component: () => import('@/views/follow/components/failedGoods'),
        meta: {
            belone: 'follow',
            title: '失效商品',
            isShowHeader: false,
            isHideTabbar: false
        }
    },
    {
        path: 'failedActivity',
        name: 'failedActivity',
        component: () => import('@/views/follow/components/failedActivity'),
        meta: {
            belone: 'follow',
            title: '失效活动',
            isShowHeader: false,
            isHideTabbar: false
        }
    }
]
