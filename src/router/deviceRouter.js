export default [
    {
        path: '/device',
        name: 'device',
        component: () => import(/* webpackChunkName: "device" */ '../views/device/Manage.vue')
    },
    {
        path: '/device/detail',
        name: 'deviceDetail',
        component: () => import(/* webpackChunkName: "deviceDetail" */  '../views/device/Detail.vue'),
    },
]