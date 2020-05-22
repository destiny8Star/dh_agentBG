<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <!--<div class="third-nav">
                <div class="third-nav-t">APP下载</div>
            </div>-->
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <h1 class="ly-title-one">APP下载</h1>
                        <div class="itemBox">
<!--                            <div class="item">-->
<!--                                <el-row>-->
<!--                                    <img src="../../assets/img/home/paylogo.png" alt="" class="download">-->
<!--                                </el-row>-->
<!--                                <el-button type="primary" @click="downloadClick">直接下载</el-button>-->
<!--                            </div>-->
                            <div class="item">
                                <div id="qrCode" ref="qrCodeDiv" class="download"></div>
                                <el-button type="text" style="color: #333">扫码下载</el-button>
                                <spa> 或 </spa>
                                <el-button type="text" @click="downloadClick">点此下载</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2';
    export default {
        name: "down",
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
            return {
                // http://files.pay.dianjishenghuo.cn/%E5%88%B7%E4%BA%86%E4%B9%88%E5%90%88%E4%BC%99%E4%BA%BA_%E7%BA%BF%E4%B8%8A1.0.0.apk
                downLink: '',//下载地址
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
                this.$axios.get('/agent/sys/constant/app/download',).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.downLink = res.data.data;
                    } else {
                        this.$message(res.data.message);
                    }
                }).then( res => {
                    this.$nextTick(function () {
                        this.bindQRCode();
                    })
                })
                    .catch(() => {

                    });
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
    .itemBox {
        display: flex;
        align-items: flex-start;
    }
    .item {
        min-height: 204px;
        text-align: center;
        padding: 30px 26px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin: 40px 20px 10px;
    }
    .download {
        width: 140px;
        height: 140px;
        margin-bottom: 20px;
    }
</style>
