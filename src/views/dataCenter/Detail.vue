<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">分润明细</div>
                <el-button class="ly-back" size="mini" type="primary" @click="$router.back()">返回</el-button>
            </div>
            <!-- tab按钮 end -->
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div  class="main-inner" style="margin-bottom: 10px">
                        <!-- 搜索条件 start -->
                        <el-form :inline="true" ref="form" :model="form" class="demo-form-inline"  style="margin-top: 20px">
                            <el-form-item label="日期">
                                <!--:default-time="['12:00:00']"-->
                                <el-date-picker @change="changeDateTop" v-model="form.date" type="datetimerange"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期" format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="getShowData" size="small" v-loading="searchStateDate">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <!-- 搜索条件 end -->

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

                    </div>
                    <div class="main-inner">
                        <!-- 搜索条件 start -->
                        <el-form :inline="true" ref="postData" :model="postData" class="demo-form-inline" style="margin-top: 20px">
                            <el-form-item label="日期">
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
                                <el-table-column prop="create_time" label="交易时间">
                                </el-table-column>
                                <el-table-column prop="amount" label="收款金额（元）">
                                </el-table-column>
                                <el-table-column prop="order_no" label="订单号">
                                </el-table-column>
                                <el-table-column prop="type" label="收款方式">
                                </el-table-column>
                                <el-table-column prop="ratio" label="分润比例（%）">
                                </el-table-column>
                                <el-table-column prop="ratio_amount" label="分润金额（元）">
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

    const map = {1: '支付宝', 2: '微信',};//收款方式:1支付宝 2微信
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
                shopId: '',
                unlink: true,
                searchState: false,
                searchStateDate: false,
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
                    "start_time": '',
                    "end_time": '',
                    "date": '',
                    "id": '',
                },
                //接口参数
                "form": {
                    "start_time": '',
                    "end_time": '',
                    "date": '',
                    "id": '',
                },
                showList: [
                    {
                        label: '交易笔数(笔)',
                        num: 0
                    },
                    {
                        label: '收款金额(元)',
                        num: 0
                    },
                    {
                        label: '分润金额(元)',
                        num: 0
                    }
                ],
                tableData: [],
            }
        },
        methods: {
            /**
             *  选择时间，顶部搜索
             */
            changeDateTop(val) {
                console.log(val, this.form.date);
                if (val) {
                    let start = new Date(val[0]),end = new Date(val[1]);
                    console.log(start,end);
                    this.form.start_time = start.valueOf();
                    this.form.end_time = end.valueOf();
                } else {
                    this.form.start_time = this.form.end_time = '';
                }
                console.log(this.form)
            },
            /**
             *  选择时间
             */
            changeDate(val) {
                console.log(val, this.postData.date);
                if (val) {
                    let start = new Date(val[0]),end = new Date(val[1]);
                    console.log(start,end);
                    this.postData.start_time = start.valueOf();
                    this.postData.end_time = end.valueOf();
                } else {
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
                this.$axios.post('/agent/store/data/listDetail', this.postData).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
                        this.tableData.forEach(ele => {
                            ele.type = map[ele.type];
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
             * 获取top数据
             */
            getShowData() {
                console.log(this.form);
                //初始化列表
                this.$axios.post('/agent/store/data/statisticalDetail',this.form).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.showList[0].num = res.data.data.total_no;
                        this.showList[1].num = res.data.data.payee_amount;
                        this.showList[2].num = res.data.data.share;
                    }
                    this.searchStateDate = false;
                })
                    .catch(() => {
                        this.searchStateDate = false;
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
        },
        beforeMount() {
            if(this.$route.query.shopId){
                this.form.id = this.$route.query.shopId;
                this.postData.id = this.$route.query.shopId;
            }

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
