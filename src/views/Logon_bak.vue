<template>
	<div class="login" :style="{height: (getWinHeight) + 'px'}">
		<div class="login-content-1">
			<div class="login-content-inner">
				<div class="login-main-content">
					<!-- <div class="login-logo-mini">
							<img src="../assets/img/logo-login.png" class="login-logo-img-mini">
						</div> -->
					<div class="login-form">
						<el-form ref="form" :model="form">
							<div class="welcome">商家登录</div>
							<el-form-item prop="name">
								<el-input v-model="form.name" placeholder="用户名"></el-input>
							</el-form-item>
							<el-form-item prop="passwd">
								<el-input type="password" v-model="form.passwd" placeholder="密   码"></el-input>
							</el-form-item>
							<el-form-item prop="code">
								<el-input v-model="form.code" placeholder="验证码"></el-input>
								<div class="code-img">
									<!-- 验证码 -->
									<canvas width="120" height="40" id="canvas" />
								</div>
							</el-form-item>
							<el-form-item prop="rem">
								<el-checkbox-group v-model="form.rem">
									<el-checkbox label="记住密码,下次直接登录" name="rem"></el-checkbox>
								</el-checkbox-group>
							</el-form-item>
							<el-form-item>
								<el-button @click="onSubmit()">登 录</el-button>
								<!--<el-button @click="testHttp">Test</el-button>-->
							</el-form-item>
						</el-form>
					</div>
				</div>			
			</div>
			<div class="copy">&copy; 2018-2018 xxxxxxx有限公司</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Logon",
        mounted: function(){
		  console.log(test.geta());
        },
		computed: {
			getWinHeight: function () {
				return this.$winHeight;
			}
		},
		data: function () {
			return {
				form: {
					name: '',
					passwd: '',
					code: '',
					rem: []
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			testHttp(){
			    // this.$http.get('http://mp.j-ker.com/Home/NewsTop4',{},{}).then((response)=>{
			    //     console.log(response);
				// }).catch(error=>{
				//     console.log(error);
				// });
                this.$axios.get('http://localhost:8090/hello?r='+Math.random(),{
                   headers: {'authtoken':'token_'}
				}).then((response)=>{
                    console.log(response);
                }).catch(error=>{
                    console.log(error.response);
                });
			}
		}
	}
</script>
