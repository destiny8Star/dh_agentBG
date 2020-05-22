<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">智慧加油站</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">

                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">
                                加油站是有车一族的必经站，也是传统流程比较根深蒂固的一个行业。点击生活借助微信支付+支付宝能力，为加油站管理者和广大车主提供更多高效便捷的方案，全面提升加油站经营效率的同时也提升车主的加油体验。</p>
                        </div>

                        <div class="home-title">
                            <span class="home-title-t ly-title">无感停车</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">
                                用户进入无感加油专属通道完成车辆识别，加油工与用户确认服务信息和车牌信息，加油完毕通过微信支付自动扣费离场。</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/gas1.png" alt="" class="introduce">
                        </el-row>

                        <div class="home-title">
                            <span class="home-title-t ly-title">刷脸支付</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">
                                与传统加油流程一致，加油完成使用刷脸支付完成油费支付，为加油站商户解决现金带来的资金管理成本等问题，用户还可通过微信支付消费通知、支付宝账单查询在该加油站的历史加油记录。</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/gas2.png" alt="" class="introduce">
                        </el-row>
                        <div class="home-title">
                            <span class="home-title-t ly-title">实体加油卡自助充值</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">用户通过加油站应用或第三方提供的加油卡充值入口对已有实体加油卡进行充值，选择微信支付完成线上支付充值操作，在线下或使用自助圈存设备完成圈存后即可直接使用。
                            </p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/gas3.png" alt="" class="introduce">
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
        name: "WisdomAviation",
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
    .smallImg {
        width: 30%;
        margin-left: 14%;
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
