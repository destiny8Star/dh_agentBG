<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">微信医保支付</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="home-title">
                            <span class="home-title-t ly-title">产品介绍</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">微信医保支付方案，连接人社、医院、用户，全面打通医保移动支付，助力人社服务升级，百姓生活更便捷。面向人社，基于人社原有系统轻量升级，连接服务、精准触达，助力智慧人社有效落地。面向医院，医院无需重复开发，即可打通医保移动支付，助力解决“三长一短”难题，真正实现医保患者的便捷就医，完善医疗服务体系，助力医院的智慧化升级。</p>
                        </div>
                        <div class="home-title">
                            <span class="home-title-t ly-title">方案一     微信电子社保卡</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">微信电子社保卡，将社保卡与微信支付实名ID绑定，即可实现便捷的在线移动医保支付、在线查询、缴费等服务，一次绑卡，为用户带来便捷、安全的社保服务新体验。</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/pay1.png" alt="" class="introduce">
                        </el-row>
                        <div class="home-title">
                            <span class="home-title-t ly-title">方案二     居民养老保险</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">每个县市的资金分别入户到各自县市的账户。用户通过腾讯提供的人脸识别能力进行实名认证。</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/pay2.png" alt="" class="introduce">
                        </el-row>
                        <div class="home-title">
                            <span class="home-title-t ly-title">方案三     实名认证养老金领取</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">接入腾讯“人脸识别”套件，输入身份证照片和录制3—6秒视频，即可完成次年养老金领取资格验证。</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/pay3.png" alt="" class="introduce">
                        </el-row>
                        <div class="home-title">
                            <span class="home-title-t ly-title">方案四    人社大厅办事预约</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">通过微信公众号为用户提供办事预约、排队情况查询等服务，减少人社大厅排队等待时间。</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/pay4.png" alt="" class="introduce">
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
        name: "MedicarePayments",
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
            return {
                featureList: [
                    {title: "会员营销能力", desc: "作为差异化会员营销工具，用户通过芝麻信用或者花呗额度冻结，可以先享受会员权益，后付会员费，有利于降低新客决策门槛提转化，锁定用户消费频次。"},
                    {title: "支付宝权益发放能力", desc: "支持配置支付宝“全场代金券”和“全场折扣券”，且可进入支付宝卡包查看，增加商家影响力和用户回购率。"},
                    {title: "会员结算能力", desc: "会员周期到期后帮商家结算，首扣花呗，商家无后顾之忧。"},
                    {title: "经营数据能力", desc: "提供全方面轻会员营销数据，帮助商家决策。"},
                    {title: "用户触达能力", desc: "支付宝触达提醒，帮助商家触达用户获得二次交易。"},
                    {title: "低成本接入", desc: "后台简易配置，会员营销随时上线。"}
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


