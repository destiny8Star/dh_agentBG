<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <!-- tab按钮 start -->
            <div class="third-nav">
                <div class="third-nav-t">我的推荐</div>
            </div>
            <!-- tab按钮 end -->
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner" v-loading="searchState">

                        <!-- top数据展示 start -->
                        <div class="home-figure show-data">
                            <el-row :gutter="10" style="margin: 0 0 20px">
                                <el-col :sm="4" v-for="(ele,i) in showList" :key="i">
                                    <div class="grid-content">
                                        <div class="home-figure-content">{{ele.level_desc}}</div>
                                        <div class="home-figure-num">{{ele.count}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <!-- top数据展示 end -->

                        <!-- 搜索条件 start -->
                        <el-form :inline="true" ref="postData" :model="postData" class="demo-form-inline" style="margin-top: 40px">
                            <el-form-item label="用户名">
                                <el-input v-model="postData.name" placeholder="请输入用户名" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="角色">
                                <el-select v-model="postData.level" placeholder="请选择角色" clearable>
                                    <el-option v-for="item in roleList"
                                               :key="item.level"
                                               :label="item.desc"
                                               :value="item.level"
                                               :disabled="item.level==4"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="关系">
                                <el-select v-model="postData.relation" placeholder="请选择关系类型" clearable>
                                    <el-option v-for="item in relationState"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" size="small" >查询</el-button>
                            </el-form-item>
                        </el-form>
                        <!-- 搜索条件 end -->
                        <p class="hintText" style="color: #999;margin-top: 0">提示：展示可获取佣金的推荐人，佣金线下结算</p>
                        <!--<p class="hintText" style="color: #999;margin-top: 0">提示：展示可获取佣金的服务商或分销商，佣金线下结算</p>-->
                        <!-- 表格 start -->
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;"
                                      @selection-change="handleSelectionChange">
                                <el-table-column type="index" fixed width="80" label="编号">
                                    <template slot-scope="scope">{{ ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) }}
                                    </template>
                                </el-table-column>
                              <!--  <el-table-column prop="agent_no" label="编号">
                                </el-table-column>-->
                                <el-table-column prop="agent_name" label="用户名">
                                </el-table-column>
                                <el-table-column prop="real_name" label="姓名">
                                </el-table-column>
                                <el-table-column prop="mobile" label="手机号">
                                </el-table-column>
                                <el-table-column prop="level_desc" label="角色">
                                </el-table-column>
                                <el-table-column prop="invite_label" label="推荐关系">
                                </el-table-column>
                                <el-table-column prop="profit_rate" label="推荐佣金比例（%）">
                                    <template slot-scope="scope">
                                        {{ scope.row.profit_rate }} %
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
    const map = {1:'直推',2:'间推'};//推荐关系
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
                    "pageCount": [10,20,50,100],
                    "currentPage": 1,
                    "pageSize": 10,
                    "show": '1-5'
                },
                //接口参数
                "postData": {
                    "cursor": 1,//当前第几页-游标
                    "size": 10,//每页条数
                    "name": '',
                    "level": '',
                    "relation": '',
                },
                showList: [
                    {
                        level_desc: '城市服务商数直推数',
                        count: 0
                    },
                    {
                        level_desc: '区域服务商直推数',
                        count: 0
                    },
                    {
                        level_desc: '区域服务商间推数',
                        count: 0
                    },
                    {
                        level_desc: '执行服务商直推数',
                        count: 0
                    },
                    {
                        level_desc: '执行服务商间推数',
                        count: 0
                    },
                    {
                        level_desc: '推广分销商数',
                        count: 0
                    }
                ],
                roleList: [
                    /*{
                        value: '1',
                        label: '城市服务商'
                    },
                    {
                        value: '2',
                        label: '区域服务商'
                    },
                    {
                        value: '3',
                        label: '执行服务商'
                    },
                    {
                        value: '4',
                        label: '分销商'
                    }*/
                ],
                relationState: [
                    {
                        value: '1',
                        label: '直推'
                    },
                    {
                        value: '2',
                        label: '间推'
                    }
                ],
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
             * 获取角色list
             */
            getRolData() {
                //初始化列表
                this.$axios.post('/agent/sys/getLevel').then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.roleList = res.data.data;
                        console.log(this.roleList);
                    }else {
                        this.$message(res.data.message);
                    }
                })
                    .catch((rej) => {
                        this.$message.error('网络异常')
                    });
            },
            /**
             * 获取列表数据
             */
            getData() {
                console.log(this.postData);
                //初始化列表
                 this.searchState = true;
                this.$axios.post('/agent/team/showInviteTeamMembers', this.postData).then(res => {
                    // console.log('列表',res);
                    this.searchState = false;
                    if (res.data.code ==this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data||[];
                        this.tableData.forEach(ele=>{
                            ele.invite_label = map[ele.invite_label];
                        });
                        this.pagination.total = res.data.data?res.data.data.count:0;
                        this.pagination.currentPage = res.data.data?res.data.data.cursor:1;
                    }else{
                         this.$message(res.data.message);
                    }
                })
                    .catch(() => {
                        this.searchState = false;
                         this.$message.error('网络异常')
                    });
            },
            /**
             * 获取列表数据 - 顶部数据
             */
            getShowData() {
                //初始化列表
                this.$axios.post('/agent/team/totalInviteAgentCount',this.form).then(res => {
                    console.log('顶部数据',res);
                    if (res.data.code == this.$webConfig.httpSuccessStatus) {
                        this.showList = res.data.data;
                    }else{
                        this.$message(res.data.message);
                    }
                })
                    .catch((rej) => {
                         this.$message.error('网络异常1')
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
        mounted() {
            // 获取列表数据
            this.getData();
            this.getShowData();
            //    获取角色list
            this.getRolData();
        },
    }
</script>


<style scoped>
    .el-date-editor--datetimerange {
        width: 230px !important;
        margin-top: 4px;
    }
</style>
