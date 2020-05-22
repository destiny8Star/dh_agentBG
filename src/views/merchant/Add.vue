<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <h1 class="ly-title-one" style="margin-bottom: 20px">添加商户</h1>
                        <!--搜索条件 start -->
                        <div class="form-list" style="margin-top: 30px;" v-loading='loading'>
                            <el-form :model="form" label-width="100px" ref="form" :rules="rules">
                                <!--<div class="line">基本信息</div>-->
                                <div class="home-title line">
                                    <span class="home-title-t">基本信息</span>
                                </div>
                                <el-form-item label="选择通道:" prop='pay_channel_type'>
                                    <el-radio v-model="form.pay_channel_type" label="1" @change="form.rate = ''">直连</el-radio>
                                    <el-radio v-model="form.pay_channel_type" label="2" @change="form.rate = ''">间连</el-radio>
                                </el-form-item>
                                <el-form-item label="用户名:" prop='user_name'>
                                    <el-input v-model="form.user_name" placeholder="请输入用户名"></el-input>
                                </el-form-item>
                                <el-form-item label="商户名:" prop='mer_name'>
                                    <el-input v-model="form.mer_name" placeholder="请输入商户名"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号:" prop='mobile'>
                                    <el-input v-model="form.mobile" type='number' placeholder="请输入手机号"></el-input>
                                </el-form-item>
                                <el-form-item label="联系人:" prop='contacts'>
                                    <el-input v-model="form.contacts" placeholder="请输入联系人"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱:" prop='email'>
                                    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                                </el-form-item>
                                <el-form-item label="支付宝账号:" prop='ali_login_name'>
                                    <el-input v-model="form.ali_login_name" placeholder="请输入支付宝账号"></el-input>
                                </el-form-item>
                                <el-form-item label="区域:" prop='area_code'>
                                    <el-cascader
                                            :options="optionsCt"
                                            @change="handleCtChange"
                                            @active-item-change="handleCtChangeAc"
                                            :props="propsCt"
                                    ></el-cascader>
                                </el-form-item>
                                <el-form-item label="地址:" prop='address'>
                                    <el-input v-model="form.address" placeholder="请输入地址"></el-input>
                                </el-form-item>
                                <!-- 费率 -->
                                <!--<div class="line">刷脸费率</div>-->
                                <div class="home-title line">
                                    <span class="home-title-t">刷脸费率</span>
                                </div>
                                <el-form-item label="支付手续费:" prop='rate' type='number'>
                                    <el-input v-model="form.rate"
                                              :placeholder="'费率范围为'+ `${form.pay_channel_type==1?min_rate:min_lkl_rate}` +'%~' + `${form.pay_channel_type==1?max_rate:max_lkl_rate}`+'%'"
                                              @keyup.native='inpChange'></el-input>
                                    <!--<el-input v-model="form.rate" placeholder="请输入支付手续费（%）"-->
                                              <!--@keyup.native='inpChange'></el-input>-->
                                    <!--<div class="tip">提示：商户交易您将获得分润<span style="color:red">{{getRate}}%</span></div>-->
                                </el-form-item>
                                <el-form-item label="" style="margin-top: -10px">
                                    <div class="tip">提示：商户交易您将获得分润<span style="color:red"> {{getRate}}%</span></div>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit('form')"
                                               size="small">添加
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
                if (this.form.rate) {
                    return (this.form.rate * 1000 - this.rate * 100000) / 1000
                } else {
                    return 0
                }
            }
        },
        data() {
            let checkfee = (rule, value, callback) => {
                // pay_channel_type == 通道类型【1：直连；2：间连】
                if(this.form.pay_channel_type == 1){
                    if (value < this.min_rate || value > this.max_rate) {
                        return callback(new Error('直连通道时，费率范围为'+ this.min_rate + '%~' + this.max_rate + '%'));
                    }else {
                        callback();
                    }
                }else if(this.form.pay_channel_type == 2){
                    if (value < this.min_lkl_rate || value > this.max_lkl_rate) {
                        return callback(new Error('间连通道时，费率范围为'+ this.min_lkl_rate + '%~' + this.max_lkl_rate + '%'));
                    }else {
                        callback();
                    }
                }
            };
            var checkNull = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error());
                } else {
                    callback();
                }
            };
            var checkNull2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error());
                } else {
                    callback();
                }
            };
            return {
                winHeight: window.innerHeight,
                loading: false,
                rate: '',//获取的费率
                max_lkl_rate: '',//间连最大费率
                min_lkl_rate: '',//间连最小费率
                max_rate: '',//直连最大费率
                min_rate: '',//直连最小费率
                form: {
                    pay_channel_type: '1',//通道类型【1：直连；2：间连】
                    user_name: '',
                    mer_name: '',//商户名
                    mobile: '',
                    contacts: '',
                    email: '',
                    ali_login_name: '',//支付宝账号
                    address: '',
                    rate: '',//费率
                    province_code: '',//省份
                    city_code: '',//城市
                    area_code: '',//区域
                },
                optionsCt: [],//城市
                propsCt: {
                    label: 'value',
                    value: 'id',
                    children: 'citys'
                },
                rules: {
                    pay_channel_type: [
                        {
                            required: true,
                            validator: checkNull2,
                            message: '请选择通道',
                            trigger: 'blur'
                        }
                    ],
                    mer_name: [
                        {
                            required: true,
                            validator: checkNull,
                            message: '请输入商铺名称',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 20,
                            message: '商户名称20字以内',
                            trigger: 'blur'
                        }
                    ],
                    user_name: [
                        {
                            required: true,
                            validator: checkNull,
                            message: "请输入姓名",
                            trigger: "blur"
                        }
                    ],
                    mobile: [
                        {
                            required: true,
                            message: "请输入手机号",
                            validator: checkNull,
                            trigger: "blur"
                        },
                        {
                            min: 1,
                            max: 11,
                            message: "请输入正确手机号",
                            trigger: "blur"
                        }
                    ],
                    contacts: [
                        {
                            required: true,
                            validator: checkNull,
                            message: "请输入联系人",
                            trigger: "blur"
                        }
                    ],
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    ali_login_name: [
                        {
                            required: true,
                            validator: checkNull,
                            message: "请输入支付宝账号",
                            trigger: "blur"
                        }
                    ],
                    address: [
                        {
                            required: true,
                            validator: checkNull,
                            message: '请输入地址',
                            trigger: 'blur'
                        },
                    ],
                    area_code: [
                        {
                            required: true,
                            message: '请选择区域',
                            trigger: 'blur'
                        },
                    ],
                    rate: [
                        {
                            required: true,
                            message: '请输入费率',
                            trigger: 'blur'
                        },
                        {
                            validator: checkfee, trigger: 'blur'
                        },
                    ]
                }

            }
        },
        methods: {
            //获取省市区
            getCity(id) {
                return this.$axios.get('/agent/city/province?areaParentId=' + id)
            },
            //选择省市区
            handleCtChange(value) {
                console.log('选择省市的', value);
                this.form.province_code = value[0]
                this.form.city_code = value[1]
                this.form.area_code = value[2]
            },
            //选择省市区
            handleCtChangeAc(val) {
                console.log("选中", val)
                if (val.length == 1) {
                    // 如果点击的是一级分类
                    let parentId = val[0]
                    this.optionsCt.map((item, index) => {
                        if (item.id === parentId && item.citys.length === 0) {
                            // 当顶级分类的的child为空时才请求数据
                            this.getCity(parentId).then(res => {
                                console.log("对奥用", index, res)
                                this.$set(this.optionsCt[index], 'citys', res.data.data)
                                item.citys.map((innerItem, innerIndex) => {
                                    // 二级分类下要设置一个空的citys数组，不然点击@active-item-change没反应
                                    this.$set(item.citys[innerIndex], 'citys', [])
                                })
                            })
                        }
                    })
                } else if (val.length == 2) {
                    let parentId = val[1]
                    this.optionsCt.map((item, index) => {
                        item.citys.map((innerItem, innerIndex) => {
                            if (innerItem.id === parentId && innerItem.citys.length === 0) {
                                // 当二级分类的的child为空时才请求一次数据
                                this.getCity(parentId).then(res => {
                                    this.$set(item.citys[innerIndex], 'citys', res.data.data)
                                })
                                console.log('innner', innerItem)
                            }
                        })
                    })
                }
            },
            onSubmit(formName) {
                console.log('submit!', this.form);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        this.$axios.post('/agent/mer/updateMer', this.form)
                            .then(res => {
                                this.loading = false
                                if (res.data.code == 200) {
                                    this.$message.success('添加成功')
                                    this.$router.push({name: 'merchantList'})
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
                    }
                })
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
                let val = this.form.rate
                this.form.rate = this.NumberCheck(val)
                // if(val==1)this.form.cost_rate=100
                console.log('bva', val, this.form.rate * 1000,)
            },
            /**
             * 获取费率范围
             */
            getRateRange(){
                this.$axios.post('/agent/mer/rateLimit')
                    .then(res => {
                        console.log('获取费率范围', res);
                        this.max_lkl_rate = res.data.data.max_lkl_rate;
                        this.min_lkl_rate = res.data.data.min_lkl_rate;
                        this.max_rate = res.data.data.max_rate;
                        this.min_rate = res.data.data.min_rate;
                    })
                    .catch(rej => {
                        console.log("失败", rej);
                        this.$message.error("网络异常")
                    })
            }
        },
        mounted() {
            //  获取费率范围
            this.getRateRange();

            //获取省市区
            this.$axios.get('/agent/city/province?areaParentId=1')
                .then(res => {
                    this.optionsCt = res.data.data
                    for (let i = 0; i < this.optionsCt.length; i++) {
                        this.$set(this.optionsCt[i], 'citys', []);
                    }
                    console.log('获取省市区', res)

                })
                .catch(rej => console.log('省市区失败', rej));
            //获取费率
            this.$axios.post('/agent/distributor/rate')
                .then(res => {
                    console.log('获取费率', res);
                    this.rate = res.data.data
                })
                .catch(rej => {
                    console.log("失败", rej);
                    this.$message.error("网络异常")
                });
        }
    }
</script>

<style>
    .main-inner {
        padding: 13px 40px;
    }

    .line {
        width: 100%;
        font-size: 18px !important;
        color: #333;
        margin-bottom: 20px
    }

    .home-title-t {
        font-size: 18px;
        padding-left: 10px;
        color: #333
    }

    .tip {
        font-size: 12px;
        color: #909090;
        line-height: 26px;
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
