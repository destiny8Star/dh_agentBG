<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <!-- tab按钮 start -->
            <div class="third-nav">
                <div class="third-nav-t">商户管理</div>
            </div>
            <!-- tab按钮 end -->
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner" v-loading="loading">
                        <el-row style="margin: 15px 0">
                            <el-button type="primary" @click="$router.push('/tradingArea/setUp')">创建商圈</el-button>
                        </el-row>
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
                                <el-table-column prop="industry" label="商圈行业" :key="4">
                                </el-table-column>
                                <el-table-column prop="area_scope" label="地域范围" :key="5">
                                </el-table-column>
                                <el-table-column prop="shop_no" label="商户数量" :key="6">
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
                },
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
            //获取数据
            getData() {
                this.loading = true;
                //初始化列表
                this.$axios.post('/agent/business/circle/list', this.postData).then(res => {
                    this.loading = false;
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
