webpackJsonp([13],{"1I/c":function(t,e,i){"use strict";function n(t){i("mv5k"),i("ATHe")}Object.defineProperty(e,"__esModule",{value:!0});var a=i("63CM"),o=i("FWz8"),s=(a.a,{name:"orderDetail",directives:{TransferDom:a.a},data:function(){return{cancelOrderVisible:!1,detailInfo:{},isRefundVisible:!1,isPayMethodVisible:!1,isChangeRemarkVisible:!1,editingRemark:"",editingOrderSpecId:"",refundInfo:{},isEdit:!1,params:{}}},methods:{applyRefund:function(t){this.refundInfo=t,this.refundInfo.orderId=this.detailInfo.id,this.refundInfo.payMethod=this.detailInfo.payMethod,this.refundInfo.freight=this.detailInfo.freight,this.refundInfo.receiverInfo={name:this.detailInfo.receiverName,address:this.detailInfo.receiverAddress,phone:this.detailInfo.receiverPhone},this.isRefundVisible=!0},getOrderDetail:function(){var t=this,e={id:this.$route.query.id};Object(o.e)(e).then(function(e){0===e.code&&(t.detailInfo=e.data),console.log(t.detailInfo)})},getOrderStatusText:function(t){var e="";switch(t){case"WAIT_PAY":e="待支付";break;case"WAIT_SEND":e="已付款，等待发货";break;case"SENDED":e="已发货";break;case"CANCEL":e="已被主动取消";break;case"EXPIRE":e="支付超时，已取消"}return e},specClick:function(t){"WAIT_PAY"===this.detailInfo.orderStatus&&this.$set(t,"show",!t.show)},editSpc:function(){var t=this;Object(o.h)(this.params).then(function(e){0===e.code&&(t.$vux.toast.text("更换成功"),t.getOrderDetail())})},changeSpec:function(t,e){t.specName!=e.name&&(this.isEdit=!0,this.params={orderSpecId:t.id,newGoodsSpecId:e.id})},cancelOrder:function(){var t=this,e=this,i={orderIds:[this.detailInfo.id]};Object(o.b)(i).then(function(i){0===i.code&&t.$vux.toast.show({text:"订单已取消",type:"text",onHide:function(){e.getOrderDetail()}})})},goPay:function(t){var e=this,i=this,n={orderId:this.detailInfo.id,payMethod:t,userId:this.$store.getters.userInfo.id};this.isPayMethodVisible=!1,Object(o.f)(n).then(function(n){if(0===n.code&&"WX_PAY"===t){if("SUCCESS"!==n.data.return_code||"SUCCESS"!==n.data.result_code)return void e.$vux.toast.show({text:"调起支付失败",type:"cancel"});var a={appid:n.data.appid,mch_id:n.data.mch_id,prepay_id:n.data.prepay_id,nonce:n.data.finalPackage.noncestr,timestamp:n.data.finalPackage.timestamp,sign:n.data.paySign};Wechat.sendPaymentRequest(a,function(){i.$vux.toast.show({text:"支付成功",onHide:function(){i.getOrderDetail()}})},function(t){i.$vux.toast.show({text:t,type:"cancel",onHide:function(){i.getOrderDetail()}})})}0===n.code&&"ALI_PAY"===t&&cordova.plugins.alipay.payment(n.data,function(t){i.$vux.toast.show({text:"支付成功",onHide:function(){i.getOrderDetail()}})},function(t){i.$vux.toast.show({text:"支付失败",type:"cancel",onHide:function(){i.getOrderDetail()}})})})},changeOrderRemark:function(){var t=this,e=this,i={orderSpecId:this.editingOrderSpecId,remark:this.editingRemark};Object(o.g)(i).then(function(i){0===i.code&&t.$vux.toast.show({text:"修改成功",type:"success",onHide:function(){e.getOrderDetail()}})})},showRemarkChange:function(t){this.isChangeRemarkVisible=!0,this.editingRemark=t.remark,this.editingOrderSpecId=t.id}},beforeCreate:function(){window.repayTimer=""},created:function(){this.getOrderDetail()},activated:function(){this.isRefundVisible=!1,this.isSpecListVisible=!1,this.isPayMethodVisible=!1,this.isChangeRemarkVisible=!1,this.getOrderDetail()},beforeDestroy:function(){clearInterval(repayTimer)}}),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"order-detail custom-body",class:["order-detail","custom-body","WAIT_PAY"==t.detailInfo.orderStatus?"pdb48":""]},[i("div",{staticClass:"main-content"},[i("div",{staticClass:"status-banner",class:{"wait-pay":"WAIT_PAY"===t.detailInfo.orderStatus,"wait-deliver":"WAIT_SEND"===t.detailInfo.orderStatus,"wait-receive":"SENDED"===t.detailInfo.orderStatus,"cancel-already":"CANCEL"===t.detailInfo.orderStatus||"EXPIRE"===t.detailInfo.orderStatus}},[i("i",{staticClass:"pay-icon"}),t._v(" "),i("span",[t._v(t._s(t.getOrderStatusText(t.detailInfo.orderStatus))+"\n            "),"WAIT_PAY"===t.detailInfo.orderStatus?i("clocker",{attrs:{format:" %M：%S",time:t.detailInfo.expireAt},on:{"on-finish":t.getOrderDetail}}):t._e()],1)]),t._v(" "),i("group",[i("cell",{attrs:{"border-intent":!1}},[i("div",{staticClass:"fs12",attrs:{slot:"title"},slot:"title"},[t._v("订单编号: "+t._s(t.detailInfo.orderNum))]),t._v(" "),i("div",{staticClass:"fs12 black"},[t._v(t._s(t.detailInfo.orderAt))])]),t._v(" "),i("cell",{attrs:{"border-intent":!1,"is-link":""}},[i("i",{staticClass:"icon-address iconNH mgr8",attrs:{slot:"icon"},slot:"icon"}),t._v(" "),i("div",{attrs:{slot:"title"},slot:"title"},[i("p",{staticClass:"pdb4"},[t._v(t._s(t.detailInfo.receiverName)+"："+t._s(t.detailInfo.receiverPhone))]),t._v(" "),i("p",{staticClass:"fs12 light-gray"},[t._v(t._s(t.detailInfo.receiverAddress))])])])],1),t._v(" "),i("group",[i("cell",[i("div",{attrs:{slot:"title"},slot:"title"},[t._v("商品合计（"+t._s(t.detailInfo.goodsSum)+")")]),t._v(" "),i("div",{staticClass:"black"},[t._v("¥"+t._s((1*t.detailInfo.orderAmount).toFixed(2)))])]),t._v(" "),i("cell",[i("div",{attrs:{slot:"title"},slot:"title"},[t._v("运费")]),t._v(" "),i("div",{staticClass:"black"},[t._v("¥"+t._s(t.detailInfo.freight))])]),t._v(" "),i("cell",[i("div",{attrs:{slot:"title"},slot:"title"},[t._v("应付金额")]),t._v(" "),i("div",{staticClass:"black"},[t._v("¥"+t._s((1*t.detailInfo.totalAmount).toFixed(2)))])])],1),t._v(" "),i("group",[i("cell",{attrs:{"border-intent":!1}},[i("div",{staticClass:"fs16",attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.detailInfo.goodsSpecsDetail[0].brandName))]),t._v(" "),i("img",{staticClass:"brand-logo",attrs:{slot:"icon",src:t.detailInfo.goodsSpecsDetail[0].brandLogo},slot:"icon"})]),t._v(" "),t._l(t.detailInfo.goodsSpecsDetail,function(e,n){return[i("cell",{staticClass:"good-detail",attrs:{"border-intent":!1}},[i("div",{staticClass:"goods-img cover-bg-img",style:{backgroundImage:"url("+e.goodsPicture+")"},attrs:{slot:"icon"},slot:"icon"}),t._v(" "),i("div",{staticClass:"good-msg",attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"goods-name"},[t._v(t._s(e.goodsName))]),t._v(" "),i("div",{staticClass:"fs12 dark-gray pdb4"},[t._v("款式"),i("span",{staticClass:"pdl4"},[t._v(t._s(e.goodsStyle))])]),t._v(" "),i("div",{staticClass:"fs12 dark-gray pdb4"},[t._v("款号"),i("span",{staticClass:"pdl4"},[t._v(t._s(e.goodsStyleNo))])]),t._v(" "),i("div",[i("x-button",{staticClass:"tag-btn select-size-btn",attrs:{mini:""},nativeOn:{click:function(i){t.specClick(e)}}},[i("span",[t._v(t._s(e.specName))]),t._v(" "),"WAIT_PAY"===t.detailInfo.orderStatus?i("i",{staticClass:"iconNH icon-dropdown",class:{reverse:e.show}}):t._e()])],1)]),t._v(" "),i("div",{staticClass:"right-content"},[i("div",["WAIT_SEND"!==t.detailInfo.orderStatus&&"SENDED"!==t.detailInfo.orderStatus||"CANCEL"!==e.refundStatus&&null!==e.refundStatus?t._e():i("x-button",{attrs:{mini:"",plain:"",type:"default"},nativeOn:{click:function(i){t.applyRefund(e)}}},[t._v("售后\n                        ")]),t._v(" "),"WAIT_SEND"!==t.detailInfo.orderStatus&&"SENDED"!==t.detailInfo.orderStatus||"CANCEL"===e.refundStatus||null===e.refundStatus?t._e():i("x-button",{attrs:{mini:"",plain:"",type:"default"},nativeOn:{click:function(i){t.$router.push({path:"/afterSalesDetail",query:{refundOrderId:e.refundOrderId}})}}},[t._v("售后详情\n                        ")])],1),t._v(" "),i("p",{staticClass:"goods-price"},[t._v("￥"+t._s(e.price))])])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"item.show"}],staticClass:"size-list mgb10"},t._l(e.orderGoodsSpecs,function(n,a){return i("div",{key:a,staticClass:"item"},[i("x-button",{staticClass:"tag-btn",class:{active:n.name===e.specName},attrs:{mini:""},nativeOn:{click:function(i){t.changeSpec(e,n)}}},[t._v(t._s(n.name)+"\n                    ")])],1)})),t._v(" "),i("div",{staticClass:"order-remark"},[i("div",{staticClass:"fs12"},[t._v("备注："+t._s(e.remark?e.remark:"暂无备注"))]),t._v(" "),"WAIT_PAY"===t.detailInfo.orderStatus?i("div",[i("i",{staticClass:"iconNH icon-cart-edit",on:{click:function(i){t.showRemarkChange(e)}}})]):t._e()])]})],2),t._v(" "),"FINISHED_PAY"===t.detailInfo.payStatus?i("group",[i("cell",[i("div",{attrs:{slot:"title"},slot:"title"},[t._v("支付：¥"+t._s((1*t.detailInfo.totalAmount).toFixed(2)))]),t._v(" "),i("div",{staticClass:"black"},[i("i",{staticClass:"iconNH icon-wxpay",class:{"icon-wxpay":"WX_PAY"===t.detailInfo.payMethod,"icon-alipay":"ALI_PAY"===t.detailInfo.payMethod}}),t._v(" "),i("span",[t._v(t._s("WX_PAY"===t.detailInfo.payMethod?"微信支付":"支付宝"))])])]),t._v(" "),i("cell",[i("div",{staticClass:"light-gray fs12",attrs:{slot:"title"},slot:"title"},[t._v("支付流水号："+t._s(t.detailInfo.payNum))])])],1):t._e(),t._v(" "),"SENDED"===t.detailInfo.orderStatus?i("group",[i("cell",[i("div",{attrs:{slot:"title"},slot:"title"},[t._v("物流公司")]),t._v(" "),i("div",{staticClass:"black"},[i("div",[t._v(t._s(t.detailInfo.logisticsCompany))])])]),t._v(" "),i("cell",[i("div",{staticClass:"black",attrs:{slot:"title"},slot:"title"},[t._v("物流单号")]),t._v(" "),i("div",{staticClass:"black"},[t._v(t._s(t.detailInfo.logisticsNum))])])],1):t._e()],1),t._v(" "),"WAIT_PAY"===t.detailInfo.orderStatus?i("div",{staticClass:"footer"},[i("div",[i("x-button",{attrs:{mini:"",plain:"",type:"default"},nativeOn:{click:function(e){t.cancelOrderVisible=!0}}},[t._v("取消订单")])],1),t._v(" "),i("div",[i("x-button",{attrs:{mini:"",plain:"",type:"warn"},nativeOn:{click:function(e){t.isPayMethodVisible=!0}}},[t._v("去支付")])],1)]):t._e(),t._v(" "),i("actionsheet",{model:{value:t.isRefundVisible,callback:function(e){t.isRefundVisible=e},expression:"isRefundVisible"}},[i("div",{attrs:{slot:"header"},slot:"header"},[i("div",{staticClass:"refund-type-list"},[i("cell",{attrs:{"border-intent":!1,"is-link":"",link:{path:"/refund",query:{type:"MONEY_ONLY",info:t.refundInfo}}}},[i("i",{staticClass:"iconNH icon-refund mgr16",attrs:{slot:"icon"},slot:"icon"}),t._v(" "),i("div",{attrs:{slot:"title"},slot:"title"},[i("p",{staticClass:"pdb4"},[t._v("仅退款")]),t._v(" "),i("p",{staticClass:"fs12 light-gray"},[t._v("未收到货(包含未签收)，或卖家协商同意前")])])]),t._v(" "),"SENDED"===t.detailInfo.orderStatus?i("cell",{attrs:{"border-intent":!1,"is-link":"",link:{path:"/refund",query:{type:"MONEY_GOODS",info:t.refundInfo}}}},[i("i",{staticClass:"iconNH icon-refund-goods mgr16",attrs:{slot:"icon"},slot:"icon"}),t._v(" "),i("div",{attrs:{slot:"title"},slot:"title"},[i("p",{staticClass:"pdb4"},[t._v("退货退款")]),t._v(" "),i("p",{staticClass:"fs12 light-gray"},[t._v("已收到货，需要退换已收到货品")])])]):t._e()],1)])]),t._v(" "),i("actionsheet",{model:{value:t.isPayMethodVisible,callback:function(e){t.isPayMethodVisible=e},expression:"isPayMethodVisible"}},[i("div",{attrs:{slot:"header"},slot:"header"},[i("div",{staticClass:"refund-type-list"},[i("cell",{attrs:{"border-intent":!1,"is-link":"","popup-style":""},nativeOn:{click:function(e){t.goPay("WX_PAY")}}},[i("i",{staticClass:"iconNH icon-wxpay mgr16",attrs:{slot:"icon"},slot:"icon"}),t._v(" "),i("div",{attrs:{slot:"title"},slot:"title"},[t._v("微信支付")])]),t._v(" "),i("cell",{attrs:{"border-intent":!1,"is-link":""},nativeOn:{click:function(e){t.goPay("ALI_PAY")}}},[i("i",{staticClass:"iconNH icon-alipay mgr16",attrs:{slot:"icon"},slot:"icon"}),t._v(" "),i("div",{attrs:{slot:"title"},slot:"title"},[t._v("支付宝")])])],1)])]),t._v(" "),i("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[i("confirm",{attrs:{"dialog-transition":"",title:"修改备注"},on:{"on-confirm":t.changeOrderRemark},model:{value:t.isChangeRemarkVisible,callback:function(e){t.isChangeRemarkVisible=e},expression:"isChangeRemarkVisible"}},[i("div",{attrs:{solt:"content"}},[i("group",[i("x-textarea",{model:{value:t.editingRemark,callback:function(e){t.editingRemark=e},expression:"editingRemark"}})],1)],1)])],1),t._v(" "),i("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[i("confirm",{attrs:{"dialog-transition":"",title:"确定取消订单?"},on:{"on-cancel":function(e){t.cancelOrderVisible=!1},"on-confirm":t.cancelOrder},model:{value:t.cancelOrderVisible,callback:function(e){t.cancelOrderVisible=e},expression:"cancelOrderVisible"}})],1),t._v(" "),i("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[i("confirm",{attrs:{"dialog-transition":"",title:"提示",content:"确定要更换商品规格吗?"},on:{"on-cancel":function(e){t.isEdit=!1},"on-confirm":t.editSpc},model:{value:t.isEdit,callback:function(e){t.isEdit=e},expression:"isEdit"}})],1)],1)},l=[],d={render:r,staticRenderFns:l},c=d,A=i("VU/8"),f=n,v=A(s,c,!1,f,"data-v-ff52c858",null);e.default=v.exports},ATHe:function(t,e,i){var n=i("AkBb");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("588fc273",n,!0,{})},AkBb:function(t,e,i){var n=i("kxFB");e=t.exports=i("FZ+f")(!0),e.push([t.i,'\n.nf-scroll-container[data-v-ff52c858]{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column\n}\n.nf-scroll-container .nf-scroll-view[data-v-ff52c858]{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1\n}\n.align-center[data-v-ff52c858],.flex[data-v-ff52c858]{display:-webkit-box;display:-ms-flexbox;display:flex\n}\n.align-center[data-v-ff52c858]{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.center[data-v-ff52c858],.justify-center[data-v-ff52c858]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center\n}\n.center[data-v-ff52c858]{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.space-between[data-v-ff52c858]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between\n}\n.navigation[data-v-ff52c858]{height:11.733vw;-webkit-box-align:center;-ms-flex-align:center;align-items:center;z-index:99;padding:0 4.267vw;position:fixed;top:0;left:0;width:100%;background-color:#fff;border-bottom:.5px solid #d9d9d9;content:"viewport-units-buggyfill; height: 11.733vw; padding: 0 4.267vw"\n}\n.navigation .back[data-v-ff52c858]{position:absolute;left:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; left: 4.267vw"\n}\n.navigation .text[data-v-ff52c858]{text-align:center;font-size:4.8vw;line-height:11.733vw;content:"viewport-units-buggyfill; font-size: 4.8vw; line-height: 11.733vw"\n}\n.navigation .right[data-v-ff52c858]{position:absolute;right:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; right: 4.267vw"\n}\n.pdb48[data-v-ff52c858]{padding-bottom:12.8vw;content:"viewport-units-buggyfill; padding-bottom: 12.8vw"\n}\n.order-detail .status-banner[data-v-ff52c858]{height:16vw;line-height:16vw;font-size:3.733vw;padding:0 4vw 0 6.933vw;color:#fff;content:"viewport-units-buggyfill; height: 16vw; line-height: 16vw; font-size: 3.733vw; padding: 0 4vw 0 6.933vw"\n}\n.order-detail .status-banner .pay-icon[data-v-ff52c858]{display:inline-block;vertical-align:middle;width:6.933vw;height:6.933vw;margin-right:2.133vw;content:"viewport-units-buggyfill; width: 6.933vw; height: 6.933vw; margin-right: 2.133vw"\n}\n.order-detail .status-banner.wait-pay[data-v-ff52c858]{background:-webkit-gradient(linear,left top,right top,from(#f95c6a),to(#ef3c4e));background:linear-gradient(left,#f95c6a,#ef3c4e)\n}\n.order-detail .status-banner.wait-pay .pay-icon[data-v-ff52c858]{background:url('+n(i("gApx"))+") no-repeat 50%;background-size:cover\n}\n.order-detail .status-banner.wait-deliver[data-v-ff52c858]{background:#797988\n}\n.order-detail .status-banner.wait-deliver .pay-icon[data-v-ff52c858]{background:url("+n(i("Vg8H"))+") no-repeat 50%;background-size:cover\n}\n.order-detail .status-banner.wait-receive[data-v-ff52c858]{background:#29292a\n}\n.order-detail .status-banner.wait-receive .pay-icon[data-v-ff52c858]{background:url("+n(i("JEU/"))+") no-repeat 50%;background-size:cover\n}\n.order-detail .status-banner.cancel-already[data-v-ff52c858]{background:#b5b2af\n}\n.order-detail .status-banner.cancel-already .pay-icon[data-v-ff52c858]{background:url("+n(i("5ojQ"))+') no-repeat 50%;background-size:cover\n}\n.order-detail .icon-order_wechat-pay-s[data-v-ff52c858]{color:#41b035\n}\n.order-detail .icon-cart_alipay-l[data-v-ff52c858],.order-detail .icon-order_wechat-pay-s[data-v-ff52c858]{width:4.267vw;height:4.267vw;margin-right:1.6vw;content:"viewport-units-buggyfill; width: 4.267vw; height: 4.267vw; margin-right: 1.6vw"\n}\n.order-detail .icon-cart_alipay-l[data-v-ff52c858]{color:#3c8eef\n}\n.order-detail .footer[data-v-ff52c858]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:fixed;left:0;bottom:0;width:100vw;height:12.8vw;padding:0 4.267vw;background:#fafafa;-webkit-box-shadow:0 -1px .533vw rgba(0,0,0,.1);box-shadow:0 -1px .533vw rgba(0,0,0,.1);content:"viewport-units-buggyfill; width: 100vw; height: 12.8vw; padding: 0 4.267vw; -webkit-box-shadow: 0 -1px 0.533vw rgba(0, 0, 0, .1); box-shadow: 0 -1px 0.533vw rgba(0, 0, 0, .1)"\n}\n.order-detail .address-logo[data-v-ff52c858]{display:block;width:3.733vw;margin-right:2.133vw;content:"viewport-units-buggyfill; width: 3.733vw; margin-right: 2.133vw"\n}\n.order-detail .brand-logo[data-v-ff52c858]{display:block;width:6.4vw;height:6.4vw;margin-right:2.667vw;content:"viewport-units-buggyfill; width: 6.4vw; height: 6.4vw; margin-right: 2.667vw"\n}\n.order-detail .good-msg[data-v-ff52c858]{padding-right:4vw;content:"viewport-units-buggyfill; padding-right: 4vw"\n}\n.order-detail .good-msg .goods-name[data-v-ff52c858]{font-size:3.467vw;min-height:10.667vw;vertical-align:top;padding-bottom:2.133vw;content:"viewport-units-buggyfill; font-size: 3.467vw; min-height: 10.667vw; padding-bottom: 2.133vw"\n}\n.order-detail .goods-img[data-v-ff52c858]{display:block;width:21.867vw;height:21.867vw;margin-right:2.667vw;content:"viewport-units-buggyfill; width: 21.867vw; height: 21.867vw; margin-right: 2.667vw"\n}\n.order-detail .right-content[data-v-ff52c858]{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between\n}\n.order-detail .right-content .goods-price[data-v-ff52c858]{font-size:3.733vw;color:#f83149;content:"viewport-units-buggyfill; font-size: 3.733vw"\n}\n.order-detail .order-remark[data-v-ff52c858]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;font-size:3.2vw;margin:0 4.267vw 3.2vw;padding:1.6vw 2.133vw;color:#9898a1;background-color:#fafafa;content:"viewport-units-buggyfill; font-size: 3.2vw; margin: 0 4.267vw 3.2vw; padding: 1.6vw 2.133vw"\n}\n.order-detail .order-remark .iconNH[data-v-ff52c858]{margin-left:1.333vw;content:"viewport-units-buggyfill; margin-left: 1.333vw"\n}\n.order-detail .icon-cart_dropdown-s[data-v-ff52c858]{font-size:2.133vw!important;margin-left:1.333vw;content:"viewport-units-buggyfill; font-size: 2.133vw; margin-left: 1.333vw"\n}\n.order-detail .size-list[data-v-ff52c858]{position:relative;width:76.8vw;padding:1.333vw 2.4vw;margin-left:18.667vw;background-color:#fafafa;content:"viewport-units-buggyfill; width: 76.8vw; padding: 1.333vw 2.4vw; margin-left: 18.667vw"\n}\n.order-detail .size-list[data-v-ff52c858]:before{content:"";position:absolute;z-index:2;top:-2.133vw;left:21.333vw;border-left:2.667vw solid transparent;border-right:2.667vw solid transparent;border-bottom:2.667vw solid #fafafa\n}\n.order-detail .size-list .item[data-v-ff52c858]{display:inline-block;width:25%;text-align:center\n}\n.order-detail .refund-type-list[data-v-ff52c858]{text-align:left;background-color:#fff\n}\n.order-detail .icon-dropdown.reverse[data-v-ff52c858]{-webkit-transform:rotatex(180deg);transform:rotatex(180deg)\n}',"",{version:3,sources:["/Users/glay/IdeaProjects/hiho-mobile/src/views/mine/order/detail.vue"],names:[],mappings:";AACA,sCAAsC,oBAAoB,oBAAoB,aAAa,WAAW,YAAY,4BAA4B,6BAA6B,0BAA0B,qBAAqB;CACzN;AACD,sDAAsD,kBAAkB,mBAAmB,WAAW,MAAM;CAC3G;AACD,sDAAsD,oBAAoB,oBAAoB,YAAY;CACzG;AACD,+BAA+B,yBAAyB,sBAAsB,kBAAkB;CAC/F;AACD,0DAA0D,oBAAoB,oBAAoB,aAAa,wBAAwB,qBAAqB,sBAAsB;CACjL;AACD,yBAAyB,yBAAyB,sBAAsB,kBAAkB;CACzF;AACD,gCAAgC,oBAAoB,oBAAoB,aAAa,yBAAyB,sBAAsB,6BAA6B;CAChK;AACD,6BAA6B,gBAAgB,yBAAyB,sBAAsB,mBAAmB,WAAW,kBAAkB,eAAe,MAAM,OAAO,WAAW,sBAAsB,iCAAiC,wEAAwE;CACjT;AACD,mCAAmC,kBAAkB,aAAa,QAAQ,mCAAmC,2BAA2B,iDAAiD;CACxL;AACD,mCAAmC,kBAAkB,gBAAgB,qBAAqB,2EAA2E;CACpK;AACD,oCAAoC,kBAAkB,cAAc,QAAQ,mCAAmC,2BAA2B,kDAAkD;CAC3L;AACD,wBAAwB,sBAAsB,0DAA0D;CACvG;AACD,8CAA8C,YAAY,iBAAiB,kBAAkB,wBAAwB,WAAW,iHAAiH;CAChP;AACD,wDAAwD,qBAAqB,sBAAsB,cAAc,eAAe,qBAAqB,0FAA0F;CAC9O;AACD,uDAAuD,iFAAiF,gDAAgD;CACvL;AACD,iEAAiE,uDAAuE,qBAAqB;CAC5J;AACD,2DAA2D,kBAAkB;CAC5E;AACD,qEAAqE,uDAA+E,qBAAqB;CACxK;AACD,2DAA2D,kBAAkB;CAC5E;AACD,qEAAqE,uDAA2E,qBAAqB;CACpK;AACD,6DAA6D,kBAAkB;CAC9E;AACD,uEAAuE,uDAAqE,qBAAqB;CAChK;AACD,wDAAwD,aAAa;CACpE;AACD,2GAA2G,cAAc,eAAe,mBAAmB,wFAAwF;CAClP;AACD,mDAAmD,aAAa;CAC/D;AACD,uCAAuC,oBAAoB,oBAAoB,aAAa,yBAAyB,sBAAsB,8BAA8B,yBAAyB,sBAAsB,mBAAmB,eAAe,OAAO,SAAS,YAAY,cAAc,kBAAkB,mBAAmB,gDAAgD,wCAAwC,wLAAwL;CACxlB;AACD,6CAA6C,cAAc,cAAc,qBAAqB,yEAAyE;CACtK;AACD,2CAA2C,cAAc,YAAY,aAAa,qBAAqB,sFAAsF;CAC5L;AACD,yCAAyC,kBAAkB,sDAAsD;CAChH;AACD,qDAAqD,kBAAkB,oBAAoB,mBAAmB,uBAAuB,qGAAqG;CACzO;AACD,0CAA0C,cAAc,eAAe,gBAAgB,qBAAqB,4FAA4F;CACvM;AACD,8CAA8C,oBAAoB,oBAAoB,aAAa,YAAY,4BAA4B,6BAA6B,0BAA0B,sBAAsB,yBAAyB,sBAAsB,6BAA6B;CACnS;AACD,2DAA2D,kBAAkB,cAAc,sDAAsD;CAChJ;AACD,6CAA6C,oBAAoB,oBAAoB,aAAa,yBAAyB,sBAAsB,mBAAmB,yBAAyB,sBAAsB,8BAA8B,gBAAgB,uBAAuB,sBAAsB,cAAc,yBAAyB,qGAAqG;CACzb;AACD,qDAAqD,oBAAoB,wDAAwD;CAChI;AACD,qDAAqD,4BAA4B,oBAAoB,4EAA4E;CAChL;AACD,0CAA0C,kBAAkB,aAAa,sBAAsB,qBAAqB,yBAAyB,gGAAgG;CAC5O;AACD,iDAAiD,WAAW,kBAAkB,UAAU,aAAa,cAAc,sCAAsC,uCAAuC,mCAAmC;CAClO;AACD,gDAAgD,qBAAqB,UAAU,iBAAiB;CAC/F;AACD,iDAAiD,gBAAgB,qBAAqB;CACrF;AACD,sDAAsD,kCAAkC,yBAAyB;CAChH",file:"detail.vue",sourcesContent:['\n.nf-scroll-container[data-v-ff52c858]{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column\n}\n.nf-scroll-container .nf-scroll-view[data-v-ff52c858]{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1\n}\n.align-center[data-v-ff52c858],.flex[data-v-ff52c858]{display:-webkit-box;display:-ms-flexbox;display:flex\n}\n.align-center[data-v-ff52c858]{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.center[data-v-ff52c858],.justify-center[data-v-ff52c858]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center\n}\n.center[data-v-ff52c858]{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.space-between[data-v-ff52c858]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between\n}\n.navigation[data-v-ff52c858]{height:11.733vw;-webkit-box-align:center;-ms-flex-align:center;align-items:center;z-index:99;padding:0 4.267vw;position:fixed;top:0;left:0;width:100%;background-color:#fff;border-bottom:.5px solid #d9d9d9;content:"viewport-units-buggyfill; height: 11.733vw; padding: 0 4.267vw"\n}\n.navigation .back[data-v-ff52c858]{position:absolute;left:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; left: 4.267vw"\n}\n.navigation .text[data-v-ff52c858]{text-align:center;font-size:4.8vw;line-height:11.733vw;content:"viewport-units-buggyfill; font-size: 4.8vw; line-height: 11.733vw"\n}\n.navigation .right[data-v-ff52c858]{position:absolute;right:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; right: 4.267vw"\n}\n.pdb48[data-v-ff52c858]{padding-bottom:12.8vw;content:"viewport-units-buggyfill; padding-bottom: 12.8vw"\n}\n.order-detail .status-banner[data-v-ff52c858]{height:16vw;line-height:16vw;font-size:3.733vw;padding:0 4vw 0 6.933vw;color:#fff;content:"viewport-units-buggyfill; height: 16vw; line-height: 16vw; font-size: 3.733vw; padding: 0 4vw 0 6.933vw"\n}\n.order-detail .status-banner .pay-icon[data-v-ff52c858]{display:inline-block;vertical-align:middle;width:6.933vw;height:6.933vw;margin-right:2.133vw;content:"viewport-units-buggyfill; width: 6.933vw; height: 6.933vw; margin-right: 2.133vw"\n}\n.order-detail .status-banner.wait-pay[data-v-ff52c858]{background:-webkit-gradient(linear,left top,right top,from(#f95c6a),to(#ef3c4e));background:linear-gradient(left,#f95c6a,#ef3c4e)\n}\n.order-detail .status-banner.wait-pay .pay-icon[data-v-ff52c858]{background:url(../../../assets/icon/order_paying@3x.png) no-repeat 50%;background-size:cover\n}\n.order-detail .status-banner.wait-deliver[data-v-ff52c858]{background:#797988\n}\n.order-detail .status-banner.wait-deliver .pay-icon[data-v-ff52c858]{background:url(../../../assets/icon/order_finish-deliver@3x.png) no-repeat 50%;background-size:cover\n}\n.order-detail .status-banner.wait-receive[data-v-ff52c858]{background:#29292a\n}\n.order-detail .status-banner.wait-receive .pay-icon[data-v-ff52c858]{background:url(../../../assets/icon/order_pay-finish@3x.png) no-repeat 50%;background-size:cover\n}\n.order-detail .status-banner.cancel-already[data-v-ff52c858]{background:#b5b2af\n}\n.order-detail .status-banner.cancel-already .pay-icon[data-v-ff52c858]{background:url(../../../assets/icon/order_fail@3x.png) no-repeat 50%;background-size:cover\n}\n.order-detail .icon-order_wechat-pay-s[data-v-ff52c858]{color:#41b035\n}\n.order-detail .icon-cart_alipay-l[data-v-ff52c858],.order-detail .icon-order_wechat-pay-s[data-v-ff52c858]{width:4.267vw;height:4.267vw;margin-right:1.6vw;content:"viewport-units-buggyfill; width: 4.267vw; height: 4.267vw; margin-right: 1.6vw"\n}\n.order-detail .icon-cart_alipay-l[data-v-ff52c858]{color:#3c8eef\n}\n.order-detail .footer[data-v-ff52c858]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:fixed;left:0;bottom:0;width:100vw;height:12.8vw;padding:0 4.267vw;background:#fafafa;-webkit-box-shadow:0 -1px .533vw rgba(0,0,0,.1);box-shadow:0 -1px .533vw rgba(0,0,0,.1);content:"viewport-units-buggyfill; width: 100vw; height: 12.8vw; padding: 0 4.267vw; -webkit-box-shadow: 0 -1px 0.533vw rgba(0, 0, 0, .1); box-shadow: 0 -1px 0.533vw rgba(0, 0, 0, .1)"\n}\n.order-detail .address-logo[data-v-ff52c858]{display:block;width:3.733vw;margin-right:2.133vw;content:"viewport-units-buggyfill; width: 3.733vw; margin-right: 2.133vw"\n}\n.order-detail .brand-logo[data-v-ff52c858]{display:block;width:6.4vw;height:6.4vw;margin-right:2.667vw;content:"viewport-units-buggyfill; width: 6.4vw; height: 6.4vw; margin-right: 2.667vw"\n}\n.order-detail .good-msg[data-v-ff52c858]{padding-right:4vw;content:"viewport-units-buggyfill; padding-right: 4vw"\n}\n.order-detail .good-msg .goods-name[data-v-ff52c858]{font-size:3.467vw;min-height:10.667vw;vertical-align:top;padding-bottom:2.133vw;content:"viewport-units-buggyfill; font-size: 3.467vw; min-height: 10.667vw; padding-bottom: 2.133vw"\n}\n.order-detail .goods-img[data-v-ff52c858]{display:block;width:21.867vw;height:21.867vw;margin-right:2.667vw;content:"viewport-units-buggyfill; width: 21.867vw; height: 21.867vw; margin-right: 2.667vw"\n}\n.order-detail .right-content[data-v-ff52c858]{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between\n}\n.order-detail .right-content .goods-price[data-v-ff52c858]{font-size:3.733vw;color:#f83149;content:"viewport-units-buggyfill; font-size: 3.733vw"\n}\n.order-detail .order-remark[data-v-ff52c858]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;font-size:3.2vw;margin:0 4.267vw 3.2vw;padding:1.6vw 2.133vw;color:#9898a1;background-color:#fafafa;content:"viewport-units-buggyfill; font-size: 3.2vw; margin: 0 4.267vw 3.2vw; padding: 1.6vw 2.133vw"\n}\n.order-detail .order-remark .iconNH[data-v-ff52c858]{margin-left:1.333vw;content:"viewport-units-buggyfill; margin-left: 1.333vw"\n}\n.order-detail .icon-cart_dropdown-s[data-v-ff52c858]{font-size:2.133vw!important;margin-left:1.333vw;content:"viewport-units-buggyfill; font-size: 2.133vw; margin-left: 1.333vw"\n}\n.order-detail .size-list[data-v-ff52c858]{position:relative;width:76.8vw;padding:1.333vw 2.4vw;margin-left:18.667vw;background-color:#fafafa;content:"viewport-units-buggyfill; width: 76.8vw; padding: 1.333vw 2.4vw; margin-left: 18.667vw"\n}\n.order-detail .size-list[data-v-ff52c858]:before{content:"";position:absolute;z-index:2;top:-2.133vw;left:21.333vw;border-left:2.667vw solid transparent;border-right:2.667vw solid transparent;border-bottom:2.667vw solid #fafafa\n}\n.order-detail .size-list .item[data-v-ff52c858]{display:inline-block;width:25%;text-align:center\n}\n.order-detail .refund-type-list[data-v-ff52c858]{text-align:left;background-color:#fff\n}\n.order-detail .icon-dropdown.reverse[data-v-ff52c858]{-webkit-transform:rotatex(180deg);transform:rotatex(180deg)\n}'],sourceRoot:""}])},"JEU/":function(t,e,i){t.exports=i.p+"static/img/order_pay-finish@3x.png"},Vg8H:function(t,e,i){t.exports=i.p+"static/img/order_finish-deliver@3x.png"},gApx:function(t,e,i){t.exports=i.p+"static/img/order_paying@3x.png"},gamW:function(t,e,i){e=t.exports=i("FZ+f")(!0),e.push([t.i,'\n.nf-scroll-container{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column\n}\n.nf-scroll-container .nf-scroll-view{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1\n}\n.align-center,.flex{display:-webkit-box;display:-ms-flexbox;display:flex\n}\n.align-center{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.center,.justify-center{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center\n}\n.center{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.space-between{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between\n}\n.navigation{height:11.733vw;-webkit-box-align:center;-ms-flex-align:center;align-items:center;z-index:99;padding:0 4.267vw;position:fixed;top:0;left:0;width:100%;background-color:#fff;border-bottom:.5px solid #d9d9d9;content:"viewport-units-buggyfill; height: 11.733vw; padding: 0 4.267vw"\n}\n.navigation .back{position:absolute;left:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; left: 4.267vw"\n}\n.navigation .text{text-align:center;font-size:4.8vw;line-height:11.733vw;content:"viewport-units-buggyfill; font-size: 4.8vw; line-height: 11.733vw"\n}\n.navigation .right{position:absolute;right:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; right: 4.267vw"\n}\n.order-detail .weui-cells{margin-top:2.133vw!important;content:"viewport-units-buggyfill; margin-top: 2.133vw"\n}\n.order-detail .footer .weui-btn_mini{font-size:3.2vw;min-width:21.867vw!important;content:"viewport-units-buggyfill; font-size: 3.2vw; min-width: 21.867vw"\n}\n.order-detail .good-detail{-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch\n}\n.order-detail .tag-btn.select-size-btn{background-color:#fafafa!important\n}\n.order-detail .size-list .weui-btn_mini{width:17.067vw!important;margin:1.333vw .533vw;content:"viewport-units-buggyfill; width: 17.067vw; margin: 1.333vw 0.533vw"\n}',"",{version:3,sources:["/Users/glay/IdeaProjects/hiho-mobile/src/views/mine/order/detail.vue"],names:[],mappings:";AACA,qBAAqB,oBAAoB,oBAAoB,aAAa,WAAW,YAAY,4BAA4B,6BAA6B,0BAA0B,qBAAqB;CACxM;AACD,qCAAqC,kBAAkB,mBAAmB,WAAW,MAAM;CAC1F;AACD,oBAAoB,oBAAoB,oBAAoB,YAAY;CACvE;AACD,cAAc,yBAAyB,sBAAsB,kBAAkB;CAC9E;AACD,wBAAwB,oBAAoB,oBAAoB,aAAa,wBAAwB,qBAAqB,sBAAsB;CAC/I;AACD,QAAQ,yBAAyB,sBAAsB,kBAAkB;CACxE;AACD,eAAe,oBAAoB,oBAAoB,aAAa,yBAAyB,sBAAsB,6BAA6B;CAC/I;AACD,YAAY,gBAAgB,yBAAyB,sBAAsB,mBAAmB,WAAW,kBAAkB,eAAe,MAAM,OAAO,WAAW,sBAAsB,iCAAiC,wEAAwE;CAChS;AACD,kBAAkB,kBAAkB,aAAa,QAAQ,mCAAmC,2BAA2B,iDAAiD;CACvK;AACD,kBAAkB,kBAAkB,gBAAgB,qBAAqB,2EAA2E;CACnJ;AACD,mBAAmB,kBAAkB,cAAc,QAAQ,mCAAmC,2BAA2B,kDAAkD;CAC1K;AACD,0BAA0B,6BAA6B,uDAAuD;CAC7G;AACD,qCAAqC,gBAAgB,6BAA6B,yEAAyE;CAC1J;AACD,2BAA2B,0BAA0B,uBAAuB,mBAAmB;CAC9F;AACD,uCAAuC,kCAAkC;CACxE;AACD,wCAAwC,yBAAyB,sBAAsB,4EAA4E;CAClK",file:"detail.vue",sourcesContent:['\n.nf-scroll-container{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column\n}\n.nf-scroll-container .nf-scroll-view{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1\n}\n.align-center,.flex{display:-webkit-box;display:-ms-flexbox;display:flex\n}\n.align-center{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.center,.justify-center{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center\n}\n.center{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.space-between{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between\n}\n.navigation{height:11.733vw;-webkit-box-align:center;-ms-flex-align:center;align-items:center;z-index:99;padding:0 4.267vw;position:fixed;top:0;left:0;width:100%;background-color:#fff;border-bottom:.5px solid #d9d9d9;content:"viewport-units-buggyfill; height: 11.733vw; padding: 0 4.267vw"\n}\n.navigation .back{position:absolute;left:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; left: 4.267vw"\n}\n.navigation .text{text-align:center;font-size:4.8vw;line-height:11.733vw;content:"viewport-units-buggyfill; font-size: 4.8vw; line-height: 11.733vw"\n}\n.navigation .right{position:absolute;right:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; right: 4.267vw"\n}\n.order-detail .weui-cells{margin-top:2.133vw!important;content:"viewport-units-buggyfill; margin-top: 2.133vw"\n}\n.order-detail .footer .weui-btn_mini{font-size:3.2vw;min-width:21.867vw!important;content:"viewport-units-buggyfill; font-size: 3.2vw; min-width: 21.867vw"\n}\n.order-detail .good-detail{-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch\n}\n.order-detail .tag-btn.select-size-btn{background-color:#fafafa!important\n}\n.order-detail .size-list .weui-btn_mini{width:17.067vw!important;margin:1.333vw .533vw;content:"viewport-units-buggyfill; width: 17.067vw; margin: 1.333vw 0.533vw"\n}'],sourceRoot:""}])},mv5k:function(t,e,i){var n=i("gamW");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("28419236",n,!0,{})}});
//# sourceMappingURL=13.js.map