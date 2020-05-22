<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">级差分润</div>
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
                                        <div class="home-figure-content">{{ele.id}}</div>
                                        <div class="home-figure-num">{{ele.value}}</div>
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
                              <el-form-item label="用户名">
                                  <el-input v-model="postData.agent_name" placeholder="用户名" clearable></el-input>
                              </el-form-item>
                              <el-form-item label="姓名">
                                  <el-input v-model="postData.name" placeholder="请输入姓名" clearable></el-input>
                              </el-form-item>
                              <el-form-item label="手机号">
                                  <el-input v-model="postData.tel" placeholder="请输入手机号" clearable></el-input>
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
                                  <el-table-column prop="user_name" label="用户名">
                                  </el-table-column>
                                  <el-table-column prop="real_name" label="姓名">
                                  </el-table-column>
                                  <el-table-column prop="tel" label="手机号">
                                  </el-table-column>
                                  <el-table-column prop="amount" label="商户收款金额（元）">
                                  </el-table-column>
                                  <el-table-column prop="ratio" label="分润比例（%）">
                                  </el-table-column>
                                  <el-table-column prop="ratio_amount" label="分润金额（元）">
                                  </el-table-column>
                                  <el-table-column label="操作" min-width='115'>
                                      <template slot-scope="scope">
                                          <el-button type="text" @click="lookClick(scope.row)">查看明细</el-button>
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

    const map = {1: '已支付', 2: '未支付', 3: '已退款', 4: '订单关闭'};//订单状态
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
                    "name": '',
                    "tel": '',
                    "agent_name": '',
                    "date": '',
                },
                //接口参数
                "form": {
                    "start_time": '',
                    "end_time": '',
                    "date": '',
                },
                showList: [
                    {
                        label: '总金额(元)',
                        num: 3
                    },
                    {
                        label: '区域服务商分润(元)',
                        num: 346
                    },
                    {
                        label: '执行服务商分润(元)',
                        num: 78
                    },
                    {
                        label: '分销商分润(元)',
                        num: 78
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
                this.$axios.post('/agent/jc/share/list', this.postData).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
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
                this.$axios.post('/agent/jc/share/statistical',this.form).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.showList = res.data.data;
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
            /**
             * 产看明细
             */
            lookClick(val) {
                console.log(val);
                this.$router.push({path: '/data/rangeDetail', query: {shopId: val.id}})
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
