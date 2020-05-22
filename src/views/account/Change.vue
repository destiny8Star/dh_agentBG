<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <h1 class="ly-title-one">修改密码</h1>
                        <div class="form-list" style="margin-top: 30px">
                            <el-form label-position="left" ref="form" :model="form" label-width="90px" :rules="rules">
                                <el-form-item label="原密码" prop="old_password">
                                    <el-input v-model="form.old_password" type="password" placeholder="请输入旧密码"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码" prop="newPass">
                                    <el-input v-model="form.newPass" type="password" placeholder="6-20位字符（可包含字母或数字）"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码" prop="new_password">
                                    <el-input v-model="form.new_password" type="password" placeholder="请再次输入新密码"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('form')" v-loading="submitState">提交</el-button>
                                    <!--<el-button @click="resetForm('form')">重置</el-button>-->
                                    <!--<el-button>取消</el-button>-->
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
                <common-footer></common-footer>
            </div>
        </div>
    </div>
</template>

<script>
    // import third_nav from '../../../components/third-nav.vue'
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
            var validatePassOld = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error('请输入密码'));
                } else if (value == this.form.newPass) {
                    callback(new Error('新旧密码不可一致!'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error('请输入密码'));
                } else if (value == this.form.old_password) {
                    callback(new Error('新旧密码不可一致!'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                winHeight: window.innerHeight,
                form: {
                    old_password: '',
                    newPass: '',
                    new_password: '',
                },
                submitState: false,

                dialogImageUrl: '',
                dialogVisible: false,
                rules: {
                    old_password: [
                        {
                            validator: validatePassOld,
                            required: true,
                            message: '请输入旧密码',
                            trigger: 'blur'
                        }
                    ],
                    newPass: [
                        {
                            validator: validatePass,
                            required: true,
                            // message: '请输入新密码',
                            trigger: 'blur'
                        }
                    ],
                    new_password: [
                        {
                            validator: validatePass2,
                            required: true,
                            // message: '请再次输入新密码',
                            trigger: 'blur'
                        }
                    ]
                },
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            /**
             * 提交
             * @param formName
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                        this.submitState = true;
                        this.$axios.post('/agent/home/setLoginPassword',this.form).then(res => {
                            console.log(res);
                            if (res.data.code === this.$webConfig.httpSuccessStatus) {
                                this.$message('修改成功,请重新登录');
                                this.$router.push('/');
                            }else {
                                this.$message(res.data.message);
                            }
                            this.submitState = false;
                        }).catch(()=>{
                            this.submitState = false;
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>


