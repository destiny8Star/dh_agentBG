import Vue from 'vue'
import Router from 'vue-router'
import homeRouter from "./router/homeRouter";
import accountRouter from "./router/accountRouter";//我的账户模块
import teamRouter from "./router/teamRouter";//团队模块
import merchantRouter from "./router/merchantRouter"; //商户模块
import distributor from './router/distributorRouter'; //分销商模块
import dataRouter from "./router/dataRouter";//数据中心模块
import tradingAreaRouter from "./router/tradingAreaRouter";//轻商业街模块
import deviceRouter from "./router/deviceRouter";//轻商业街模块
import adRouter from "./router/adRouter";//广告管理模块
import industrySolutionRouter from "./router/industrySolutionRouter";//行业方案模块
import resellerRouter from "./router/resellerRouter";//分销模块

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '*', name: '404', component: () => import(/* webpackChunkName: "404" */ "./views/NotFound.vue")
        },
        {
            path: '/', name: 'logon', component: () => import(/* webpackChunkName: "logon" */ "./views/Logon.vue")
        },
        {
            path: '/logon2',
            name: 'logon2',
            component: () => import(/* webpackChunkName: "logon2" */ "./views/Logon2.vue")
        },
        {
            path: '/resellerInfo',
            name: 'resellerInfo',
            component: () => import(/* webpackChunkName: "resellerInfo" */ "./views/resellerInfo.vue")
        },
        {
            path: '/agent', name: 'agent', component: () => import(/* webpackChunkName: "agent" */ "./views/Agent.vue"),
            children: [...homeRouter, ...accountRouter, ...teamRouter, ...merchantRouter, ...distributor, ...dataRouter, ...tradingAreaRouter, ...deviceRouter, ...adRouter, ...industrySolutionRouter, ...resellerRouter]
        }
    ]
})

router.beforeEach((to, from, next) => {
    let user = Vue.ls.get(Vue.webConfig.authTokenName);
    if (!user) {
        if (to.name == 'logon') {
            next()
        } else {
            next({name: 'logon'})
        }
    }else {
        next();
    }
});

export default router