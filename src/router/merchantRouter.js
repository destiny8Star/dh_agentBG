export default [
    {
        path: '/merchant/list',
        name: 'merchantList',
        component: () => import(/* webpackChunkName: 'merchantList' */ '../views/merchant/List.vue')
    },
    {
        path:'/merchant/add',
        name:'merchantAdd',
        component:()=>import(/* webpackChunkName: 'merchantAdd' */ '../views/merchant/Add.vue')
    },
]