<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <h1 class="ly-title-one" style="margin-bottom: 20px">{{title}}</h1>
                        <!--搜索条件 start -->
                        <div class="form-list" style="margin-top: 30px;" v-loading='loading'>
                            <el-form :model="form" label-width="130px" ref="form" :rules="rules">
                                <el-form-item label="用户名:" prop='user_name' v-if='!form.id'>
                                    <el-input v-model="form.user_name" placeholder="请输入用户名"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号:" prop='tel'>
                                    <el-input v-model="form.tel" placeholder="请输入手机号" type='number'></el-input>
                                </el-form-item>
                                <el-form-item label="姓名:" prop='name'>
                                    <el-input v-model="form.name" placeholder="请输入姓名"
                                              :disabled="form.id?true:false"></el-input>
                                </el-form-item>
                                <el-form-item label="支付宝账号:" prop='ali_login_name' v-if="!form.id">
                                    <el-input v-model="form.ali_login_name" placeholder="请输入支付宝账号"
                                              ></el-input>
                                </el-form-item>
                                <el-form-item label="结算银行卡号:" prop='settle_bank_account' v-if="!form.id">
                                    <el-input v-model="form.settle_bank_account" placeholder="请输入结算银行卡号"
                                              :disabled="form.id?true:false"></el-input>
                                </el-form-item>
                                <el-form-item label="结算卡开户名:" prop='settle_bank_account_name' v-if="!form.id">
                                    <el-input v-model="form.settle_bank_account_name" placeholder="请输入结算卡开户名"
                                              :disabled="form.id?true:false"></el-input>
                                </el-form-item>
                                <el-form-item label="结算银行:" prop='settle_bank_name' v-if="!form.id">
                                    <el-input v-model="form.settle_bank_name" placeholder="请输入结算银行"
                                              :disabled="form.id?true:false"></el-input>
                                </el-form-item>
                                <el-form-item label="结算卡开户支行:" prop='settle_bank_branch' v-if="!form.id">
                                    <el-input v-model="form.settle_bank_branch" placeholder="请输入结算卡开户支行"
                                              :disabled="form.id?true:false"></el-input>
                                </el-form-item>
                                <el-form-item label="成本费率(%):" prop='cost_rate'>
                                    <el-input v-model="form.cost_rate" placeholder="手续费为0.25%~0.38%之间" type='number'
                                              @keyup.native='inpChange'></el-input>
                                </el-form-item>
                                <el-form-item label="">
                                    <div class="tip">提示：商户交易您将获得分润<span style="color:red"> {{getRate}}%</span></div>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit('form')"
                                               size="small">{{btnText}}
                                    </el-button>
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
    import CommonFooter from '../../components/CommonFooter.vue'

    export default {
        name: "add",
        components: {
            // third_nav,
            CommonFooter
        },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            },
            getRate() {
                if (this.form.cost_rate) {
                    return (this.form.cost_rate * 1000 - this.rate * 100000) / 1000
                } else {
                    return 0
                }
            }
        },
        data() {
            let checkfee = (rule, value, callback) => {
                if (value > 0.38 || value < 0.25) {
                    return callback(new Error('费率范围为0.25~0.38'));
                }
                callback();
            }
            var checkNull = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error('请填写非空格字符'));
                } else {
                    callback();
                }
            };
            return {
                loading: false,
                id: '',//当前用户id
                rate: '',//成本费率
                title: '添加服务商',
                // title: '添加分销商',
                btnText: '添加',
                winHeight: window.innerHeight,
                form: {
                    id: '',
                    name: '',
                    user_name: '',
                    tel: '',
                    cost_rate: '',
                    ali_login_name: '',
                    settle_bank_account: '',
                    settle_bank_account_name: '',
                    settle_bank_name: '',
                    settle_bank_branch: '',
                },
                rules: {
                    name: [
                        {
                            required: true,
                            validator: checkNull,
                            message: '请输入姓名',
                            trigger: 'blur'
                        },
                    ],
                    user_name: [
                        {
                            required: true,
                            validator: checkNull,
                            message: "请输入用户名",
                            trigger: "blur"
                        }
                    ],
                    tel: [
                        {
                            required: true,
                            validator: checkNull,
                            message: "请输入手机号",
                            trigger: "blur"
                        },
                        {
                            max: 11,
                            message: "请输入正确手机号",
                            trigger: "blur"
                        }
                    ],
                    cost_rate: [
                        {
                            required: true,
                            message: '请输入费率',
                            trigger: 'blur'
                        },
                        {
                            validator: checkfee, trigger: 'blur'
                        },
                    ],
                    ali_login_name: [
                        {
                            required: true,
                            validator: checkNull,
                            message: '请输入支付宝账号',
                            trigger: 'blur'
                        },
                    ],
                    settle_bank_account: [
                        {
                            required: true,
                            validator: checkNull,
                            message: '请输入结算银行卡号',
                            trigger: 'blur'
                        },
                    ],
                    settle_bank_account_name: [
                        {
                            required: true,
                            validator: checkNull,
                            message: '请输入结算卡开户名',
                            trigger: 'blur'
                        },
                    ],
                    settle_bank_name: [
                        {
                            required: true,
                            validator: checkNull,
                            message: '请输入结算银行',
                            trigger: 'blur'
                        },
                    ],
                    settle_bank_branch: [
                        {
                            required: true,
                            validator: checkNull,
                            message: '请输入结算卡开户支行',
                            trigger: 'blur'
                        },
                    ],
                }

            }
        },
        methods: {
            // 添加
            handerSub() {
                this.loading = true
                this.$axios.post('/agent/distributor/add', this.form)
                    .then(res => {
                        this.loading = false
                        if (res.data.code == 200) {
                            this.$confirm('添加成功,默认密码为:123456', '提示', {
                                confirmButtonText: '确定',
                                showCancelButton: false,
                                center: true,
                                type: 'success'
                            }).then(() => {
                                console.log('成功')
                                this.$router.push({name: 'distributorList'})
                            })
                        } else {
                            this.$message.error(res.data.message)
                        }
                        console.log("图加加结果", res)
                    })
                    .catch(rej => {
                        this.loading = false
                        this.$message.error('网络异常!')
                        console.log('失败', rej)
                    })
            },
            //修改
            handerChange() {
                this.loading = true
                this.$axios.post('/agent/distributor/update', this.form)
                    .then(res => {
                        this.loading = false
                        if (res.data.code == 200) {
                            this.$message.success('修改成功')
                            this.$router.push({name: 'distributorList'})
                        } else {
                            this.$message.error(res.data.message)
                        }
                        console.log("修改结果", res)
                    })
                    .catch(rej => {
                        this.loading = false
                        this.$message.error('网络异常!')
                        console.log('失败', rej)
                    })
            },
            //提交
            onSubmit(formName) {
                console.log('submit!');
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("体积哦啊信息", this.form)
                        if (this.form.id) {
                            this.handerChange()
                        } else {
                            this.handerSub()
                        }
                    } else {
                        console.log(valid)
                    }
                })
            },
            //获取详情
            getDetail(id) {
                return this.$axios.get('/agent/distributor/detail?id=' + id)
            },
            //小数点判断
            NumberCheck(num) {
                var str = num;
                var len1 = str.substr(0, 1);
                var len2 = str.substr(1, 1);
                //如果第一位是0，第二位不是点，就用数字把点替换掉
                if (str.length > 1 && len1 == 0 && len2 != ".") {
                    str = str.substr(1, 1);
                }
                //第一位不能是.
                if (len1 == ".") {
                    str = "";
                }
                //限制只能输入一个小数点
                if (str.indexOf(".") != -1) {
                    var str_ = str.substr(str.indexOf(".") + 1);
                    if (str_.indexOf(".") != -1) {
                        str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
                    }
                }
                //正则替换，保留数字和小数点
                // str = str.replace(/[^\d^\.]+/g,'')
                //如果需要保留小数点后两位，则用下面公式
                str = str.replace(/\.\d{3}$/, '')
                return str;
            },
            //输入框
            inpChange() {
                let val = this.form.cost_rate
                this.form.cost_rate = this.NumberCheck(val)
                // if(val==1)this.form.cost_rate=100
                console.log('bva', val, this.form.cost_rate * 1000,)
            }
        },
        created() {

            let id = this.$route.query.id
            if (id) {
                this.title = '修改服务商';
                // this.title = '修改分销商';
                this.btnText = '修改';
                this.loading = true
                this.getDetail(id)
                    .then(res => {
                        this.loading = false
                        if (res.data.code == 200) {
                            this.form = res.data.data
                        } else {
                            this.$message.error("网络异常")
                        }
                        console.log("获取详情", res)
                    })
                    .catch(rej => {
                        this.loading = false
                        console.log("失败", rej)
                        this.$message.error("网络异常")
                    })
            }
            console.log('id', id)
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
        }
    }
</script>

<style>
    .main-inner {
        padding: 13px 40px;
    }

    .tip {
        font-size: 12px;
        color: #909090;
        margin-top: -10px;
        line-height: 16px;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
