<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">教育缴费</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="home-title">
                            <span class="home-title-t ly-title">产品介绍</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;">
                                中小学教育缴费是由支付宝推出的一款平台型的教育缴费产品，包括了教育缴费客户端、教育缴费账单平台以及教育缴费系统。支付宝提供教育缴费客户端和账单平台，幼儿园、中小学老师使用教育缴费系统向学生家长发送账单进行收费，学生家长使用支付宝内的教育缴费客户端进行缴费，而账单平台采用开放平台的方式与教育缴费服务商的系统对接。</p>
                        </div>
                        <div class="home-title">
                            <span class="home-title-t ly-title">产品特色</span>
                        </div>
                        <div class="ly-introduce-text">
                            <p style="text-indent: 2em;"> 借助支付宝客户端海量的用户数，教育缴费能够全面覆盖学生家长，补充服务商客户端能力；同时教育缴费账单平台通过开放平台的方式与行业内所有的服务商对接，共同为教育行业的客户提供服务。</p>
                        </div>
                        <el-row>
                            <img src="../../assets/img/industrySolution/jiaoyu.png" alt="" class="introduce">
                        </el-row>

                        <div class="home-title">
                            <span class="home-title-t ly-title">应用场景</span>
                        </div>
                         <ol class="ly-introduce-text">
                             <p>教育缴费服务从服务商开始系统对接到学生家长缴费完成，主要可以分为以下几个部分：</p>
                             <li v-for="(ele,i) in sceneList" :key="i">
                                 <p>&nbsp;<span>{{ele.title}}：</span>{{ele.desc}}</p>
                             </li>
                         </ol>
                        <el-button type="primary" @click="apply" style="margin: 20px 0 0 30px">对接请联系我们 <i class="el-icon-d-arrow-right"></i></el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EducationExpends",
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
            return {
                sceneList: [
                    {title: "服务商系统对接", desc: "服务商教育缴费系统与支付宝教育缴费平台完成系统完成对接，并将学校信息录入缴费平台"},
                    {title: "学校发送缴费账单", desc: "学校使用服务商提供的教育缴费系统编辑缴费账单并发送，同时学校告知学生家长使用支付宝进行缴费，在支付宝教育缴费创建学生缴费账户"},
                    {title: "学生家长完成缴费", desc: "学生家长点击缴费账单进行支付。"}
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
