<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">医疗服务</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="home-title">
                            <span class="home-title-t ly-title">产品介绍</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">针对当前医疗资源错配、老百姓看病难、排队多、医患关系紧张等难题，点击生活对接支付宝提供多种便捷的支付解决方案，希望与服务商合作共同解决传统就医过程中“三长一短”难题，让看病就医更简单。服务商可以通过线下支付（当面付）和生活号等产品快速抢占线下医疗健康场景，服务各级医疗机构，改善用户就医购药体验，提升医疗机构服务效率。</p>
                        </div>
                        <div class="home-title">
                            <span class="home-title-t ly-title">准备资料</span>
                        </div>
                         <ol class="ly-introduce-text">
                             <li v-for="(ele,i) in prepareList" :key="i" style="margin-left: -4px">
                                 <p>&nbsp;{{ele.desc}}</p>
                             </li>
                         </ol>
                        <div class="home-title">
                            <span class="home-title-t ly-title">费率标准</span>
                        </div>
                        <ul class="ly-introduce-text">
                            <li v-for="(ele,i) in rateList" :key="i">
                                <p>{{ele.desc}}</p>
                            </li>
                        </ul>
                        <div class="home-title">
                            <span class="home-title-t ly-title">签约及开发</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">医疗服务的签约及开发由点击生活对接支付宝完成，通过线下支付（当面付）和生活号等产品快速抢占线下医疗健康场景，服务各级医疗机构，改善用户就医购药体验，提升医疗机构服务效率。</p>
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
        name: "MedicalService",
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
            return {
                prepareList: [
                    {title: "会员营销能力", desc: "可以收发邮件的电子邮箱"},
                    {title: "支付宝权益发放能力", desc: "可以收发短信的手机联系号码"},
                    {title: "会员结算能力", desc: "医院事业单位法人证书（原件的拍照件，或复印件加盖医院公章后的拍照件）"},
                    {title: "经营数据能力", desc: "医院组织机构代码证（原件的拍照件，或复印件加盖医院公章后的拍照件）"},
                    {title: "用户触达能力", desc: "医院法人身份证（原件的拍照件，或复印件加盖医院公章后的拍照件）"},
                    {title: "低成本接入", desc: "医疗机构执业许可证（原件的拍照件，或复印件加盖医院公章后的拍照件）"},
                    {title: "低成本接入", desc: "医院对公银行账户（账户名、账号、开户行信息，且可以向外打款）"},
                    {title: "低成本接入", desc: "医院联系人信息（姓名、电话）"}
                ],
                rateList: [
                    { desc: "公立医院（事业单位类型）均为0费率；"},
                    { desc: "私立医院、药店（企业类型）费率均为标准费率。"}
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
