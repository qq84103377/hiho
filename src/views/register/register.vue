<template>
    <section class="login nf-scroll-container">
        <div class="nf-scroll-view">
            <div class="logo">
                <img src="../../assets/img/logo@2x.png">
            </div>
            <div class="tabbar align-center">
                <span style='width:100%'>注册账号</span>
            </div>
            <!-- 老板登录 -->
            <div class="form">
                <div class="input-wrap">
                    <div
                    class="nf-input"
                    :class="{'is-focus': focus.phone}">
                        <label for="phone">
                            <i class="nf-icon icon-user-boss"></i>
                            <!-- <icon type="icon_user_boss"></icon>         -->
                        </label>
                        <input id="phone" type="text"
                        @focus="focus.phone = true"
                        @blur="focus.phone = false"
                        placeholder="请输入手机号或老板号">
                    </div>
                </div>
                <div class="input-wrap">
                    <div class="nf-input"
                    :class="{'is-focus': focus.pwd}">
                        <label for="pwd">
                            <i class="nf-icon icon-pwd"></i>
                        </label>
                        <input id="pwd" type="password"
                        @focus="focus.pwd = true"
                        @blur="focus.pwd = false"
                        placeholder="请设置密码">
                    </div>
                </div>
            </div>
            <!-- 老板登录end -->
        </div>
        <div class="login-bottom">
            <button class="btn btn-warning submit" @click="dialogShow=true">注册</button>
            <div class="factory-website">
                <p>
                    巨牛云厂网页端
                    </br>
                    factory.myjuniu.com
                </p>
            </div>
        </div>
        <transition name="fade">
            <div class="mask" v-show="dialogShow" >
                <div class="dialog-wrap">
                    <div class="dialog-main">
                        <span class="title">无法注册</span>
                        <p class="content grey">目前只支持网页端注册，请前往 factory.myjuniu.com</p>
                    </div>
                    <div class="dialog-footer">
                        <div class="cancel-btn orange" @click="dialogShow=false">取消</div>
                    </div>
                </div>
            </div>
        </transition>
    </section>
</template>

<script>
import config from '../../config'
export default {
    data() {
        return {
            focus: {
                phone: false,
                pwd: false,
                bossName: false,
                employeeName: false,
                employeePwd: false
            },
            bossForm: {
                loginName: '',
                password: ''
            },
            workerForm: {
                bossCode: '',
                loginName: '',
                password: ''
            },
            dialogShow: false
        }
    },
    mounted() {
        // doLogin()
    },
    methods: {

    },

}
</script>

<style scoped lang="less">

</style>
