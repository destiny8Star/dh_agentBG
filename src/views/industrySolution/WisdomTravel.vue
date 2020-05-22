<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">智慧出行</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">

                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">城市公共交通是城市基础设施的重要组成部分，也是最能反映城市智慧化建设进程的核心场景。借助微信强大的连接能力和产品能力，以小程序、微信支付和卡包为基础，提出城市公共交通升级版解决方案，为广大用户提供高效、便捷、贴心的出行体验。</p>
                        </div>

                        <div class="home-title">
                            <span class="home-title-t ly-title">产品介绍</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">扫码乘车满足双离线行业特点的公交地铁实体卡电子化解决方案全面提升用户乘车体验，并同时支持预付费及后费付两种支付方式，针对后付费方式，微信支付还向商户提供免密支付及用户支付失败情况下的垫资能力，整体解决公交地铁行业排队购票与现金管理问题。
                            </p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/travel1.png" alt="" class="introduce">
                        </el-row>
                        <el-row>
                            <img src="../../assets/img/industrySolution/travel2.png" alt="" class="introduce">
                        </el-row>

                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">用户扫码乘车扣款成功，资金T+1结算至收款主体，若用户扫码扣款失败微信支付则进行先行垫付，确保商户当天所有交易资金仍T+1全额结算至收款主体。</p>
                        </div>

                        <el-button type="primary" @click="apply" style="margin: 20px 0 0 30px">对接请联系我们 <i class="el-icon-d-arrow-right"></i></el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WisdomTravel",
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
