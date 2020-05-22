<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">智慧停车</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">


                        <div class="home-title">
                            <span class="home-title-t ly-title">产品介绍</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">
                                支付宝停车缴费解决方案，面向停车场业主方及车主用户，提供使用支付宝便捷查询和缴纳停车费用、减少现金支付、提升停车场通行效率的解决方案。停车系统通过接入停车缴费解决方案，可获得更多场景入口能力、更直接的用户触达能力、更高效的支付能力。</p>
                        </div>


                        <div class="home-title">
                            <span class="home-title-t ly-title">产品特色</span>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/park1.png" alt="" class="introduce">
                        </el-row>
                        <ul class="ly-introduce-text">
                            <li v-for="(ele,i) in featureList" :key="i">
                                <p>{{ele.desc1?ele.desc1:''}}<span>{{ele.boldText1?ele.boldText1:''}}</span>{{ele.desc2?ele.desc2:''}}<span>{{ele.boldText2?ele.boldText2:''}}</span></p>
                            </li>
                        </ul>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">
                                该方案用户认知程度高，投入产出比相对平衡。支付宝在该业界通用方案基础上，结合支付宝移动支付、大数据等能力，提供用户入场欢迎、丰富场景连接等增强功能。</p>
                        </div>


                        <div class="home-title">
                            <span class="home-title-t ly-title">应用案例</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">
                                解决方案：用户在停车缴费应用中查询附近智慧停车场做导航规划，车辆入场后用户可在应用中输入车牌即可在线查询停车费用并完成支付，极大降低出场时间和成本，B端管理效率大幅提升。已绑定车牌的用户入场还可收到推送。</p>
                            <p>参考示例（从左到右分别为图1、图2、图3、图4）：</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/park2.png" alt="" class="introduce">
                        </el-row>
                        <el-button type="primary" @click="apply" style="margin: 20px 0 0 30px">对接请联系我们 <i class="el-icon-d-arrow-right"></i></el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WisdomParking",
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
            return {
                featureList: [
                    {boldText1: null,boldText2: null, desc1: "用户基于停车场上报的收费价格、空闲车位等信息做出行前规划决策，通过支付宝平台解决信息不对称问题为停车场精准导流。", desc2: null},
                    {boldText1: "在线提前完成缴费",boldText2: "对于离场效率的提升有极高的价值。", desc1: "用户准备离场的时候，可以提前在线通过输入车牌号查询实时停车费用，并", desc2: "，当用户开车到达离场岗亭时无需进行核费、缴费找零等动作，直接抬杆放行。此方案引导用户将原本堵在出口的动作提前完成，"}
                ]
            }
        },
        methods: {
            apply() {
                this.$message('敬请期待…')
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .ly-title {
        /*font-size: 16px;*/
        font-weight: 900;
    }

    .introduce {
        width: 60%;
        margin: 24px;
    }

    .ly-introduce-text {
        width: 60%;
        line-height: 22px;
    }

    .ly-introduce-text span {
        font-weight: 600;
    }

    ul {
        list-style-type: circle;
    }
</style>
