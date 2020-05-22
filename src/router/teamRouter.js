export default [
  {
    path: '/team/share',
    name: 'teamShare',
    component: () => import(/* webpackChunkName: "teamShare" */  '../views/team/Share.vue'),
  },
  {
    path: '/team/recommend',
    name: 'teamRecommend',
    component: () => import(/* webpackChunkName: "teamRecommend" */  '../views/team/Recommend.vue'),
  },
  {
      path: '/team/collect',
      name: 'teamCollect',
      component: () => import(/* webpackChunkName: "teamCollect" */  '../views/team/Collect.vue'),
  }

]
