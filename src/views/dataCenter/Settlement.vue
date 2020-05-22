<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">交易分润</div>
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

                        <!-- 表格一期 start
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;margin-top: 40px"
                                      @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column prop="create_time" label="交易时间">
                                </el-table-column>
                                <el-table-column prop="order_no" label="收款金额（元）">
                                </el-table-column>
                                <el-table-column prop="store_name" label="分润金额（元）">
                                </el-table-column>
                                <el-table-column prop="status" label="分润状态">
                                </el-table-column>
                                <el-table-column label="操作" min-width='115'>
                                    <template slot-scope="scope">
                                        <el-button type="text" @click="lookClick(scope.row)">查看明细</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                         表格一期 end -->

                        <el-row style="margin-top: 30px;">
                            <el-button size="medium" @click="applyClick()" type="primary">申请结算</el-button>
                            <!--<el-button size="medium" @click="$router.push({path: '/data/withdraw'})">提现记录</el-button>-->
                        </el-row>

                        <!-- 表格 start -->
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;margin-top: 20px"
                                      @selection-change="handleSelectionChange">
                                <el-table-column type="index" fixed width="80" label="编号">
                                    <template slot-scope="scope">{{((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="create_time" label="申请时间">
                                </el-table-column>
                                <el-table-column prop="payment_time" label="打款时间">
                                    <template slot-scope="scope">
                                        {{scope.row.payment_time ? scope.row.payment_time : '--'}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="price" label="申请金额（元）">
                                </el-table-column>
                                <el-table-column prop="receiving_account" label="支付宝账号">
                                </el-table-column>
                                <el-table-column prop="status" label="状态">
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

    const map = {0: '未打款',1: '成功', 2: '失败'};//0 未打款,；1：成功，2：失败
    export default {
        name: "list",
        components: {
            CommonFooter
        },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
            return {
                unlink: true,
                searchState: false,
                date: new Date(),
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
                },
                showList: [
                    {
                        label: '累计收入',
                        num: 3
                    },
                    {
                        label: '账户余额',
                        num: 346
                    },
                    {
                        label: '提现次数',
                        num: 78
                    },
                    /*{
                        label: '商户分润',
                        num: 78
                    },
                    {
                        label: '级差分润',
                        num: 78
                    },
                    {
                        label: '区域分红',
                        num: 78
                    }*/
                ],
                tableData: [
                    {
                        id: 1,
                        create_time: 1654654564,
                        order_no: 42,
                        store_name: 564,
                        status: 1,
                    },
                    {
                        id: 2,
                        create_time: 1654654564,
                        order_no: 42,
                        store_name: 564,
                        status: 1,
                    },
                    {
                        id: 3,
                        create_time: 1654654564,
                        order_no: 42,
                        store_name: 564,
                        status: 1,
                    },
                    {
                        id: 4,
                        create_time: 1654654564,
                        order_no: 42,
                        store_name: 564,
                        status: 1,
                    },
                    {
                        id: 5,
                        create_time: 1654654564,
                        order_no: 42,
                        store_name: 564,
                        status: 1,
                    }
                ],
                multipleSelection: [],
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
            /**
             * 获取列表数据
             */
            getData() {
                console.log(this.postData);
                //初始化列表
                this.$axios.post('/agent/balance/settlementRecord', this.postData).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
                        this.tableData.forEach(ele => {
                            ele.status = map[ele.status];
                            ele.create_time = new Date(ele.create_time).format('yyyy-MM-dd hh:mm:ss');
                            if(ele.payment_time!=0){
                                ele.payment_time = new Date(ele.payment_time).format('yyyy-MM-dd hh:mm:ss');
                            }else {
                                ele.payment_time = '--';
                            }

                        });
                        console.log(this.tableData);
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
             * 获取列表数据 - 顶部数据
             */
            getShowData() {
                //初始化列表
                this.$axios.post('/agent/balance/getTransactionProfitInfo',this.form).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.showList[0].num = res.data.data.cumulative_income;
                        this.showList[1].num = res.data.data.account_balance;
                        this.showList[2].num = res.data.data.withdraw_count;
                    }else {
                        this.$message(res.data.message);
                    }
                })
                    .catch(() => {

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
            open() {
                this.$confirm('确定删除此商品吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
                console.log(this.multipleSelection);
            },
            /**
             * 产看明细
             */
            lookClick(val) {
                console.log(val);
                this.$router.push({path: '/data/detail', query: {shopId: val.id}})
            },
            /**
             * 申请结算
             */
            applyClick() {
                let list = this.multipleSelection;
                if( this.showList[1].num<100){
                    this.$message('满100元才能结算');
                    return false;
                }
                this.$confirm('确定申请结算账户余额吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/agent/balance/applicationSettlement', this.postData).then(res => {
                        console.log(res);
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.$message({
                                type: 'success',
                                message: '申请成功!'
                            });
                            this.getData();
                            this.getShowData();
                        }else {
                            this.$message({
                                type: 'error',
                                message: res.data.message
                            });
                        }
                        this.searchState = false;
                    })
                        .catch(() => {
                            this.searchState = false;
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消申请'
                    });
                });
            },
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

    .home-figure-content {
        font-size: 16px;
    }

    .home-figure .grid-content {
        height: auto;
    }

    .ly-show-data {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        color: #8590A9
    }
</style>
