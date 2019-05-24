<template>
  <div class="mine-my-edit posR">
    <group>
      <x-input  :placeholder="txt" text-align="left" v-model="phone"></x-input>
    </group>
    <x-button type="primary" class="posA comfirmbtn" @click.native="save">确定</x-button>
  </div>
</template>

<script>
import {saveH5UserPhone} from '@/api/mine.js'
  export default {
    name: 'mineMyEdit',
    data() {
      return {
        phone: '',
        txt: ''
      }
    },
    methods: {
      save () {
        let reg = /(1[3584]\d{9})$/
        if (!reg.test(this.phone)) {
          return this.$vux.toast.show({
            text: '请输入正确得手机号码',
            type: 'text'
          })
        }
        let params ={
          userId: this.$store.getters.userInfo.id,
          phone: this.phone
        }
        saveH5UserPhone(params).then(res =>{
          this.$vux.toast.show({
            text: res.msg,
            type: 'text'
          })
          this.$router.go(-1)
        })
      }
    },
    created () {
      if (this.$route.query.phone) {
        this.txt = this.$route.query.phone
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="less">
@import '../../assets/style/vars.less';
.mine-my-edit{
  background-color:@mine-color;
  .cell-img{
    img{
      height:64px;
      width:64px;
      border-radius: 50%;
    }
  }
  .btn{
    color:@red !important;
    border:none !important;
    width:335px !important;
    margin:0 20px;
    background-color:@white-bg !important;
    bottom:20px !important;

  }
  .comfirmbtn{
    bottom: 0 !important;
  }
  .edit-title{
    height:50px;
    line-height: 50px;
    font-weight:600;
  }
  .vux-popup-dialog.vux-popup-right{width:100% !important;}
}

</style>

<style rel="stylesheet/scss" lang="less" scoped>
</style>
