<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
                <div class="main-feature">
                    <div class="main-inner" style="position: relative">
                        <h1 class="ly-title-one" style="margin-bottom: 40px">添加广告</h1>
                        <div class="form-list">
                            <el-form label-position="left" ref="form" :model="form" label-width="120px" :rules="rules">
                                <div class="home-title">
                                    <span class="home-title-t ly-title">广告设置</span>
                                </div>
                                <el-form-item label="广告类型:" prop='ad_type'>
                                    <el-radio v-model="form.ad_type" label="1" @change="changeType()">支付前广告</el-radio>
                                    <el-radio v-model="form.ad_type" label="2" @change="changeType()">支付后广告</el-radio>
                                </el-form-item>
                                <el-form-item label="广告名称" prop="ad_name">
                                    <el-input v-model="form.ad_name" placeholder="请输入广告名称"></el-input>
                                </el-form-item>
                                <el-form-item label="投放时间" prop="date">
                                    <el-date-picker class="id" @change="changeDate" v-model="form.date"
                                                    type="datetimerange" start-placeholder="开始日期"
                                                    end-placeholder="结束日期" format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="广告图名称" prop="poster_id">
                                    <el-select
                                            v-model="form.poster_id"
                                            filterable
                                            remote
                                            reserve-keyword
                                            placeholder="请输入广告图名称关键词"
                                            :remote-method="remoteMethod"
                                            @change="changeName"
                                            :loading="loadingList">
                                        <el-option
                                                v-for="item in nameList"
                                                :key="item.poster_id"
                                                :label="item.poster_name"
                                                :value="item.poster_id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="投放对象" prop="device_list">
                                    <p class="ly_hint_text" style="margin-top: 4px">请在下方列表中选择投放对象</p>
                                </el-form-item>
                                <el-form-item style="position: absolute;bottom: 0;left:40px">
                                    <el-button type="primary" @click="submitForm('form')" v-loading="submitState">提交
                                    </el-button>
                                    <!--<el-button @click="resetForm('form')">重置</el-button>-->
                                    <el-button @click="$router.push('/ad')">取消</el-button>
                                </el-form-item>
                               <!-- <div class="home-title">
                                    <span class="home-title-t ly-title">投放对象</span>
                                </div>-->
                            </el-form>
                        </div>
                        <!-- 搜索条件 start -->
                        <el-form :inline="true" ref="postData" :model="postData" class="demo-form-inline">
                            <el-form-item label="商户名">
                                <el-input v-model="postData.mer_name" placeholder="请输入名称" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="门店名">
                                <el-input v-model="postData.store_name" placeholder="请输入名称" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="设备SN">
                                <el-input v-model="postData.device_no" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" size="small" v-loading="searchState">查询
                                </el-button>
                            </el-form-item>
                        </el-form>
                        <!-- 搜索条件 end -->
                        <!-- 表格 start -->
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;"
                                      @selection-change="handleSelectionChange" @toggleRowSelection="toggleRowSelection" :row-key="getRowKeys">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column prop="device_no" label="设备SN" :key="2">
                                </el-table-column>
                                <el-table-column prop="industry" label="行业" :key="3">
                                </el-table-column>
                                <el-table-column prop="mer_name" label="商户名" :key="4">
                                </el-table-column>
                                <el-table-column prop="store_name" label="门店名" :key="5">
                                    <template slot-scope="scope">
                                        <p>{{scope.row.store_name ? scope.row.store_name : '--'}}</p>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <!-- 表格 end -->

                        <template>
                            <div class="block" style="text-align: center;margin: 30px 0 60px;">
                                <el-pagination @size-change="handleSizeChange"
                                               @current-change="jumpPagination"
                                               @prev-click="prevClick"
                                               @next-click="nextClick"
                                               :current-page="pagination.currentPage"
                                               :page-sizes="pagination.pageCount"
                                               :page-size="pagination.pageSize"
                                               layout="total, sizes, prev, pager, next, jumper"
                                               :total="pagination.total">
                                </el-pagination>
                            </div>
                        </template>
                       <!-- <div class="form-list">
                            <el-form label-position="left" ref="form" :model="form" label-width="120px" :rules="rules">
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('form')" v-loading="submitState">提交
                                    </el-button>
                                    &lt;!&ndash;<el-button @click="resetForm('form')">重置</el-button>&ndash;&gt;
                                    <el-button @click="$router.push('/ad')">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </div>-->
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
            }
        },
        data() {
            var checkArrNull = (rule, value, callback) => {
                if (value.length==0||!value) {
                    callback(new Error(rule.message));
                } else {
                    callback();
                }
            };
            var checkNull = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(rule.message));
                } else {
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
            var checkDate = (rule, value, callback) => {
                if (value === '' || !value) {
                    callback(new Error(rule.message));
                } else {
                    callback();
                }
            };
            return {
                searchState: false,
                submitState: false,
                winHeight: window.innerHeight,
                // 获取row的key值
                getRowKeys(row) {
                    return row.poster_id;
                },
                form: {
                    ad_type: '1',//广告类型
                    ad_name: '',//名称
                    date: "",//时间
                    start_time: "",//开始时间
                    end_time: "",//结束时间
                    poster_id: '',//广告图名称id、
                    device_list: [],//有房对象数组
                },
                nameList: [],
                loadingList: false,
                rules: {
                    ad_type: [
                        {
                            required: true,
                            validator: checkNull,
                            message: '请选择广告类型',
                            trigger: 'blur'
                        }
                    ],
                    ad_name: [
                        {
                            validator: checkNullText,
                            required: true,
                            message: '请输入广告名称',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 15,
                            message: '长度在 1 到 15 个字符',
                            trigger: 'blur'
                        },
                    ],
                    date: [
                        {
                            validator: checkDate,
                            required: true,
                            message: '请选择投放时间',
                            trigger: 'change'
                        }
                    ],
                    poster_id: [
                        {
                            validator: checkNull,
                            required: true,
                            message: '请选择广告图',
                            trigger: 'change'
                        }
                    ],
                    device_list: [
                        {
                            validator: checkArrNull,
                            required: true,
                            message: '请选择投放对象',
                            trigger: 'change'
                        }
                    ],
                },
                //页面所需
                "pagination": {
                    "total": 0,
                    "pageCount": [2,10,20,50,100],
                    "currentPage": 1,
                    "pageSize": 10,
                    "show": '1-5'
                },
                //接口参数
                "postData": {
                    "cursor": 1,//当前第几页-游标
                    "size": 10,//每页条数
                    "poster_id": '',//广告图名称id
                    "industry": 0,
                    "mer_name": '',//商户名
                    "store_name": '',//门店名
                    "device_no": '',//设备sn
                    "start_time": '',
                    "end_time": '',
                },
                tableData: [],
                multipleSelection: [],
                multipleSelectionId:{},
            }
        },
        methods: {
            /**
             *  选择广告图名称【变化】
             */
            changeName(val){
                this.clearSelIds();
                console.log(val, this.form.poster_id);
                this.postData.poster_id = val;
                if(this.form.poster_id && this.form.start_time && this.form.end_time){
                    this.getData()
                }
            },
            /**
             * 选择时间 值有改变
             * @param val 选中的时间
             */
            changeDate(val) {
                this.clearSelIds();
                console.log(val, this.form.date);
                if (val) {
                    let start = new Date(val[0]), end = new Date(val[1]);
                    console.log(start, end, Date.parse(start), Date.parse(end));
                    this.form.start_time = this.postData.start_time = start.valueOf();
                    this.form.end_time = this.postData.end_time = end.valueOf();
                    console.log(this.form.start_time, this.form.end_time, this.form)
                    this.changeName(this.form.poster_id);
                } else {
                    this.form.start_time = this.form.end_time = this.postData.start_time = this.postData.end_time = '';
                }
            },
            /**
             * 选择类型 值有改变
             * @param val 选中的类型
             */
            changeType(val) {
                console.log(val, this.form.ad_type);
                this.form.poster_id = this.postData.poster_id = '';
                this.getNameData(this.form.poster_id)
            },
            /**
             *  搜索
             */
            onSubmit() {
                this.clearSelIds();
                console.log('submit!');
                this.searchState = true;
                this.pagination.currentPage = this.postData.cursor = 1;
                this.getData();
            },
            /**
             * 分页跳转【当前页】
             */
            jumpPagination(val) {
                /*翻页前记录当前页的选中状态*/
                this.buildCurrIds();
                this.pagination.currentPage = this.postData.cursor = val;
                // this.postData.cursor = val;
                this.getData();
            },
            /**
             * 上一页
             */
            prevClick() {
                /*翻页前记录当前页的选中状态*/
                //this.buildCurrIds();
                // this.pagination.currentPage --;
                // this.postData.cursor --;
                // this.getData();
            },
            /**
             * 下一页
             */
            nextClick() {
                /*翻页前记录当前页的选中状态*/
                //this.buildCurrIds();
                // this.pagination.currentPage ++;
                // this.postData.cursor ++;
                // this.getData();
            },
            /**
             * 每页条数
             * @param val
             */
            handleSizeChange(val) {
                this.clearSelIds();
                console.log(`每页 ${val} 条`);
                this.pagination.size = this.postData.size = val;
                this.getData();
            },
            /**
             *  选择行数
             */
            handleSelectionChange(val) {
                this.multipleSelection = val;

                // this.multipleSelection.forEach((ele,i)=>{
                //     this.form.device_list.push(ele.device_id);
                // });
                //this.form.device_list = Array.from(new Set(this.form.device_list));
                //console.log(this.multipleSelection,this.form.device_list);
            },
            toggleRowSelection(row,i){
                console.log("dianwola",row,i)
            },
            /**
             * 获取列表数据
             */
            getData() {
                console.log('获取列表数据',this.postData,this.multipleSelection,this.form.device_list);
                //初始化列表
                this.$axios.post('/agent/Advertising/ad/searchDevice', this.postData).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
                        console.log(this.tableData);
                        this.$nextTick(()=>{
                            if(this.tableData&&this.multipleSelectionId&&this.multipleSelectionId[this.pagination.currentPage]){
                                this.multipleSelectionId[this.pagination.currentPage].forEach((ele,i)=>{
                                    this.tableData.forEach((val,v)=>{
                                        if(ele == val.device_id){
                                            this.$refs.multipleTable.toggleRowSelection(val,true);
                                        }
                                    })
                                })
                            }
                        });

                        this.pagination.total = res.data.data.count;
                        this.pagination.currentPage = res.data.data.cursor;
                    }
                    this.searchState = false;
                })
                    .catch(() => {
                        this.searchState = false;
                    });
            },
            /**
             * 提交
             * @param formName
             */
            submitForm(formName) {
                this.buildSubmitIds();
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                        this.submitState = true;
                        this.$axios.post('/agent/Advertising/ad/save', this.form).then(res => {
                            console.log(res);
                            if (res.data.code === this.$webConfig.httpSuccessStatus) {
                                this.$message('添加成功');
                                this.$router.push('/ad');
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
            },
            /**
             * 获取广告图名称
             * @param name
             */
            getNameData(name) {
                let postData = {
                    "ad_type": this.form.ad_type,
                    "poster_name": name
                };
                //远程搜索机构
                this.$axios.post('/agent/Advertising/poster/mapByName', postData).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.nameList = res.data.data;
                    } else {
                        this.nameList = [];
                    }
                })
            },
            /**
             * 监听广告图名称搜索框
             * @param query
             */
            remoteMethod(query) {
                if (query !== '') {
                    this.loadingList = true;
                    setTimeout(() => {
                        this.loadingList = false;
                        console.log(this.nameList);
                        this.getNameData(query);
                    }, 200);
                } else {
                    this.nameList = [];
                }
            },
            /**
             * 构建当前页的选中Ids
             */
            buildCurrIds(){
                this.multipleSelectionId[this.pagination.currentPage]=[];
                this.multipleSelection.forEach((ele,i)=>{
                    this.multipleSelectionId[this.pagination.currentPage].push(ele.device_id);
                });
            },
            /**
             * 构建选中需要提交的Ids
             */
            buildSubmitIds(){
                this.form.device_list=[];
                this.buildCurrIds();
                for(let key in this.multipleSelectionId){
                    this.form.device_list= this.form.device_list.concat(this.multipleSelectionId[key]);
                }
            },
            /**
             * 清空选择，用于搜索后，改变每页条数后
             */
            clearSelIds(){
              this.multipleSelection=[];
              this.multipleSelectionId={};
              this.form.device_list=[];
              this.$refs.multipleTable.clearSelection();
            },
        },
        mounted() {
            this.getNameData(this.form.poster_id);
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

    .home-title {
        margin: 20px 0;
    }

    .ly-title {
        font-size: 15px;
        font-weight: 900;
    }
</style>

