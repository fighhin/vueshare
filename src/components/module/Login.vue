<template>
    <div class="login-wrap">
        <div class="ms-title">图书管理演示系统登录</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.account" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {LoginPost} from "../../api/login";

    export default {
        data: function(){
            return {
                ruleForm: {

                    account: '',
                    password: ''
                },
                rules: {
                    account: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm() {
                this.$refs["ruleForm"].validate((valid) => {
                    if (valid) {
                        LoginPost(this.ruleForm).then(res=>{
                            if (res.code == 200){
                                this.$message.success("登录成功");
                                sessionStorage.setItem('username',res.data.userName);
                                this.$router.push('/userManage');

                            }else {
                                this.$message.error("账号或密码错误,请重试");
                            }
                        }).catch(e=>{
                            console.log(e);
                        })
                    } else {
                        this.$message.error("请填写正确的登录信息");

                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
