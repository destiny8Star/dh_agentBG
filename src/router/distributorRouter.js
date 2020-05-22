export default[
    {
        path:'/distributor/list',
        name:'distributorList',
        component: () => import( /* webpackChunkName: "distributorList" */ '../views/distributor/List.vue')
    },
    {
        path:'/distributor/add',
        name:'distributorAdd',
        component:()=>import( /* webpackChunkName:"distributorAdd" */ '../views/distributor/Add.vue')
    },
    {
        path:'/distributor/update',
        name:'distributorUpdate',
        component:()=>import( /* webpackChunkName:"distributorUpdate" */ '../views/distributor/Update.vue')
    }
]