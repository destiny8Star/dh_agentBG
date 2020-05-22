<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight) + 'px'}">
            <div class="main-white-list">
                <el-card class="white-list-box">
                    <h2>完善信息</h2>
                    <div class="form-list">
                        <p class="ly_hint_text" style="text-align: left;color:red">提示：请完善个人信息，便于后期佣金结算</p>
                        <el-form label-position="left" ref="form" :model="form" label-width="130px" :rules="rules">
                            <el-form-item label="姓名">
                                <span>{{form.name ? form.name : '--'}}</span>
                            </el-form-item>
                            <el-form-item label="手机号">
                                <span>{{form.tel ? form.tel.slice(0,3)+" **** "+form.tel.slice(-4) : '--'}}</span>
                            </el-form-item>
                            <el-form-item label="支付宝账号" prop="ali_login_name">
                                <el-input v-model="form.ali_login_name" placeholder="请输入支付宝账号"></el-input>
                            </el-form-item>
                            <el-form-item label="结算银行卡号" prop="settle_bank_account">
                                <el-input v-model="form.settle_bank_account" placeholder="请输入结算银行卡号"></el-input>
                            </el-form-item>
                            <el-form-item label="结算银行开户名" prop="settle_bank_account_name">
                                <el-input v-model="form.settle_bank_account_name" placeholder="请输入结算银行开户名"></el-input>
                            </el-form-item>
                            <el-form-item label="结算银行" prop="settle_bank_name">
                                <el-input v-model="form.settle_bank_name" placeholder="请输入结算银行"></el-input>
                            </el-form-item>
                            <el-form-item label="开户支行" prop="settle_bank_branch">
                                <el-input v-model="form.settle_bank_branch" placeholder="请输入结算开户支行"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('form')" v-loading="submitState">提交</el-button>
                                <!--<el-button @click="resetForm('form')">重置</el-button>-->
                                <!--<el-button>取消</el-button>-->
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import CommonFooter from '../components/CommonFooter.vue'
    let id = 0;
    export default {
        name: "WhiteList",
        components: {
            CommonFooter
        },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
            let reg = /^([1-9]{1})(\d{14}|\d{18})$/;
            var checkNull = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            //银行卡号
            var checkBankNoNull = (rule, value, callback) => {
                if (!reg.test(value)) {
                    callback(new Error(rule.message));
                }  else {
                    callback();
                }
            };
            return {
                submitState: false,
                winHeight: window.innerHeight,
                form: {
                    "name": this.$ls.get("accountName"),
                    "tel": this.$ls.get("accountTel"),//手机号
                    "ali_login_name": '',//支付宝账号
                    "settle_bank_account": '',//结算银行卡号
                    "settle_bank_account_name": '',//结算卡开户名
                    "settle_bank_name": '',//结算银行
                    "settle_bank_branch": '',//开户支行
                },
                rules: {
                    ali_login_name: [
                        {
                            validator: checkNull,
                            required: true,
                            message: '请选择支付宝账号',
                            trigger: 'blur'
                        }
                    ],
                    settle_bank_account: [
                        {
                            validator: checkNull,
                            required: true,
                            message: '请输入正确的结算银行卡号',
                            trigger: 'blur'
                        }
                    ],
                    settle_bank_account_name: [
                        {
                            validator: checkNull,
                            required: true,
                            message: '请输入结算卡开户名',
                            trigger: 'blur'
                        }
                    ],
                    settle_bank_name: [
                        {
                            validator: checkNull,
                            required: true,
                            message: '请输入结算银行',
                            trigger: 'blur'
                        }
                    ],
                    settle_bank_branch: [
                        {
                            validator: checkNull,
                            required: true,
                            message: '请输入开户支行',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            /**
             * 提交
             * @param formName
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                        this.submitState = true;
                        this.$axios.post('/agent/distributor/perfectInfo',this.form).then(res => {
                            console.log(res);
                            if (res.data.code === this.$webConfig.httpSuccessStatus) {
                                this.$message('提交成功');
                                this.$router.push('/home')
                            }else {
                                this.$message(res.data.message);
                            }
                            this.submitState = false;
                        }).catch(()=>{
                            this.submitState = false;
                            this.$message('网络异常');
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

        }
    }
</script>

<style>
    .main-white-list {
        width: 100vw;
        height: 100vh;
        /*background: url(/img/nets.ccce4d74.png) 100% 100%;*/
        /*background-size: 100% 100%;*/
    }
    .white-list-box {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 30px 40px;
    }
    h2 {
        text-align: center;
        margin-bottom: 50px;
    }
    .form-list .el-radio {
        margin: 10px;
    }
    .form-list .el-input__inner,.form-list .el-textarea__inner {
        width: 100%;
    }
</style>

