export default[
    {
        path:'/tradingArea/list',
        name:'tradingAreaList',
        component: () => import( /* webpackChunkName: "tradingAreaList" */ '../views/tradingArea/List.vue')
    },
    {
        path:'/tradingArea/setUp',
        name:'tradingAreaSetUp',
        component:()=>import( /* webpackChunkName:"tradingAreaSetUp" */ '../views/tradingArea/SetUp.vue')
    },
    {
        path:'/tradingArea/applyList',
        name:'tradingAreaApplyList',
        component:()=>import( /* webpackChunkName:"tradingAreaApplyList" */ '../views/tradingArea/ApplyList.vue')
    }
]