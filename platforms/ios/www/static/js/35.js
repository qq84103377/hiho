webpackJsonp([35],{"08nV":function(t,e,i){"use strict";function n(t){i("KYgf")}Object.defineProperty(e,"__esModule",{value:!0});var a=i("Xxa5"),o=i.n(a),s=i("exGp"),r=i.n(s),l=i("3nZr"),A=i("Ty/O"),d=i("63CM"),c=(d.a,{directives:{TransferDom:d.a},name:"failedGoods",data:function(){return{show:!1,pageNum:0,failedActivityList:[]}},methods:{delAll:function(){if(0==this.failedActivityList.length)return this.$vux.toast.text("暂无失效活动");this.show=!0},onCancel:function(){this.show=!1},onConfirm:function(){var t=this,e={userId:this.$store.getters.userInfo.id},i=this;Object(l.b)(e).then(function(e){0==e.code&&(i.$vux.toast.text(e.msg),t.pageNum=1,t.$router.go(-1))})},refresh:function(t){var e=this;return r()(o.a.mark(function i(){return o.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return t(!0),e.pageNum=1,i.next=4,e.getH5GoodsList(t);case 4:case"end":return i.stop()}},i,e)}))()},infinite:function(t){var e=this;return r()(o.a.mark(function i(){return o.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return e.pageNum++,i.next=3,e.getH5GoodsList(t);case 3:case"end":return i.stop()}},i,e)}))()},getH5GoodsList:function(t){var e=this,i={userId:this.$store.getters.userInfo.id,pageSize:10,pageNum:this.pageNum,noticeFlag:"1",status:"end"};Object(A.c)(i).then(function(i){if(0===i.code){if(0==i.data.activities.length&&(1===e.pageNum&&(e.failedActivityList=[]),t))return t(!0);e.failedActivityList=1===e.pageNum?i.data.activities:e.failedActivityList.concat(i.data.activities),t&&t()}})}},created:function(){}}),b=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"failed-goods"},[i("div",{staticClass:"header posR"},[i("div",{staticClass:"fs18 text"},[t._v("已失效活动")]),t._v(" "),i("x-button",{staticClass:"btn posA",attrs:{mini:""},nativeOn:{click:function(e){return t.delAll(e)}}},[t._v("全部清除")])],1),t._v(" "),i("scroller",{staticClass:"scroller-top",attrs:{noDataText:"好货扭起来","on-refresh":t.refresh,"on-infinite":t.infinite}},[i("div",t._l(t.failedActivityList,function(e,n){return i("activity-item",{key:n,attrs:{type:"ACTIVITY",activityInfo:e}},[i("div",{attrs:{slot:"badge"},slot:"badge"},[i("div",{staticClass:"badge1 gradient-gold brown"},[t._v(t._s(e.name))])]),t._v(" "),i("div",{attrs:{slot:"countdown"},slot:"countdown"},[i("count-time",{attrs:{isEnd:"1",type:"0",time:e.endTime}})],1),t._v(" "),i("span",{attrs:{slot:"btn"},slot:"btn"},[i("x-button",{staticClass:"w82 has-radius",attrs:{mini:"",plain:"",type:"default"},nativeOn:{click:function(i){t.$router.push({path:"/activityDetail",query:{activityId:e.id,type:0}})}}},[t._v("抢购")]),t._v(" "),i("x-button",{staticClass:" has-radius",attrs:{mini:"",type:"primary"},nativeOn:{click:function(i){t.$router.push({path:"/transmitList",query:{id:e.id,type:"ACTIVITY"}})}}},[t._v("\n                    批量转发\n                ")])],1)])}))]),t._v(" "),i("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[i("confirm",{attrs:{title:"提示","dialog-transition":""},on:{"on-cancel":t.onCancel,"on-confirm":t.onConfirm},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[i("p",{staticStyle:{"text-align":"center"}},[t._v(" 是否要全部清除已失效活动？")])])],1)],1)},f=[],v={render:b,staticRenderFns:f},g=v,u=i("VU/8"),p=n,w=u(c,g,!1,p,"data-v-ed17bcba",null);e.default=w.exports},"Ci/7":function(t,e,i){e=t.exports=i("FZ+f")(!0),e.push([t.i,'\n.nf-scroll-container[data-v-ed17bcba]{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column\n}\n.nf-scroll-container .nf-scroll-view[data-v-ed17bcba]{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1\n}\n.align-center[data-v-ed17bcba],.flex[data-v-ed17bcba]{display:-webkit-box;display:-ms-flexbox;display:flex\n}\n.align-center[data-v-ed17bcba]{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.center[data-v-ed17bcba],.justify-center[data-v-ed17bcba]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center\n}\n.center[data-v-ed17bcba]{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.space-between[data-v-ed17bcba]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between\n}\n.navigation[data-v-ed17bcba]{height:11.733vw;-webkit-box-align:center;-ms-flex-align:center;align-items:center;z-index:99;padding:0 4.267vw;position:fixed;top:0;left:0;width:100%;background-color:#fff;border-bottom:.5px solid #d9d9d9;content:"viewport-units-buggyfill; height: 11.733vw; padding: 0 4.267vw"\n}\n.navigation .back[data-v-ed17bcba]{position:absolute;left:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; left: 4.267vw"\n}\n.navigation .text[data-v-ed17bcba]{text-align:center;font-size:4.8vw;line-height:11.733vw;content:"viewport-units-buggyfill; font-size: 4.8vw; line-height: 11.733vw"\n}\n.navigation .right[data-v-ed17bcba]{position:absolute;right:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; right: 4.267vw"\n}\n.failed-goods .header[data-v-ed17bcba]{height:12vw;text-align:center;line-height:12vw;background-color:#fff;border-bottom:.5px solid #d9d9d9;content:"viewport-units-buggyfill; height: 12vw; line-height: 12vw"\n}\n.failed-goods .header .text[data-v-ed17bcba]{font-weight:520\n}\n.failed-goods .header .weui-btn[data-v-ed17bcba]:after{border:none\n}\n.failed-goods .header .btn[data-v-ed17bcba]{top:2.133vw;padding:0;right:4vw;border:none!important;background-color:#fff;-webkit-box-shadow:0!important;box-shadow:0!important;content:"viewport-units-buggyfill; top: 2.133vw; right: 4vw"\n}\n.failed-goods .scroller-top[data-v-ed17bcba]{top:12vw;content:"viewport-units-buggyfill; top: 12vw"\n}',"",{version:3,sources:["/Users/glay/IdeaProjects/hiho-mobile/src/views/follow/components/failedActivity.vue"],names:[],mappings:";AACA,sCAAsC,oBAAoB,oBAAoB,aAAa,WAAW,YAAY,4BAA4B,6BAA6B,0BAA0B,qBAAqB;CACzN;AACD,sDAAsD,kBAAkB,mBAAmB,WAAW,MAAM;CAC3G;AACD,sDAAsD,oBAAoB,oBAAoB,YAAY;CACzG;AACD,+BAA+B,yBAAyB,sBAAsB,kBAAkB;CAC/F;AACD,0DAA0D,oBAAoB,oBAAoB,aAAa,wBAAwB,qBAAqB,sBAAsB;CACjL;AACD,yBAAyB,yBAAyB,sBAAsB,kBAAkB;CACzF;AACD,gCAAgC,oBAAoB,oBAAoB,aAAa,yBAAyB,sBAAsB,6BAA6B;CAChK;AACD,6BAA6B,gBAAgB,yBAAyB,sBAAsB,mBAAmB,WAAW,kBAAkB,eAAe,MAAM,OAAO,WAAW,sBAAsB,iCAAiC,wEAAwE;CACjT;AACD,mCAAmC,kBAAkB,aAAa,QAAQ,mCAAmC,2BAA2B,iDAAiD;CACxL;AACD,mCAAmC,kBAAkB,gBAAgB,qBAAqB,2EAA2E;CACpK;AACD,oCAAoC,kBAAkB,cAAc,QAAQ,mCAAmC,2BAA2B,kDAAkD;CAC3L;AACD,uCAAuC,YAAY,kBAAkB,iBAAiB,sBAAsB,iCAAiC,mEAAmE;CAC/M;AACD,6CAA6C,eAAe;CAC3D;AACD,uDAAuD,WAAW;CACjE;AACD,4CAA4C,YAAY,UAAU,UAAU,sBAAsB,sBAAsB,+BAA+B,uBAAuB,4DAA4D;CACzO;AACD,6CAA6C,SAAS,6CAA6C;CAClG",file:"failedActivity.vue",sourcesContent:['\n.nf-scroll-container[data-v-ed17bcba]{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column\n}\n.nf-scroll-container .nf-scroll-view[data-v-ed17bcba]{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1\n}\n.align-center[data-v-ed17bcba],.flex[data-v-ed17bcba]{display:-webkit-box;display:-ms-flexbox;display:flex\n}\n.align-center[data-v-ed17bcba]{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.center[data-v-ed17bcba],.justify-center[data-v-ed17bcba]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center\n}\n.center[data-v-ed17bcba]{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.space-between[data-v-ed17bcba]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between\n}\n.navigation[data-v-ed17bcba]{height:11.733vw;-webkit-box-align:center;-ms-flex-align:center;align-items:center;z-index:99;padding:0 4.267vw;position:fixed;top:0;left:0;width:100%;background-color:#fff;border-bottom:.5px solid #d9d9d9;content:"viewport-units-buggyfill; height: 11.733vw; padding: 0 4.267vw"\n}\n.navigation .back[data-v-ed17bcba]{position:absolute;left:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; left: 4.267vw"\n}\n.navigation .text[data-v-ed17bcba]{text-align:center;font-size:4.8vw;line-height:11.733vw;content:"viewport-units-buggyfill; font-size: 4.8vw; line-height: 11.733vw"\n}\n.navigation .right[data-v-ed17bcba]{position:absolute;right:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; right: 4.267vw"\n}\n.failed-goods .header[data-v-ed17bcba]{height:12vw;text-align:center;line-height:12vw;background-color:#fff;border-bottom:.5px solid #d9d9d9;content:"viewport-units-buggyfill; height: 12vw; line-height: 12vw"\n}\n.failed-goods .header .text[data-v-ed17bcba]{font-weight:520\n}\n.failed-goods .header .weui-btn[data-v-ed17bcba]:after{border:none\n}\n.failed-goods .header .btn[data-v-ed17bcba]{top:2.133vw;padding:0;right:4vw;border:none!important;background-color:#fff;-webkit-box-shadow:0!important;box-shadow:0!important;content:"viewport-units-buggyfill; top: 2.133vw; right: 4vw"\n}\n.failed-goods .scroller-top[data-v-ed17bcba]{top:12vw;content:"viewport-units-buggyfill; top: 12vw"\n}'],sourceRoot:""}])},KYgf:function(t,e,i){var n=i("Ci/7");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("826aec34",n,!0,{})}});
//# sourceMappingURL=35.js.map