<template>
    <section class="login nf-scroll-container">
        <div class="nf-scroll-view ">
            <div class="login-index">
                <div class="top">
                    <img v-if="!isWeChatLogin" class="logo"  src="@/assets/icon/login_logo@2x.png"/>
                    <div v-else>
                        <img class="user-img" :src="headimgurl"/>
                        <p class="company-name">嗨货直销</p>
                    </div>
                    <group>
                        <x-input @on-change="phoneChange" placeholder="请输入手机号码" v-model="phone" :max="13" type="tel"></x-input>
                        <x-input v-model="code"  placeholder="请输入验证码" class="weui-vcode">
                        <x-button   @click.native="sendVerificationSms" :disabled="noGetCode" slot="right" type="primary" mini>
                            <span v-if="!timer">获取验证码</span>
                            <span v-else>{{this.second}}后重新获取</span>
                        </x-button>
                        </x-input>
                    </group>
                    <x-button @click.native="login" class="mgt50" :disabled="code.length!=4" type="primary">登录</x-button>
                </div>
                <div v-show="!isWeChatLogin" class="bottom">
                    <span @click="wechatLogin" class="wechat-login">
                        <i class="iconNH icon-wx-login mgr4"></i>微信登录
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { sendVerificationSms, doH5Login,saveH5WxUserInfo } from '@/api/mine.js'
import axiosWechat from 'axios'
import { mapGetters, mapMutations } from 'vuex'
import { RongYunInit } from '@/config/rongyun'
import {getRongYunToken} from '@/api/message'
export default {
    data() {
        return {
            instance: {},
            phone:'',
            code:'',
            timer:null,
            second:30,
            isWeChatLogin:false,
            wxUserId:'',
            headimgurl:'',
            noGetCode:true
        }
    },
    mounted() {
    },
    methods: {
        ...mapMutations(['setInstance','setRongYunRes']),
        phoneChange(value) {
            this.noGetCode = value.length === 11?false:true
        },
        // 获取验证码
        sendVerificationSms() {
            let params={
                phone: this.phone
            }
            sendVerificationSms(params).then( res=>{
                if(res.code === 0){
                    if(!this.timer) {
                        this.noGetCode = true
                        this.timer = setInterval(()=>{
                            if(this.second>0 && this.second<=30){
                                this.second--
                            } else {
                                clearInterval(this.timer)
                                this.second =30
                                this.noGetCode = false
                                this.timer = null
                            }
                        },1000)
                    }
                }
            })
        },
        // 获取融云token
        // fetchToken(userId) {
        //     return getRongYunToken({
        //         userId: userId
        //     }).then(res => {
        //         return res;
        //     });
        // },
        // Ryinit(userId) {
        //     this.fetchToken(userId).then(token => {
        //         // console.log(token)
        //         const key = process.env.RongYunKey;
        //         RongYunInit({
        //             token: token,
        //             appKey: 'kj7swf8ok1dv2'
        //         }, {
        //             getMessage: this.setRongYunRes,
        //             getInstance: this.getInstance
        //         });
        //     });
        // },
        // getInstance(instance) {
        //     this.instance = instance;
        //     this.setInstance(instance);
        // },
        // 手机号登录
        login() {
            let params={
                phone:this.phone,
                code:this.code,
                wxUserId:this.wxUserId
            }
            doH5Login(params).then(res=>{
                if(res.code===0){
                    this.$store.commit('setUserInfo',res.data)
                    // this.Ryinit(res.data.id)
                    if(res.data.vipLevelId === '游客'){
                        this.$router.push('/upgradeVIP')
                    } else{
                        this.$router.push('/activity')
                    }
                }
            })
        },

        // 微信 登录
        wechatLogin(){
            const scope = "snsapi_userinfo";
            const that = this
            Wechat.auth(scope, function (res) {
                let params = {
                    appid:'wx4f8afbae93a5deb0',
                    secret:'4c332ad321879e49e0aa29531bcec14b',
                    code:res.code,
                    grant_type:'authorization_code'
                }
                axiosWechat.get('https://api.weixin.qq.com/sns/oauth2/access_token', { params: params }).then(res =>{
                    let params = {
                        access_token:res.access_token,
                        openid:res.openid,
                        lang:'zh_CN'
                    }
                    axiosWechat.get('https://api.weixin.qq.com/sns/userinfo',{ params: params }).then(res =>{
                        that.headimgurl = res.headimgurl
                        let params={
                            openid:res.openid,
                            nickname:res.nickname,
                            headimgurl:res.headimgurl,
                            unionid:res.unionid,
                            sex:res.sex
                        }
                        saveH5WxUserInfo(params).then(res=>{
                            if(res.code ===0){
                                that.wxUserId = res.data
                                that.isWeChatLogin =true
                            }
                        })
                    })
                })
            }, function (reason) {
            });
        }
    }
}
</script>
<style lang="less">
    .login-index{
        .weui-cells:before{
            content: none;
        }
        .weui-cell{
            padding-left: 0;
            padding-right: 0;
            &:before{
                left: 0;
            }
            .weui-input{
                padding-left: 32px;
                text-align: left !important;
            }
        }
    }
</style>
<style scoped lang="less">
    .login-index{
        height: 100vh;
        padding: 0 20px;
        text-align: center;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        .top{
            flex: 1;
            margin-top: 48px;
            .logo{
                width: 84px;
                height: 84px;
                margin-bottom: 50px;
            }
            .user-img{
                width: 90px;
                height: 90px;
                border-radius: 50%;
                margin-bottom: 10px;
            }
            .company-name{
                padding-bottom: 12px;
            }
        }
        .bottom{
            font-size: 16px;
            margin:15px 0 30px;
            .wechat-login{
                padding: 5px 15px;
            }
            .icon-repost-wechat{
                color: #03CF0A;
                margin-right: 5px;
            }

        }
    }
</style>
