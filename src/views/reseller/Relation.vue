<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <!-- tab按钮 start -->
            <div class="third-nav">
                <div class="third-nav-t">分销关系</div>
            </div>
            <!-- tab按钮 end -->
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <!-- top数据展示 start -->
                        <div class="home-figure show-data">
                            <el-row :gutter="10" style="margin: 0 0 20px">
                                <el-col :sm="4" v-for="(ele,i) in showList" :key="i">
                                    <div class="grid-content">
                                        <div class="home-figure-content">{{ele.label}}</div>
                                        <div class="home-figure-num">{{ele.num}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <!-- top数据展示 end -->
                        <!-- 搜索条件 start -->
                        <el-form :inline="true" ref="postData" :model="postData" class="demo-form-inline">
                            <el-form-item label="姓名">
                                <el-input v-model="postData.agent_name" placeholder="请输入姓名" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="推荐人">
                                <el-input v-model="postData.parent_agent_name" placeholder="请输入推荐人" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="支付时间">
                                <!--:default-time="['12:00:00']"-->
                                <el-date-picker @change="changeDate" v-model="postData.date" type="datetimerange"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期" format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" size="small" v-loading="searchState">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <!-- 搜索条件 end -->

                        <!-- 表格 start -->
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;"
                                      @selection-change="handleSelectionChange">
                                <el-table-column type="index" fixed label="序号" width="50" :key="1">
                                    <template slot-scope="scope">{{ ((pagination.currentPage -1) *
                                        pagination.pageSize) + (scope.$index + 1) }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="agent_name" label="姓名" :key="2">
                                </el-table-column>
                                <el-table-column prop="open_rule_name" label="分销方案" :key="3">
                                </el-table-column>
                                <el-table-column prop="price" label="付款金额" :key="4">
                                </el-table-column>
                                <el-table-column prop="rebate_price" label="返现金额" :key="5">
                                    <template slot-scope="scope">
                                        <p>{{scope.row.rebate_price!=='' ? scope.row.rebate_price : '--'}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="parent_agent_name" label="推荐人" :key="6">
                                    <template slot-scope="scope">
                                        <p>{{scope.row.parent_agent_name!=='' ? scope.row.parent_agent_name : '--'}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="parent_agent_phone" label="推荐人手机号" :key="7">
                                    <template slot-scope="scope">
                                        <p>{{scope.row.parent_agent_phone!=='' ? scope.row.parent_agent_phone : '--'}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="create_time" label="支付时间" :key="8">
                                    <template slot-scope="scope">
                                        <p>{{scope.row.create_time!='' ? scope.row.create_time : '--'}}</p>
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
    export default {
        name: "Relation",
        components: {
            CommonFooter
        },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data: function () {
            return {
                searchState: false,
                date: new Date(),
                //页面所需
                "pagination": {
                    "total": 0,
                    "pageCount": [10,20,50,100],
                    "currentPage": 1,
                    "pageSize": 10,
                    "show": '1-5'
                },
                //接口参数
                "postData": {
                    "cursor": 1,//当前第几页-游标
                    "size": 10,//每页条数
                    "agent_name": '',//姓名
                    "parent_agent_name": '',//推荐人名
                    "start_time": '',
                    "end_time": '',
                    "date": '',
                },
                showList: [
                    {
                        label: '分销商总数',
                        num: 0
                    },
                    {
                        label: '总收益',
                        num: 0
                    },
                    {
                        label: '今日新增分销商',
                        num: 0
                    },
                    {
                        label: '今日收益',
                        num: 0
                    }
                ],
                tableData: [],
            }
        },
        methods: {
            /**
             *  选择时间
             */
            changeDate(val) {
                console.log(val, this.postData.date);
                if(val){
                    let start = new Date(val[0]),end = new Date(val[1]);
                    console.log(start,end);
                    this.postData.start_time = start.valueOf();
                    this.postData.end_time = end.valueOf();
                    console.log()
                }else {
                    this.postData.start_time = this.postData.end_time = '';
                }
                console.log(this.postData)
            },
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
                this.pagination.currentPage --;
                this.postData.cursor --;
                this.getData();
            },
            /**
             * 下一页
             */
            nextClick() {
                this.pagination.currentPage ++;
                this.postData.cursor ++;
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
            /**
             * 获取列表数据
             */
            getData() {
                //初始化列表
                this.$axios.post('/agent/distributor/relationship', this.postData).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
                        console.log(this.tableData);
                        this.pagination.total = res.data.data.count;
                        this.pagination.currentPage = res.data.data.cursor;
                    }else {
                        this.$message(res.data.msg)
                    }
                    this.searchState = false;
                })
                    .catch(() => {
                        this.searchState = false;
                        this.$message('网络异常！')
                    });
            },
            /**
             * 获取列表数据 - 顶部数据
             */
            getShowData() {
                //初始化列表
                this.$axios.post('/agent/distributor/relationshipStatistics',this.form).then(res => {
                    console.log(res);
                    if (res.data.code == this.$webConfig.httpSuccessStatus) {
                        let num = res.data.data;
                        this.showList[0].num = num.total_count || 0;
                        this.showList[1].num = num.total_money || 0;
                        this.showList[2].num = num.today_count || 0;
                        this.showList[3].num = num.today_money || 0;
                    }else {
                        this.$message(res.data.message)
                    }
                })
                    .catch(() => {
                        this.$message('网络异常！')
                    });
            },
            /**
             * 查询
             */
            onSubmit() {
                console.log('submit!');
                this.searchState = true;
                this.pagination.currentPage = this.postData.cursor = 1;
                this.getData();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
        created(){

        },
        beforeMount() {
            // 获取列表数据
            this.getData();
            this.getShowData();
        },
    }
</script>


<style scoped>
    .el-date-editor--datetimerange {
        width: 230px !important;
        margin-top: 4px;
    }
</style>
