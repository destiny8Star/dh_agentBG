<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav" >
                <div class="third-nav-t">提现记录</div>
                <el-button class="ly-back" size="mini" type="primary" @click="$router.back()">返回</el-button>
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

                        <!-- 表格 start -->
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;margin-top: 40px"
                                      @selection-change="handleSelectionChange">
                                <el-table-column type="index" fixed width="80" label="编号">
                                    <template slot-scope="scope">{{((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="create_time" label="申请时间">
                                </el-table-column>
                                <el-table-column prop="order_no" label="打款时间">
                                    <template slot-scope="scope">
                                        {{scope.row.order_no ? scope.row.order_no : '--'}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="received_price" label="申请金额（元）">
                                </el-table-column>
                                <el-table-column prop="store_name" label="支付宝账号">
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

    const map = {1: '已支付', 2: '未支付', 3: '已退款', 4: '订单关闭'};//状态
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
        data: function () {
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
                        label: '累计提现金额(元)',
                        num: 346432
                    },
                    {
                        label: '提现次数',
                        num: 346
                    }
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
                let api = '';
                if (this.tabIndex == 1) {
                    api = '/order/ali/face/pay/list'
                } else {
                    api = '/order/wx/face/pay/list'
                }
                console.log(this.postData);
                //初始化列表
                this.$axios.post(api, this.postData).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
                        this.tableData.forEach(ele => {
                            ele.status = map[ele.status];
                            ele.create_time = new Date(ele.create_time).format('yyyy-MM-dd hh:mm:ss');
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
                this.multipleSelection = val;
            },
            /**
             * 产看明细
             */
            lookClick(val) {
                console.log(val);
                this.$router.push({path: '/store/update', query: {shopId: val.id}})
            },
        },
        beforeMount() {
            // 获取列表数据
            // this.getData();
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
