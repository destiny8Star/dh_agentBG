<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">智慧客运</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">

                        <div class="home-title">
                            <span class="home-title-t ly-title">产品介绍</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">用户通过扫码墙、商户小程序或购票机自助进行购票，获取并使用电子票即可完成验票乘车，免去排队等候造成的人员滞留，提升整体地面出行效率。</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/passenger1.png" alt="" class="introduce">
                        </el-row>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">同时通过小程序多种能力开放，有效减少用户操作流程的同时协助商户为用户提供更多实用服务，如微信一键注册登录、实名授权、小程序模板消息等。</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/passenger2.png" alt="" class="introduce">
                        </el-row>
                        <el-row>
                            <img src="../../assets/img/industrySolution/passenger3.png" alt="" class="introduce smallImg">
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
        name: "WisdomPassenger",
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
        width: 50%;
        margin: 24px;
    }
    .smallImg {
        width: 30%;
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
