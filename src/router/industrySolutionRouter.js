export default [
    {
        path: '/wisdomParking',
        name: 'wisdomParking',
        component: () => import(/* webpackChunkName: "wisdomParking" */ '../views/industrySolution/WisdomParking.vue'),
        meta: {
            group_name: "智慧停车",
            menu_name: "智慧停车",
            file: "views/industrySolution/wisdomParking.vue",
        },
    },
    {
        path: '/educationExpends',
        name: 'educationExpends',
        component: () => import(/* webpackChunkName: "educationExpends" */  '../views/industrySolution/EducationExpends.vue'),
        meta: {
            group_name: "教育缴费",
            menu_name: "教育缴费",
            file: "views/industrySolution/EducationExpends.vue",
        },
    },
    {
        path: '/campusCard',
        name: 'campusCard',
        component: () => import(/* webpackChunkName: "campusCard" */  '../views/industrySolution/CampusCard.vue'),
        meta: {
            group_name: "电子校园卡",
            menu_name: "电子校园卡",
            file: "views/industrySolution/CampusCard.vue",
        },
    },
    {
        path: '/medicalService',
        name: 'medicalService',
        component: () => import(/* webpackChunkName: "medicalService" */ '../views/industrySolution/MedicalService.vue'),
        meta: {
            group_name: "医疗服务",
            menu_name: "医疗服务",
            file: "views/industrySolution/MedicalService.vue",
        },
    },
    {
        path: '/medicarePayments',
        name: 'medicarePayments',
        component: () => import(/* webpackChunkName: "medicarePayments" */  '../views/industrySolution/MedicarePayments.vue'),
        meta: {
            group_name: "微信医保支付",
            menu_name: "微信医保支付",
            file: "views/industrySolution/MedicarePayments.vue",
        },
    },
    {
        path: '/wisdomAviation',
        name: 'WisdomAviation',
        component: () => import(/* webpackChunkName: "WisdomAviation" */  '../views/industrySolution/WisdomAviation.vue'),
        meta: {
            group_name: "智慧航空",
            menu_name: "智慧航空",
            file: "views/industrySolution/WisdomAviation.vue",
        },
    },
    {
        path: '/smartGasStation',
        name: 'SmartGasStation',
        component: () => import(/* webpackChunkName: "SmartGasStation" */  '../views/industrySolution/SmartGasStation.vue'),
        meta: {
            group_name: "智慧加油站",
            menu_name: "智慧加油站",
            file: "views/industrySolution/SmartGasStation.vue",
        },
    },
    {
        path: '/wisdomScenic',
        name: 'WisdomScenic',
        component: () => import(/* webpackChunkName: "WisdomScenic" */  '../views/industrySolution/WisdomScenic.vue'),
        meta: {
            group_name: "智慧景区",
            menu_name: "智慧景区",
            file: "views/industrySolution/WisdomScenic.vue",
        },
    },
    {
        path: '/wisdomHighSpeed',
        name: 'WisdomHighSpeed',
        component: () => import(/* webpackChunkName: "WisdomHighSpeed" */  '../views/industrySolution/WisdomHighSpeed.vue'),
        meta: {
            group_name: "智慧高速",
            menu_name: "智慧高速",
            file: "views/industrySolution/WisdomHighSpeed.vue",
        },
    },
    {
        path: '/wisdomTravel',
        name: 'WisdomTravel',
        component: () => import(/* webpackChunkName: "WisdomTravel" */  '../views/industrySolution/WisdomTravel.vue'),
        meta: {
            group_name: "智慧出行",
            menu_name: "智慧出行",
            file: "views/industrySolution/WisdomTravel.vue",
        },
    },
    {
        path: '/wisdomPassenger',
        name: 'WisdomPassenger',
        component: () => import(/* webpackChunkName: "WisdomPassenger" */  '../views/industrySolution/WisdomPassenger.vue'),
        meta: {
            group_name: "智慧客运",
            menu_name: "智慧客运",
            file: "views/industrySolution/WisdomPassenger.vue",
        },
    }
]