export default [
  {
    path: '/account/info',
    name: 'accountInfo',
    component: () => import(/* webpackChunkName: "accountInfo" */  '../views/account/Info.vue'),
  },
  {
    path: '/account/change',
    name: 'accountChange',
    component: () => import(/* webpackChunkName: "accountChange" */  '../views/account/Change.vue'),
  },

]
