<template>
	<div>
		<div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <!-- tab按钮 start -->
            <div class="third-nav">
                <div class="third-nav-t">服务商管理</div>
                <!--<div class="third-nav-t">分销商管理</div>-->
            </div>
            <!-- tab按钮 end -->
			<div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
				<div class="main-feature">
					<div class="main-inner" v-loading="loading" >
                           <!-- top数据展示 start -->
                        <div class="home-figure show-data" >
                            <el-row :gutter="30" style="margin: 0 0 40px">
                                <el-col :sm="4" :span='2' v-for="(ele,i) in showList" :key="i">
                                    <div class="grid-content">
                                        <div class="home-figure-content">{{ele.label}}</div>
                                        <div class="home-figure-num">{{ele.num}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
						 <!--搜索条件 start -->
						<el-form :inline="true" :model="postData" class="demo-form-inline">
							<el-row>
								<el-form-item label="姓名">
									 <el-input v-model="postData.name"></el-input>
								</el-form-item>
								<el-form-item label="手机号">
									 <el-input v-model="postData.tel"></el-input>
								</el-form-item>
                                <el-form-item label="状态">
                                     <el-select v-model="postData.status" placeholder="请选择服务商状态" size='small'>
                                     <!--<el-select v-model="postData.status" placeholder="请选择分销商状态" size='small'>-->
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
								</el-form-item>
                                <el-form-item>
                                        <el-button style="margin-left: 34px" type="primary" @click="onSubmit" size="small">查询</el-button>
                                </el-form-item>
                                 <el-button type="primary"  style='float:right' @click="$router.push({name:'distributorAdd'})">添加服务商</el-button>
                                 <!--<el-button type="primary"  style='float:right' @click="$router.push({name:'distributorAdd'})">添加分销商</el-button>-->
							</el-row>
						</el-form>
						 <!--搜索条件 end -->
						 <!-- 表格 start -->
                        <template>
                            <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;"
                                      @selection-change="handleSelectionChange">
                                <el-table-column type="index" fixed width="80" label="编号">
                                    <template slot-scope="scope">{{ pagination.total - ( ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) ) + 1}}
                                </template>
                                </el-table-column>
                                <el-table-column prop="real_name" label="姓名">
                                </el-table-column>
                                <el-table-column prop="tel" label="手机号">
                                </el-table-column>
                                <el-table-column prop="store_no" label="商户数">
                                </el-table-column>
                                <el-table-column prop="today_store_no" label="今日新增商户">
                                </el-table-column>
                                <el-table-column prop="del_flag" label="状态">
                                   <template slot-scope="scope">
                                     <div>{{scope.row.del_flag==1?'启用':'禁用'}}</div>
                                   </template>
                                </el-table-column> query: { userId: 123 }
                                <el-table-column fixed="right" label="操作" width="100">
                                    <template slot-scope="scope">
                                        <el-button @click="handleClick(scope.row)" type="text" style="color:#F56C6C" :class="scope.row.del_flag==1?'':'enable'">{{scope.row.del_flag==1?'禁用':'启用'}}</el-button>
                                        <el-button type="text" @click="$router.push({name:'distributorUpdate',query: { id: scope.row.id }})">修改</el-button>
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
                loading:false,
                showList: [
                    {
                        // label: '分销商总数',
                        label: '服务商总数',
                        num: 3
                    },
                    {
                        label: '启用中',
                        num: 346
                    },
                    {
                        label: '已禁用',
                        num: 78
                    }
                ],
                options:[
                    {
                        value: '1',
                        label: '启用'
                    },
                    {
                        value: '0',
                        label: '禁用'
                    },
                ],
                tableData: [
                    {   
                        id:'',
                        real_name:"",
                        tel:'',
                        store_no:'',
                        today_store_no:'',
                        del_flag:'',
                    }
                ],
				winHeight: window.innerHeight,
            
                searchState: false,
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
                    "status": '',
                    "tel": ""
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
                this.pagination.currentPage --;
                this.postData.cursor --;
                this.getData(this.postData);
            },
            /**
             * 下一页
             */
            nextClick() {
                this.pagination.currentPage ++;
                this.postData.cursor ++;
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
            //禁用启用
            prohibit(row){
                return  this.$axios.post('/agent/distributor/detail',{...row})
            },
            handleClick(row) {
                console.log(row);
                if(row.del_flag==1){
                    this.$confirm('禁用后，账号将不可用，是否禁用?', '提示', {
                        confirmButtonText: '禁用',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                        }).then(() => {
                            this.loading=true
                            this.prohibit(row)
                            .then(res=>{
                                this.loading=false
                                if(res.data.code==200){
                                    this.$set(row, 'del_flag', 0);
                                    this.$message.success("禁用成功")
                                     this.getTop()

                                }else{
                                    this.$message.error('禁用失败')
                                }
                                console.log('禁用',res)
                            })
                            .catch(rej=>{this.loading=false,this.$message.error("网络异常")})
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });
                }else{
                       this.loading=true
                          this.prohibit(row)
                            .then(res=>{
                                this.loading=false
                                if(res.data.code==200){
                                    this.$set(row, 'del_flag', 1);
                                    this.$message.success("启用成功")
                                    this.getTop()
                                }else{
                                    this.$message.error('启用失败')
                                }
                                console.log('启用',res)
                            })
                            .catch(rej=>{this.loading=false,this.$message.error("网络异常")})
                }
                     
            },
            //获取数据
            getData(datas) {
               this.loading=true;
                let  api = '/agent/distributor/list';
                console.log(datas);
                //初始化列表
                this.$axios.post(api, datas).then(res => {
                       this.loading=false;

                        console.log(res);
                        if (res.data.code === this.$webConfig.httpSuccessStatus) {
                            this.tableData = res.data.data.data;
                         
                            this.pagination.total = res.data.data.count;
                            this.pagination.currentPage = res.data.data.cursor;
                        }
                    })
                    .catch(() => {
                       this.loading=false;
                       this.$message.error("网络异常")
                    });
            },
            //获取topdata
            getTop(){
                this.$axios.post('/agent/distributor/statistical')
                        .then(res=>{
                            if(res.data.code==200){
                                this.showList[0].num=res.data.data.total_no
                                this.showList[1].num=res.data.data.use_no
                                this.showList[2].num=res.data.data.not_used_no
                            }else{
                            this.$message.error('网络异常')
                            }
                            console.log("获取统计",res)
                        })
                        .catch(rej=>{
                            this.$message.error('网络异常')
                        })
            },
			onSubmit() {
                console.log('submit!',this.postData);
                this.pagination.currentPage = this.postData.cursor = 1;
                
				this.getData(this.postData);
			},
		},
		created(){
           this.getTop()
           this.getData(this.postData)
		}
	}
</script>

<style>
	.main-inner {
		padding: 13px 40px;
	}
    .boxMess{
       height: 100px;
       overflow-y: scroll
    }
    .enable{
        color:#67C23A!important
    }
/* .boxMess::-webkit-scrollbar {
    display: none;
} */


</style>
