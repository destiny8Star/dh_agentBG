export default [
    {
        path: '/ad',
        name: 'ad',
        component: () => import(/* webpackChunkName: "ad" */ '../views/ad/List.vue'),
         meta: {
            group_name: "广告列表",
            menu_name: "广告列表",
            file: "views/ad/List.vue",
        },
    },
    {
        path: '/ad/detail',
        name: 'adDetail',
        component: () => import(/* webpackChunkName: "adDetail" */  '../views/ad/Detail.vue'),
         meta: {
            group_name: "广告详情",
            menu_name: "广告详情",
            file: "views/ad/Detail.vue",
        },
    },
    {
        path: '/ad/add',
        name: 'adAdd',
        component: () => import(/* webpackChunkName: "adAdd" */  '../views/ad/Add.vue'),
         meta: {
            group_name: "添加广告",
            menu_name: "添加广告",
            file: "views/ad/Add.vue",
        },
    },
    {
        path: '/adImg',
        name: 'adImg',
        component: () => import(/* webpackChunkName: "adImg" */ '../views/ad/adImg/List.vue'),
         meta: {
            group_name: "广告图列表",
            menu_name: "广告图列表",
            file: "views/ad/adImg/List.vue",
        },
    },
    {
        path: '/adImg/add',
        name: 'adImgAdd',
        component: () => import(/* webpackChunkName: "adImgAdd" */  '../views/ad/adImg/Add.vue'),
         meta: {
            group_name: "添加广告图",
            menu_name: "添加广告图",
            file: "views/ad/adImg/Add.vue",
        },
    },
    {
        path: '/adImg/update',
        name: 'adImgUpdate',
        component: () => import(/* webpackChunkName: "adImgUpdate" */  '../views/ad/adImg/Update.vue'),
         meta: {
            group_name: "修改广告图",
            menu_name: "修改广告图",
            file: "views/ad/adImg/Update.vue",
        },
    },
]