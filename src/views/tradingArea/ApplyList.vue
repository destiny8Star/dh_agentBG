<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <!-- tab按钮 start -->
            <div class="third-nav">
                <el-menu :default-active="tabIndex" class="el-menu-demo" mode="horizontal" @select="tabSelect">
                    <el-menu-item v-for="(ele,i) in tabList" :key="i" :index="ele.value">{{ele.label}}</el-menu-item>
                </el-menu>
            </div>
            <!-- tab按钮 end -->
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner" v-loading="loading">
                        <!-- 搜索条件 start -->
                        <el-form :inline="true" :model="postData" class="demo-form-inline" style="margin-top: 20px">
                            <el-form-item label="商圈名">
                                <el-input v-model="postData.name" placeholder="请输入商圈名称" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="商户名">
                                <el-input v-model="postData.mer_name" placeholder="请输入商户名称" clearable></el-input>
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
                                      @selection-change="handleSelectionChange">
                                <el-table-column :key="1" type="index" fixed label="序号" width="50">
                                    <template slot-scope="scope">{{ ((pagination.currentPage -1) *
                                        pagination.pageSize) + (scope.$index + 1) }}
                                    </template>
                                    <!--<template slot-scope="scope">{{ pagination.total - (((pagination.currentPage -1) *
                                        pagination.pageSize) + (scope.$index + 1)) + 1 }}
                                    </template>-->
                                </el-table-column>
                                <el-table-column prop="name" label="商圈名称" :key="2">
                                </el-table-column>
                                <el-table-column prop="card_range" label="卡券展示范围" :key="3">
                                </el-table-column>
                                <el-table-column prop="industry" label="行业" :key="4">
                                </el-table-column>
                                <el-table-column prop="area_scope" label="地域范围" :key="5">
                                </el-table-column>
                                <el-table-column prop="mer_name" label="商户名称" :key="6">
                                    <template slot-scope="scope">
                                        <div>{{scope.row.mer_name||'--'}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="address" label="商户地址" :key="7">
                                    <template slot-scope="scope">
                                        <div>{{scope.row.address||'--'}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="real_name" label="联系人" :key="8">
                                    <template slot-scope="scope">
                                        <div>{{scope.row.real_name||'--'}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="contact_mobile" label="联系方式" :key="9">
                                    <template slot-scope="scope">
                                        <div>{{scope.row.contact_mobile||'--'}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="join_time" v-if="tabIndex==0" label="加入时间" :key="10">
                                    <template slot-scope="scope">
                                        <div>{{scope.row.join_time||'--'}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="apply_for_time" v-if="tabIndex==1" label="申请时间" :key="11">
                                    <template slot-scope="scope">
                                        <div>{{scope.row.apply_for_time||'--'}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="状态" :key="12">
                                    <template slot-scope="scope">
                                        <div>{{tabIndex==0?'待审核':tabIndex==1?'已通过':tabIndex==2?'已拒绝':'错误'}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="wx_pay_rate" label="操作" v-if="tabIndex!=2" :key="13">
                                    <template slot-scope="scope">
                                        <div v-if="tabIndex==0">
                                            <el-button type="text" @click="handleClick(scope.row,1)">同意</el-button>
                                            <el-button type="text" @click="handleClick(scope.row,2)" style="color:red">拒绝</el-button>
                                        </div>
                                        <div v-if="tabIndex==1">
                                            <el-button type="text" @click="removeClick(scope.row)" style="color:red">移除</el-button>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <!-- 表格 end -->
                        <template>
                            <div class="block" style="text-align: center;margin-top: 30px;">
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
                    </div>
                </div>
                <common-footer></common-footer>
            </div>
        </div>
    </div>
</template>

<script>
    import CommonFooter from '../../components/CommonFooter.vue'
    let map = {1: '不限类目', 2: '同类目互斥'};//卡券展示范围

    export default {
        name: "list",
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
            return {
                searchState: false,
                loading: false,
                tableData: [
                    {
                        id: '1',
                        name: "",
                        mobile: '',
                        agent_name: '',
                        reg_time: '',
                        wx_pay_rate: '2',
                        ali_pay_rate: '1',
                        audit_status: '1',
                        device_sns: '',
                        keys: '',
                    }
                ],
                winHeight: window.innerHeight,
                //页面所需
                "pagination": {
                    "total": 0,
                    "pageCount": [10, 20, 50, 100],
                    "currentPage": 1,
                    "pageSize": 10,
                    "show": '1-5'
                },
                //接口参数
                "postData": {
                    "cursor": 1,//当前第几页-游标
                    "size": 10,//每页条数
                    "name": '',
                    "mer_name": '',
                    "apply_status": '0',// 商户入驻商圈状态：0 申请待审核，1审核通过，2审核拒绝
                },
                tabIndex: '0',//tab选中值
                tabList: [
                    {
                        value: '0',
                        label: '待审核'
                    },
                    {
                        value: '1',
                        label: '已通过'
                    },
                    {
                        value: '2',
                        label: '已拒绝'
                    }
                ],
            }
        },
        methods: {
            /**
             * 分页跳转【当前页】
             */
            jumpPagination(val) {
                console.log(val);
                this.pagination.currentPage = this.postData.cursor = val;
                // this.postData.cursor = val;
                this.getData();
            },
            /**
             * 上一页
             */
            prevClick() {
                this.pagination.currentPage--;
                this.postData.cursor--;
                this.getData();
            },
            /**
             * 下一页
             */
            nextClick() {
                this.pagination.currentPage++;
                this.postData.cursor++;
                this.getData();
            },
            /**
             * 每页条数
             * @param val
             */
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pagination.size = this.postData.size = val;
                this.getData();
            },
            handleSelectionChange(val) {
                // this.multipleSelection = val;
            },
            /**
             * 查询
             */
            onSubmit() {
                console.log('submit!');
                this.searchState = true;
                this.pagination.currentPage = this.postData.cursor = 1;
                /*this.postData.name = this.postData.mer_name = '';*/
                this.getData();
            },
            /**
             * tab选择
             * @param key
             * @param keyPath
             */
            tabSelect(key, keyPath) {
                this.tabIndex = this.postData.apply_status = key;
                console.log(key, keyPath,this.tabIndex);
                this.pagination.currentPage = this.postData.cursor = 1;
                this.postData.size = 10;
                this.postData.name = this.postData.mer_name = '';
                this.getData();
            },
            /**
             * 操作
             * @param data 每一行
             * @param num 操作类型
             */
            handleClick(data,num){
                console.log(data,num);
                let text = '',type = 1;
                if(num==1){
                    text = '同意';
                    type = 1
                }else if(num==2){
                    text = '拒绝';
                    type = 2
                }
                let datas = {
                    "apply_status": type,
                    "business_circle_mer_id": data.business_circle_mer_id,
                };
                console.log(datas);
                this.$confirm('此操作将'+ text + '该申请, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/agent/business/circle/apply/audit', datas)
                        .then( res =>{
                            console.log(res);
                            this.loading = false;
                            if(res.data.code === this.$webConfig.httpSuccessStatus){
                                this.getData()
                            }else{
                                this.$message.error(res.data.message)
                            }
                        })
                        .catch(rej=>{
                                console.log('失败',rej);
                                this.loading = false;
                                this.$message.error("网络异常")
                            }
                        );
                    this.$message({
                        type: 'success',
                        message: text + '成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消' + text
                    });
                });
            },
            /**
             * 移除
             * @param data
             */
            removeClick(data){
                console.log(data);
                let text = '移除';
                this.$confirm('此操作将'+ text + '该申请, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.get('/agent/business/circle/kickOut?businessCircleMerId=' + data.business_circle_mer_id)
                        .then( res =>{
                            console.log(res);
                            this.loading = false;
                            if(res.data.code === this.$webConfig.httpSuccessStatus){
                                this.getData()
                            }else{
                                this.$message.error(res.data.message)
                            }
                        })
                        .catch(rej=>{
                                console.log('失败',rej);
                                this.loading = false;
                                this.$message.error("网络异常")
                            }
                        );
                    this.$message({
                        type: 'success',
                        message: text + '成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消' + text
                    });
                });
            },
            //获取数据
            getData() {
                this.loading = true;
                //初始化列表
                this.$axios.post('/agent/business/circle/apply/list', this.postData).then(res => {
                    this.loading = false;
                    this.searchState = false;
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
                        this.tableData.forEach(ele=>{
                            ele.card_range = map[ele.card_range];
                        });
                        this.pagination.total = res.data.data.count;
                        this.pagination.currentPage = res.data.data.cursor;
                    }
                })
                    .catch(() => {
                        this.loading = false;
                        this.searchState = false;
                        this.$message.error("网络异常")
                    });
            },
        },
        mounted() {
            //获取列表数据
            this.getData()
        }
    }
</script>

<style>
    .main-inner {
        padding: 13px 40px;
    }

    .boxMess {
        max-height: 80px;
        overflow-y: scroll
    }
</style>
