<template>
  <div class="customer-service">
      <div class="navigation">
        <div class="icon-back back posA" @click.stop="$router.go(-1)"></div>
        <div class="fs16 text">咨询客服</div>
        <!-- <div class="posA right" @click="getTel"><i class="iconNH icon-tel"></i></div> -->
      </div>
      <div class="content" v-for="(item, index) in detailList" :key="index">
        <div class="title fs20" v-if="item.title">{{item.title}}</div>
        <div :class="['box', index == 0 ? 'icon-pre-sale' : 'icon-after-sale']">
          <div class="box-top">
            <img src="../../assets/icon/login_logo@3x.png" alt="">
            <span class="name">{{item.name}}</span>
          </div>
          <div class="box-bottom">
            <div>
              <p class="fs16 black wx">微信：<textarea name="text" :id="`text${index}`" class="fs16 textarea" readonly="readonly">{{item.wx}}</textarea></p>
              <p class="btn fs12"><button @click="copy(index)">复制微信号</button></p>
            </div>
            <div class="code">
              <img :src="item.code" alt="">
              <p class="fs12 black">扫一扫，添加微信</p>
            </div>
          </div>
        </div>
      </div>


    <div v-transfer-dom>
      <x-dialog v-model="telShow" class="tel-dialog" mask-transition="" dialog-transition="" :hide-on-blur="true">
        <div class="box">
          <div class="fs18 black title">致电客服</div>
          <div class="tel blue">131 6710 7634</div>
          <div class="footer">
            <a class="cancel balck fs14" @click="telShow=false">取消</a>
            <a class="fs14 dial" href="tel://13167107634">拨打</a>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import { TransferDom } from 'vux'
export default {
  name: 'customerService',
  directives: {
    TransferDom
  },
  data () {
    return {
      telShow: false,
      detailList: [
        {
          title: '售前客服',
          name: '嗨货售前客服',
          wx: 'niuhuokefu001',
          code: require('../../assets/icon/pre-code.png')
        },
        {
          title: '售后客服',
          name: '嗨货售后客服1',
          wx: 'niuhuokefu002',
          code: require('../../assets/icon/after-code1.png')
        },
        {
          // title: '售后客服',
          name: '嗨货售后客服2',
          wx: 'niuhuokefu003',
          code: require('../../assets/icon/after-code2.png')
        }
      ]
    }
  },
  methods: {
    copy (index) {
      let ele =  document.getElementById("text"+ index)
      ele.focus()
      ele.setSelectionRange(0, ele.value.length)
      if(document.execCommand('copy', false, null)){
       this.$vux.toast.text('复制成功')
      } else{
        this.$vux.toast.text('复制成功')
      }
    },
    getTel () {
      this.telShow = true
    }
  }
}
</script>
<style lang="less">
@import '../../assets/style/vars.less';
  .tel-dialog{
    .weui-dialog{
      padding:26px 16px;
    }
    .box{
      .title{
        margin-bottom:20px;
      }
      .tel{
        font-size: 20px;
        height: 48px;
        line-height: 48px;
      }
      .footer{
        margin-top:20px;
        height: 42px;
        line-height: 42px;
        a{
          height: 42px;
          display:inline-block;
          width: 120px;
          border:1px solid @light-gray;
          cursor: pointer;
        }
        .dial{
          color:#F3D198;
          background-color: @black;
          border:1px solid @black;
        }
      }
    }
  }
</style>

<style lang="less" scoped>
@import '../../assets/style/vars.less';
.customer-service{
  padding-top:43px;
  // .mgt50{
  //   margin-top:50px;
  // }
    .content{
      // margin-top:12px;
      vertical-align: middle;
      .title {
        height: 38px;
        padding:0 16px;
        line-height: 38px;
        font-weight: 600;
      }
      .box{
        // height: 200px;
        padding:66px 40px 0;
        margin-top:-38px;
        .box-top{
          height: 46px;
          line-height: 46px;
          display:flex;
          justify-content: column;
          vertical-align: middle;
          img{
            width: 46px;
            height: 46px;
            border-radius: 10px;
            margin-right:12px;
          }
          .name{
            font-weight: 700;
          }
        }
        .box-bottom{
          display:flex;
          justify-content: space-between;
          align-items:flex-end;
          .wx{
            // font-size:13px;
            display:flex;
            justify-content:column;
            height: 36px;
            line-height: 36px;
            color:@black;
            .textarea{
              width:145px;
              height: 36px;
              line-height: 36px;
            }
          }

          .btn{
            padding:9px 0;
            background-color: @blue-white-bg;
            color:@dark-gray;
            border-radius: 15px;
            width: 88px;
            text-align: center;
          }
          .code{
            text-align: right;
            img{
              width: 88px;
              height: 88px;
            }
          }

        }
      }
    }
}
</style>

