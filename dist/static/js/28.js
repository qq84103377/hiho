webpackJsonp([28],{"3L3Y":function(e,n,t){n=e.exports=t("FZ+f")(!0),n.push([e.i,"\n.brand-index>div{height:100%!important\n}","",{version:3,sources:["/Users/shanlin/Desktop/hiho-mobile/src/views/brand/index.vue"],names:[],mappings:";AACA,iBAAiB,qBAAqB;CACrC",file:"index.vue",sourcesContent:["\n.brand-index>div{height:100%!important\n}"],sourceRoot:""}])},U6sG:function(e,n,t){var r=t("WZCr");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);t("rjj0")("4a64f472",r,!0,{})},WZCr:function(e,n,t){n=e.exports=t("FZ+f")(!0),n.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"index.vue",sourceRoot:""}])},c6rK:function(e,n,t){"use strict";function r(e){t("gaL0"),t("U6sG")}Object.defineProperty(n,"__esModule",{value:!0});var i=t("Xxa5"),s=t.n(i),o=t("exGp"),a=t.n(o),c=t("s/Rn"),u={name:"brandIndex",data:function(){return{brandList:[],pageNum:0}},methods:{refresh:function(e){var n=this;return a()(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e(!0),n.pageNum=1,t.next=4,n.getBrandListH5(e);case 4:case"end":return t.stop()}},t,n)}))()},infinite:function(e){var n=this;return a()(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n.pageNum++,t.next=3,n.getBrandListH5(e);case 3:case"end":return t.stop()}},t,n)}))()},getBrandListH5:function(e){var n=this,t={userId:this.$store.getters.userInfo.id,pageSize:10,pageNum:this.pageNum};Object(c.b)(t).then(function(t){if(console.log(t.code,"返回状态"),0===t.code){if(console.log(n.pageNum),0==t.data.brandList.length)return 1===n.pageNum&&(n.brandList=[]),void e(!0);n.brandList=1===n.pageNum?t.data.brandList:n.brandList.concat(t.data.brandList),e()}})},toggleNotice:function(e){this.$set(this.brandList[e],"hasNotice",1===this.brandList[e].hasNotice?0:1)}},beforeRouteEnter:function(e,n,t){sessionStorage.position?t(function(e){e&&e.$refs.brand&&setTimeout(function(){e.$refs.brand.scrollTo(0,sessionStorage.position,!1)},0)}):(sessionStorage.position="",t())},beforeRouteLeave:function(e,n,t){sessionStorage.position=this.$refs.brand&&this.$refs.brand.getPosition()&&this.$refs.brand.getPosition().top,t()},created:function(){}},d=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"brand-index"},[t("scroller",{ref:"brand",attrs:{snapping:!0,noDataText:"好货扭起来","on-refresh":e.refresh,"on-infinite":e.infinite}},[t("div",e._l(e.brandList,function(n,r){return t("brand-item",{key:r,attrs:{fileList:n,brandItemIndex:r},on:{reverstNotice:e.toggleNotice}})}))])],1)},f=[],p={render:d,staticRenderFns:f},g=p,l=t("VU/8"),b=r,h=l(u,g,!1,b,"data-v-4dac01b8",null);n.default=h.exports},gaL0:function(e,n,t){var r=t("3L3Y");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);t("rjj0")("d8ee9cf8",r,!0,{})}});
//# sourceMappingURL=28.js.map