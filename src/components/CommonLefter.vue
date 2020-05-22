<template>
    <div class="first-nav" id="first-nav" v-bind:style="{height: (getWinHeight-60)+'px' }">
        <div class="first-nav-main">
            <el-row class="tac">
                <el-col>
                    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen"
                             @close="handleClose" :unique-opened="false" :router="uniqueOpened"
                             :default-openeds="defaultOpeneds">
                        <template v-for="navItem in navData">

                            <!-- 只有一级导航 start -->
                            <el-menu-item v-if="!navItem.children && navItem.url==='#'" class="special-item">
                                <template slot="title">
                                    <span>{{navItem.name}}</span>
                                    <img v-if="navItem.tag" :src="mapTag[navItem.tag]" alt=""
                                         class="ly-el-menu-item-sign">
                                </template>
                            </el-menu-item>
                            <!-- 只有一级导航 end -->

                            <!-- 连接外网 start -->
                            <el-menu-item :index="navItem.url.indexOf('http')==-1?navItem.url:null"
                                          @click="toOutLink(navItem.url)"
                                          v-else-if="!navItem.children && navItem.url!=='#'">
                                <template slot="title">
                                    <img :src="navItem.ico_url" class="title-icon-svg"
                                         v-if="navItem.ico_url.indexOf('http')!=-1">
                                    <img :src="require(`../assets/img/nav/${navItem.ico_url}`)" class="title-icon-svg"
                                         v-else>
                                    <span>{{navItem.name}}</span>
                                    <img v-if="navItem.tag" :src="mapTag[navItem.tag]" alt=""
                                         class="ly-el-menu-item-sign">
                                </template>
                            </el-menu-item>
                            <!-- 连接内网 end -->

                            <!-- 拥有子集的导航 start -->
                            <el-submenu :index="navItem.depth+'-'+navItem.id" v-else>
                                <template slot="title">
                                    <img :src="navItem.ico_url" class="title-icon-svg"
                                         v-if="navItem.ico_url.indexOf('http')!=-1">
                                    <img :src="require(`../assets/img/nav/${navItem.ico_url}`)" class="title-icon-svg"
                                         v-else>
                                    <span>{{navItem.name}}</span>
                                    <img v-if="navItem.tag" :src="mapTag[navItem.tag]" alt=""
                                         class="ly-el-menu-item-sign">
                                </template>
                                <template v-for="childItem in navItem.children">
                                    <el-menu-item :index="childItem.url.indexOf('http')==-1?childItem.url:null"
                                                  v-if="!childItem.children" @click="toOutLink(childItem.url)">
                                        <span>{{childItem.name}}</span>
                                        <img v-if="childItem.tag" :src="mapTag[childItem.tag]" alt=""
                                             class="ly-el-menu-item-sign">
                                    </el-menu-item>
                                    <el-submenu :index="childItem.depth+'-'+childItem.id" v-else>
                                        <template slot="title">{{childItem.name}}</template>
                                        <el-menu-item
                                                :index="childChildItem.url.indexOf('http')==-1?childChildItem.url:null"
                                                @click="toOutLink(childChildItem.url)"
                                                v-for="childChildItem in childItem.children">
                                            <span>{{childChildItem.name}}</span>
                                            <img v-if="childChildItem.tag" :src="mapTag[childChildItem.tag]" alt=""
                                                 class="ly-el-menu-item-sign">
                                        </el-menu-item>
                                    </el-submenu>
                                </template>
                            </el-submenu>
                            <!-- 拥有子集的导航 end -->

                        </template>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import ico_sc from '../assets/img/sc.svg'
    import ico_mp from '../assets/img/mp.svg'
    import ico_wm from '../assets/img/wm.svg'

    export default {
        name: "CommonLefter",
        data: function () {
            return {
                mapTag: {0: '0', 1: require('../assets/img/nav/hot.svg'), 2: require('../assets/img/nav/new.svg')},//标识【0：不显示，1：火，2：666】
                // mapTag: {0:'0',1:require('../assets/img/nav/hot@2x.png'),2:require('../assets/img/nav/new@2x.png')},//标识【0：不显示，1：火，2：666】
                uniqueOpened: true,
                icos: {ico_sc: ico_sc, ico_mp: ico_mp, ico_wm: ico_wm},
                /* navData: [
                     {
                         "id": 1,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "首页",
                         "url": "/home",
                         "tag": 1,
                         "ico_url": "home@2x.png",
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": null
                     },
                     {
                         "id": 2,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "团队管理",
                         "url": "",
                         "tag": 1,
                         "ico_url": "team@2x.png",
                         "agent_level_index": 3,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": [
                             {
                                 "id": 21,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 2,
                                 "name": "分润团队",
                                 "url": "/team/Share",
                                 "ico_url": "",
                                 "tag": 1,
                                 "agent_level_index": 3,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             },
                             {
                                 "id": 22,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 2,
                                 "name": "我的推荐",
                                 "url": "/team/Recommend",
                                 "ico_url": "",
                                 "tag": 1,
                                 "agent_level_index": 3,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             }
                         ]
                     },
                     {
                         "id": 3,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "商户管理",
                         "url": "",
                         "ico_url": "shanghumange@2x.png",
                         "tag": 1,
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": [
                             {
                                 "id": 31,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 5,
                                 "name": "商户列表",
                                 "url": "/merchant/list",
                                 "ico_url": "",
                                 "tag": 1,
                                 "agent_level_index": 4,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             },
                             {
                                 "id": 32,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 5,
                                 "name": "添加商户",
                                 "url": "/merchant/add",
                                 "ico_url": "",
                                 "tag": 0,
                                 "agent_level_index": 4,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             }
                         ]
                     },
                     {
                         "id": 4,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "服务商管理",
                         "url": "",
                         "tag": 0,
                         "ico_url": "fenxiao@2x.png",
                         "agent_level_index": 3,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": [
                             {
                                 "id": 41,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 8,
                                 "name": "服务商列表",
                                 "url": "/distributor/list",
                                 "ico_url": "",
                                 "tag": 0,
                                 "agent_level_index": 3,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             },
                             {
                                 "id": 42,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 8,
                                 "name": "服务商添加",
                                 "url": "/distributor/add",
                                 "ico_url": "",
                                 "tag": 1,
                                 "agent_level_index": 3,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             }
                         ]
                     },
                     {
                         "id": 1012,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "分销管理",
                         "url": "",
                         "tag": 2,
                         "ico_url": "fxs@2x.png",
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": [
                             {
                                 "id": 1014,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 1012,
                                 "name": "分销码",
                                 "url": "/reseller/code",
                                 "ico_url": "",
                                 "tag": 2,
                                 "agent_level_index": 4,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             },
                             {
                                 "id": 1015,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 1012,
                                 "name": "分销方案",
                                 "url": "/reseller/plan",
                                 "ico_url": "",
                                 "tag": 2,
                                 "agent_level_index": 3,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             },
                             {
                                 "id": 1016,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 1012,
                                 "name": "分销关系",
                                 "url": "/reseller/relation",
                                 "ico_url": "",
                                 "tag": 0,
                                 "agent_level_index": 2,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             }
                         ]
                     },
                     {
                         "id": 5,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "设备管理",
                         "url": "/device",
                         "ico_url": "device@2x.png",
                         "tag": 2,
                         "agent_level_index": 3,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                     },
                     {
                         "id": 6,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "广告图管理",
                         "url": "/adImg",
                         "ico_url": "adpm@2x.png",
                         "tag": 2,
                         "agent_level_index": 3,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                     },
                     {
                         "id": 7,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "广告管理",
                         "url": "/ad",
                         "ico_url": "adm@2x.png",
                         "tag": 2,
                         "agent_level_index": 3,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                     },
                     {
                         "id": 8,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "数据中心",
                         "url": "",
                         "ico_url": "center@2x.png",
                         "tag": 2,
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": [
                             {
                                 "id": 81,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 11,
                                 "name": "商户数据",
                                 "url": "/data/merchant",
                                 "ico_url": "",
                                 "tag": 0,
                                 "agent_level_index": 4,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             },
                             {
                                 "id": 82,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 11,
                                 "name": "极差分润",
                                 "url": "/data/range",
                                 "ico_url": "",
                                 "tag": 1,
                                 "agent_level_index": 3,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             },
                             {
                                 "id": 83,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 11,
                                 "name": "区域分红",
                                 "url": "/data/area",
                                 "ico_url": "",
                                 "tag": 1,
                                 "agent_level_index": 2,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             },
                             {
                                 "id": 84,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 11,
                                 "name": "分润结算",
                                 "url": "/data/settlement",
                                 "ico_url": "",
                                 "tag": 1,
                                 "agent_level_index": 4,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             },
                             {
                                 "id": 85,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 11,
                                 "name": "余额流水",
                                 "url": "/data/balanceLog",
                                 "ico_url": "",
                                 "tag": 1,
                                 "agent_level_index": 4,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             }
                         ]
                     },
                     {
                         "id": 9,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "轻商业街",
                         "url": "",
                         "tag": 1,
                         "ico_url": "lightmall@2x.png",
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": [
                             {
                                 "id": 91,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 21,
                                 "name": "商圈管理",
                                 "url": "/tradingArea/list",
                                 "ico_url": "",
                                 "tag": 2,
                                 "agent_level_index": 4,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             },
                             {
                                 "id": 92,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 21,
                                 "name": "创建商圈",
                                 "url": "/tradingArea/setUp",
                                 "ico_url": "",
                                 "tag": 2,
                                 "agent_level_index": 3,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             },
                             {
                                 "id": 93,
                                 "menu_order": 0,
                                 "depth": 2,
                                 "parent_id": 21,
                                 "name": "申请商户",
                                 "url": "/tradingArea/applyList",
                                 "ico_url": "",
                                 "tag": 0,
                                 "agent_level_index": 2,
                                 "del_flag": 1,
                                 "create_time": 0,
                                 "update_time": 0,
                                 "children": null
                             }
                         ]
                     },
                     /!*{
                         "id": 16,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "账号管理",
                         "url": "",
                         "ico_url": "account@2x.png",
                         "tag": 2,
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": null
                     },*!/
                     {
                         "id": 101,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "智慧停车",
                         "url": "/wisdomParking",
                         "ico_url": "park@2x.png",
                         "tag": 2,
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": null
                     },
                     {
                         "id": 102,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "教育缴费",
                         "url": "/educationExpends",
                         "ico_url": "teach@2x.png",
                         "tag": 1,
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": null
                     },
                     {
                         "id": 103,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "电子校园卡",
                         "url": "/campusCard",
                         "ico_url": "schoolcard@2x.png",
                         "tag": 0,
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": null
                     },
                     {
                         "id": 104,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "医疗服务",
                         "url": "/medicalService",
                         "ico_url": "medic@2x.png",
                         "tag": 2,
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": null
                     },
                     {
                         "id": 105,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "微信医保支付",
                         "url": "/medicarePayments",
                         "ico_url": "wcmedic@2x.png",
                         "tag": 2,
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": null
                     },
                     {
                         "id": 107,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "智慧航空",
                         "url": "/wisdomAviation",
                         "tag": 0,
                         "ico_url": "hk@2x.png",
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": null
                     },
                     {
                         "id": 108,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "智慧加油站",
                         "url": "/smartGasStation",
                         "ico_url": "jy@2x.png",
                         "tag": 0,
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": null
                     },
                     {
                         "id": 109,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "智慧景区",
                         "url": "/wisdomScenic",
                         "ico_url": "jq@2x.png",
                         "tag": 2,
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": null
                     },
                     {
                         "id": 1010,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "智慧高速",
                         "url": "/wisdomHighSpeed",
                         "ico_url": "gs@2x.png",
                         "tag": 2,
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": null
                     },
                     {
                         "id": 1011,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "智慧出行",
                         "url": "/wisdomTravel",
                         "ico_url": "cx@2x.png",
                         "tag": 0,
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": null
                     },
                     {
                         "id": 1011,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "智慧客运",
                         "url": "/wisdomPassenger",
                         "ico_url": "ky@2x.png",
                         "tag": 0,
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": null
                     },
                     {
                         "id": 106,
                         "menu_order": 0,
                         "depth": 1,
                         "parent_id": 0,
                         "name": "APP下载",
                         "url": "/download",
                         "ico_url": "download@2x.png",
                         "tag": 2,
                         "agent_level_index": 4,
                         "del_flag": 1,
                         "create_time": 0,
                         "update_time": 0,
                         "children": null
                     }
                 ],*/
                navData: [],
                navDataExtend: [
                    {
                        id: 10000, name: '综合体(深度定制)', url: '', depth: 1, ico_url: 'superm@2x.png',
                        children: [
                            {
                                id: 11000, name: '系统管理', url: '', depth: 2, ico_url: '',
                                children: [
                                    {
                                        id: 11001,
                                        name: '基础信息',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 11002,
                                        name: '素材管理',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 11003,
                                        name: '微信配置',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 11004,
                                        name: '消息配置',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 11005,
                                        name: '支付宝配置',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                ]
                            },
                            {
                                id: 12000, name: '平台管理', url: '', depth: 2, ico_url: '',
                                children: [
                                    {
                                        id: 12001,
                                        name: '店铺管理',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 12002,
                                        name: '业态管理',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 12003,
                                        name: '街区管理',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 12004,
                                        name: '卡券管理',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 12005,
                                        name: '会员管理',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 12006,
                                        name: '停车缴费',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 12007,
                                        name: '数据记录',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 12008,
                                        name: '抽奖管理',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 12009,
                                        name: '公告管理',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 12010,
                                        name: '分析报告',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 12011,
                                        name: '营销管理',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                ]
                            },
                            {
                                id: 13000, name: '商城管理', url: '', depth: 2, ico_url: '',
                                children: [
                                    {
                                        id: 13001,
                                        name: '商品管理',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 13002,
                                        name: '订单管理',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 13003,
                                        name: '快递管理',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 13004,
                                        name: '评论管理',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                    {
                                        id: 13005,
                                        name: '卡券商城',
                                        url: 'http://ss.pay.dianjishenghuo.cn',
                                        depth: 3,
                                        ico_url: ''
                                    },
                                ]
                            },
                        ]
                    }
                ],
                defaultOpeneds: [],
            }
        },
        //计算属性，可缓存值，没有变化不会重新计算结果
        computed: {
            getWinHeight() {
                return this.$winHeight;
            }
        },
        mounted: function () {
            this.loadMenu();
        },
        methods: {
            loadMenu() {
                this.$axios.get("/agent/menu/getMenu").then(res => {
                    this.navData = res.data.data;
                    if (this.navData) {
                        if (this.$webConfig.isZHT && this.$webConfig.isZHT == 1) {
                            this.navData = [...res.data.data, ...this.navDataExtend];
                        } else {
                            this.navData = [...res.data.data];
                        }
                        this.navData.forEach(item => {
                            if (item.children) {
                                this.defaultOpeneds.push(item.depth + '-' + item.id);
                                item.children.forEach(m => {
                                    this.defaultOpeneds.push(m.depth + '-' + m.id);
                                })
                            }
                        })
                    }
                })
            },
            toOutLink(url) {
                if (url.indexOf('http') == -1) {
                    return;
                }
                window.open(url);
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style type="text/css" scoped>
    .special-item {
        background: #108ee9;
        font-size: 18px;
        font-weight: bold;
    }

    .special-item span {
        color: #ffffff;
    }

    .special-item:hover {
        background: #108ee9;
    }

    .special-item:focus {
        background: #108ee9;
    }
</style>
