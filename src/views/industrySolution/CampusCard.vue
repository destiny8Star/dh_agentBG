<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">电子校园卡</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="home-title">
                            <span class="home-title-t ly-title">产品介绍</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">通过支付宝领取一张虚拟的电子校园卡，使用场景与实体卡一致，具有实体卡相同的校园功能权限。</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/schoolCard1.png" alt="" class="introduce">
                        </el-row>
                        <div class="home-title">
                            <span class="home-title-t ly-title">产品特色</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">学校可以根据需求，展示校园卡展示的内容，由学校定义，学生可直接在支付宝客户端进行领卡、消费等操作，简单方便。</p>
                        </div>
                        <div class="home-title">
                            <span class="home-title-t ly-title">产品架构</span>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/schoolCard2.png" alt="" class="introduce">
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
        name: "CampusCard",
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
