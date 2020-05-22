<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-60)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <h1 class="ly-title-one" style="margin-bottom: 40px">添加广告图</h1>
                        <div class="form-list">
                            <el-form label-position="left" ref="form" :model="form" label-width="120px" :rules="rules">
                                <el-form-item label="广告类型:" prop='ad_type'>
                                    <el-radio v-model="form.ad_type" label="1">支付前广告图</el-radio>
                                    <el-radio v-model="form.ad_type" label="2">支付后广告图</el-radio>
                                </el-form-item>
                                <el-form-item label="广告图名称" prop="poster_name">
                                    <el-input v-model="form.poster_name" placeholder="请输入广告图名称"></el-input>
                                </el-form-item>
                                <el-form-item label="是否可跳转:" prop='is_redirect' v-if="form.ad_type==2">
                                    <el-radio v-model="form.is_redirect" label="1" @change="changeRedirect">是</el-radio>
                                    <el-radio v-model="form.is_redirect" label="0" @change="changeRedirect">否</el-radio>
                                </el-form-item>
                                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
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
                                            <p v-if="form.is_redirect==1&&form.ad_type==2">跳转前（宽高:700*300）</p>
                                            <p v-if="form.is_redirect!=1" class="ly_hint_text" style="text-align: left">
                                                像素大小为800*1280，大小不可超过1M</p>
                                            <p v-if="form.is_redirect==1&&form.ad_type==2" class="ly_hint_text"
                                               style="text-align: left">大小不可超过1M</p>
                                        </div>
                                        <div v-if="form.is_redirect==1&&form.ad_type==2">
                                            <el-upload
                                                    class="avatar-uploader"
                                                    :action="this.$webConfig.qnUploadHost"
                                                    :data="qn"
                                                    :show-file-list="false"
                                                    :on-success="handleAvatarSuccess"
                                                    :before-upload="beforeAvatarUploadTwo">
                                                <img v-if="form.joint.imgUrl" :src="form.joint.imgUrl" class="avatar"
                                                     @click="getToken('imgUrl','poster_h5_url')">
                                                <i v-else class="el-icon-plus avatar-uploader-icon"
                                                   @click="getToken('imgUrl','poster_h5_url')"></i>
                                            </el-upload>
                                            <p>跳转后（宽高:800*1280）</p>
                                        </div>

                                    </div>


                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('form')" v-loading="submitState">提交
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

    export default {
        name: "add",
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
                qn: {
                    token: "",
                    key: ""
                },
                submitState: false,
                codeList: [],//激活码list
                winHeight: window.innerHeight,
                form: {
                    ad_type: '1',//广告图类型
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
                    ad_type: [
                        {
                            required: true,
                            validator: checkNull,
                            message: '请选择广告图类型',
                            trigger: 'blur'
                        }
                    ],
                    poster_name: [
                        {
                            validator: checkNullText,
                            required: true,
                            message: '请输入广告图名称',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 15,
                            message: '长度在 1 到 15 个字符',
                            trigger: 'blur'
                        }
                    ],
                    is_redirect: [
                        {
                            required: true,
                            validator: checkNull,
                            message: '请选择是否可跳转',
                            trigger: 'blur'
                        }
                    ],
                    joint: [
                        {
                            required: true,
                            validator: checkNullImg,
                            message: '请上传图片',
                            trigger: 'change'
                        }
                    ]
                },
            }
        },
        methods: {
            changeRedirect(){
                this.form.joint.imgUrlBefore = '';
                this.form.joint.imgUrl = '';
                this.form.poster_url = '';
                this.form.poster_h5_url = '';
            },
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
             *  上传前判断 - 图片+跳转前图片
             */
            beforeAvatarUpload(file) {
                this.qn.key = new Date().getTime() + file.name;  //上传到七牛的key
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
                const isLt1M = file.size / 1024 / 1024 < 1;
                console.log("获取token成功", this.qn);

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt1M) {
                    this.$message.error('上传头像图片大小不能超过 1MB!');
                }

                let _this = this;
                let imgWidth = "";
                let imgHeight = "";
                let width;
                let height;
                const isSize = new Promise(function (resolve, reject) {
                    if (_this.form.ad_type == 2 && _this.form.is_redirect == 1) {
                        width = 700;
                        height = 300;
                    } else {
                        width = 800;
                        height = 1280;
                    }
                    console.log(width, height);
                    let _URL = window.URL || window.webkitURL;
                    let img = new Image();
                    img.onload = function () {
                        imgWidth = img.width;
                        imgHeight = img.height;
                        let valid = img.width == width && img.height == height;
                        valid ? resolve() : reject();
                    };
                    img.src = _URL.createObjectURL(file);
                }).then(
                    () => {
                        return file;
                    },
                    () => {
                        _this.$message.error({
                            message: '上传文件的图片大小不合符标准,宽需要为' + width + 'px，高需要为' + height + 'px。当前上传图片的宽高分别为：' + imgWidth + 'px和' + imgHeight + 'px',
                            btn: false
                        });
                        return Promise.reject();
                    });
                console.log(isSize);
                return isJPG && isLt1M && isSize;
            },
            /**
             *  上传前判断 - 跳转后图片
             */
            beforeAvatarUploadTwo(file) {
                this.qn.key = new Date().getTime() + file.name;  //上传到七牛的key
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
                const isLt1M = file.size / 1024 / 1024 < 1;
                console.log("获取token成功", this.qn);

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt1M) {
                    this.$message.error('上传头像图片大小不能超过 1MB!');
                }

                let _this = this;
                let imgWidth = "";
                let imgHeight = "";
                let width;
                let height;
                const isSize = new Promise(function (resolve, reject) {
                    width = 800;
                    height = 1280;
                    console.log(width, height);
                    let _URL = window.URL || window.webkitURL;
                    let img = new Image();
                    img.onload = function () {
                        imgWidth = img.width;
                        imgHeight = img.height;
                        let valid = img.width == width && img.height == height;
                        valid ? resolve() : reject();
                    };
                    img.src = _URL.createObjectURL(file);
                }).then(
                    () => {
                        return file;
                    },
                    () => {
                        _this.$message.error({
                            message: '上传文件的图片大小不合符标准,宽需要为' + width + 'px，高需要为' + height + 'px。当前上传图片的宽高分别为：' + imgWidth + 'px和' + imgHeight + 'px',
                            btn: false
                        });
                        return Promise.reject();
                    });
                console.log(isSize);
                return isJPG && isLt1M && isSize;
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
                                this.$message('添加成功');
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
            }
        },
        mounted() {

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
</style>

