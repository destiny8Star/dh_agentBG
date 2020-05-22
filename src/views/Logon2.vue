<template>
	<div class="login" :style="{height: (getWinHeight) + 'px'}">
		<div class="login-content">
			<div class="login-title">
				<img src="../assets/img/logo-big-white.png" class="login-title-img">
				<div class="login-title-t">社交裂变·智能助手·赋能销售</div>
			</div>
			<div class="login-main">
				<div class="login-main-left">
					<img src="../assets/img/bb.png" class="login-img-bb">
				</div>
				<div class="login-main-right">
					<div class="login-main-content">
						<!-- <div class="login-logo-mini">
							<img src="../assets/img/logo-login.png" class="login-logo-img-mini">
						</div> -->
						<div class="login-form">
							<el-form ref="form" :model="form">
								<div class="welcome">欢迎登录</div>
								<el-form-item prop="name">
									<el-input v-model="form.name" placeholder="用户名"></el-input>
								</el-form-item>
								<el-form-item prop="passwd">
									<el-input type="password" v-model="form.passwd" placeholder="密码"></el-input>
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
								</el-form-item>
							</el-form>
						</div>
						<div class="login-tip">
							<a href="javascript:void(0);" class="login-tip-t1">联系我们</a>
							<a href="javascript:void(0);" class="login-tip-t2">关于我们</a>
						</div>
					</div>
					<div class="copy">&copy; 2018-2018 江xxxxxx有限公司</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Logon2",
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
			}
		}
	}
// 	var codeV = "";
// 	//验证码
// 	/**生成一个随机数**/
// 	function randomNum(min, max) {
// 		return Math.floor(Math.random() * (max - min) + min);
// 	}
// 	/**生成一个随机色**/
// 	function randomColor(min, max) {
// 		var r = randomNum(min, max);
// 		var g = randomNum(min, max);
// 		var b = randomNum(min, max);
// 		return "rgb(" + r + "," + g + "," + b + ")";
// 	}
// 	drawPic();
// 	document.getElementById("canvas").onclick = function (e) {
// 		e.preventDefault();
// 		drawPic();
// 	}
// 	/**绘制验证码图片**/
// 	function drawPic() {
// 		var canvas = document.getElementById("canvas");
// 		var width = canvas.width;
// 		var height = canvas.height;
// 		var ctx = canvas.getContext('2d');
// 		ctx.textBaseline = 'bottom';
// 	
// 		/**绘制背景色**/
// 		ctx.fillStyle = randomColor(180, 240); //颜色若太深可能导致看不清
// 		ctx.fillRect(0, 0, width, height);
// 		/**绘制文字**/
// 		var str = '123456789';
// 		for (var i = 0; i < 4; i++) {
// 			var txt = str[randomNum(0, str.length)];
// 			ctx.fillStyle = randomColor(50, 120); //随机生成字体颜色
// 			ctx.font = randomNum(15, 40) + 'px SimHei'; //随机生成字体大小
// 			var x = 10 + i * 25;
// 			var y = randomNum(25, 45);
// 			var deg = randomNum(-45, 45);
// 			//修改坐标原点和旋转角度
// 			ctx.translate(x, y);
// 			ctx.rotate(deg * Math.PI / 180);
// 			ctx.fillText(txt, 0, 0);
// 			//恢复坐标原点和旋转角度
// 			ctx.rotate(-deg * Math.PI / 180);
// 			ctx.translate(-x, -y);
// 		}
// 		/**绘制干扰线**/
// 		for (var i = 0; i < 4; i++) {
// 			ctx.strokeStyle = randomColor(100, 180);
// 			ctx.beginPath();
// 			ctx.moveTo(randomNum(0, width), randomNum(0, height));
// 			ctx.lineTo(randomNum(0, width), randomNum(0, height));
// 			ctx.stroke();
// 		}
// 		/**绘制干扰点**/
// 		for (var i = 0; i < 50; i++) {
// 			ctx.fillStyle = randomColor(0, 255);
// 			ctx.beginPath();
// 			ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
// 			ctx.fill();
// 		}
// 	}
</script>
