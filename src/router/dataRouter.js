export default [
    {
        path: '/data/merchant',
        name: 'dataMerchant',
        component: () => import(/* webpackChunkName: "dataMerchant" */  '../views/dataCenter/Merchant.vue'),
    },
    {
        path: '/data/range',
        name: 'dataRange',
        component: () => import(/* webpackChunkName: "dataRange" */  '../views/dataCenter/Range.vue'),
    },
    {
        path: '/data/area',
        name: 'dataArea',
        component: () => import(/* webpackChunkName: "dataArea" */  '../views/dataCenter/Area.vue'),
    },
    {
        path: '/data/settlement',
        name: 'dataSettlement',
        component: () => import(/* webpackChunkName: "dataSettlement" */  '../views/dataCenter/Settlement.vue'),
    },
    {
        path: '/data/withdraw',
        name: 'dataWithdraw',
        component: () => import(/* webpackChunkName: "dataWithdraw" */  '../views/dataCenter/Withdraw.vue'),
    },
    // 商户下分润明细
    {
        path: '/data/detail',
        name: 'dataDetail',
        component: () => import(/* webpackChunkName: "dataDetail" */  '../views/dataCenter/Detail.vue'),
    },
    // 商户下分润明细
    {
        path: '/data/rangeDetail',
        name: 'dataRangeDetail',
        component: () => import(/* webpackChunkName: "dataRangeDetail" */  '../views/dataCenter/RangeDetail.vue'),
    },
    //余额日志
    {
        path:'/data/balanceLog',
        name:'dataBalanceLog',
        component: () => import(/* webpackChunkName:'dataBalanceLog' */ '../views/dataCenter/BalanceLog.vue')
    }
]
