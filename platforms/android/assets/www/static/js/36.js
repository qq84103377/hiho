webpackJsonp([36],{Eyr8:function(t,i,e){var a=e("c/kN");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("rjj0")("9026ea18",a,!0,{})},b9wD:function(t,i,e){"use strict";function a(t){e("Eyr8")}Object.defineProperty(i,"__esModule",{value:!0});var n=e("Ty/O"),o=e("AExY"),s={name:"activityDetail",data:function(){return{activityInfo:{endTime:""},goodsList:[]}},created:function(){var t=this,i={userId:this.$store.getters.userInfo.id,activityId:this.$route.query.activityId};Object(n.b)(i).then(function(i){console.log(i),t.activityInfo=i.data.activity,t.goodsList=i.data.goods})},beforeRouteEnter:function(t,i,e){sessionStorage.activityDetailPosition&&e(function(t){Object(o.b)(sessionStorage.activityDetailPosition,t,t.$refs.activityDetail)}),e()},beforeRouteLeave:function(t,i,e){sessionStorage.activityDetailPosition=Object(o.a)(this.$refs.activityDetail),console.log(sessionStorage.activityDetailPosition,"leave"),e()}},c=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"custom-body activity-detail"},[e("div",{staticClass:"main-content"},[e("scroller",{ref:"activityDetail"},[e("activity-item",{staticClass:"activity-info",attrs:{type:"ACTIVITY",activityInfo:t.activityInfo}},[e("div",{attrs:{slot:"badge"},slot:"badge"},[e("div",{staticClass:"badge1 gradient-gold brown"},[t._v(t._s(t.activityInfo.name))]),t._v(" "),e("div",{class:["badge2",{preview:1==t.$route.query.type}]},[t._v(t._s(1==t.$route.query.type?"活动预告":"热卖中")+"\n                ")])]),t._v(" "),e("div",{attrs:{slot:"countdown"},slot:"countdown"},[e("count-time",{attrs:{type:1==t.$route.query.type?1:0,time:1==t.$route.query.type?t.activityInfo.startTime:t.activityInfo.endTime}})],1)]),t._v(" "),e("div",{staticClass:"line-icon"},[e("i",{staticClass:"iconNH icon-line"})]),t._v(" "),e("div",{staticClass:"goods-info"},t._l(t.goodsList,function(i,a){return e("activity-item",{key:a,attrs:{type:"GOODS",activityInfo:i}},[e("div",{staticClass:"price",attrs:{slot:"price"},slot:"price"},[e("div",{staticClass:"sale-price red"},[t._v("¥"+t._s(i.salePrice)+"\n                        "),i.postedPrice?e("s",{staticClass:"blue-gray fs12"},[t._v("¥"+t._s(i.postedPrice))]):t._e()]),t._v(" "),e("div",{staticClass:"black fs12"},[t._v("默认代购费:"),e("span",{staticClass:"red fs18"},[t._v("¥"+t._s(i.purchaseCost))])])]),t._v(" "),0==t.$route.query.type?e("div",{attrs:{slot:"shopcar"},slot:"shopcar"},[e("add-shopcar",{attrs:{checkList:i.specs,goodsId:i.id}})],1):t._e(),t._v(" "),e("span",{attrs:{slot:"btn"},slot:"btn"},[e("x-button",{staticClass:"w82 has-radius",attrs:{mini:"",type:"primary"},nativeOn:{click:function(e){t.$router.push({path:"activityTransmit",query:{type:1,info:i}})}}},[t._v("\n                转发\n                ")])],1)])}))],1)],1),t._v(" "),e("div",{staticClass:"footer"},[e("x-button",{staticClass:"full-btn",attrs:{type:"primary"},nativeOn:{click:function(i){t.$router.push({path:"/transmitList",query:{id:t.activityInfo.id,type:"ACTIVITY"}})}}},[t._v("批量转发")])],1)])},r=[],l={render:c,staticRenderFns:r},v=l,d=e("VU/8"),A=a,y=d(s,v,!1,A,"data-v-89e7bb94",null);i.default=y.exports},"c/kN":function(t,i,e){i=t.exports=e("FZ+f")(!0),i.push([t.i,'\n.activity-detail[data-v-89e7bb94]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column\n}\n.activity-detail .main-content[data-v-89e7bb94]{overflow:auto;-webkit-box-flex:1;-ms-flex:1;flex:1;padding:3.2vw 0;\n  /*padding: 126px 10px 0;*/content:"viewport-units-buggyfill; padding: 3.2vw 0"\n}\n.activity-detail .main-content .activity-info[data-v-89e7bb94]{margin:0 2.667vw;border-radius:1.067vw;content:"viewport-units-buggyfill; margin: 0 2.667vw; border-radius: 1.067vw"\n}\n.activity-detail .main-content .bg-img[data-v-89e7bb94]{width:100%;height:41.067vw;position:fixed;top:12vw;left:0;z-index:-1;content:"viewport-units-buggyfill; height: 41.067vw; top: 12vw"\n}\n.activity-detail .main-content .line-icon[data-v-89e7bb94]{text-align:center;height:8vw;line-height:8vw;content:"viewport-units-buggyfill; height: 8vw; line-height: 8vw"\n}\n.activity-detail .main-content .goods-info[data-v-89e7bb94] :first-child{margin-top:0\n}',"",{version:3,sources:["/Users/glay/IdeaProjects/hiho-mobile/src/views/activity/activityDetail.vue"],names:[],mappings:";AACA,kCAAkC,oBAAoB,oBAAoB,aAAa,4BAA4B,6BAA6B,0BAA0B,qBAAqB;CAC9L;AACD,gDAAgD,cAAc,mBAAmB,WAAW,OAAO,gBAAgB;EACjH,0BAA0B,oDAAoD;CAC/E;AACD,+DAA+D,iBAAiB,sBAAsB,6EAA6E;CAClL;AACD,wDAAwD,WAAW,gBAAgB,eAAe,SAAS,OAAO,WAAW,+DAA+D;CAC3L;AACD,2DAA2D,kBAAkB,WAAW,gBAAgB,iEAAiE;CACxK;AACD,yEAAyE,YAAY;CACpF",file:"activityDetail.vue",sourcesContent:['\n.activity-detail[data-v-89e7bb94]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column\n}\n.activity-detail .main-content[data-v-89e7bb94]{overflow:auto;-webkit-box-flex:1;-ms-flex:1;flex:1;padding:3.2vw 0;\n  /*padding: 126px 10px 0;*/content:"viewport-units-buggyfill; padding: 3.2vw 0"\n}\n.activity-detail .main-content .activity-info[data-v-89e7bb94]{margin:0 2.667vw;border-radius:1.067vw;content:"viewport-units-buggyfill; margin: 0 2.667vw; border-radius: 1.067vw"\n}\n.activity-detail .main-content .bg-img[data-v-89e7bb94]{width:100%;height:41.067vw;position:fixed;top:12vw;left:0;z-index:-1;content:"viewport-units-buggyfill; height: 41.067vw; top: 12vw"\n}\n.activity-detail .main-content .line-icon[data-v-89e7bb94]{text-align:center;height:8vw;line-height:8vw;content:"viewport-units-buggyfill; height: 8vw; line-height: 8vw"\n}\n.activity-detail .main-content .goods-info[data-v-89e7bb94] :first-child{margin-top:0\n}'],sourceRoot:""}])}});
//# sourceMappingURL=36.js.map