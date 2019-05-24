<template>
  <div class="sales-performance white-bg">
    <div class="header icon-sale-report">
      <div class="year fs14" @click="dateShow">{{date}} 年<span :class="[ iconShow ?'border_up': 'border_down', 'mg']"></span></div>
      <div class="header-text">
        <span class="fs14 blue-gray">总销售额（元）</span>
        <span class="money">{{list.yearAmount}}</span>
      </div>
    </div>
    <group>
      <cell is-link v-for="(item, index) in list.yearDetail" :key="index" @click.native="getDetail(index,item.month,item.monthAmount)">
        <div slot="title">{{item.month}}</div>
        <div slot="value">￥{{item.monthAmount}}</div>
      </cell>
      <!-- <cell :title="item.title" :value="item.value ? `￥${item.value}` : ''" is-link @click.prevent="detail(index)" v-for= "(item, index) in list" :key="index"></cell> -->
    </group>
    <div v-transfer-dom>
      <x-dialog v-model="detailShow" class="detail-dialog" dialog-transition="" mask-transition="" :hide-on-blur="true">
        <div class="icon-sale-detail box">
          <div class="date">
            <span class="fs12 small-text">{{detail.year}}年</span>
            <span class="key fs30">{{detail.month}}月</span>
          </div>
          <span class="line"></span>
          <div class="dialog-text">
            <span class="fs12 small-text">销售额（元）</span>
            <span class="key">{{monthAmount}}</span>
          </div>
        </div>
        <group class="main">
          <cell v-for="(item, index) in detailList" :key="index">
            <div slot="title">{{item.userName}}</div>
            <div slot="value">￥{{item.monthAmount}}</div>
          </cell>
      </group>
      <div class="footer">
        <x-button class="mgr8" @click.native="next(-1)" :disabled="this.curIndex <= 0">上一月</x-button>
        <x-button type="primary" @click.native="next(1)" v-if="(this.curIndex + 1) >= (this.list.yearDetail&&this.list.yearDetail.length)">完成</x-button>
        <x-button type="primary" @click.native="next" v-if="(this.curIndex + 1) < (this.list.yearDetail&&this.list.yearDetail.length)">下一月</x-button>
      </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import {getYearSalesPerformance, getMonthSalesPerformance} from '@/api/mine.js'
import { TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  data () {
    return {
      list: [],
      detailList: [],
      detail: {},
      iconShow: false,
      detailShow: false,
      date: new Date().getFullYear(),
      curIndex: 0,
      preText: '',
      nextText: '',
      monthAmount: 0
    }
  },
  methods: {
    getYearSalesPerformance () {
      let params = {
        userId: this.$store.getters.userInfo.id,
        // userId: 'u1',
        year:this.date
      }
      this.$vux.loading.show()
      getYearSalesPerformance(params).then(res => {
        this.list = res.data
        this.$vux.loading.hide()
      })
    },
    getMonthSalesPerformance (month,monthAmount) {
      let params = {
        userId: this.$store.getters.userInfo.id,
        // userId: 'u1',
        month:month
      }
      this.detail = {
        year: month.split('-')[0],
        month: month.split('-')[1]
      }
      this.monthAmount = monthAmount
      this.$vux.loading.show()
      getMonthSalesPerformance(params).then(res => {
        this.detailList = res.data.monthDetail
        this.$vux.loading.hide()
      })
    },
    dateShow() {
      this.iconShow = !this.iconShow
      let that = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY',
        onConfirm (val) {
          that.$nextTick(function () {
            that.date = val
            that.getYearSalesPerformance()
          })
          that.iconShow = !that.iconShow
        },
        onHide () {
          that.iconShow = !that.iconShow
        }
      })
    },
    getDetail(index,month,monthAmount) {
      this.curIndex = index
      console.log(this.curIndex)
      this.getMonthSalesPerformance(month,monthAmount)
      this.detailShow = true
    },
    next(type){
      if (type === 1) return this.detailShow = false
      this.curIndex = type === -1 ? this.curIndex - 1 : this.curIndex + 1
      console.log(this.curIndex)
      console.log(this.list.yearDetail[this.curIndex].month)
      this.getMonthSalesPerformance(this.list.yearDetail[this.curIndex].month,this.list.yearDetail[this.curIndex].monthAmount)
      
    }
  },
  created () {
    this.getYearSalesPerformance()
  }
}
</script>
<style lang="less" scoped>
  @import '../../assets/style/vars.less';
  .sales-performance{
    padding-top:16px;
    .header{
      .year{
          color:#fff;
          height: 46px;
          line-height: 46px;
          padding-left:34px;
        }
      .header-text{
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .money{
          font-size:32px;
          color: #FFFFFF;
          height: 32px;
          margin-top:8px;
          line-height: 32px;
        }
      }
    }
    .mg{
      margin-left:6px;
      margin-bottom:3px;
      display:inline-block;
    }
    .border_up{
      border-width:0 3px 4px;
      border-style:solid;
      border-color:transparent transparent #fff;
    }
    .border_down{
      border-width:4px 3px 0;
      border-style:solid;
      border-color:#fff transparent transparent ;
    }
  }
</style>
<style lang="less">
@import '../../assets/style/vars.less';
.sales-performance{
  .weui-cells:after, .weui-cells:before{
    border:none !important;
  }
  .weui-cell__ft{
    color: @blue;
    font-size:16px !important;
  }
}
.detail-dialog{
  .weui-dialog{
    width: 100%;
    max-width:325px;
    height:520px;
    .box{
        width: 325px;
        display:flex;
        padding-left:24px;
        padding-top:24px;
        .line{
          // border:1px solid rgba(0, 0, 0, 0.5);
          background-color: @black;
          opacity: 0.3;
          height: 42px;
          width: 2px;
          display:inline-block;
          margin:12px 24px 0;
        }
        .date,.dialog-text{
          .small-text{
            height:28px;
            line-height: 28px;
            display:block;
          }
          .key{
            font-size:32px;
            height:32px;
            line-height: 32px;
            color:@black;
            display:block;
            font-weight:500;
          }
        }
      }
      .main{
        height: 353px;
      }
      .footer{
        display:flex;
        padding:15px 24px;
        justify-content: space-between;
        .weui-btn{
          width: 134px;
          height: 42px;
          font-size:14px;
        }
        .weui-btn_default{
          color:@light-gray;
        }
      }
      .weui-cells:before{
        border:none !important;
      }
      .vux-label{
        text-align:left;
      }
      .weui-cell__ft{
        color: @blue;
        font-size:16px !important;
      }
  }
}


</style>


