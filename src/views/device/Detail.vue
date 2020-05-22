<template>
  <div>
    <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
      <div class="third-nav">
        <div class="third-nav-t">设备详情</div>
      </div>
      <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
        <div class="main-feature">
          <div class="main-inner">
            <el-button type="primary" @click="$router.go(-1)" size="small" style="float: right">返回</el-button>
            <el-card  style="width: 40%;margin: 20px 0; " >
              <div class="realBox">
                <div>
                  <p v-for="(ele,i) in infoData" :key="i">
                    {{ele.table}}:
                    <span>  {{ele.value}}</span>
                    <!-- <span style="margin-left: 10px" v-if="ele.unit">{{ele.unit}}</span> -->
                  </p>
                </div>
                  <div class="realBox_img">
                <img :src='info_img' alt='图片' />
              </div>
              </div>
            
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  computed: {
    getWinHeight: function() {
      return this.$winHeight;
    }
  },
  data() {
    return {
      device_no: "", //设备sn
      searchState: false,
      infoData: [
        {
          table: "设备名称",
          value: "",
        },
        {
          table: "设备分类",
          value: "",
        },
        {
          table: "设备SN",
          value: "",
        },
        {
          table: "设备状态",
          value: "",
        },
        {
          table: "绑定商户",
          value: "",
        },

        {
          table: "绑定门店",
          value: "",
        }
      ],
      info_img:'',//图片
    };
  },
  methods: {
    /**
     * 获取信息详情
     */
    getDetail() {
      //初始化列表
      this.$axios.get('/agent/device/detail?device_no='+this.device_no).then(res => {
          console.log('获取详情',res);
          this.searchState = false;
          if (res.data.code == this.$webConfig.httpSuccessStatus) { 
              let info = res.data.data;
              this.infoData[0].value = info.device_name || '--';
              this.infoData[1].value = info.device_type || '--';
              this.infoData[2].value = info.device_no || '--';
              this.infoData[3].value = info.status;
              this.infoData[4].value = info.mer_name || '--';
              this.infoData[5].value = info.store_name || '--';
              this.info_img = info.pic
          } else {
              this.$message.error(res.data.message);
          }
      })
          .catch(() => {
              this.searchState = false;
              this.$message.error('网络异常');
          });
    }
  },
  beforeMount() {
    // if (this.$route.query.device_no) {
      this.device_no = this.$route.query.device_no;
    // }
      console.log('获参数',this.$route)

    // 获取信息
    this.getDetail();
  }
};
</script>

<style scoped>
.el-date-editor--datetimerange {
  width: 240px !important;
  margin-top: 4px;
}
.realBox {
  display: flex; 
  justify-content: space-between;
  align-items: center
}
.realBox p {
  min-width: 30%;
  line-height: 32px;
  padding-left: 30px;
}
.realBox span {
  margin-left: 10px;
}
.realBox_img {
  max-width: 200px;
  height: auto;
  max-height: 300px
}
.realBox_img img{
  max-width: 200px;
  height: auto;
  max-height: 300px
}
.ly-title {
  /*font-size: 16px;*/
  /*font-weight: 900;*/
}
</style>