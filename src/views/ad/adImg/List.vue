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
                    <div class="main-inner">
                        <!-- 搜索条件 start -->
                        <el-form :inline="true" ref="postData" :model="postData" class="demo-form-inline">
                            <el-form-item label="广告图名称">
                                <el-input v-model="postData.name" placeholder="请输入名称" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="日期">
                                <!--:default-time="['12:00:00']"-->
                                <el-date-picker @change="changeDate" v-model="postData.date" type="datetimerange"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期" format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="审核状态">
                                <el-select v-model="postData.status" placeholder="审核状态" clearable>
                                    <el-option v-for="item in adImgStatus"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" size="small" v-loading="searchState">查询</el-button>
                            </el-form-item>
                            <el-button type="primary" style='float:right'
                                       @click="$router.push('/adImg/add')">添加广告图
                            </el-button>
                        </el-form>
                        <!-- 搜索条件 end -->

                        <!-- 表格 start -->
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;"
                                      @selection-change="handleSelectionChange">
                                <el-table-column prop="poster_name" label="广告图名称" :key="1">
                                </el-table-column>
                                <el-table-column prop="poster_url" label="图片" :key="2">
                                    <template slot-scope="scope">
                                        <img :src="scope.row.poster_url" class="table-img">
                                    </template>
                                </el-table-column>
                                <el-table-column prop="create_time" label="创建时间" :key="3">
                                </el-table-column>
                                <el-table-column prop="status" label="审核状态" :key="4">
                                    <template slot-scope="scope">
                                        <p>{{mapStatus[scope.row.status]}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="reason" label="拒绝原因" :key="5">
                                    <template slot-scope="scope">
                                        <p>{{scope.row.status==2 ? scope.row.reason : '--'}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" min-width='115' :key="6">
                                    <template slot-scope="scope">
                                        <el-button type="text" style="color:red"
                                                   @click="offClick(scope.row)">删除
                                        </el-button>
                                        <el-button type="text" :disabled="scope.row.status!=2" @click="updateClick(scope.row)">修改</el-button>
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
        name: "list",
        components: {
            // second_nav,
            CommonFooter
        },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data: function () {
            return {
                mapStatus:{0:'待审核',1:'审核通过',2:'审核拒绝'},
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
                    "ad_type": 1,//支付前1，支付后2
                    "poster_name": '',
                    "start_time": '',
                    "end_time": '',
                    "status": '',
                    "date": '',
                },
                tabIndex: '1',//tab选中值
                tabList: [
                    {
                        value: '1',
                        label: '支付前广告图'
                    },
                    {
                        value: '2',
                        label: '支付后广告图'
                    }
                ],
                adImgStatus: [
                    {
                        value: '0',
                        label: '待审核'
                    },
                    {
                        value: '1',
                        label: '审核通过'
                    },
                    {
                        value: '2',
                        label: '审核拒绝'
                    }
                ],
                tableData: [
                    {

                    }
                ],
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
             * tab选择
             * @param key
             * @param keyPath
             */
            tabSelect(key, keyPath) {
                this.tabIndex = this.postData.ad_type = key;
                console.log(key, keyPath,this.tabIndex);
                this.pagination.currentPage = this.postData.cursor = 1;
                this.postData.size = 10;
                this.postData.start_time = this.postData.end_time = this.postData.poster_name = this.postData.status = this.postData.date = '';
                this.getData();
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
                this.$axios.post('/agent/Advertising/poster/list', this.postData).then(res => {
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
                this.$confirm(text+'该广告图, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/agent/Advertising/poster/del', {
                        "id": val.id
                    }).then(res => {
                        console.log(res);
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.$message({
                                type: 'success',
                                message: text + '成功!'
                            });
                            this.getData();
                        } else {
                            this.$message(res.data.message);
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
            /**
             * 修改
             */
            updateClick(val) {
                console.log(val);
                this.$router.push({path: '/adImg/update', query: {adId: val.id}})
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
