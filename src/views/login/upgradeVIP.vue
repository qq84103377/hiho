<template>
    <section class="login nf-scroll-container">
        <div class="nf-scroll-view ">
            <div class="upgrade-vip">
                <div class="top">
                    <div class="fs14">您当前是</div>
                    <div class="user-level">游客</div>
                    <div class="fs14 gray ">暂不支持游客身份进入APP浏览</div>
                    <group class="mgt80">
                        <x-input v-model="code"  placeholder="请输入邀请码升级为VIP"></x-input>
                    </group>
                    <x-button @click.native="upgradeVIP" :disabled="code.length !== 6" class="mgt50" type="primary">确定</x-button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { updateLevelByCode } from '@/api/mine.js'
export default {
    data() {
        return {
            code:''
        }
    },
    mounted() {
    },
    methods: {
        upgradeVIP() {
            let params={
                code:this.code,
                userId:this.$store.getters.userInfo.id
            }
            const that = this
            updateLevelByCode(params).then(res=>{
                if(res.code ===0){
                    let userInfo=this.$store.getters.userInfo
                    userInfo.vipLevelId=res.data.vipLevelId
                    userInfo.vipLevelName=res.data.vipLevelName
                    this.$store.commit('setUserInfo',userInfo)
                    this.$vux.toast.show({
                        text: '成功升级VIP',
                        onHide () {
                            that.$router.push('/activity')
                        }
                    })
                }
            })
        }
    }
}
</script>
<style lang="less">
    .upgrade-vip{
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
                text-align: center;
                text-align: center !important;
            }
        }
    }
</style>
<style scoped lang="less">
    @import  '../../assets/style/vars.less';
    .upgrade-vip{
        height: 100vh;
        padding: 0 20px;
        text-align: center;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        background-color: #fff;
        .top{
            margin-top: 25px;
            .user-level{
                font-size: 36px;
                padding: 20px 0 10px;
            }
        }
        .bottom{
            font-size: 16px;
            margin-bottom: 30px;
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
