<template>
    <!--sdfasdf-->
    <!--	adfasdf-->
    <div class="login1" :style="{height: (getWinHeight) + 'px'}">
        <div class="ly-login-content">
            <h1 class="ly-login-title">点击生活服务商管理后台</h1>
            <div class="ly-login-content-inner">
                <div class="ly-login-main-content">
                    <div class="login-logo-img">
                        <img src="../assets/img/home/logo.png">
                    </div>
                    <div class="login-form">
                        <el-form ref="form" :model="form" :rules="rules">
                            <el-form-item prop="name">
                                <el-input v-model="form.name" placeholder="用户名" prefix-icon="el-icon-user">
                                    <!--<i slot="prefix" class="el-input__icon el-icon-user"></i>-->
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" v-model="form.password" placeholder="密   码" prefix-icon="el-icon-lock"></el-input>
                            </el-form-item>
                            <el-form-item prop="rem">
                                <el-checkbox v-model="form.rem">记住密码,下次直接登录</el-checkbox>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="onSubmit('form')" v-loading="submitState">登 录</el-button>
                                <!--<el-button @click="testHttp">Test</el-button>-->
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import test from "../util";
    let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    export default {
        name: "Logon",
        mounted: function () {
            // console.log(test.geta());
        },
        // mounted(){
        // 	let data=new Date()
        // 	let datas=new Date().format(data)
        // 	console.log("date",datas)
        // },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
            var account = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error('请输入账号'));
                }else if (!reg.test(value)) {
                    callback(new Error('请输入正确的账号'));
                }  else {
                    callback();
                }
            };
            var checkPass = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error('请输入密码'));
                }  else {
                    callback();
                }
            };
            return {
                submitState: false,
                form: {
                    name: '',
                    password: '',
                    rem: false
                },
                rules: {
                    name: [
                        {
                            validator: account,
                            required: true,
                            // message: '请输入账号',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            validator: checkPass,
                            required: true,
                            // message: '请输入密码',
                            trigger: 'blur'
                        }
                    ]
                },
            }
        },
        methods: {
            /**
             * 提交
             * @param formName
             */
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                        this.submitState = true;
                        // this.$axios.post('/agent/store/saveOrUpdate',this.form).then(res => {
                        //     console.log(res);
                        //     if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        //         this.$message('登录成功');
                        //         this.$router.push('/store/list');
                        //     }else {
                        //         this.$message(res.data.message);
                        //     }
                        //     this.submitState = false;
                        // }).catch(()=>{
                        //     this.submitState = false;
                        // })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            testHttp() {
                // this.$http.get('http://mp.j-ker.com/Home/NewsTop4',{},{}).then((response)=>{
                //     console.log(response);
                // }).catch(error=>{
                //     console.log(error);
                // });
                this.$axios.get('http://localhost:8090/hello?r=' + Math.random(), {
                    headers: {'authtoken': 'token_'}
                }).then((response) => {
                    console.log(response);
                }).catch(error => {
                    console.log(error.response);
                });
            }
        }
    }
</script>


