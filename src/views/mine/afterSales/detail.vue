<template>
<!-- ,form.refundStatus == 'WAIT_AGREE'? 'pdb56':'pdb26'] -->
  <div :class="['after-sales-detail', 'custom-body',form.refundStatus == 'WAIT_AGREE'? 'pdb56':''] ">
      <div class="main-content">
           <div class="status-banner" :class="{
        'wait-pay': form.refundStatus == 'WAIT_AGREE',
        'wait-receive': form.refundStatus == 'WAIT_RECIVE_GOODS' || form.refundStatus == 'WAIT_RETUEN_GOODS',
        'wait-receive-goods': form.refundStatus == 'WAIT_REFUND' || form.refundStatus == 'REFUNDING',
        'wait-deliver': form.refundStatus == 'SUCCESS',
        'cancel-already': form.refundStatus == 'CANCEL' || form.refundStatus == 'REFUSED' || form.refundStatus == 'FAIL',
    }">
        <i :class="['pay-icon',form.refundStatus == 'SUCCESS' || form.refundStatus == 'REFUSED'? 'mgt10' : '']"></i>
        <div class="text" v-if="form.refundStatus == 'SUCCESS'">
          <span class="dis-block mgt5">{{refundStatusMap[form.refundStatus]}}</span>
          <span class="dis-block fs10">{{form.refundAt}}</span>
        </div>
        <div class="text" v-else-if="form.refundStatus == 'REFUSED'">
          <span class="dis-block mgt5">{{refundStatusMap[form.refundStatus]}}</span>
          <span class="dis-block fs10">{{form.refuseReason}}</span>
        </div>
        <span v-else>{{refundStatusMap[form.refundStatus]}}</span>
    </div>
      <!--订单信息-->
      <group class="mgt0">
          <cell :border-intent="false" >
              <div slot="title" class="fs12">退款号: {{form.refundOrderNum}}</div>
              <div class="fs12 black">{{form.createAt}}</div>
          </cell>
          <cell :border-intent="false" >
              <div slot="title">退款金额</div>
              <div class="red">￥{{form.refundAmount}}</div>
          </cell>
      </group>
      <!--商品信息-->
      <group>
        <cell class="good-detail" :border-intent="false">
          <!--<x-img slot="icon" class="goods-img" :src="form.goodsPic"></x-img>-->
            <div slot="icon" class="goods-img cover-bg-img" :style="{backgroundImage:'url(' + form.goodsPic + ')'}"></div>

            <div class="good-msg" slot="title">
              <div class="goods-name">{{form.goodsName}}</div>
              <div class="fs12 dark-gray pdb4">款式<span class="pdl4">{{form.goodsStyle}}</span></div>
              <div class="fs12 dark-gray pdb4">款号<span class="pdl4">{{form.goodsStyleNo}}</span></div>
              <div class="dark-gray">
                <x-button class="tag-btn" mini>{{form.goodsSpecName}}</x-button>
             </div>
          </div>
        </cell>
          <div class="order-remark">
              <div class="fs12">备注：{{form.remark}}</div>
              <div><i class="iconNH icon-cart-edit"></i></div>
          </div>
      </group>
      <!--退款原因-->
      <group v-if="!editShow">
          <cell>
              <div slot="title">退款原因</div>
              <div class="dark-gray" slot="inline-desc">
                  <div v-if="form.refundNote !='未收到货品'&& form.refundNote !='操作错误'">
                      <x-button class="tag-btn mgt14" mini >其他原因</x-button>
                      <div class="light-gray fs14 mgt10">{{form.refundNote}}</div>
                  </div>
                  <div v-else>
                      <x-button class="tag-btn mgt14" mini >{{form.refundNote}}</x-button>
                  </div>

                <!--<div class="light-gray fs14 mgt10" v-if="form.refundNote == '其他原因'">{{form.refundNote}}</div>-->
                <ul class="imglist mgt10">
                    <li v-if="form.refundPicList" v-for = "(item,index) in form.refundPicList" :key="index" @click="showImg(index)">
                        <x-img :src="item.src"></x-img>
                    </li>
                </ul>
             </div>
          </cell>
      </group>
      <group v-else>
          <cell :border-intent="false">
                <div slot="title">退款原因</div>
            </cell>
            <div class="refund-reason-list">
                <x-button @click.native="selectReason1(reason)" v-for="(reason,reasonIndex) in reasonList" :key="reasonIndex" :class="['tag-btn mgr4',{active:reason.isActive}]" mini>{{reason.text}}</x-button>
            </div>
            <div>
                <x-textarea :disabled="!reasonList[2].isActive" class="your-reason" :max="200" placeholder="可以在这里具体描述退款原因" v-model="refundRemark"></x-textarea>
            </div>
            <div class="img-list-content">
                <div aspectratio w-345-64>
                    <div class="img-list" aspectratio-content>
                        <div v-for="(item,index) in editForm.picList" :key="index" class="item">
                            <i @click="editForm.picList.splice(index,1)" class="icon-close close"></i>
                            <x-img :src="item.src"></x-img>
                        </div>
                        <!-- <div v-for="(item,index) in editForm.picList" :key="index" class="item">
                            <x-img :src="item.src"></x-img>
                        </div> -->

                        <div @click="isEditimg=true" class="item">
                            <img src="@/assets/icon/commom_add-photo@2x.png"/>
                        </div>
                    </div>
                </div>
            </div>
      </group>
      <!-- v-if="form.refundStatus == 'WAIT_AGREE' || form.refundStatus == 'WAIT_RETUEN_GOODS' || form.refundStatus == 'WAIT_RECIVE_GOODS' || form.refundStatus == 'WAIT_REFUND' || form.refundStatus == 'REFUNDING' || form.refundStatus == 'SUCCESS' || form.refundStatus == 'FAIL' -->
      <group  v-if="(form.refundStatus !== 'CANCEL'&&form.refundStatus !== 'REFUSED')" v-show="form.refundType  == 'MONEY_GOODS'">
          <cell v-if="form.refundStatus == 'WAIT_AGREE' || form.refundStatus == 'WAIT_RECIVE_GOODS' || form.refundStatus == 'WAIT_RETUEN_GOODS'">
              <div slot="title" :class="[form.refundStatus == 'WAIT_AGREE'?'red': 'light-gray', 'fs12']">平台同意退货后，请按以下地址退货并且填入退款物流号</div>
          </cell>
          <cell :border-intent="false">
              <i slot="icon" class="icon-address iconNH mgr8"></i>
              <div slot="title" >
                  <p class="pdb4">{{form.receiverName}}：{{form.phone}}</p>
                  <p class="fs12 light-gray">{{form.wholeAddress}}</p>
              </div>
          </cell>
          <cell v-if="form.refundStatus != 'WAIT_AGREE'" v-show="form.refundType == 'MONEY_GOODS'">
              <i slot="icon" class="icon-logistics iconNH mgr8"></i>
              <div slot="title" >
                  <p class="pdb4">退货物流信息</p>
                  <p class="fs12 light-gray" v-if="form.logisticsCompany || form.logisticsNum">{{form.logisticsCompany}}&nbsp;&nbsp;{{form.logisticsNum}}</p>
                  <p class="fs12 light-gray" v-else>待完善</p>
              </div>
              <div>
                  <span v-if="form.refundStatus == 'WAIT_RECIVE_GOODS'" class="fs12 edit light-gray" @click="open">修改物流</span>
                <x-button plain type="warn" mini @click.native="open" v-else-if="form.refundStatus == 'WAIT_RETUEN_GOODS'">去填写</x-button>
             </div>
          </cell>
      </group>
      <group>
          <cell :border-intent="false" is-link @click.native="$router.push({path: '/orderDetail', query: {id: form.orderId}})">
              <div slot="title" >
                  <p class="pdb4">关联订单</p>
              </div>
            <div>
                {{form.orderNum}}
            </div>
          </cell>
      </group>
      </div>
   

      <!--底部操作栏-->
      <div class="order-action footer" v-if="form.refundStatus == 'WAIT_AGREE'">
          <div v-if="!editShow"><x-button mini plain type="default" @click.native="cancel">取消申请</x-button></div>
          <div v-if="!editShow"><x-button mini plain type="warn" @click.native="editOpen">修改申请</x-button></div>
          <div v-if="editShow"><x-button mini plain type="default" @click.native="editCancel">取消</x-button></div>
          <div v-if="editShow"><x-button mini plain type="warn" @click.native="editSave">确定</x-button></div>
      </div>
      <div class="footer">
          <x-button type="primary" class="full-btn" @click.native="reapply" v-if="form.isReApplyOk == '0'">重新申请</x-button>
      </div>
       <div v-transfer-dom>
        <popup v-model="isRefundVisible" class="popup">
            <div>
            <group class="mgt0">
                <cell :border-intent="false">
                    <div slot="title" class="center">退货物流信息</div>
                </cell>
                <popup-picker title="物流公司" :data="data" v-model="company" placeholder="必选" class="fs14" :popup-style="{zIndex: 502}"></popup-picker>
                <x-input title="物流单号" v-model="logisticsNum" text-align="right" class="fs14 left"></x-input>
                <div class="bg"></div>
            </group>
            <x-button type="primary" @click.native="save" class="mgt120">确定提交</x-button>
            </div>
        </popup>
        </div>
      
      <!--<div v-transfer-dom>-->
        <!--<previewer :list="form.refundPicList || []" ref="previewer"></previewer>-->
    <!--</div>-->
    <!--上传图片-->
    <div v-transfer-dom>
        <actionsheet v-model="isEditimg" :menus="actionMenus" @on-click-menu="handleSelectType" show-cancel v-if="isEditimg"></actionsheet>
    </div>
  </div>
</template>

<script>
import {TransferDomDirective as TransferDom, PopupPicker} from 'vux'
  import { refundDetailH5, userCancelH5, editRefundOrderH5, editLogisticsH5,companyNamesH5} from '@/api/afterSales.js'
  export default {
    name: 'afterSalesDetail',
    directives: {
        TransferDom
    },
    components: {
        PopupPicker
    },
    data() {
      return {
        refundStatusMap:{
            'WAIT_AGREE': '等待平台审核',
            'WAIT_RETUEN_GOODS': '平台已同意，等待收到退货',
            'WAIT_RECIVE_GOODS': '平台已同意，等待收到退货',
            'WAIT_REFUND': '平台已收到退货货品，即将退款',
            'REFUNDING': '即将退款',
            'SUCCESS': '退款成功',
            'CANCEL': '用户取消退款',
            'REFUSED': '平台拒绝退款',
            'FAIL': '退款失败'
          },
          isRefundVisible:false,
          editShow: false, // 是否修改
          isEditimg: false, // 是否修改图片
          form: {},
          company: [],
          logisticsCompany: '',
          logisticsNum: '',
          data:[],
          reasonList:[{text:'未收到货品',isActive:true, flag: false},{text:'操作错误',isActive:false, flag: false},{text:'其他原因',isActive:false, flag: false}],
          editForm:{
              picList: [],
              refundNote: ''
          },
          refundRemark: '',
          actionMenus: {
            camera: '拍照',
            image: '从相册选择'
          }
      }
    },
    methods: {
        // 重新申请
        reapply() {
            // this.form.price=  this.form.refundAmount
            this.form.goodsPicture=  this.form.goodsPic
            this.form.receiverInfo = {
                name:this.form.receiverName,
                address:this.form.wholeAddress,
                phone:this.form.phone,
            }
            this.form.id = this.form.orderSpecId
            this.$router.push({path: 'refund', query:{info: this.form, type: this.form.refundType}})
        },
        // 修改申请
        selectReason1(reason) {
            this.reasonList.forEach((v,k) => {
                v.isActive = false
                if (k != 2) {this.refundRemark = ''}
            })
            reason.isActive = true
        },
        selectReason(reason){
            let flag = false
            let index = 0;
            // debugger
            for (let i = 0; i < this.reasonList.length; i++) {
                this.reasonList[i].isActive = false
                if(i != 2) {
                    if(reason.text === this.reasonList[i].text) {
                        index = i
                        flag = true
                        break
                    }
                }
            }
            if (flag) {
                this.reasonList[index].isActive = true
                this.refundRemark = ''
            } else {
                this.reasonList[2].isActive = true
                this.refundRemark = reason.text
            }
        },
        editCancel () {
            this.reasonList.forEach((v,k) => {
                v.isActive = false
            })
            this.editShow = false
        },
        editOpen () {
            this.editShow = true
            let remark = {text: this.form.refundNote, isActive: false}
            this.selectReason(remark)
            this.editForm.picList = this.form.refundPicList
        },
        editSave () {
            for (let i = 0; i < this.reasonList.length; i++) {
                if(this.reasonList[i].isActive && i != 2) {
                    this.form.refundNote = this.reasonList[i].text
                    break
                }else{
                    this.form.refundNote = this.refundRemark
                }
            }
            let refundPics = []
            if (this.form.picList&&this.form.picList.length > 0) {
                this.form.picList.forEach(i => {
                    refundPics.push(i.src)
                })
            }
            let params = {
                refundOrderId: this.form.refundOrderId,
                refundNote: this.form.refundNote,
                refundPics: refundPics
            }
            this.$vux.loading.show('loading')
            editRefundOrderH5(params).then(res => {
                if (res.code == 0) {
                    this.$vux.toast.text(res.msg)
                    this.editShow = false
                    this.$vux.loading.hide()
                }
            })
        },
       // 上传图片
       handleSelectType(key) {
          if (key === 'camera') {
              // 拍照
              let srcType = Camera.PictureSourceType.CAMERA;
              navigator.camera.getPicture(this.onSuccess, this.onFail,this.setOptions(srcType));
          }
          else if (key === 'image') {
              // 从相册选择
              let srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
              navigator.camera.getPicture(this.onSuccess, this.onFail,this.setOptions(srcType));
          }
      },
      setOptions(srcType) {
          return {
              quality: 50,
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: srcType,
              encodingType: Camera.EncodingType.JPEG,
              mediaType: Camera.MediaType.PICTURE,
              allowEdit: true,
              correctOrientation: true
          }
      },
      // 失败
      onFail(message) {
          console.log('Failed because: ' + message);
      },
      // 成功
      onSuccess(imageUri) {
          console.log(imageUri,'调用成功了吗？')
          this.readFileFromUri(imageUri)
      },
      readFileFromUri(imgUri) {
          const _this = this;
          window.resolveLocalFileSystemURL(imgUri, async function success(fileEntry) {
              fileEntry.file(function (file) {
                  var reader = new FileReader();
                  reader.readAsArrayBuffer(file);
                  reader.onload = async function (e) {
                      _this.handleFileChange(e)
                  }
              })
          }, _this.onErrorResolveUrl)
      },
      async handleFileChange(e) {
          const key = this.getImgKey()
              , token = await this.getToken()
              , formData = new FormData();
          let file = new Blob([e.target.result], {type: "image/jpg"});
          formData.append('file', file);
          formData.append('key', key);
          formData.append('token', token);
          this.uploadHeadImg(formData)
      },
      onErrorResolveUrl(message){
          console.log('Failed because: ' + message);
      },
      // 设置上传图片key
      getImgKey() {
          const storeId = this.$store.getters.userInfo.id
          const date = +new Date() + "";
          return storeId + "_" + _env + "_" + md5(storeId + date) +　".jpg";
      },
      getToken() {
          return getUploadToken()
              .then(res => {
                  return res.data;
              });
      },
    //   获取上传成功的图片
      uploadHeadImg(params) {
          uploadImg(params)
              .then(res => {
                  console.log('上传图片接口返回的：'+res.key)
                  this.editForm.picList.push({src: qiNiuBaseUrl + res.key})
              })
            },
        showImg(index) {
            // this.$refs.previewer.show(index)
            this.$store.commit('setPreviewerInfo', {imgList:this.form.refundPicList,currentIndex:index,time:new Date().getTime()})
        },
        getRefundDetailH5 (){
            let param = {
                refundOrderId: this.$route.query.refundOrderId
            }
            refundDetailH5(param).then(res => {
                console.log(res.data);
                this.form = res.data
            })
        },
        // 取消申请
        cancel () {
            let param = {
                refundOrderId: this.form.refundOrderId
            }
            this.$vux.loading.show('loading')
            userCancelH5 (param).then(res => {
                this.$vux.toast.text(res.msg)
                this.$vux.loading.hide()
                this.$router.go(-1)
            })
        },
        // 获取物流公司
        getCompanyNamesH5 () {
            companyNamesH5().then(res => {
                this.data = [res.data]
            })
        },
        open() {
            this.company = this.form.logisticsCompany ? [this.form.logisticsCompany] : []
            this.logisticsNum = this.form.logisticsNum
            this.isRefundVisible = true
        },
        // 修改物流信息
        save(){
            let reg = /^\d+$/
            this.logisticsCompany = this.company[0]
            console.log(this.logisticsCompany)
            if(this.logisticsCompany == '' || this.logisticsCompany == undefined) return this.$vux.toast.text('请选择物流公司')
            if(this.logisticsNum == '') return this.$vux.toast.text('请填写物流单号')
            if(!reg.test(this.logisticsNum)) return this.$vux.toast.text('请填写正确的物流单号')
            let params = {
                refundOrderId: this.form.refundOrderId,
                logisticsCompany: this.logisticsCompany,
                logisticsNum: this.logisticsNum
            }
            this.$vux.loading.show('loading')
            editLogisticsH5 (params).then(res => {
                if (res.code == 0) {
                    this.$vux.toast.text(res.msg)
                    this.getRefundDetailH5()
                    this.$vux.loading.hide()
                    this.isRefundVisible = false
                } else{
                    this.$vux.toast.text('保存失败')
                }
            })
        }
    },
    activated () {
        this.getRefundDetailH5()
        this.getCompanyNamesH5()
    },
    created() {
        this.getRefundDetailH5()
        this.getCompanyNamesH5()
    }
  }
</script>

<style rel="stylesheet/scss" lang="less">
    @import '../../../assets/style/vars.less';
.after-sales-detail{
    .mgt0{.vux-no-group-title{margin-top:0 !important;}.weui-cells{margin-top:0 !important;}}
    .weui-cells{
        margin-top: 8px !important;
    }
    .order-action{
        .weui-btn_mini{
            font-size: 12px;
            min-width: 82px!important;
        }
    }
    .good-detail{
        align-items: stretch;
    }
    .tag-btn.select-size-btn{
        background-color:@gray-white-bg !important;
    }
    .size-list{
        .weui-btn_mini{
            width: 64px !important;
            margin: 5px 0;
        }
    }
    .weui-actionsheet__cell{
        // padding:0 !important;
    }

}
.mgt0{
    .vux-no-group-title{margin-top:0 !important;}.weui-cells{margin-top:0 !important;}
}
.mgt120{
    margin-top:120px;
}
</style>

<style rel="stylesheet/scss" lang="less" scoped>
    @import '../../../assets/style/vars.less';
    .pdb56{
        padding-bottom:56px;
    }
    .pdb26{
        padding-bottom:26px;
    }
    .after-sales-detail{
        // padding-bottom: 56px;
        .status-banner{
            height: 60px;
            line-height: 60px;
            font-size: 14px;
            padding: 0 15px 0 26px;
            color: #fff;
            .dis-block{display:block; height:20px;}
            .text{width:200px; display: inline-block;}
            .mgt5{margin-top: -5px;}
            .mgt10{margin-top:-30px}
            .pay-icon{
                display: inline-block;
                vertical-align: middle;
                width: 26px;
                height: 26px;
                margin-right: 8px;
            }
            &.wait-pay{
                background: linear-gradient(left,#F95C6A,#EF3C4E);
                .pay-icon{
                    background: url('../../../assets/icon/order_paying@3x.png') no-repeat center center;
                    background-size: cover;
                }
            }
            &.wait-deliver{
                background: @black;
                .pay-icon{
                    background: url('../../../assets/icon/order_refund-success@3x.png') no-repeat center center;
                    background-size: cover;
                }
            }
            &.wait-receive{
                background: @dark-gray;
                .pay-icon{
                    background: url('../../../assets/icon/order_pay-finish@3x.png') no-repeat center center;
                    background-size: cover;
                }
            }
            &.wait-receive-goods{
                background: @dark-gray;
                .pay-icon{
                    background: url('../../../assets/icon/order_receive-goods@3x.png') no-repeat center center;
                    background-size: cover;
                }
            }
            &.cancel-already{
                background: #B5B2AF;
                .pay-icon{
                    background: url('../../../assets/icon/order_fail@3x.png') no-repeat center center;
                    background-size: cover;
                }
            }

        }
        .imglist{
            display:flex;
            li{
                width: 64px;
                height: 64px;
                margin-right:6px;
                img{width:100%;height:100%;}
                &:last-child{
                    margin-right:0;
                }
            }
        }
        .icon-order_wechat-pay-s{
            width: 16px;
            height: 16px;
            margin-right: 6px;
            color: #41B035;
        }
        .icon-cart_alipay-l{
            width: 16px;
            height: 16px;
            margin-right: 6px;
            color: @blue;
        }
        .order-action{
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            left: 0;
            bottom: 0;
            z-index:500;
            width: 100vw;
            height: 48px;
            padding:0 16px;
            background: @gray-white-bg;
            box-shadow: 0 -1px 2px  rgba(0,0,0,.1);
        }
        .address-logo{
            display: block;
            width: 14px;
            margin-right: 8px;
        }
        .brand-logo{
            display: block;
            width: 24px;
            height: 24px;
            margin-right: 10px;
        }
        .good-msg{
            padding-right: 15px;
            .goods-name{
                font-size: 13px;
                min-height: 40px;
                vertical-align: top;
                padding-bottom: 8px;
            }
        }
        .goods-img{
            display:block;
            width:82px;
            height:82px;
            margin-right:10px;
        }
        .right-content{
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: space-between;
            .goods-price{
                font-size: 14px;
                color: @red;
            }
        }
        .order-remark{
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            margin: 0 16px 12px;
            padding: 6px 8px;
            color: @light-gray;
            background-color: @gray-white-bg;
            .iconNH{
                margin-left: 5px;
            }
        }
        .icon-cart_dropdown-s{
            font-size: 8px !important;
            margin-left: 5px;
        }
        .size-list{
            position: relative;
            width: 288px;
            padding: 5px 9px;
            margin-left: 70px;
            background-color: @gray-white-bg;
            &::before {
                content: '';
                position: absolute;
                z-index: 2;
                top: -8px;
                left: 80px;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid @gray-white-bg;
            }
        }
        .refund-type-list{
            background-color: #fff;
        }
        .bg{
            background-color: @mine-color;
            height:120px;
        }
        .left{
            text-align:left;
        }
        .edit{
             text-decoration:underline;
             cursor: pointer;
        }
        .refund-reason-list {
            padding: 0 16px;
            .weui-btn + .weui-btn {
                margin-top: 0;
                margin-bottom: 16px;
            }
        }
        .your-reason {
            height: 90px;
            font-size: 14px;
            margin: 0 16px 16px;
            color: @blue-gray;
            background: @gray-white-bg;
        }
        .img-list-content {
            margin-top: -6px;
            padding: 0 16px 16px;
            height:80px;
            .img-list {
                display: flex;
                margin-bottom: 15px;
                .item {
                    position: relative;
                    width: 64px;
                    height: 64px;
                    padding-right: 0;
                    margin-right: 6px;
                    &:nth-child(5n) {
                        margin-right: 0;
                    }
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    .close {
                        background-color: rgba(0, 0, 0, .2);
                        border-radius: 50%;
                        position: absolute;
                        right: -5px;
                        top: -5px;
                        width: 13px;
                        height: 13px;
                    }
                }
            }
        }
        .btn{
            bottom:0;
        }
    }

</style>
