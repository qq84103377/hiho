<template>
  <div class="mine-address-edit custom-body">
    <div class="main-content">
      <div class="header posR">
        <div class="icon-back posA back" @click.stop="$router.go(-1)"></div>
        <div class="fs16 text">收货人信息</div>
        <!-- <x-button mini class="btn posA red" @click.native="del" v-if="isshow">删除</x-button> -->
        <span class="btn posA red" @click="del" v-if="isshow">删除</span>
      </div>
      <group>
        <x-input title="收件人姓名" v-model="form.receiverName" placeholder="姓名" text-align="right"></x-input>
        <x-input title="手机号码" v-model="form.phone" text-align="right" placeholder="联系电话"></x-input>
        <x-address title="所在地区" v-model="addressValue" :list="addressData" @on-shadow-change="change" value-text-align="right" raw-value placeholder="省-市-区"></x-address>
        <x-input title="详细地址" v-model="form.address" text-align="right" placeholder="详细地址"></x-input>
      </group>
    </div>
    <div class="footer">
      <x-button type="primary" class="full-btn" @click.native="save">保存</x-button>
    </div>

  </div>
</template>

<script>
import  {ChinaAddressData, XAddress} from 'vux'
import { saveUserAddressH5, getUserAddressH5, removeAddressH5} from '@/api/mine.js'
import { setTimeout } from 'timers';

  export default {
    name: 'mineAddressEdit',
    components: {ChinaAddressData,XAddress},
    data() {
      return {
        isshow: false,
        addressData: ChinaAddressData,
        addressValue: [],
        chooseArea: [],
        form: {
          receiverName: '',
          userAddressId: '',
          phone: '',
          province: '',
          city: '',
          area:'',
          address:''
        }
      }
    },
    methods: {
      del (){
        let params = {
          userAddressId: this.$route.query.id
        }
        removeAddressH5(params).then(res => {
          this.$vux.toast.text(res.msg)
          this.$router.go(-1)
        })
      },
      change (ids,names) {
        this.chooseArea = names
      },
      getForm () {
        let params = {
          userAddressId: this.$route.query.id
        }
        this.loading = true
        getUserAddressH5(params).then(res => {
          this.form = {
            receiverName: res.data.receiverName,
            userAddressId: res.data.userAddressId,
            phone: res.data.phone,
            address:res.data.address
          }
          this.addressValue = [res.data.province,res.data.city,res.data.area]
          this.loading = false
        })
      },
      save () {
        if (this.form.receiverName == '') {
          return this.$vux.toast.text('请填写收货人姓名')
        } else if (this.form.phone == '') {
          return this.$vux.toast.text('请填写联系电话')
        } else if (this.form.phone.length!=11) {
          return this.$vux.toast.text('请输入正确的手机号码')
        } else if (this.addressValue.length == 0) {
          return this.$vux.toast.text('请选择所在地区')
        } else if (this.form.address == '') {
          return this.$vux.toast.text('请填写详细地址')
        }
        this.form.userId = this.$store.getters.userInfo.id
        console.log(this.$store.getters.userInfo.id , 'id')
        this.form.province = this.chooseArea[0]
        this.form.city = this.chooseArea[1]
        this.form.area = this.chooseArea[2]
        saveUserAddressH5(this.form).then(res => {
          this.$vux.toast.text(res.msg)
          this.$router.go(-1)
        })
      }
    },
    created () {
      this.isshow = this.$route.query.type == 'add' ? false: true
      if (this.$route.query.id) {
        this.getForm()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="less">
@import '../../../assets/style/vars.less';
.mine-address-edit{
  .vux-popup-picker-placeholder{color: @blue-gray!important;}
  background-color:@mine-color;
  .del{
    height: 45px;
    line-height: 45px;
    top:0px;
    margin-right:10px;
    z-index:1000000;
    right:0;
    position:fixed;
  }
  .edit-title{
    height:50px;
    line-height: 50px;
    font-weight:600;
  }
  .vux-popup-dialog.vux-popup-right{width:100% !important;}
  .weui-btn:after{border:none !important;}
}

</style>

<style rel="stylesheet/scss" lang="less" scoped>
@import '../../../assets/style/vars.less';
.mine-address-edit{
  .header{
      height:45px;
      text-align: center;
      line-height: 45px;
      background-color: @white-bg;
      border-bottom:.5px solid @border-color;
      .back{top:15px;left:16px;}
      .text{font-weight:520;}
      .weui-btn:after{border:none}
      .btn{
        right:15px;
        z-index: 9999;
        top:0;
        height: 45px;
      }
    }
}
</style>
