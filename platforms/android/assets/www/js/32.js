webpackJsonp([32],{C8wo:function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,'\n.nf-scroll-container[data-v-009f8816]{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column\n}\n.nf-scroll-container .nf-scroll-view[data-v-009f8816]{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1\n}\n.align-center[data-v-009f8816],.flex[data-v-009f8816]{display:-webkit-box;display:-ms-flexbox;display:flex\n}\n.align-center[data-v-009f8816]{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.center[data-v-009f8816],.justify-center[data-v-009f8816]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center\n}\n.center[data-v-009f8816]{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.space-between[data-v-009f8816]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between\n}\n.navigation[data-v-009f8816]{height:11.733vw;-webkit-box-align:center;-ms-flex-align:center;align-items:center;z-index:99;padding:0 4.267vw;position:fixed;top:0;left:0;width:100%;background-color:#fff;border-bottom:.5px solid #d9d9d9;content:"viewport-units-buggyfill; height: 11.733vw; padding: 0 4.267vw"\n}\n.navigation .back[data-v-009f8816]{position:absolute;left:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; left: 4.267vw"\n}\n.navigation .text[data-v-009f8816]{text-align:center;font-size:4.8vw;line-height:11.733vw;content:"viewport-units-buggyfill; font-size: 4.8vw; line-height: 11.733vw"\n}\n.navigation .right[data-v-009f8816]{position:absolute;right:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; right: 4.267vw"\n}\n.sales-performance[data-v-009f8816]{padding-top:4.267vw;content:"viewport-units-buggyfill; padding-top: 4.267vw"\n}\n.sales-performance .header .year[data-v-009f8816]{color:#fff;height:12.267vw;line-height:12.267vw;padding-left:9.067vw;content:"viewport-units-buggyfill; height: 12.267vw; line-height: 12.267vw; padding-left: 9.067vw"\n}\n.sales-performance .header .header-text[data-v-009f8816]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center\n}\n.sales-performance .header .header-text .money[data-v-009f8816]{font-size:8.533vw;color:#fff;height:8.533vw;margin-top:2.133vw;line-height:8.533vw;content:"viewport-units-buggyfill; font-size: 8.533vw; height: 8.533vw; margin-top: 2.133vw; line-height: 8.533vw"\n}\n.sales-performance .mg[data-v-009f8816]{margin-left:1.6vw;margin-bottom:.8vw;display:inline-block;content:"viewport-units-buggyfill; margin-left: 1.6vw; margin-bottom: 0.8vw"\n}\n.sales-performance .border_up[data-v-009f8816]{border-width:0 .8vw 1.067vw;border-style:solid;border-color:transparent transparent #fff;content:"viewport-units-buggyfill; border-width: 0 0.8vw 1.067vw"\n}\n.sales-performance .border_down[data-v-009f8816]{border-width:1.067vw .8vw 0;border-style:solid;border-color:#fff transparent transparent ;content:"viewport-units-buggyfill; border-width: 1.067vw 0.8vw 0"\n}',""])},MFU0:function(t,e,i){var n=i("C8wo");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("7119f89a",n,!1,{})},N6Bj:function(t,e,i){"use strict";function n(t){f||(i("MFU0"),i("UFco"))}Object.defineProperty(e,"__esModule",{value:!0});var a=i("5Qen"),o=i("63CM"),l=(o.a,{directives:{TransferDom:o.a},data:function(){return{list:[],detailList:[],detail:{},iconShow:!1,detailShow:!1,date:(new Date).getFullYear(),curIndex:0,preText:"",nextText:"",monthAmount:0}},methods:{getYearSalesPerformance:function(){var t=this,e={userId:this.$store.getters.userInfo.id,year:this.date};this.$vux.loading.show(),Object(a.s)(e).then(function(e){t.list=e.data,t.$vux.loading.hide()})},getMonthSalesPerformance:function(t,e){var i=this,n={userId:this.$store.getters.userInfo.id,month:t};this.detail={year:t.split("-")[0],month:t.split("-")[1]},this.monthAmount=e,this.$vux.loading.show(),Object(a.n)(n).then(function(t){i.detailList=t.data.monthDetail,i.$vux.loading.hide()})},dateShow:function(){this.iconShow=!this.iconShow;var t=this;this.$vux.datetime.show({cancelText:"取消",confirmText:"确定",format:"YYYY",onConfirm:function(e){t.$nextTick(function(){t.date=e,t.getYearSalesPerformance()}),t.iconShow=!t.iconShow},onHide:function(){t.iconShow=!t.iconShow}})},getDetail:function(t,e,i){this.curIndex=t,console.log(this.curIndex),this.getMonthSalesPerformance(e,i),this.detailShow=!0},next:function(t){if(1===t)return this.detailShow=!1;this.curIndex=-1===t?this.curIndex-1:this.curIndex+1,console.log(this.curIndex),console.log(this.list.yearDetail[this.curIndex].month),this.getMonthSalesPerformance(this.list.yearDetail[this.curIndex].month,this.list.yearDetail[this.curIndex].monthAmount)}},created:function(){this.getYearSalesPerformance()}}),s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"sales-performance white-bg"},[i("div",{staticClass:"header icon-sale-report"},[i("div",{staticClass:"year fs14",on:{click:t.dateShow}},[t._v(t._s(t.date)+" 年"),i("span",{class:[t.iconShow?"border_up":"border_down","mg"]})]),t._v(" "),i("div",{staticClass:"header-text"},[i("span",{staticClass:"fs14 blue-gray"},[t._v("总销售额（元）")]),t._v(" "),i("span",{staticClass:"money"},[t._v(t._s(t.list.yearAmount))])])]),t._v(" "),i("group",t._l(t.list.yearDetail,function(e,n){return i("cell",{key:n,attrs:{"is-link":""},nativeOn:{click:function(i){t.getDetail(n,e.month,e.monthAmount)}}},[i("div",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.month))]),t._v(" "),i("div",{attrs:{slot:"value"},slot:"value"},[t._v("￥"+t._s(e.monthAmount))])])})),t._v(" "),i("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[i("x-dialog",{staticClass:"detail-dialog",attrs:{"dialog-transition":"","mask-transition":"","hide-on-blur":!0},model:{value:t.detailShow,callback:function(e){t.detailShow=e},expression:"detailShow"}},[i("div",{staticClass:"icon-sale-detail box"},[i("div",{staticClass:"date"},[i("span",{staticClass:"fs12 small-text"},[t._v(t._s(t.detail.year)+"年")]),t._v(" "),i("span",{staticClass:"key fs30"},[t._v(t._s(t.detail.month)+"月")])]),t._v(" "),i("span",{staticClass:"line"}),t._v(" "),i("div",{staticClass:"dialog-text"},[i("span",{staticClass:"fs12 small-text"},[t._v("销售额（元）")]),t._v(" "),i("span",{staticClass:"key"},[t._v(t._s(t.monthAmount))])])]),t._v(" "),i("group",{staticClass:"main"},t._l(t.detailList,function(e,n){return i("cell",{key:n},[i("div",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.userName))]),t._v(" "),i("div",{attrs:{slot:"value"},slot:"value"},[t._v("￥"+t._s(e.monthAmount))])])})),t._v(" "),i("div",{staticClass:"footer"},[i("x-button",{staticClass:"mgr8",attrs:{disabled:this.curIndex<=0},nativeOn:{click:function(e){t.next(-1)}}},[t._v("上一月")]),t._v(" "),this.curIndex+1>=(this.list.yearDetail&&this.list.yearDetail.length)?i("x-button",{attrs:{type:"primary"},nativeOn:{click:function(e){t.next(1)}}},[t._v("完成")]):t._e(),t._v(" "),this.curIndex+1<(this.list.yearDetail&&this.list.yearDetail.length)?i("x-button",{attrs:{type:"primary"},nativeOn:{click:function(e){return t.next(e)}}},[t._v("下一月")]):t._e()],1)],1)],1)],1)},r=[];s._withStripped=!0;var d={render:s,staticRenderFns:r},c=d,f=!1,w=i("VU/8"),v=n,g=w(l,c,!1,v,"data-v-009f8816",null);g.options.__file="src/views/mine/salesPerformance.vue";e.default=g.exports},RrnE:function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,'\n.nf-scroll-container{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column\n}\n.nf-scroll-container .nf-scroll-view{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1\n}\n.align-center,.flex{display:-webkit-box;display:-ms-flexbox;display:flex\n}\n.align-center{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.center,.justify-center{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center\n}\n.center{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.space-between{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between\n}\n.navigation{height:11.733vw;-webkit-box-align:center;-ms-flex-align:center;align-items:center;z-index:99;padding:0 4.267vw;position:fixed;top:0;left:0;width:100%;background-color:#fff;border-bottom:.5px solid #d9d9d9;content:"viewport-units-buggyfill; height: 11.733vw; padding: 0 4.267vw"\n}\n.navigation .back{position:absolute;left:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; left: 4.267vw"\n}\n.navigation .text{text-align:center;font-size:4.8vw;line-height:11.733vw;content:"viewport-units-buggyfill; font-size: 4.8vw; line-height: 11.733vw"\n}\n.navigation .right{position:absolute;right:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; right: 4.267vw"\n}\n.sales-performance .weui-cells:after,.sales-performance .weui-cells:before{border:none!important\n}\n.sales-performance .weui-cell__ft{color:#3c8eef;font-size:4.267vw!important;content:"viewport-units-buggyfill; font-size: 4.267vw"\n}\n.detail-dialog .weui-dialog{width:100%;max-width:86.667vw;height:138.667vw;content:"viewport-units-buggyfill; max-width: 86.667vw; height: 138.667vw"\n}\n.detail-dialog .weui-dialog .box{width:86.667vw;display:-webkit-box;display:-ms-flexbox;display:flex;padding-left:6.4vw;padding-top:6.4vw;content:"viewport-units-buggyfill; width: 86.667vw; padding-left: 6.4vw; padding-top: 6.4vw"\n}\n.detail-dialog .weui-dialog .box .line{background-color:#29292a;opacity:.3;height:11.2vw;width:.533vw;display:inline-block;margin:3.2vw 6.4vw 0;content:"viewport-units-buggyfill; height: 11.2vw; width: 0.533vw; margin: 3.2vw 6.4vw 0"\n}\n.detail-dialog .weui-dialog .box .date .small-text,.detail-dialog .weui-dialog .box .dialog-text .small-text{height:7.467vw;line-height:7.467vw;display:block;content:"viewport-units-buggyfill; height: 7.467vw; line-height: 7.467vw"\n}\n.detail-dialog .weui-dialog .box .date .key,.detail-dialog .weui-dialog .box .dialog-text .key{font-size:8.533vw;height:8.533vw;line-height:8.533vw;color:#29292a;display:block;font-weight:500;content:"viewport-units-buggyfill; font-size: 8.533vw; height: 8.533vw; line-height: 8.533vw"\n}\n.detail-dialog .weui-dialog .main{height:94.133vw;content:"viewport-units-buggyfill; height: 94.133vw"\n}\n.detail-dialog .weui-dialog .footer{display:-webkit-box;display:-ms-flexbox;display:flex;padding:4vw 6.4vw;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;content:"viewport-units-buggyfill; padding: 4vw 6.4vw"\n}\n.detail-dialog .weui-dialog .footer .weui-btn{width:35.733vw;height:11.2vw;font-size:3.733vw;content:"viewport-units-buggyfill; width: 35.733vw; height: 11.2vw; font-size: 3.733vw"\n}\n.detail-dialog .weui-dialog .footer .weui-btn_default{color:#9898a1\n}\n.detail-dialog .weui-dialog .weui-cells:before{border:none!important\n}\n.detail-dialog .weui-dialog .vux-label{text-align:left\n}\n.detail-dialog .weui-dialog .weui-cell__ft{color:#3c8eef;font-size:4.267vw!important;content:"viewport-units-buggyfill; font-size: 4.267vw"\n}',""])},UFco:function(t,e,i){var n=i("RrnE");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("7b25185c",n,!1,{})}});
//# sourceMappingURL=32.js.map