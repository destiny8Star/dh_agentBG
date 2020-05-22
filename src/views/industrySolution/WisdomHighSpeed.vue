<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">智慧高速</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">

                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">在高速ETC车道用户使用扫码支付或无感支付完成高速缴费，提升高速整体通行效率的同时降低人工投入成本，全面助力交通高速行业为用户提供更加智能、便捷的缴费服务</p>
                        </div>

                        <div class="home-title">
                            <span class="home-title-t ly-title">ETC空发无感支付</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">对于已持有ETC卡用户，在线将车牌及ETC卡信息进行微信车主服务授权并开通无感支付，当ETC账户余额不足会自动从用户绑定的微信支付扣款账户进行高速费用支付，减少因ETC余额不足造成的收费口拥堵，有效提升ETC通道通行效率。</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/highSpeed1.png" alt="" class="introduce">
                        </el-row>

                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">对于未开通ETC卡的用户，可以通过线上发卡渠道进行硬件申请并完成微信车主服务开通及授权，收到硬件自行粘贴安装完成后即可随时在高速ETC通道无感通行。</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/highSpeed2.png" alt="" class="introduce">
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
        name: "WisdomHighSpeed",
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
