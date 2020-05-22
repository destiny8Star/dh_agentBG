<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">余额流水</div>
            </div>
            <!-- tab按钮 end -->
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner" v-loading="searchState">
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
                                  <el-button type="primary" @click="onSubmit" size="small" >查询</el-button>
                              </el-form-item>
                          </el-form>
                          <!-- 搜索条件 end -->

                          <!-- 表格 start -->
                          <template>
                              <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;"
                                        @selection-change="handleSelectionChange">
                                  <el-table-column prop="order_no" label="订单号">
                                  </el-table-column>
                                  <el-table-column prop="value" label="金额">
                                  </el-table-column>
                                  <el-table-column prop="change_type" label="收支类型">
                                       <template slot-scope="scope">
                                            <div>{{scope.row.change_type==1?'级差分润':scope.row.change_type==2?'区域分红':'提现'}}</div>
                                       </template>
                                  </el-table-column>
                                  <el-table-column prop="msg" label="备注">
                                      <template slot-scope="scope">
                                          <div>{{scope.row.msg?scope.row.msg:'--'}}</div>
                                      </template>
                                  </el-table-column>
                                  <el-table-column prop="create_time" label="时间">
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
                    "start_time": '',
                    "end_time": '',
                    "date": '',
                },
       
                tableData: [],
            }
        },
        methods: {
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
                this.$axios.post('/agent/balance/log/list', this.postData).then(res => {
                    console.log('获取数据',res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
                        this.tableData.forEach(ele => {
                                ele.create_time = new Date(ele.create_time).format('yyyy-MM-dd hh:mm:ss');
                        });
                        this.pagination.total = res.data.data.count;
                        this.pagination.currentPage = res.data.data.cursor;
                    }
                    this.searchState = false;
                })
                    .catch(() => {
                        this.searchState = false;
                        this.$message.error('网络异常')
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
            },
       
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
