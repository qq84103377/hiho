webpackJsonp([28],{"B5+q":function(t,e,n){var i=n("y2Rx");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("2422b652",i,!1,{})},hVxu:function(t,e,n){var i=n("ouez");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("463e34ee",i,!1,{})},ouez:function(t,e,n){e=t.exports=n("FZ+f")(!1),e.push([t.i,'\n.nf-scroll-container{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column\n}\n.nf-scroll-container .nf-scroll-view{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1\n}\n.align-center,.flex{display:-webkit-box;display:-ms-flexbox;display:flex\n}\n.align-center{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.center,.justify-center{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center\n}\n.center{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.space-between{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between\n}\n.navigation{height:11.733vw;-webkit-box-align:center;-ms-flex-align:center;align-items:center;z-index:99;padding:0 4.267vw;position:fixed;top:0;left:0;width:100%;background-color:#fff;border-bottom:.5px solid #d9d9d9;content:"viewport-units-buggyfill; height: 11.733vw; padding: 0 4.267vw"\n}\n.navigation .back{position:absolute;left:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; left: 4.267vw"\n}\n.navigation .text{text-align:center;font-size:4.8vw;line-height:11.733vw;content:"viewport-units-buggyfill; font-size: 4.8vw; line-height: 11.733vw"\n}\n.navigation .right{position:absolute;right:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; right: 4.267vw"\n}\n.mine-address-list{background-color:#ececec\n}\n.mine-address-list .cell-title{font-weight:500\n}\n.mine-address-list .cell-title .default{margin-left:4vw;background-color:#f3d198;padding:.8vw 1.333vw;content:"viewport-units-buggyfill; margin-left: 4vw; padding: 0.8vw 1.333vw"\n}\n.mine-address-list .vux-cell-primary{padding-right:8.8vw;content:"viewport-units-buggyfill; padding-right: 8.8vw"\n}\n.mine-address-list .vux-label{margin-bottom:1.333vw;content:"viewport-units-buggyfill; margin-bottom: 1.333vw"\n}\n.mine-address-list .weui-btn_mini{display:block;font-size:2.667vw!important;padding:0;width:18.133vw;content:"viewport-units-buggyfill; font-size: 2.667vw; width: 18.133vw"\n}\n.mine-address-list .weui-btn+.weui-btn{margin-top:1.6vw!important;content:"viewport-units-buggyfill; margin-top: 1.6vw"\n}',""])},u8Oa:function(t,e,n){"use strict";function i(t){v||(n("hVxu"),n("B5+q"))}Object.defineProperty(e,"__esModule",{value:!0});var s=n("Xxa5"),a=n.n(s),r=n("exGp"),o=n.n(r),l=n("5Qen"),d={name:"mineAddressList",data:function(){return{form:[],msg:!1,text:"",pageNum:0}},methods:{refresh:function(t){var e=this;return o()(a.a.mark(function n(){return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t(!0),e.pageNum=1,n.next=4,e.getAddressList(t);case 4:case"end":return n.stop()}},n,e)}))()},infinite:function(t){var e=this;return o()(a.a.mark(function n(){return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return e.pageNum++,n.next=3,e.getAddressList(t);case 3:case"end":return n.stop()}},n,e)}))()},getAddressList:function(t){var e=this,n={userId:this.$store.getters.userInfo.id,pageSize:100,pageNum:this.pageNum};Object(l.d)(n).then(function(n){if(0===n.code){if(0==n.data.userAddress.length&&(1===e.pageNum&&(e.form=[]),t))return t(!0);if(e.form=1===e.pageNum?n.data.userAddress:e.form.concat(n.data.userAddress),t)return t();console.log("我的地址"+e.pageNum+"页"),console.log(e.form.length,n.data.totalCount)}})},setDefault:function(t){var e=this,n={userId:this.$store.getters.userInfo.id,userAddressId:t};Object(l.C)(n).then(function(t){e.$vux.toast.text(t.msg),e.pageNum=1,e.getAddressList()})}},activated:function(){this.pageNum=1,this.getAddressList()},created:function(){}},c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mine-address-list custom-body"},[n("div",{staticClass:"main-content"},[n("scroller",{ref:"hot",attrs:{noDataText:"好货扭起来","on-refresh":t.refresh,"on-infinite":t.infinite}},[n("div",[n("group",{staticClass:"mgb8"},t._l(t.form,function(e,i){return n("cell",{key:i},[n("div",{staticClass:"black cell-title fs16",attrs:{slot:"title"},slot:"title"},[n("span",[t._v(t._s(e.receiverName))]),t._v("  "),n("span",[t._v(t._s(e.phone))]),n("span",{directives:[{name:"show",rawName:"v-show",value:1==e.isDefault,expression:"item.isDefault == 1"}],staticClass:"fs10 default"},[t._v("默认地址")])]),t._v(" "),n("div",{attrs:{slot:"inline-desc"},slot:"inline-desc"},[n("span",{staticClass:"fs10"},[t._v(t._s(e.address))])]),t._v(" "),n("div",{attrs:{slot:""},slot:"default"},[n("x-button",{directives:[{name:"show",rawName:"v-show",value:0==e.isDefault,expression:"item.isDefault == 0"}],staticClass:"fs10",attrs:{type:"primary",mini:""},nativeOn:{click:function(n){t.setDefault(e.userAddressId)}}},[t._v("设为默认\n                            ")]),t._v(" "),n("x-button",{staticClass:"fs10",attrs:{mini:""},nativeOn:{click:function(n){t.$router.push({path:"/mine/addressEdit",query:{type:"edit",id:e.userAddressId}})}}},[t._v("编 辑\n                            ")])],1)])}))],1)])],1),t._v(" "),n("div",{staticClass:"footer"},[n("x-button",{staticClass:"full-btn",attrs:{type:"primary"},nativeOn:{click:function(e){t.$router.push("/mine/addressEdit?type=add")}}},[t._v("+ 新增地址\n        ")])],1)])},u=[];c._withStripped=!0;var f={render:c,staticRenderFns:u},p=f,v=!1,g=n("VU/8"),m=i,w=g(d,p,!1,m,"data-v-49b43df5",null);w.options.__file="src/views/mine/address/addressList.vue";e.default=w.exports},y2Rx:function(t,e,n){e=t.exports=n("FZ+f")(!1),e.push([t.i,"",""])}});
//# sourceMappingURL=28.js.map