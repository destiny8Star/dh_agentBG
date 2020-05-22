<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <!-- tab按钮 start -->
            <div class="third-nav">
                <div class="third-nav-t">分销方案</div>
            </div>
            <!-- tab按钮 end -->
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <el-button type="primary" v-if="qrCodeFxPower==2"
                                   @click="$router.push('/reseller/planAdd')">添加方案
                        </el-button>

                        <!-- 表格 start -->
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;"
                                      @selection-change="handleSelectionChange">
                                <el-table-column type="index" fixed label="序号" width="50" :key="1">
                                    <template slot-scope="scope">{{ ((pagination.currentPage -1) *
                                        pagination.pageSize) + (scope.$index + 1) }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" label="名称" :key="2">
                                </el-table-column>
                                <el-table-column prop="price" label="金额" :key="3">
                                </el-table-column>
                                <el-table-column prop="rebate_rate" label="返现比例(%)" :key="4">
                                    <template slot-scope="scope">
                                        <p>{{scope.row.rebate_rate!==''?scope.row.rebate_rate:''}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="cost_rate" label="成本费率(%)" :key="5">
                                    <template slot-scope="scope">
                                        <p>{{scope.row.cost_rate!==''?scope.row.cost_rate:'--'}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" min-width='115' :key="6">
                                    <template slot-scope="scope">
                                        <el-button type="text" style="color: red" :disabled="scope.row.del_open==0||qrCodeFxPower!=2"
                                                   @click="offClick(scope.row)">删除
                                        </el-button>
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
    import CommonFooter from '../../../components/CommonFooter.vue'
    export default {
        name: "List",
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
                qrCodeFxPower: this.$ls.get('qrCodeFxPower'),
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
                },
                tableData: [],
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
                this.$axios.post('/agent/fx/openRule/listRule', this.postData).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
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
            /**
             * 删除
             */
            offClick(val) {
                console.log(val);
                let text = '删除';
                this.$confirm(text+'该分销方案, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/agent/fx/openRule/delRule?id='+ val.id).then(res => {
                        console.log(res);
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.$message({
                                type: 'success',
                                message: text + '成功!'
                            });
                            this.getData();
                        } else {
                            this.$message(res.data.message);
                            this.getData();
                        }
                    })
                        .catch(() => {

                        });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消' + text
                    });
                });
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
        },
    }
</script>


<style scoped>
    .el-date-editor--datetimerange {
        width: 230px !important;
        margin-top: 4px;
    }
</style>
