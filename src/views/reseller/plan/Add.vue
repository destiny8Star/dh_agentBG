<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <h1 class="ly-title-one" style="margin-bottom: 40px">添加分销方案</h1>
                        <div class="form-list">
                            <el-form label-position="left" ref="form" :model="form" label-width="120px" :rules="rules">
                                <el-form-item label="方案名称" prop="name">
                                    <el-input v-model="form.name" placeholder="请输入方案名称"></el-input>
                                    <p class="ly_hint_text" style="text-align: left">分销商扫码支付时选择方案展示</p>
                                </el-form-item>
                                <el-form-item label="返现比例" prop="rebate_rate">
                                    <el-input v-model="form.rebate_rate" placeholder="请输入返现比例"></el-input>
                                    <p class="ly_hint_text" style="text-align: left">计算分销商发展分销商时获得的返现比例</p>
                                </el-form-item>
                                <el-form-item label="成本费率" prop="cost_rate">
                                    <el-input v-model="form.cost_rate" placeholder="成本费率为0.25%~0.38%之间"></el-input>
                                    <p class="ly_hint_text" style="text-align: left">分销商开商户时的成本费率，商户交易您将获得分润 <span style="color: red">{{getRate}}%</span></p>
                                </el-form-item>
                                <el-form-item label="售价" prop="price">
                                    <el-input v-model="form.price" placeholder="请输入售价"></el-input>
                                    <p class="ly_hint_text" style="text-align: left">分销商需支付金额</p>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('form')" v-loading="submitState">提交
                                    </el-button>
                                    <!--<el-button @click="resetForm('form')">重置</el-button>-->
                                    <el-button @click="$router.push('/reseller/plan')">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
                <common-footer></common-footer>
            </div>
        </div>
    </div>
</template>

<script>
    import CommonFooter from '../../../components/CommonFooter.vue'

    export default {
        name: "add",
        components: {
            CommonFooter
        },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            },
            //成本费率
            getRate() {
                if (this.form.cost_rate) {
                    return (this.form.cost_rate * 1000 - this.rate * 100000) / 1000
                } else {
                    return 0
                }
            }
        },
        data() {
            let reg = /^\d+(\.\d{1,2})?$/; //两位小数，金额[包含0]
            let reg1 = /^(0\.\d{0,1}[1-9]|\+?[1-9][0-9]{0,10})(\.\d{1,2})?$/; //两位小数，金额[不包含0]
            // let reg1 = /^[1-9]+(\.\d{1,2})?$/; //两位小数，金额[不包含0]
            var checkTwoNum = (rule, value, callback) => {
                if (!reg1.test(value)) {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            let checkfee = (rule, value, callback) => {
                if (value > 0.38 || value < 0.25 || !reg.test(value)) {
                    return callback(new Error('费率范围为0.25~0.38'));
                }
                callback();
            };
            var checkRebate = (rule, value, callback) => {
                if (!reg.test(value)||value > 100) {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            var checkNullText = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error(rule.message));
                } else {
                    callback();
                }
            };
            return {
                submitState: false,
                winHeight: window.innerHeight,
                rate: '',//成本费率
                form: {
                    name: '',//方案名称
                    rebate_rate: '',//返现比例
                    cost_rate: '',//成本费率
                    price: '',//售价
                },
                rules: {
                    name: [
                        {
                            required: true,
                            validator: checkNullText,
                            message: '请选择方案名称',
                            trigger: 'blur'
                        }
                    ],
                    rebate_rate: [
                        {
                            validator: checkRebate,
                            required: true,
                            message: '请输入正确的返现比例，<100并保留两位小数',
                            trigger: 'blur'
                        }
                    ],
                    cost_rate: [
                        {
                            validator: checkfee,
                            required: true,
                            message: '请输入正确的成本费率，保留两位小数',
                            trigger: 'blur'
                        }
                    ],
                    price: [
                        {
                            required: true,
                            validator: checkTwoNum,
                            message: '请输入正确金额，保留两位小数',
                            trigger: 'blur'
                        }
                    ]
                },
            }
        },
        methods: {
            /**
             * 获取费率
             */
            getRote(){
                //获取费率
                this.$axios.post('/agent/distributor/rate')
                    .then(res => {
                        console.log('获取费率', res)
                        this.rate = res.data.data
                    })
                    .catch(rej => {
                        console.log("失败", rej)
                        this.$message.error("网络异常")
                    })
            },
            /**
             * 提交
             * @param formName
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                        this.submitState = true;
                        this.$axios.post('/agent/fx/openRule/addRule', this.form).then(res => {
                            console.log(res);
                            if (res.data.code === this.$webConfig.httpSuccessStatus) {
                                this.$message('添加成功');
                                this.$router.push('/reseller/plan');
                            } else {
                                this.$message(res.data.message);
                            }
                            this.submitState = false;
                        }).catch(() => {
                            this.submitState = false;
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            this.getRote();
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 140px;
        height: 140px;
        line-height: 140px;
        text-align: center;
    }

    .avatar {
        width: 140px;
        height: 140px;
        display: block;
    }
</style>

