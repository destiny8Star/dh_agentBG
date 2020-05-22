<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">智慧航空</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">

                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">
                                随着人们生活水平的不断提高和消费观念的日益转变,选择乘机出行的消费者越来越多。我们希望基于微信支付及支付+能力，通过服务通知，让航空公司可以更好更有效的触达到旅客，直接为旅客提供航空出行各个场景的服务，让旅客享受一站式航空出行的智慧服务体验。</p>
                        </div>

                        <div class="home-title">
                            <span class="home-title-t ly-title">快速注册常旅客会员</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">
                                利用微信用户信息授权组件，通过旅客授权的方式，可以快速注册航空公司账户以及航空公司会员卡，免去了传统注册时填写各类注册信息和验证的环节。注册后可自动将会员卡添加到用户的卡包中，帮助旅客提升航司会员卡使用和管理的效率。</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/aviation1.png" alt="" class="introduce smallImg">
                        </el-row>

                        <div class="home-title">
                            <span class="home-title-t ly-title">一键订阅行程服务通知</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">
                                引导用户主动订阅服务通知，在旅客出行过程中的各个场景，航空公司可以借助微信强大的场景服务触达能力，为旅客提供贴心的服务，让旅客感受智能的出行体验。</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/aviation2.png" alt="" class="introduce">
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
