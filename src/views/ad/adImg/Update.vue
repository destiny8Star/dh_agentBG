<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">广告图详情</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
                <div class="main-feature">
                    <div class="main-inner" style="padding-left: 60px">
                        <div class="realBox" style="width: 50%;margin: 20px 0">
                            <p>广告图类型：<span>{{mapType[form.ad_type]}}</span></p>
                            <p>广告图名称：<span>{{form.poster_name}}</span></p>
                            <p v-if="form.ad_type==2">是否可跳转：<span>{{mapRedirect[form.is_redirect]}}</span></p>
                        </div>
                        <div class="form-list">
                            <el-form label-position="left" ref="form" :model="form" label-width="120px" :rules="rules">
                                <el-form-item label="上传图片" prop="joint">
                                    <div class="ly-img-box">
                                        <div>
                                            <el-upload
                                                    class="avatar-uploader"
                                                    :action="this.$webConfig.qnUploadHost"
                                                    :data="qn"
                                                    :show-file-list="false"
                                                    :on-success="handleAvatarSuccess"
                                                    :before-upload="beforeAvatarUpload">
                                                <img v-if="form.joint.imgUrlBefore" :src="form.joint.imgUrlBefore"
                                                     class="avatar" @click="getToken('imgUrlBefore','poster_url')">
                                                <i v-else class="el-icon-plus avatar-uploader-icon"
                                                   @click="getToken('imgUrlBefore','poster_url')"></i>
                                            </el-upload>
                                            <p v-if="form.is_redirect==1&&form.ad_type==2">跳转前</p>
                                        </div>
                                        <div v-if="form.is_redirect==1&&form.ad_type==2">
                                            <el-upload
                                                    class="avatar-uploader"
                                                    :action="this.$webConfig.qnUploadHost"
                                                    :data="qn"
                                                    :show-file-list="false"
                                                    :on-success="handleAvatarSuccess"
                                                    :before-upload="beforeAvatarUpload">
                                                <img v-if="form.joint.imgUrl" :src="form.joint.imgUrl" class="avatar"
                                                     @click="getToken('imgUrl','poster_h5_url')">
                                                <i v-else class="el-icon-plus avatar-uploader-icon"
                                                   @click="getToken('imgUrl','poster_h5_url')"></i>
                                            </el-upload>
                                            <p>跳转后</p>
                                        </div>
                                    </div>


                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('form')" v-loading="submitState">确认修改
                                    </el-button>
                                    <!--<el-button @click="resetForm('form')">重置</el-button>-->
                                    <el-button @click="$router.push('/adImg')">取消</el-button>
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
    import CommonFooter from '../../../components/CommonFooter.vue'

    let mapType = {1:'支付前广告图', 2:'支付后广告图'};
    let mapRedirect = {1:'跳转', 0:'不跳转'};

    export default {
        name: "update",
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
            var checkNull = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(rule.message));
                } else {
                    callback();
                }
            };
            var checkNullText = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error(rule.message));
                } else {
                    callback();
                }
            };
            var checkNullImg = (rule, value, callback) => {
                if (this.form.is_redirect == 1 && this.form.ad_type == 2) {
                    if (value.imgUrlBefore === '' || value.imgUrl === '') {
                        callback(new Error(rule.message));
                    } else {
                        callback();
                    }
                } else {
                    if (value.imgUrlBefore === '') {
                        callback(new Error(rule.message));
                    } else {
                        callback();
                    }
                }
            };
            return {
                mapType: {1:'支付前广告图', 2:'支付后广告图'},
                mapRedirect: {1:'跳转', 0:'不跳转'},
                qn: {
                    token: "",
                    key: ""
                },
                submitState: false,
                codeList: [],//激活码list
                winHeight: window.innerHeight,
                form: {
                    id: '',
                    ad_type: '',//广告图类型【 1支付前 0支付后】
                    poster_name: '',//名称
                    is_redirect: '',//是否可跳转【 1跳转 0不跳转】
                    poster_url: '',
                    poster_h5_url: '',
                    joint: {
                        imgUrlBefore: '',
                        imgUrl: ''
                    }
                },
                imgSign: '',//暂存的img标识，以便于知道是出发的那张图片的上传按钮
                imgSigns: '',//暂存的img标识，以便于知道是出发的那张图片的上传按钮【数据联调】
                rules: {
                    joint: [
                        {
                            required: true,
                            validator: checkNullImg,
                            message: '请上传图片',
                            trigger: 'change'
                        }
                    ]
                },

                infoData: [
                    {
                        table: '广告图类型：',
                        value: '',
                        unit: null
                    },
                    {
                        table: '广告图名称：',
                        value: '',
                        unit: null
                    },
                    {
                        table: '是否可跳转：',
                        value: '',
                        unit: null
                    }
                ],
            }
        },
        methods: {
            //获取token
            getToken(imgSign, imgSigns) {
                console.log("aaa", imgSign, imgSigns);
                this.imgSign = imgSign;
                this.imgSigns = imgSigns;
                this.$axios.post('/agent/file/getUploadAuth')
                    .then(res => {
                        this.qn.token = res.data.data.file_upload_auth;
                        console.log("获取token", res)
                    })
                    .catch(rej => {
                        console.log("失败", rej)
                    })
            },
            onSubmit() {
                console.log('submit!');
            },
            /**
             *  上传成功
             */
            handleAvatarSuccess(res, file) {
                this.form.joint[this.imgSign] = URL.createObjectURL(file.raw);
                this.form[this.imgSigns] = this.$webConfig.apiHosts + this.qn.key;
            },
            /**
             *  上传前判断
             */
            beforeAvatarUpload(file) {
                this.qn.key = new Date().getTime() + file.name;  //上传到七牛的key
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                console.log("获取token成功", this.qn);
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
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
                        this.$axios.post('/agent/Advertising/poster/save', this.form).then(res => {
                            console.log(res);
                            if (res.data.code === this.$webConfig.httpSuccessStatus) {
                                this.$message('修改成功');
                                this.$router.push('/adImg');
                            } else {
                                this.$message(res.data.message);
                            }
                            this.submitState = false;
                        }).catch(() => {
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
            },
            /**
             * 获取信息详情
             */
            getDetail() {
                //初始化列表
                this.$axios.post('/agent/Advertising/poster/get',{"id":this.form.id}).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        let info = res.data.data;
                        this.form = info;
                        this.$set(this.form,'joint',{});
                        this.$set(this.form.joint,'imgUrlBefore',info.poster_url);
                        this.$set(this.form.joint,'imgUrl',info.poster_h5_url);
                        console.log(this.form)
                    } else {
                        this.$message(res.data.message);
                    }
                    this.searchState = false;
                })
                    .catch(() => {
                        this.searchState = false;
                    });
            },
        },
        mounted() {
            if(this.$route.query.adId){
                this.form.id = this.$route.query.adId;
            }

            // 获取信息
            this.getDetail();
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 140px;
        height: 140px;
        line-height: 140px;
        text-align: center;
    }

    .avatar {
        width: 140px;
        height: 140px;
        display: block;
    }

    .realBox p {
        min-width: 30%;
        line-height: 32px;
        color: #606266
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
</style>

