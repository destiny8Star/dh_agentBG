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
                        <!--搜索条件 start -->
                        <el-form :inline="true" :model="postData" class="demo-form-inline">
                            <el-row>
                                <el-form-item label="商户名">
                                    <el-input v-model="postData.name"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号">
                                    <el-input v-model="postData.mobile"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button style="margin-left: 34px" type="primary" @click="onSubmit" size="small">
                                        查询
                                    </el-button>
                                </el-form-item>
                                <el-button type="primary" style='float:right'
                                           @click='$router.push({name:"merchantAdd"})'>添加商户
                                </el-button>
                            </el-row>
                        </el-form>
                        <!--搜索条件 end -->
                        <!-- 表格 start -->
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;"
                                      @selection-change="handleSelectionChange">
                                <el-table-column prop="name" label="商户名" :key="1">
                                </el-table-column>
                                <el-table-column prop="mobile" label="手机号" :key="2">
                                </el-table-column>
                                <!--<el-table-column prop="agent_name" label="所属服务商/分销商" :key="3">-->
                                <el-table-column prop="agent_name" label="推荐人(身份)" :key="3">
                                    <template slot-scope="scope">
                                        <div>{{scope.row.agent_name}}({{scope.row.agentlevel_desc}})</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="reg_time" label="注册时间" :key="4">
                                </el-table-column>
                                <el-table-column prop="wx_pay_rate" label="微信手续费" :key="5">
                                    <template slot-scope="scope">
                                        <div>{{scope.row.wx_pay_rate||'--'}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="ali_pay_rate" label="支付宝手续费" :key="6">
                                    <template slot-scope="scope">
                                        <div>{{scope.row.ali_pay_rate||'--'}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="pay_channel_type" label="收款通道" :key="7">
                                </el-table-column>
                                <el-table-column prop="audit_status" label="审核状态" :key="8">
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.pay_channel_type == '间连'">
                                            间连：{{scope.row.lkl_status==1?'审核成功':scope.row.lkl_status==2?'审核失败':scope.row.lkl_status==3?'审核中':'创建未提交'}}
                                        </div>
                                        <div v-else>
                                            <div>微信：{{scope.row.wx_status==1?'审核成功':scope.row.wx_status==2?'审核失败':scope.row.wx_status==3?'审核中':'创建未提交'}}</div>
                                            <div>支付宝：{{scope.row.ali_status==1?'审核成功':scope.row.ali_status==2?'审核失败':scope.row.ali_status==3?'审核中':'创建未提交'}}</div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column label="激活码" prop='keys' :key="9">
                                    <template slot-scope="scope">
                                        <div style="max-height:80px; overflow-y: scroll;" class="boxMess">
                                            <p v-for="(item,i) in scope.row.keys" :key="i">{{item}}</p>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="device_sns" label="蜻蜓" :key="10">
                                    <template slot-scope="scope">
                                        <div style="max-height:80px; overflow-y: scroll;" class="boxMess">
                                            <p v-for="(item,i) in scope.row.device_sns" :key="i">{{item}}</p>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="绑定设备" width="100" :key="11">
                                    <template slot-scope="scope">
                                        <el-button @click="handleClick(scope.row,3)" type="text" size="small"
                                                   v-if='scope.row.allot_key==1'>激活码
                                        </el-button>
                                        <el-button type="text" size="small" @click="handleClick(scope.row,1)"
                                                   v-if='scope.row.allot_key==1'>蜻蜓
                                        </el-button>
                                    </template>
                                </el-table-column> -->
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
    let map = {1: '直连', 2: '间连'};

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
                    "name": '',
                    "mobile": '',
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
                this.getData(this.postData);
            },
            /**
             * 上一页
             */
            prevClick() {
                this.pagination.currentPage--;
                this.postData.cursor--;
                this.getData(this.postData);
            },
            /**
             * 下一页
             */
            nextClick() {
                this.pagination.currentPage++;
                this.postData.cursor++;
                this.getData(this.postData);
            },
            /**
             * 每页条数
             * @param val
             */
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pagination.size = this.postData.size = val;
                this.getData(this.postData);
            },
            handleSelectionChange(val) {
                // this.multipleSelection = val;
            },
            //
            // handleClick(row, num) {
            //     console.log(row);
            //     let text = ''
            //     num == 1 ? text = '蜻蜓' : text = "激活码"
            //     this.$prompt('', text, {
            //         confirmButtonText: '添加',
            //         cancelButtonText: '取消',
            //         inputPattern: /\w+/,
            //         inputErrorMessage: '请输入内容',
            //         center: true,
            //     }).then(({value}) => {
            //         console.log("balue", value)
            //         this.loading = true
            //         this.$axios.post('/agent/mer/addMerDevice', {
            //             device_sn: value,
            //             device_type: num,
            //             mer_id: row.id,
            //         })
            //             .then(res => {
            //                 this.loading = false
            //                 console.log('绑定', res)
            //                 if (res.data.code == 200) {
            //                     this.$message.success("绑定成功")
            //                     this.getData(this.postData)
            //                 } else {
            //                     this.$message.error('绑定失败')
            //                 }
            //             })
            //             .catch(rej => {
            //                 this.loading = false
            //                 this.$message.error('网络异常')
            //             })
            //     }).catch(() => {
            //         this.$message({
            //             type: 'info',
            //             message: '取消绑定'
            //         });
            //     });
            // },
            onSubmit() {
                console.log('submit!');
                this.pagination.currentPage = this.postData.cursor = 1;

                this.getData(this.postData);
            },
            //获取数据
            getData(datas) {
                this.loading = true;
                console.log(datas);
                //初始化列表
                this.$axios.post('/agent/mer/getMerchant', datas).then(res => {
                    this.loading = false;
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        this.tableData = res.data.data.data;
                        this.tableData.forEach(ele=>{
                            ele.pay_channel_type = map[ele.pay_channel_type];
                        })
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
            this.getData(this.postData)
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

    /* .boxMess::-webkit-scrollbar {
        display: none;
    } */


</style>
