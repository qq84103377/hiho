
export default [
  {
      path: '/info',
      component: (resolve) => {
          require(['@/views/info/index'], resolve);
      },
      meta: {
          belone: 'info',
          isShowHeader: false,
          title: '消息中心',
          isHideTabbar: true
      }
    },
    {
      path: '/infoSet',
      component: () => import('@/views/info/infoSet'),
      meta: {
        belone: 'info',
        isShowHeader: true,
        title: '消息设置',
        isHideTabbar: true
      }
    }
]
