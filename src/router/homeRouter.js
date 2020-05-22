export default [
    {
        path: '/home',
        name: 'adminHome',
        component: () => import(/* webpackChunkName: "adminHome" */  '../views/home/Index.vue'),
    },
    {
        path: 'home/Index',
        name: 'adminHomeIndex',
        component: () => import(/* webpackChunkName: "adminHomeIndex" */  '../views/home/Index.vue'),
    },
    {
        path: '/download',
        name: 'download',
        component: () => import(/* webpackChunkName: "download" */  '../views/download/Down.vue'),
        meta: {
            group_name: "APP下载",
            menu_name: "APP下载",
            file: "views/download/Down.vue",
        },
    },
]
