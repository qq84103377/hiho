<template>
  <div class="mine-my-vip white-bg" >
    <div class="card">
      <img src="../../assets/icon/mine_menber-card@2x.png" alt="">
    </div>
    <x-input v-show="false"  placeholder="请输入邀请码升级为VIP" text-align="center" class="input fs16" v-model="code"></x-input>
    <x-button v-show="false" type="primary" class="posA btn" @click.native="$router.go(-1)">确定</x-button>
  </div>
</template>

<script>
import {updateLevelByCode} from '@/api/mine.js'
  export default {
    name: 'mineMyVip',
    data() {
      return {
        code: ''
      }
    },
    methods: {
      getUpdateLevelByCode() {
        if (this.code == ''){
          return this.$vux.toast.show({
            text: '请输入邀请码',
            type: 'text'
          })
        }
        let prams = {
          code: this.code,
          useId: this.$store.getters.userInfo.id
        }
        updateLevelByCode(prams).then(res => {
          this.$vux.toast.show({
            text: res.msg,
            type: 'text'
          })
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="less">
@import '../../assets/style/vars.less';
.mine-my-vip{
  padding: 0 16px;
 .card{
   margin:46px 0;
   img{width:100%;height:100%;}
 }
 .input{
   border-bottom: 1px solid @border-color;
   margin-bottom:51px;
 }
 .btn{
   width:335px;
 }
 .weui-cell:before{
   border-top:1px solid transparent !important;
 }
}

</style>

<style rel="stylesheet/scss" lang="less" scoped>
</style>
