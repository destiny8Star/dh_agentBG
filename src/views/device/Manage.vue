<template>
  <div>
    <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
      <!-- tab按钮 start -->
      <div class="third-nav">
        <div class="third-nav-t">设备管理</div>
      </div>
      <!-- tab按钮 end -->
      <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
        <div class="main-feature">
          <div class="main-inner" v-loading="searchState">
            <!-- top数据展示 start -->
            <div class="home-figure show-data">
              <el-row :gutter="10" style="margin: 0 0 20px">
                <el-col :sm="4" v-for="(ele,i) in showList" :key="i">
                  <div class="grid-content" v-if='i!=2||agent_level!=4'>
                    <div class="home-figure-content">{{ele.label}}</div>
                    <div class="home-figure-num">{{ele.count}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- top数据展示 end -->

            <!-- 搜索条件 start -->
            <el-form
              :inline="true"
              ref="postData"
              :model="postData"
              class="demo-form-inline"
              style="margin-top: 40px"
            >
              <el-form-item label="设备SN">
                <el-input v-model="postData.device_no" placeholder="请输入设备SN" clearable></el-input>
              </el-form-item>
              <el-form-item label="所属商户">
                <el-input v-model="postData.mer_name" placeholder="请输入所属商户" clearable></el-input>
              </el-form-item>
              <el-form-item label="设备名称">
                <el-input v-model="postData.device_name" placeholder="请输入设备名称" clearable></el-input>
              </el-form-item>
              <el-form-item label="设备状态">
                <el-select v-model="postData.type" placeholder="请选择设备状态" clearable>
                  <el-option
                    v-for="item in roleList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit" size="small" >查询</el-button>
              </el-form-item>
            </el-form>
            <!-- 搜索条件 end -->

            <!-- 表格 start -->
            <template>
              <el-table
                ref="multipleTable"
                :data="tableData"
                style="width: 100%;min-width: 780px;"
                @selection-change="handleSelectionChange"
              >
                <el-table-column prop="device_no" label="设备SN"></el-table-column>
                <el-table-column prop="device_name" label="设备名称"></el-table-column>
                <el-table-column prop="mer_name" label="商户名">
                   <template slot-scope="scope">
                      {{ scope.row.mer_name?scope.row.mer_name:'--' }} 
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态">
                  <!-- <template slot-scope="scope">
                      {{ (scope.row.status==2||scope.row.status==6)?'已入库':(scope.row.status==3||scope.row.status==4)?'已分发':'--' }} 
                    </template> -->
                </el-table-column>
                <el-table-column prop="level_desc" label="操作">
                    <template slot-scope="scope">
                      <!-- :disabled='true' -->
                      <el-button type="text" @click="distribute(scope.row.device_no,1)" :disabled='scope.row.type==3||scope.row.type==4||scope.row.type==7||scope.row.type==8' v-if="agent_level!=4">分发给{{getName}}</el-button>
                      <el-button type="text" @click="distribute(scope.row.device_no,2)" :disabled='scope.row.type==3||scope.row.type==4||scope.row.type==7||scope.row.type==8' v-if="agent_level!=4">分发给商户</el-button>
                      <el-button type="text" @click="distribute(scope.row.device_no,2)" :disabled='scope.row.type==3||scope.row.type==4' v-if="agent_level==4">分发给商户</el-button>
                      <el-button type="text" @click="$router.push({path:'/device/detail?device_no='+scope.row.device_no})">详情</el-button>
                      <el-button type="text" style="color:#F56C6C"   @click="distribute(scope.row.device_no,3)" :disabled='scope.row.type==3||scope.row.type==4' v-if="agent_level==4">退回</el-button>
                    </template>
                </el-table-column>
              </el-table>
            </template>
            <!-- 表格 end -->
            <template>
              <div class="block" style="text-align: center;margin-top: 30px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="jumpPagination"
                  @prev-click="prevClick"
                  @next-click="nextClick"
                  :current-page="pagination.currentPage"
                  :page-sizes="pagination.pageCount"
                  :page-size="pagination.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pagination.total"
                ></el-pagination>
              </div>
            </template>
          </div>
        </div>
        <common-footer></common-footer>
      </div>
      <!-- //弹出框 分发给代理商-->
      <el-dialog
        :title="'分发给'+getName"
        :visible.sync="centerDialogVisible"
        :close-on-click-modal='false'	
        :show-close='false'
        :close-on-press-escape='false'
        width="30%"
        center>
          <el-input v-model="mobile" placeholder="请输入手机号" style="margin-bottom:20px" maxlength='11' @keyup.native='checkPhone'></el-input>
          <span v-if="mer_name">姓名：{{mer_name}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false,mobile = '', mer_name='',mer_id=''">取 消</el-button>
            <el-button type="primary" @click="toDis" :disabled='mer_name==""'>确 定</el-button>
          </span>
      </el-dialog>
          <!-- //弹出框 商户-->
      <el-dialog
        title="分发给商户"
        :visible.sync="DialogVisible"
        :close-on-click-modal='false'	
        :show-close='false'
        :close-on-press-escape='false'
        width="30%"
        center>
          <!-- <el-input v-model="mobile"   @keyup.native='checkPhone'></el-input> -->
          <el-select
              v-model="mer_id"
              filterable
              remote
              reserve-keyword
              placeholder="请输入手机号"
              maxlength='11'
              @change='changeMer'
              :remote-method="remoteMethod"
              style="width:100%"
              :loading="loadingBD">
              <el-option
                  v-for="item in optionsBD"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"> 
              </el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
            <el-button @click="DialogVisible = false,mobile = '', optionsBD=[],mer_id=''">取 消</el-button>
            <el-button type="primary" @click="toDis" :disabled='mer_id==""'>确 定</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import CommonFooter from "../../components/CommonFooter.vue";
export default {
  name: "manage",
  components: {
    CommonFooter
  },
  computed: {
    getWinHeight: function() {
      return this.$winHeight;
    }
  },
  data() {
    return {
      loadingBD:false, //搜索商户的时候用
      optionsBD:[],//可选择的商户
      searchState: false,
      centerDialogVisible: false,//分销商弹出框显示否
      DialogVisible: false,//商户弹出框显示否
      agent_level:'', //账号级别 4是分销商，其他
      mobile:'',//输入手机号 获取信息用
      mer_name:'',//商户名称 分发前展示用
      mer_id:'',//商户id  分发时候用  分发给分销商
      dev_sn:'', //选中sn，分发用
      fx:'', //商户还是分销商 1是分销商，2是商户
      getName:'', //从后台获取分销商顶部渲染名字
      //页面所需
      pagination: {
        total: 0,
        pageCount: [10, 20, 50, 100],
        currentPage: 1,
        pageSize: 10,
        show: "1-5"
      },
      //接口参数
      postData: {
        cursor: 1, //当前第几页-游标
        size: 10, //每页条数
        device_name: "",//设备名称
        device_no: "",//设备sn
        mer_name:'',//商户名称
        type:'', //设备状态 
      },
      showList: [
        {
          label: "总数",
          count: 3
        },
        {
          label: "库存数",
          count: 346
        },
        {
          label: "已分配给",
          count: 78
        },
          {
          label: "已分配给商户",
          count: 78
        }
      ],
      roleList: [],//设备状态

      tableData: []
    };
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
      // console.log(this.postData);
      //初始化列表
      this.$axios
        .post("/agent/device/manager/list", this.postData)
        .then(res => {
          this.searchState = false;
          console.log('列表数据',res);
          if (res.data.code === this.$webConfig.httpSuccessStatus) {
            this.tableData = res.data.data.data;
        
            console.log(this.tableData);
            this.pagination.total = res.data.data.count;
            this.pagination.currentPage = res.data.data.cursor;
          }else{
            this.$message.error(res.data.message)
          }
        })
        .catch(() => {
          this.searchState = false;
          this.$message.error('网络异常')
        });
    },
    /**
     *  - 顶部数据
     */
    getShowData() {
      //初始化列表
      this.$axios
        .post("/agent/device/manager/top")
        .then(res => {
          console.log('顶部数据',res);
          if (res.data.code === this.$webConfig.httpSuccessStatus) {
            this.showList[0].count = res.data.data.total_no;
            this.showList[1].count = res.data.data.surplus_no;
            this.showList[2].count = res.data.data.binding_fagent_no;
            this.showList[2].label +=res.data.data.str_agent_level
            this.showList[3].count = res.data.data.binding_no;
            this.agent_level = res.data.data.agent_level_index
            this.getName = res.data.data.str_agent_level
          }else{
            this.$message.error(res.data.message)
          }
        })
        .catch(rej => {
          console.log('顶部失败',rej)
          this.$message.error('网络异常')
        });
    },
    /**
     * 获取roleList
     */
    getRole(){
      this.$axios
        .get("/agent/device/get/status")
        .then(res => {
          console.log('设备状态',res);
          if (res.data.code === this.$webConfig.httpSuccessStatus) {
            this.roleList = res.data.data
          }else{
            this.$message.error(res.data.message)
          }
        })
        .catch(rej => {
          console.log('设备状态失败',rej)
          this.$message.error('网络异常')
        });
    },
    /**
     * 查询
     */
    onSubmit() {
      console.log("submit!",this.postData);
      this.searchState = true;
      this.pagination.currentPage = this.postData.cursor = 1;
      this.getData();
    },
    //下拉选择商户
    changeMer(e){
      console.log('选择商户',e)
    },
    // 输入手机号远程搜索商户
    remoteMethod(query) {
        let reg = /^1\d{10}$/
        if (reg.test(query)) {
            this.loadingBD = true;
            let  url = "/agent/device/get/mer?tel="
            this.$axios.get(url+query)
            .then(res => {
              console.log("获取商户",res)
                if(res.data.data&&res.data.data.length !=0){
                  this.optionsBD = res.data.data;
                  }else{
                      this.optionsBD = [];
                     this.$message.error(res.data.message)
                  }
                this.loadingBD = false;
            })
            .catch(rej =>{
                this.loadingBD = false;
                this.optionsBD = [];
                this.$message.error(rej.message)
                console.log('失败', rej);
            })
        } else {
          this.optionsBD = [];
        }
    },
    //验证
    checkPhone(e){
       let mobile = this.mobile
       console.log('ee',mobile)
       let reg = /^1\d{10}$/
       if(reg.test(mobile)){
         console.log('完成验证')
         this.searchState = true;
         let url = "/agent/device/get/agent?tel="
         this.$axios.get(url+mobile)
         .then(res=>{
           this.searchState = false;
            if (res.data.code == this.$webConfig.httpSuccessStatus) {
                this.mer_name = res.data.data.value
                this.mer_id = res.data.data.id
            }else{
              this.$message.error(res.data.message)
            }
           console.log('商户信息',res)
         })
         .catch(rej=>{
           this.searchState = false;
           this.$message.error('网络异常')
           console.log('商户信息失败',rej)
         })
       }else{
         this.mer_name=''
       }

    },
    //分发
    distribute(row,fx) {
      console.log('选中当前',row,fx)
      this.dev_sn = row
      this.fx = fx
      if(fx == 1){
       this.centerDialogVisible = true
      }else if(fx == 2){
       this.DialogVisible = true
      }else{
          this.$confirm('此操作将把设备退回, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
              this.$axios.post("/agent/device/manager/sendBack/agent",{device_no:row})
              .then(res=>{
                console.log('退回信息',res)
                this.searchState = false;
                  if (res.data.code == this.$webConfig.httpSuccessStatus) {
                    this.$message.success('退回成功')
                    this.getData();
                    this.getShowData();
                  }else{
                    this.$message.error(res.data.message)
                  }
              })
              .catch(rej=>{
                this.searchState = false;
                this.$message.error('网络异常')
                console.log('分发失败',rej)
              })
        
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '退回失败'
            });
          });
      }
    },
    //确定分发
    toDis(){
      let deviceNo = this.dev_sn;
      let merSubjectId = this.mer_id;
      let fx = this.fx
      let url = ""
      let datas = ""
      if(fx == 1){
        datas = {
          device_no:deviceNo,
          agent_subject_id:merSubjectId 
        }
        url = "/agent/device/manager/allot/agent"
      }else{
        datas = {
          device_no:deviceNo,
          mer_subject_id:merSubjectId
        }
        url = "/agent/device/manager/allot"
      }
      console.log('fx',fx,datas)
   
      this.$axios.post(url,datas)
         .then(res=>{
           console.log('分发结果信息',res)
           this.searchState = false;
            if (res.data.code == this.$webConfig.httpSuccessStatus) {
              this.centerDialogVisible = false
              this.DialogVisible = false
              this.$message.success('分发成功')
              this.mobile = ''
              this.mer_name = ''
              this.optionsBD = [];
              this.mer_id = '';
              this.getData();
              this.getShowData();
            }else{
              this.$message.error(res.data.message)
            }
         })
         .catch(rej=>{
           this.searchState = false;
           this.$message.error('网络异常')
           console.log('分发失败',rej)
         })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  beforeMount() {
    // 获取列表数据
    this.getData();
    this.getShowData();
    this.getRole()
  }
};
</script>  
<style scoped>
.el-date-editor--datetimerange {
  width: 230px !important;
  margin-top: 4px;
}
</style>