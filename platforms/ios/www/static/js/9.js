webpackJsonp([9],{Ajz9:function(t,e,i){var n=i("hAv0");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("914c6610",n,!0,{})},BoH8:function(t,e,i){"use strict";function n(t){i("Ajz9"),i("uIHi")}Object.defineProperty(e,"__esModule",{value:!0});var o=i("63CM"),a=(o.a,{name:"customerService",directives:{TransferDom:o.a},data:function(){return{telShow:!1,detailList:[{title:"售前客服",name:"扭货售前客服",wx:"niuhuokefu001",code:i("N7ZE")},{title:"售后客服",name:"扭货售后客服1",wx:"niuhuokefu002",code:i("Ly47")},{name:"扭货售后客服2",wx:"niuhuokefu003",code:i("YIZZ")}]}},methods:{copy:function(t){var e=document.getElementById("text"+t);e.focus(),e.setSelectionRange(0,e.value.length),document.execCommand("copy",!1,null),this.$vux.toast.text("复制成功")},getTel:function(){this.telShow=!0}}}),A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"customer-service"},[n("div",{staticClass:"navigation"},[n("div",{staticClass:"icon-back back posA",on:{click:function(e){e.stopPropagation(),t.$router.go(-1)}}}),t._v(" "),n("div",{staticClass:"fs16 text"},[t._v("咨询客服")])]),t._v(" "),t._l(t.detailList,function(e,o){return n("div",{key:o,staticClass:"content"},[e.title?n("div",{staticClass:"title fs20"},[t._v(t._s(e.title))]):t._e(),t._v(" "),n("div",{class:["box",0==o?"icon-pre-sale":"icon-after-sale"]},[n("div",{staticClass:"box-top"},[n("img",{attrs:{src:i("X3Yl"),alt:""}}),t._v(" "),n("span",{staticClass:"name"},[t._v(t._s(e.name))])]),t._v(" "),n("div",{staticClass:"box-bottom"},[n("div",[n("p",{staticClass:"fs16 black wx"},[t._v("微信："),n("textarea",{staticClass:"fs16 textarea",attrs:{name:"text",id:"text"+o,readonly:"readonly"}},[t._v(t._s(e.wx))])]),t._v(" "),n("p",{staticClass:"btn fs12"},[n("button",{on:{click:function(e){t.copy(o)}}},[t._v("复制微信号")])])]),t._v(" "),n("div",{staticClass:"code"},[n("img",{attrs:{src:e.code,alt:""}}),t._v(" "),n("p",{staticClass:"fs12 black"},[t._v("扫一扫，添加微信")])])])])])}),t._v(" "),n("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[n("x-dialog",{staticClass:"tel-dialog",attrs:{"mask-transition":"","dialog-transition":"","hide-on-blur":!0},model:{value:t.telShow,callback:function(e){t.telShow=e},expression:"telShow"}},[n("div",{staticClass:"box"},[n("div",{staticClass:"fs18 black title"},[t._v("致电客服")]),t._v(" "),n("div",{staticClass:"tel blue"},[t._v("131 6710 7634")]),t._v(" "),n("div",{staticClass:"footer"},[n("a",{staticClass:"cancel balck fs14",on:{click:function(e){t.telShow=!1}}},[t._v("取消")]),t._v(" "),n("a",{staticClass:"fs14 dial",attrs:{href:"tel://13167107634"}},[t._v("拨打")])])])])],1)],2)},l=[],s={render:A,staticRenderFns:l},c=s,r=i("VU/8"),b=n,v=r(a,c,!1,b,"data-v-578cbbf6",null);e.default=v.exports},Ly47:function(t,e,i){t.exports=i.p+"static/img/after-code1.png"},N7ZE:function(t,e,i){t.exports=i.p+"static/img/pre-code.png"},X3Yl:function(t,e,i){t.exports=i.p+"static/img/login_logo@3x.png"},YIZZ:function(t,e,i){t.exports=i.p+"static/img/after-code2.png"},apOm:function(t,e,i){e=t.exports=i("FZ+f")(!0),e.push([t.i,'\n.nf-scroll-container[data-v-578cbbf6]{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column\n}\n.nf-scroll-container .nf-scroll-view[data-v-578cbbf6]{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1\n}\n.align-center[data-v-578cbbf6],.flex[data-v-578cbbf6]{display:-webkit-box;display:-ms-flexbox;display:flex\n}\n.align-center[data-v-578cbbf6]{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.center[data-v-578cbbf6],.justify-center[data-v-578cbbf6]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center\n}\n.center[data-v-578cbbf6]{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.space-between[data-v-578cbbf6]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between\n}\n.navigation[data-v-578cbbf6]{height:11.733vw;-webkit-box-align:center;-ms-flex-align:center;align-items:center;z-index:99;padding:0 4.267vw;position:fixed;top:0;left:0;width:100%;background-color:#fff;border-bottom:.5px solid #d9d9d9;content:"viewport-units-buggyfill; height: 11.733vw; padding: 0 4.267vw"\n}\n.navigation .back[data-v-578cbbf6]{position:absolute;left:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; left: 4.267vw"\n}\n.navigation .text[data-v-578cbbf6]{text-align:center;font-size:4.8vw;line-height:11.733vw;content:"viewport-units-buggyfill; font-size: 4.8vw; line-height: 11.733vw"\n}\n.navigation .right[data-v-578cbbf6]{position:absolute;right:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; right: 4.267vw"\n}\n.customer-service[data-v-578cbbf6]{padding-top:11.467vw;content:"viewport-units-buggyfill; padding-top: 11.467vw"\n}\n.customer-service .content[data-v-578cbbf6]{vertical-align:middle\n}\n.customer-service .content .title[data-v-578cbbf6]{height:10.133vw;padding:0 4.267vw;line-height:10.133vw;font-weight:600;content:"viewport-units-buggyfill; height: 10.133vw; padding: 0 4.267vw; line-height: 10.133vw"\n}\n.customer-service .content .box[data-v-578cbbf6]{padding:17.6vw 10.667vw 0;margin-top:-10.133vw;content:"viewport-units-buggyfill; padding: 17.6vw 10.667vw 0; margin-top: -10.133vw"\n}\n.customer-service .content .box .box-top[data-v-578cbbf6]{height:12.267vw;line-height:12.267vw;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:column;-ms-flex-pack:column;justify-content:column;vertical-align:middle;content:"viewport-units-buggyfill; height: 12.267vw; line-height: 12.267vw"\n}\n.customer-service .content .box .box-top img[data-v-578cbbf6]{width:12.267vw;height:12.267vw;border-radius:2.667vw;margin-right:3.2vw;content:"viewport-units-buggyfill; width: 12.267vw; height: 12.267vw; border-radius: 2.667vw; margin-right: 3.2vw"\n}\n.customer-service .content .box .box-top .name[data-v-578cbbf6]{font-weight:700\n}\n.customer-service .content .box .box-bottom[data-v-578cbbf6]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end\n}\n.customer-service .content .box .box-bottom .wx[data-v-578cbbf6]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:column;-ms-flex-pack:column;justify-content:column;height:9.6vw;line-height:9.6vw;color:#29292a;content:"viewport-units-buggyfill; height: 9.6vw; line-height: 9.6vw"\n}\n.customer-service .content .box .box-bottom .wx .textarea[data-v-578cbbf6]{width:38.667vw;height:9.6vw;line-height:9.6vw;content:"viewport-units-buggyfill; width: 38.667vw; height: 9.6vw; line-height: 9.6vw"\n}\n.customer-service .content .box .box-bottom .btn[data-v-578cbbf6]{padding:2.4vw 0;background-color:#f4f4fa;color:#797988;border-radius:4vw;width:23.467vw;text-align:center;content:"viewport-units-buggyfill; padding: 2.4vw 0; border-radius: 4vw; width: 23.467vw"\n}\n.customer-service .content .box .box-bottom .code[data-v-578cbbf6]{text-align:right\n}\n.customer-service .content .box .box-bottom .code img[data-v-578cbbf6]{width:23.467vw;height:23.467vw;content:"viewport-units-buggyfill; width: 23.467vw; height: 23.467vw"\n}',"",{version:3,sources:["/Users/glay/IdeaProjects/hiho-mobile/src/views/mine/customerService.vue"],names:[],mappings:";AACA,sCAAsC,oBAAoB,oBAAoB,aAAa,WAAW,YAAY,4BAA4B,6BAA6B,0BAA0B,qBAAqB;CACzN;AACD,sDAAsD,kBAAkB,mBAAmB,WAAW,MAAM;CAC3G;AACD,sDAAsD,oBAAoB,oBAAoB,YAAY;CACzG;AACD,+BAA+B,yBAAyB,sBAAsB,kBAAkB;CAC/F;AACD,0DAA0D,oBAAoB,oBAAoB,aAAa,wBAAwB,qBAAqB,sBAAsB;CACjL;AACD,yBAAyB,yBAAyB,sBAAsB,kBAAkB;CACzF;AACD,gCAAgC,oBAAoB,oBAAoB,aAAa,yBAAyB,sBAAsB,6BAA6B;CAChK;AACD,6BAA6B,gBAAgB,yBAAyB,sBAAsB,mBAAmB,WAAW,kBAAkB,eAAe,MAAM,OAAO,WAAW,sBAAsB,iCAAiC,wEAAwE;CACjT;AACD,mCAAmC,kBAAkB,aAAa,QAAQ,mCAAmC,2BAA2B,iDAAiD;CACxL;AACD,mCAAmC,kBAAkB,gBAAgB,qBAAqB,2EAA2E;CACpK;AACD,oCAAoC,kBAAkB,cAAc,QAAQ,mCAAmC,2BAA2B,kDAAkD;CAC3L;AACD,mCAAmC,qBAAqB,yDAAyD;CAChH;AACD,4CAA4C,qBAAqB;CAChE;AACD,mDAAmD,gBAAgB,kBAAkB,qBAAqB,gBAAgB,+FAA+F;CACxN;AACD,iDAAiD,0BAA0B,qBAAqB,qFAAqF;CACpL;AACD,0DAA0D,gBAAgB,qBAAqB,oBAAoB,oBAAoB,aAAa,wBAAwB,qBAAqB,uBAAuB,sBAAsB,2EAA2E;CACxT;AACD,8DAA8D,eAAe,gBAAgB,sBAAsB,mBAAmB,kHAAkH;CACvP;AACD,gEAAgE,eAAe;CAC9E;AACD,6DAA6D,oBAAoB,oBAAoB,aAAa,yBAAyB,sBAAsB,8BAA8B,sBAAsB,mBAAmB,oBAAoB;CAC3P;AACD,iEAAiE,oBAAoB,oBAAoB,aAAa,wBAAwB,qBAAqB,uBAAuB,aAAa,kBAAkB,cAAc,qEAAqE;CAC3S;AACD,2EAA2E,eAAe,aAAa,kBAAkB,sFAAsF;CAC9M;AACD,kEAAkE,gBAAgB,yBAAyB,cAAc,kBAAkB,eAAe,kBAAkB,yFAAyF;CACpQ;AACD,mEAAmE,gBAAgB;CAClF;AACD,uEAAuE,eAAe,gBAAgB,qEAAqE;CAC1K",file:"customerService.vue",sourcesContent:['\n.nf-scroll-container[data-v-578cbbf6]{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column\n}\n.nf-scroll-container .nf-scroll-view[data-v-578cbbf6]{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1\n}\n.align-center[data-v-578cbbf6],.flex[data-v-578cbbf6]{display:-webkit-box;display:-ms-flexbox;display:flex\n}\n.align-center[data-v-578cbbf6]{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.center[data-v-578cbbf6],.justify-center[data-v-578cbbf6]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center\n}\n.center[data-v-578cbbf6]{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.space-between[data-v-578cbbf6]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between\n}\n.navigation[data-v-578cbbf6]{height:11.733vw;-webkit-box-align:center;-ms-flex-align:center;align-items:center;z-index:99;padding:0 4.267vw;position:fixed;top:0;left:0;width:100%;background-color:#fff;border-bottom:.5px solid #d9d9d9;content:"viewport-units-buggyfill; height: 11.733vw; padding: 0 4.267vw"\n}\n.navigation .back[data-v-578cbbf6]{position:absolute;left:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; left: 4.267vw"\n}\n.navigation .text[data-v-578cbbf6]{text-align:center;font-size:4.8vw;line-height:11.733vw;content:"viewport-units-buggyfill; font-size: 4.8vw; line-height: 11.733vw"\n}\n.navigation .right[data-v-578cbbf6]{position:absolute;right:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; right: 4.267vw"\n}\n.customer-service[data-v-578cbbf6]{padding-top:11.467vw;content:"viewport-units-buggyfill; padding-top: 11.467vw"\n}\n.customer-service .content[data-v-578cbbf6]{vertical-align:middle\n}\n.customer-service .content .title[data-v-578cbbf6]{height:10.133vw;padding:0 4.267vw;line-height:10.133vw;font-weight:600;content:"viewport-units-buggyfill; height: 10.133vw; padding: 0 4.267vw; line-height: 10.133vw"\n}\n.customer-service .content .box[data-v-578cbbf6]{padding:17.6vw 10.667vw 0;margin-top:-10.133vw;content:"viewport-units-buggyfill; padding: 17.6vw 10.667vw 0; margin-top: -10.133vw"\n}\n.customer-service .content .box .box-top[data-v-578cbbf6]{height:12.267vw;line-height:12.267vw;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:column;-ms-flex-pack:column;justify-content:column;vertical-align:middle;content:"viewport-units-buggyfill; height: 12.267vw; line-height: 12.267vw"\n}\n.customer-service .content .box .box-top img[data-v-578cbbf6]{width:12.267vw;height:12.267vw;border-radius:2.667vw;margin-right:3.2vw;content:"viewport-units-buggyfill; width: 12.267vw; height: 12.267vw; border-radius: 2.667vw; margin-right: 3.2vw"\n}\n.customer-service .content .box .box-top .name[data-v-578cbbf6]{font-weight:700\n}\n.customer-service .content .box .box-bottom[data-v-578cbbf6]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end\n}\n.customer-service .content .box .box-bottom .wx[data-v-578cbbf6]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:column;-ms-flex-pack:column;justify-content:column;height:9.6vw;line-height:9.6vw;color:#29292a;content:"viewport-units-buggyfill; height: 9.6vw; line-height: 9.6vw"\n}\n.customer-service .content .box .box-bottom .wx .textarea[data-v-578cbbf6]{width:38.667vw;height:9.6vw;line-height:9.6vw;content:"viewport-units-buggyfill; width: 38.667vw; height: 9.6vw; line-height: 9.6vw"\n}\n.customer-service .content .box .box-bottom .btn[data-v-578cbbf6]{padding:2.4vw 0;background-color:#f4f4fa;color:#797988;border-radius:4vw;width:23.467vw;text-align:center;content:"viewport-units-buggyfill; padding: 2.4vw 0; border-radius: 4vw; width: 23.467vw"\n}\n.customer-service .content .box .box-bottom .code[data-v-578cbbf6]{text-align:right\n}\n.customer-service .content .box .box-bottom .code img[data-v-578cbbf6]{width:23.467vw;height:23.467vw;content:"viewport-units-buggyfill; width: 23.467vw; height: 23.467vw"\n}'],sourceRoot:""}])},hAv0:function(t,e,i){e=t.exports=i("FZ+f")(!0),e.push([t.i,'\n.nf-scroll-container{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column\n}\n.nf-scroll-container .nf-scroll-view{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1\n}\n.align-center,.flex{display:-webkit-box;display:-ms-flexbox;display:flex\n}\n.align-center{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.center,.justify-center{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center\n}\n.center{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.space-between{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between\n}\n.navigation{height:11.733vw;-webkit-box-align:center;-ms-flex-align:center;align-items:center;z-index:99;padding:0 4.267vw;position:fixed;top:0;left:0;width:100%;background-color:#fff;border-bottom:.5px solid #d9d9d9;content:"viewport-units-buggyfill; height: 11.733vw; padding: 0 4.267vw"\n}\n.navigation .back{position:absolute;left:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; left: 4.267vw"\n}\n.navigation .text{text-align:center;font-size:4.8vw;line-height:11.733vw;content:"viewport-units-buggyfill; font-size: 4.8vw; line-height: 11.733vw"\n}\n.navigation .right{position:absolute;right:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; right: 4.267vw"\n}\n.tel-dialog .weui-dialog{padding:6.933vw 4.267vw;content:"viewport-units-buggyfill; padding: 6.933vw 4.267vw"\n}\n.tel-dialog .box .title{margin-bottom:5.333vw;content:"viewport-units-buggyfill; margin-bottom: 5.333vw"\n}\n.tel-dialog .box .tel{font-size:5.333vw;height:12.8vw;line-height:12.8vw;content:"viewport-units-buggyfill; font-size: 5.333vw; height: 12.8vw; line-height: 12.8vw"\n}\n.tel-dialog .box .footer{margin-top:5.333vw;height:11.2vw;line-height:11.2vw;content:"viewport-units-buggyfill; margin-top: 5.333vw; height: 11.2vw; line-height: 11.2vw"\n}\n.tel-dialog .box .footer a{height:11.2vw;display:inline-block;width:32vw;border:1px solid #9898a1;cursor:pointer;content:"viewport-units-buggyfill; height: 11.2vw; width: 32vw"\n}\n.tel-dialog .box .footer .dial{color:#f3d198;background-color:#29292a;border:1px solid #29292a\n}',"",{version:3,sources:["/Users/glay/IdeaProjects/hiho-mobile/src/views/mine/customerService.vue"],names:[],mappings:";AACA,qBAAqB,oBAAoB,oBAAoB,aAAa,WAAW,YAAY,4BAA4B,6BAA6B,0BAA0B,qBAAqB;CACxM;AACD,qCAAqC,kBAAkB,mBAAmB,WAAW,MAAM;CAC1F;AACD,oBAAoB,oBAAoB,oBAAoB,YAAY;CACvE;AACD,cAAc,yBAAyB,sBAAsB,kBAAkB;CAC9E;AACD,wBAAwB,oBAAoB,oBAAoB,aAAa,wBAAwB,qBAAqB,sBAAsB;CAC/I;AACD,QAAQ,yBAAyB,sBAAsB,kBAAkB;CACxE;AACD,eAAe,oBAAoB,oBAAoB,aAAa,yBAAyB,sBAAsB,6BAA6B;CAC/I;AACD,YAAY,gBAAgB,yBAAyB,sBAAsB,mBAAmB,WAAW,kBAAkB,eAAe,MAAM,OAAO,WAAW,sBAAsB,iCAAiC,wEAAwE;CAChS;AACD,kBAAkB,kBAAkB,aAAa,QAAQ,mCAAmC,2BAA2B,iDAAiD;CACvK;AACD,kBAAkB,kBAAkB,gBAAgB,qBAAqB,2EAA2E;CACnJ;AACD,mBAAmB,kBAAkB,cAAc,QAAQ,mCAAmC,2BAA2B,kDAAkD;CAC1K;AACD,yBAAyB,wBAAwB,4DAA4D;CAC5G;AACD,wBAAwB,sBAAsB,0DAA0D;CACvG;AACD,sBAAsB,kBAAkB,cAAc,mBAAmB,2FAA2F;CACnK;AACD,yBAAyB,mBAAmB,cAAc,mBAAmB,4FAA4F;CACxK;AACD,2BAA2B,cAAc,qBAAqB,WAAW,yBAAyB,eAAe,+DAA+D;CAC/K;AACD,+BAA+B,cAAc,yBAAyB,wBAAwB;CAC7F",file:"customerService.vue",sourcesContent:['\n.nf-scroll-container{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column\n}\n.nf-scroll-container .nf-scroll-view{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1\n}\n.align-center,.flex{display:-webkit-box;display:-ms-flexbox;display:flex\n}\n.align-center{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.center,.justify-center{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center\n}\n.center{-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.space-between{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between\n}\n.navigation{height:11.733vw;-webkit-box-align:center;-ms-flex-align:center;align-items:center;z-index:99;padding:0 4.267vw;position:fixed;top:0;left:0;width:100%;background-color:#fff;border-bottom:.5px solid #d9d9d9;content:"viewport-units-buggyfill; height: 11.733vw; padding: 0 4.267vw"\n}\n.navigation .back{position:absolute;left:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; left: 4.267vw"\n}\n.navigation .text{text-align:center;font-size:4.8vw;line-height:11.733vw;content:"viewport-units-buggyfill; font-size: 4.8vw; line-height: 11.733vw"\n}\n.navigation .right{position:absolute;right:4.267vw;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:"viewport-units-buggyfill; right: 4.267vw"\n}\n.tel-dialog .weui-dialog{padding:6.933vw 4.267vw;content:"viewport-units-buggyfill; padding: 6.933vw 4.267vw"\n}\n.tel-dialog .box .title{margin-bottom:5.333vw;content:"viewport-units-buggyfill; margin-bottom: 5.333vw"\n}\n.tel-dialog .box .tel{font-size:5.333vw;height:12.8vw;line-height:12.8vw;content:"viewport-units-buggyfill; font-size: 5.333vw; height: 12.8vw; line-height: 12.8vw"\n}\n.tel-dialog .box .footer{margin-top:5.333vw;height:11.2vw;line-height:11.2vw;content:"viewport-units-buggyfill; margin-top: 5.333vw; height: 11.2vw; line-height: 11.2vw"\n}\n.tel-dialog .box .footer a{height:11.2vw;display:inline-block;width:32vw;border:1px solid #9898a1;cursor:pointer;content:"viewport-units-buggyfill; height: 11.2vw; width: 32vw"\n}\n.tel-dialog .box .footer .dial{color:#f3d198;background-color:#29292a;border:1px solid #29292a\n}'],sourceRoot:""}])},uIHi:function(t,e,i){var n=i("apOm");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("07de40b2",n,!0,{})}});
//# sourceMappingURL=9.js.map