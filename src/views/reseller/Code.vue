<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">二维码下载</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="itemBox">
                           <!-- <div class="item">
                                <el-row>
                                    <img src="../../assets/img/home/paylogo.png" alt="" class="download">
                                </el-row>
                                <el-button type="primary" @click="downloadClick">直接下载</el-button>
                            </div>-->
                            <div class="item">
                                <div id="qrCode" ref="qrCodeDiv" class="download"></div>
                                <!--<el-button type="text" style="color: #333">扫码分享</el-button>-->
                            </div>
                        </div>
                        <div class="home-title">
                            <span class="home-title-t ly-title">说明</span>
                        </div>
                        <ol class="ly-introduce-text">
                            <li v-for="(ele,i) in explainList" :key="i">
                                <p>&nbsp;<span>{{ele.title}}</span>{{ele.desc}}</p>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2';
    export default {
        name: "code",
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
            return {
                // http://files.pay.dianjishenghuo.cn/%E5%88%B7%E4%BA%86%E4%B9%88%E5%90%88%E4%BC%99%E4%BA%BA_%E7%BA%BF%E4%B8%8A1.0.0.apk
                downLink: '',//下载地址
                explainList: [
                    {title: "", desc: "此二维码为开通分销商H5二维码，用于分销商扫码支付开通账号；"},
                    {title: "", desc: "可“点击右键”→“点击图片另存为”，保存二维码图片，供分享使用。"},
                    // {title: "", desc: "二维码支付金额为定额收款，金额为800元，若需修改，请联系点击生活工作人员；"},
                    // {title: "", desc: "本二维码支持支付宝、微信扫码。"}
                ]
            }
        },
        methods:{
            /**
             * 下载app
             */
            downloadClick(){
                window.location.href = this.downLink;
            },
            /**
             * 获取二维码
             */
            getQrCode(){
                //this.downLink = 'http://test-wxauth.dianjishenghuo.cn' + '/agent/public/wx/getCode?agentSubjectId=' + this.$ls.get("agentSubjectId");
                 this.downLink = this.$webConfig.apiHost + '/agent/public/wx/getCode?agentSubjectId=' + this.$ls.get("agentSubjectId");
                console.log(this.downLink);
                this.bindQRCode();
            },
            /**
             * 生成二维码
             */
            bindQRCode: function () {
                let _this = this;
                new QRCode(this.$refs.qrCodeDiv, {
                    text: _this.downLink,
                    width: 140,
                    height: 140,
                    colorDark: "#333333", //二维码颜色
                    colorLight: "#ffffff", //二维码背景色
                    correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
                })
            }
        },
        mounted(){
            //获取二维码
            this.getQrCode();
        }
    }
</script>

<style scoped>
    .home-title {
        margin-top: 20px;
    }
    .ly-title {
        font-weight: 900;
    }
    .itemBox {
        display: flex;
        align-items: flex-start;
    }
    .item {
        /*min-height: 204px;*/
        text-align: center;
        padding: 30px 26px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin: 40px 20px 10px;
    }
    .download {
        width: 140px;
        height: 140px;
        /*margin-bottom: 20px;*/
    }
</style>