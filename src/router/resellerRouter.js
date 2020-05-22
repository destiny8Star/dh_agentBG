export default [
  {
    path: '/reseller/code',
    name: 'resellerCode',
    component: () => import(/* webpackChunkName: "resellerCode" */  '../views/reseller/Code.vue'),
  },
  {
    path: '/reseller/plan',
    name: 'resellerPlan',
    component: () => import(/* webpackChunkName: "resellerPlan" */  '../views/reseller/plan/List.vue'),
  },
  {
    path: '/reseller/planAdd',
    name: 'resellerPlanAdd',
    component: () => import(/* webpackChunkName: "resellerPlanAdd" */  '../views/reseller/plan/Add.vue'),
  },
  {
    path: '/reseller/relation',
    name: 'resellerRelation',
    component: () => import(/* webpackChunkName: "resellerRelation" */  '../views/reseller/Relation.vue'),
  },

]
