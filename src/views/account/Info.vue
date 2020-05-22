<template>
	<div>
		<div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
			<div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
				<div class="main-feature">
					<div class="main-inner" :style="{height: (getWinHeight-220)+'px'}">
						<h1 class="ly-title-one">账户信息</h1>
						<div class="realBox">
							<p v-for="(ele,i) in infoData" :key="i">{{ele.table}}：<span>{{ele.value}}</span></p>
						</div>
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
                infoData: [
					{
					    table: '用户名',
						value: '冰冻三尺'
					},
					{
					    table: '姓名',
						value: '彭勇'
					},
					{
					    table: '手机号',
						value: '132****1623'
					},
					{
					    table: '身份证号',
						value: '140**********1542'
					},
					{
					    table: '银行卡号',
						value: '622************13453'
					},
					{
					    table: '支付宝账号',
						value: '15823562354'
					},
					{
					    table: '所属区域',
						value: '浙江省杭州市'
					},
					{
					    table: '服务商等级',
						value: '城市服务商'
					}
				]
			}
		},
		methods: {
            /**
             * 获取数据
             */
            getData() {
                //初始化列表
                this.$axios.get('/agent/home/showUserInfo').then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        let list = res.data.data;
                        this.infoData[0].value = list.nick_name;
                        this.infoData[1].value = list.real_name;
                        this.infoData[2].value = list.phone;
                        this.infoData[3].value = list.id_card;
                        this.infoData[4].value = list.bank_account;
                        this.infoData[5].value = list.ali_login_name;
                        this.infoData[6].value = list.area_desc;
                        this.infoData[7].value = list.level_desc;
                    } else {
                        this.$message(res.data.message);
                    }
                })
                    .catch(() => {

                    });
            },
		},
		mounted(){
            // 获取数据
            this.getData();
		}
	}
</script>

<style scoped>
	.main-inner {
		padding: 13px 40px;
	}
	.realBox p{
		font-size: 16px;
		line-height: 32px;
	}
	.realBox span{
		margin-left: 10px;
	}
	h2 {
		font-size: 16px;
		line-height:18px;
		margin-top: 25px;
	}
	.signBox {
		display: flex;
		align-items: center;
		margin: 26px 0 34px;
	}
	.signBox img{
		width: 35px;
		height: 35px;
		margin-right: 18px;
	}
	.signBox p{
		font-size: 16px;
		line-height: 18px;
	}
</style>

