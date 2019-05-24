
export default [
    {
        path: '/orderList',
        component: () => import('@/views/mine/order'),
        meta: {
            belone: 'mine',
            title: '订单列表',
            isShowHeader: true,
            isHideTabbar: true,
            isShowInfo: true
        }
    },
    {
        path: '/orderDetail',
        component: () => import('@/views/mine/order/detail.vue'),
        meta: {
            belone: 'mine',
            title: '订单详情',
            isShowHeader: true,
            isHideTabbar: true
        }
    },
    {
        path: '/refund',
        name: 'refund',
        component: () => import('@/views/mine/order/refund.vue'),
        meta: {
            belone: 'mine',
            title: '申请退款',
            isShowHeader: true,
            isHideTabbar: true
        }
    },
    {
        path: '/afterSalesList',
        component: () => import('@/views/mine/afterSales'),
        meta: {
            belone: 'mine',
            title: '售后单列表',
            isShowHeader: true,
            isHideTabbar: true,
            isShowInfo: true
        }
    },
    {
        path: '/afterSalesDetail',
        component: () => import('@/views/mine/afterSales/detail.vue'),
        meta: {
            belone: 'mine',
            title: '售后单详情',
            isShowHeader: true,
            isHideTabbar: true
        }
    },

]
