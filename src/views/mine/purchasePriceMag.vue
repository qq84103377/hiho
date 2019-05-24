<template>
  <div class="custom-body purchase-price-mag">
    <div class="main-content">
      <div class="tip-bar brown header">最多只能设置6个额外加价(转发商品时现价=销售价+标准代购价+额外加价)</div>
      <group>
        <cell v-for="(item,index) in list" :key="index">
          <span slot="title">加价{{list.length-index}}</span>
          <div @click="showEdit('edit', item, index)"><span class="mgr8 black">￥{{item.purchaseCost}}</span><i class="iconNH icon-cart-edit mgt4"></i></div>
        </cell>
      </group>
    </div>
    <div class="footer">
      <x-button type="primary" :disabled="list.length >= 6" class="full-btn" @click.native="showEdit('add')">+新增</x-button>
    </div>
    <!--修改弹出层-->
    <div v-transfer-dom class="purchase-price-mag">
        <confirm dialog-transition="" v-model="isEditVisible"
                  @on-confirm="save" :hide-on-blur="true" :close-on-confirm="false">
            <div solt="title" class="posR">{{title}}<i v-if="currerType == 'edit'" class="iconNH icon-del title-icon posA" @click="del"></i></div>
            <div solt="content">
              <group>
                  <x-input v-model="purchaseCost" placeholder="填写代购价格"></x-input>
                  <!-- <input type="number" v-model="purchaseCost" placeholder="填写代购价格" class="input"> -->
              </group>
            </div>
        </confirm>
    </div>
    <!-- <div v-transfer-dom>
      <confirm dialog-transition="" v-model="delPop"
                title="提示"
                @on-cancel="delPop = false"
                @on-confirm="del">
                <p style="text-align:center;">确定清除该代购价?</p>
      </confirm>
    </div> -->
  </div>
</template>
<script>
import {TransferDomDirective as TransferDom} from 'vux'
import {getH5UserPurchases, addH5UserPurchase, editH5UserPurchase, deletePurchase} from '@/api/mine.js'
export default {
  name: 'purchasePriceMag',
  directives: {
    TransferDom
  },
  data () {
    return {
      isEditVisible: false,
      delPop: false,
      title: '',
      currerType: '',
      purchaseCost: null,
      list: [],
      row: {}
    }
  },
  methods: {
    showEdit (type, row, index) {
      this.currerType = type
      this.row = row
      this.purchaseCost = row ? row.purchaseCost : ''
      this.title = type == 'add' ? '新增代购价' : `编辑代购价${index + 1}`
      this.isEditVisible = true
    },
    save() {
      let reg = /^\d+(\.\d{1,2})?$/
      if (this.purchaseCost == '') return this.$vux.toast.text('代购价不能为空')
      if (!reg.test(this.purchaseCost)) return this.$vux.toast.text('只能输入数字，小数点后只能保留两位')
      let params =  this.currerType == 'add' ? {
        userPurchaseParams : [
          {
            userId: this.$store.getters.userInfo.id,
            purchaseCost: this.purchaseCost
          }
        ]
      } : {
        userId: this.$store.getters.userInfo.id,
        editUserPurchaseParams : [
          {
            id: this.row.id,
            purchaseCost: this.purchaseCost
          }
        ]
      }
      this.currerType == 'add' ? addH5UserPurchase(params).then(res => {
        if (res.code === 0) {
          this.getData()
          this.isEditVisible = false
          this.$vux.toast.text('操作成功')
        }
      }) : editH5UserPurchase(params).then(res => {
        if (res.code === 0) {
          this.getData()
          this.isEditVisible = false
          this.$vux.toast.text('操作成功')
        }
      })
    },
    del () {
      let params = [this.row.id]
      deletePurchase(params).then(res => {
        if (res.code === 0) {
          this.getData()
          // this.delPop = false
          this.isEditVisible = false
          this.$vux.toast.text('操作成功')
        }
      })
    },
    getData () {
      let params = {
        userId: this.$store.getters.userInfo.id
      }
      getH5UserPurchases(params).then(res => {
        if (res.code === 0) {
          this.list = res.data.userPurchaseResponses
        }
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="less" scoped>
 .purchase-price-mag{
   .header{
     line-height: 1.2;
     padding:5px 0 5px 10px;
   }
   .mgt4{
     margin-top:-3px;
   }
 }
</style>

<style lang="less">
</style>
