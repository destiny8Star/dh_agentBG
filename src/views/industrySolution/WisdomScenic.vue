<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">智慧景区</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">

                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">随着自由行的占比越来越高，旅游用户趋向年轻化，对旅游品质要求越来越高。点击生活基于微信生态能力，将基础服务产品化，提升旅游服务效率，优化游客体验；基于微信平台建立营销通道，有利于提升营销效率，降低获客成本。
                            </p>
                        </div>

                        <div class="home-title">
                            <span class="home-title-t ly-title">支付前扫码领优惠</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">【扫码优惠】线下扫码购门票，景区内游客三步走：扫码、领券、付款核销</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/scenic1.png" alt="" class="introduce">
                        </el-row>

                        <div class="home-title">
                            <span class="home-title-t ly-title">支付后流量</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">入园购票+园内全场代金卷【拉动景区内游客二次消费】</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/scenic2.png" alt="" class="introduce">
                        </el-row>

                        <div class="home-title">
                            <span class="home-title-t ly-title">智慧景区-刷脸入园</span>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/scenic3.png" alt="" class="introduce">
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
        name: "WisdomScenic",
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
