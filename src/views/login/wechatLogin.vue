<template>
    <section class="login nf-scroll-container">
        <div class="nf-scroll-view ">
            <div class="login-index">
                <div class="top">
                    <img class="" src="http://img2.imgtn.bdimg.com/it/u=575883099,3578813885&fm=27&gp=0.jpg"/>
                    <p>嗨货</p>
                    <group>
                        <x-input placeholder="请输入手机号码" v-model="phone" :max="13" type="tel"></x-input>
                        <x-input v-model="code"  placeholder="请输入验证码" class="weui-vcode">
                            <x-button @click.native="sendVerificationSms" :disabled="phone.length!=11" slot="right" type="primary" mini>
                                <span v-if="!timer">获取验证码</span>
                                <span v-else>{{this.second}}后重新获取</span>
                            </x-button>
                        </x-input>
                    </group>`
                    <x-button @click.native="login" class="mgt50" :disabled="code.length!=4" type="primary">登录</x-button>
                    <x-button class="mgt50" disabled type="primary">确定</x-button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import config from '../../config'
import { doLogin, doWorkbayLogin } from '@/api'
import { Toast, md5, dateFormat } from 'vux'
import { mapGetters, mapMutations } from 'vuex'
import { RongYunInit } from '@/config/rongyun'
import {getRongYunToken} from '@/api/message'
export default {
    data() {
        return {
            instance: {},
            phone:'',
            noGetCode:true,
            timer:null,
            second:3
        }
    },
    mounted() {
    },
    methods: {
        ...mapMutations(['setInstance','setRongYunRes']),
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
        // 手机号登录
        login() {
            let params={
                phone:this.phone,
                code:this.code
            }
            doH5Login(params).then(res=>{
                console.log(res.code===0)
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
        justify-content: space-between;
        flex-direction: column;
        background-color: #fff;
        .top{
            margin-top: 48px;
            img{
                width: 90px;
                height: 90px;
                border-radius: 50%;
                margin-bottom: 10px;
            }
        }
    }
</style>
