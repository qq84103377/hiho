
export default [
    {
        path: '/cart',
        component: (resolve) => {
            require(['@/views/cart'], resolve);
        },
        meta: {
            belone: 'cart',
            isShowHeader: true,
            isHideTabbar: false,
            isShowInfo: true,
            title: '购物车'
        }
    },
    {
        path: '/invalidGoods',
        component: (resolve) => {
            require(['@/views/cart/invalidGoods'], resolve);
        },
        meta: {
            belone: 'cart',
            isShowHeader: false,
            isHideTabbar: true,
            title: '购物车'
        }
    },
    {
        path: '/pay',
        name:'pay',
        component: (resolve) => {
            require(['@/views/cart/pay'], resolve);
        },
        meta: {
            belone: 'cart',
            isShowHeader: true,
            isHideTabbar: true,
            title: '支付订单'
        }
    },
    {
        path: '/address',
        component: (resolve) => {
            require(['@/views/cart/address'], resolve);
        },
        meta: {
            belone: 'cart',
            isShowHeader: true,
            isHideTabbar: true,
            title: '地址选择'
        }
    },
]
