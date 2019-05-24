
export default [
    {
        path: '/setting',
        component: (resolve) => {
            require(['../../views/setting'], resolve);
        },
        meta: {
            belone: 'setting',
            title: '我的',
            isShowHeader: true
        }
    },
    {
        path: '/setting/factory',
        component: (resolve) => {
            require(['../../views/setting/factory'], resolve);
        },
        meta: {
            belone: 'setting',
            title: '切换工厂',
        }
    },
    {
        path: '/setting/info',
        component: (resolve) => {
            require(['../../views/setting/info'], resolve);
        },
        meta: {
            belone: 'setting',
            title: '个人资料',
        }
    },
    {
        path: '/setting/password',
        component: (resolve) => {
            require(['../../views/setting/edit-pwd'], resolve);
        },
        meta: {
            belone: 'setting',
            title: '修改密码',
            isHideTabbar: true
        }
    }
]
