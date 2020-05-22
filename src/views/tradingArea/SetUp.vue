<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <h1 class="ly-title-one" style="margin-bottom: 20px">创建商圈</h1>
                        <!--搜索条件 start -->
                        <div class="form-list" style="margin-top: 30px;" v-loading='loading'>
                            <el-form :model="form" label-width="120px" ref="form" :rules="rules">
                                <el-form-item label="商圈名称:" prop='name'>
                                    <el-input v-model="form.name" placeholder="请输入商圈名称"></el-input>
                                </el-form-item>
                                <el-form-item label="行业范围:" prop='industry_type'>
                                    <el-radio v-model="form.industry_type" label="2">不限行业</el-radio>
                                    <el-radio v-model="form.industry_type" label="1">具体行业</el-radio>
                                </el-form-item>
                                <el-form-item label="选择行业" prop="sys_industry_id" v-if="form.industry_type==1">
                                    <el-cascader
                                            v-model="form.sys_industry_id"
                                            @change="choIndustry"
                                            @active-item-change="getIndustry"
                                            separator=" "
                                            :options="industryList"
                                            :props="{ value: 'id',label:'industry_name'}"
                                            clearable></el-cascader>
                                </el-form-item>
                                <el-form-item label="地域范围:" prop='area_type'>
                                    <el-radio v-model="form.area_type" label="3" @change="areaTypeChange">省/市</el-radio>
                                    <el-radio v-model="form.area_type" label="4" @change="areaTypeChange">省/市/区</el-radio>
                                </el-form-item>
                                <!--@active-item-change="form.area_type==4?handleCtChangeAc:form.area_type==3?handleCtChangeAcTwo:''"-->
                                <el-form-item label="区域:" :prop='form.area_type==4 ? `area_code` : `city_code`'>
                                    <el-cascader
                                            v-model="choAreaList"
                                            :options="cityList"
                                            @change="handleCtChange"
                                            @active-item-change="handleCtChangeAc"
                                            :props="{ label: 'value', value: 'id', children: 'citys'}"
                                    ></el-cascader>
                                </el-form-item>
                                <el-form-item label="卡券展示范围:" prop='card_range'>
                                    <el-radio v-model="form.card_range" label="2">同类目互斥</el-radio>
                                    <el-radio v-model="form.card_range" label="1">不限类目</el-radio>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit('form')"
                                               size="small">创建
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
            CommonFooter
        },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
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
            var checkNull3 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error());
                } else {
                    callback();
                }
            };
            return {
                winHeight: window.innerHeight,
                loading: false,
                choAreaList: [],//选择的区域范围
                cityList: [],//城市
                form: {
                    name: '',//商圈名称
                    card_range: '1',//卡券展示范围：1:不限类目，2：同类目互斥
                    area_type: '3',//地域范围:1国家2省3市4区5街道(给3或者4)
                    industry_type: '2',//行业类型1：具体行业 2所有行业
                    sys_industry_id: '',//行业分类id：如果是所有类型不传或者传null或者传0
                    province_code: '',//省份
                    city_code: '',//城市
                    area_code: '',//区域
                },
                rules: {
                    card_range: [
                        {
                            required: true,
                            validator: checkNull2,
                            message: '请选择卡券展示范围',
                            trigger: 'blur'
                        }
                    ],
                    area_type: [
                        {
                            required: true,
                            validator: checkNull2,
                            message: '请选择地域范围',
                            trigger: 'blur'
                        }
                    ],
                    industry_type: [
                        {
                            required: true,
                            validator: checkNull2,
                            message: '请选择行业范围',
                            trigger: 'blur'
                        }
                    ],
                    sys_industry_id: [
                        {
                            required: true,
                            validator: checkNull2,
                            message: '请选择具体行业',
                            trigger: 'blur'
                        }
                    ],
                    name: [
                        {
                            required: true,
                            validator: checkNull,
                            message: '请输入商圈名称',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 20,
                            message: '商圈名称20字以内',
                            trigger: 'blur'
                        }
                    ],
                    area_code: [
                        {
                            required: true,
                            message: '请选择区域',
                            trigger: 'blur'
                        },
                    ],
                    city_code: [
                        {
                            required: true,
                            message: '请选择地域范围',
                            trigger: 'blur'
                        }
                    ],
                },
                industryList: []
            }
        },
        methods: {
            /**
             * 获取省市区list
             */
            getCityData() {
                this.cityList = [];
                //初始化列表
                this.$axios.get('/agent/city/province?areaParentId=1')
                    .then(res => {
                        console.log(res);
                        this.cityList = res.data.data;
                        for (let i = 0; i < this.cityList.length; i++) {
                            this.$set(this.cityList[i], 'citys', []);
                        }
                        console.log('获取省市区', res)
                    })
                    .catch(rej => console.log('省市区失败', rej))
            },
            /**
             * 获取行业list
             */
            getIndustryData() {
                //初始化列表
                this.$axios.get('/agent/industry/getNext?industryPrentId=0&&channel_type=1').then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.industryList = res.data.data;
                        this.industryList.forEach((item,index)=>{
                            this.$set(this.industryList[index], 'children', []) // right
                        })
                    }else {
                        this.$message(res.data.message);
                    }
                })
                    .catch(() => {

                    });
            },
            /**
             *  动态获取二级行业
             */
            getIndustry(val){
                console.log(val);
                let value = val[0];
                this.$axios.get('/agent/industry/getNext?industryPrentId=' + value + '&&channel_type=1').then((res) => {
                    let children = res && res.data && res.data.data || [];
                    for(let i = 0; i < this.industryList.length; i++) {
                        if(this.industryList[i].id === value) {
                            this.$set(this.industryList[i], 'children', children);
                            break;
                        }
                    }
                });
                console.log(this.form);
            },
            /**
             *  选择具体行业
             */
            choIndustry(val){
                console.log(val);
                if(val){
                    this.form.sys_industry_id = val[val.length-1];
                }else {
                    console.log(val);
                    this.form.sys_industry_id = '';
                }
                /*if(val.length==0){
                    this.form.sys_industry_id = '';
                    console.log(this.form);
                }else if(val.length==2){
                    this.form.sys_industry_id = val[1];
                    console.log(this.form);
                }*/
                console.log(this.form);
            },
            //返回省市区访问接口路径
            getCity(id) {
                return this.$axios.get('/agent/city/province?areaParentId=' + id)
            },
            //选择省市区
            handleCtChange(value) {
                console.log('选择省市的', value);
                if(value){
                    this.form.province_code = value[0];
                    this.form.city_code = value[1];
                    if(this.form.area_type==4){
                        this.form.area_code = value[2]
                    }
                }else {
                    this.form.province_code = this.form.city_code = this.form.area_code = ''
                }
                console.log(this.form)
            },
            /**
             * 选择省市区 【三级 or 二级】
             **/
            handleCtChangeAc(val) {
                console.log("选中", val,this.choAreaList)
                if (val.length == 1) {
                    // 如果点击的是一级分类
                    let parentId = val[0]
                    this.cityList.map((item, index) => {
                        if (item.id === parentId && item.citys.length === 0) {
                            // 当顶级分类的的child为空时才请求数据
                            this.getCity(parentId).then(res => {
                                console.log("对奥用", index, res)
                                this.$set(this.cityList[index], 'citys', res.data.data)
                                if(this.form.area_type == 4) {
                                    item.citys.map((innerItem, innerIndex) => {
                                        // 二级分类下要设置一个空的citys数组，不然点击@active-item-change没反应
                                        this.$set(item.citys[innerIndex], 'citys', [])
                                    })
                                }
                            })
                        }
                    })
                } else if (val.length == 2&&this.form.area_type==4) {
                    let parentId = val[1];
                    this.cityList.map((item, index) => {
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
            /**
             * 监听‘区域选择’改变事件
             */
            areaTypeChange(val){
                console.log(val);
                this.form.province_code = this.form.city_code = this.form.area_code = '';
                this.choAreaList = [];
                this.getCityData();
                console.log(this.form,this.cityList);
            },
            /**
             * 创建
             * @param formName
             */
            onSubmit(formName) {
                console.log('submit!', this.form);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.$axios.post('/agent/business/circle/create', this.form)
                            .then(res => {
                                this.loading = false;
                                if (res.data.code === this.$webConfig.httpSuccessStatus) {
                                    this.$message.success('创建成功');
                                    this.$router.push('/tradingArea/list')
                                } else {
                                    this.$message.error(res.data.message)
                                }
                            })
                            .catch(rej => {
                                this.loading = false;
                                this.$message.error('网络异常!');
                                console.log('失败', rej)
                            })
                    }
                })
            },
        },
        mounted() {
            //获取行业
            this.getIndustryData();
            // 获取省list
            this.getCityData();
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
