webpackJsonp([20],{"/OA2":function(n,e,t){var i=t("eLgU");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);t("rjj0")("3c3d97a2",i,!0,{})},D22U:function(n,e,t){var i=t("p+9O");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);t("rjj0")("58619feb",i,!0,{})},"T+/8":function(n,e,t){"use strict";function i(n){t("D22U"),t("/OA2")}Object.defineProperty(e,"__esModule",{value:!0});var o=t("Dd8w"),a=t.n(o),s=t("5Qen"),c=t("mtWM"),d=t.n(c),r=t("NYxO"),l=(t("lgNl"),t("+PoZ"),a()({},Object(r.c)(["setInstance","setRongYunRes"]),{phoneChange:function(n){this.noGetCode=11!==n.length},sendVerificationSms:function(){var n=this,e={phone:this.phone};Object(s.B)(e).then(function(e){0===e.code&&(n.timer||(n.noGetCode=!0,n.timer=setInterval(function(){n.second>0&&n.second<=30?n.second--:(clearInterval(n.timer),n.second=30,n.noGetCode=!1,n.timer=null)},1e3)))})},login:function(){var n=this,e={phone:this.phone,code:this.code,wxUserId:this.wxUserId};Object(s.g)(e).then(function(e){0===e.code&&(n.$store.commit("setUserInfo",e.data),"游客"===e.data.vipLevelId?n.$router.push("/upgradeVIP"):n.$router.push("/activity"))})},wechatLogin:function(){var n=this;Wechat.auth("snsapi_userinfo",function(e){var t={appid:"wx3063c5b996845db4",secret:"1d6032eebd4334f5d239a6aed2fd4d81",code:e.code,grant_type:"authorization_code"};d.a.get("https://api.weixin.qq.com/sns/oauth2/access_token",{params:t}).then(function(e){var t={access_token:e.access_token,openid:e.openid,lang:"zh_CN"};d.a.get("https://api.weixin.qq.com/sns/userinfo",{params:t}).then(function(e){n.headimgurl=e.headimgurl;var t={openid:e.openid,nickname:e.nickname,headimgurl:e.headimgurl,unionid:e.unionid,sex:e.sex};Object(s.y)(t).then(function(e){0===e.code&&(n.wxUserId=e.data,n.isWeChatLogin=!0)})})})},function(n){})}}),{data:function(){return{instance:{},phone:"",code:"",timer:null,second:30,isWeChatLogin:!1,wxUserId:"",headimgurl:"",noGetCode:!0}},mounted:function(){},methods:a()({},Object(r.c)(["setInstance","setRongYunRes"]),{phoneChange:function(n){this.noGetCode=11!==n.length},sendVerificationSms:function(){var n=this,e={phone:this.phone};Object(s.B)(e).then(function(e){0===e.code&&(n.timer||(n.noGetCode=!0,n.timer=setInterval(function(){n.second>0&&n.second<=30?n.second--:(clearInterval(n.timer),n.second=30,n.noGetCode=!1,n.timer=null)},1e3)))})},login:function(){var n=this,e={phone:this.phone,code:this.code,wxUserId:this.wxUserId};Object(s.g)(e).then(function(e){0===e.code&&(n.$store.commit("setUserInfo",e.data),"游客"===e.data.vipLevelId?n.$router.push("/upgradeVIP"):n.$router.push("/activity"))})},wechatLogin:function(){var n=this;Wechat.auth("snsapi_userinfo",function(e){var t={appid:"wx3063c5b996845db4",secret:"1d6032eebd4334f5d239a6aed2fd4d81",code:e.code,grant_type:"authorization_code"};d.a.get("https://api.weixin.qq.com/sns/oauth2/access_token",{params:t}).then(function(e){var t={access_token:e.access_token,openid:e.openid,lang:"zh_CN"};d.a.get("https://api.weixin.qq.com/sns/userinfo",{params:t}).then(function(e){n.headimgurl=e.headimgurl;var t={openid:e.openid,nickname:e.nickname,headimgurl:e.headimgurl,unionid:e.unionid,sex:e.sex};Object(s.y)(t).then(function(e){0===e.code&&(n.wxUserId=e.data,n.isWeChatLogin=!0)})})})},function(n){})}})}),g=function(){var n=this,e=n.$createElement,i=n._self._c||e;return i("section",{staticClass:"login nf-scroll-container"},[i("div",{staticClass:"nf-scroll-view "},[i("div",{staticClass:"login-index"},[i("div",{staticClass:"top"},[n.isWeChatLogin?i("div",[i("img",{staticClass:"user-img",attrs:{src:n.headimgurl}}),n._v(" "),i("p",{staticClass:"company-name"},[n._v("扭货直销")])]):i("img",{staticClass:"logo",attrs:{src:t("brDJ")}}),n._v(" "),i("group",[i("x-input",{attrs:{placeholder:"请输入手机号码",max:13,type:"tel"},on:{"on-change":n.phoneChange},model:{value:n.phone,callback:function(e){n.phone=e},expression:"phone"}}),n._v(" "),i("x-input",{staticClass:"weui-vcode",attrs:{placeholder:"请输入验证码"},model:{value:n.code,callback:function(e){n.code=e},expression:"code"}},[i("x-button",{attrs:{slot:"right",disabled:n.noGetCode,type:"primary",mini:""},nativeOn:{click:function(e){return n.sendVerificationSms(e)}},slot:"right"},[n.timer?i("span",[n._v(n._s(this.second)+"后重新获取")]):i("span",[n._v("获取验证码")])])],1)],1),n._v(" "),i("x-button",{staticClass:"mgt50",attrs:{disabled:4!=n.code.length,type:"primary"},nativeOn:{click:function(e){return n.login(e)}}},[n._v("登录")])],1),n._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!n.isWeChatLogin,expression:"!isWeChatLogin"}],staticClass:"bottom"},[i("span",{staticClass:"wechat-login",on:{click:n.wechatLogin}},[i("i",{staticClass:"iconNH icon-wx-login mgr4"}),n._v("微信登录\n                ")])])])])])},u=[],v={render:g,staticRenderFns:u},p=v,A=t("VU/8"),h=i,w=A(l,p,!1,h,"data-v-739533b8",null);e.default=w.exports},brDJ:function(n,e,t){n.exports=t.p+"static/img/login_logo@2x.png"},eLgU:function(n,e,t){e=n.exports=t("FZ+f")(!0),e.push([n.i,'\n.login-index[data-v-739533b8]{height:100vh;padding:0 5.333vw;text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;background-color:#fff;content:"viewport-units-buggyfill; height: 100vh; padding: 0 5.333vw"\n}\n.login-index .top[data-v-739533b8]{-webkit-box-flex:1;-ms-flex:1;flex:1;margin-top:12.8vw;content:"viewport-units-buggyfill; margin-top: 12.8vw"\n}\n.login-index .top .logo[data-v-739533b8]{width:22.4vw;height:22.4vw;margin-bottom:13.333vw;content:"viewport-units-buggyfill; width: 22.4vw; height: 22.4vw; margin-bottom: 13.333vw"\n}\n.login-index .top .user-img[data-v-739533b8]{width:24vw;height:24vw;border-radius:50%;margin-bottom:2.667vw;content:"viewport-units-buggyfill; width: 24vw; height: 24vw; margin-bottom: 2.667vw"\n}\n.login-index .top .company-name[data-v-739533b8]{padding-bottom:3.2vw;content:"viewport-units-buggyfill; padding-bottom: 3.2vw"\n}\n.login-index .bottom[data-v-739533b8]{font-size:4.267vw;margin:4vw 0 8vw;content:"viewport-units-buggyfill; font-size: 4.267vw; margin: 4vw 0 8vw"\n}\n.login-index .bottom .wechat-login[data-v-739533b8]{padding:1.333vw 4vw;content:"viewport-units-buggyfill; padding: 1.333vw 4vw"\n}\n.login-index .bottom .icon-repost-wechat[data-v-739533b8]{color:#03cf0a;margin-right:1.333vw;content:"viewport-units-buggyfill; margin-right: 1.333vw"\n}',"",{version:3,sources:["/Users/glay/IdeaProjects/hiho-mobile/src/views/login/index.vue"],names:[],mappings:";AACA,8BAA8B,aAAa,kBAAkB,kBAAkB,oBAAoB,oBAAoB,aAAa,4BAA4B,6BAA6B,0BAA0B,sBAAsB,sBAAsB,qEAAqE;CACvU;AACD,mCAAmC,mBAAmB,WAAW,OAAO,kBAAkB,sDAAsD;CAC/I;AACD,yCAAyC,aAAa,cAAc,uBAAuB,0FAA0F;CACpL;AACD,6CAA6C,WAAW,YAAY,kBAAkB,sBAAsB,qFAAqF;CAChM;AACD,iDAAiD,qBAAqB,yDAAyD;CAC9H;AACD,sCAAsC,kBAAkB,iBAAiB,yEAAyE;CACjJ;AACD,oDAAoD,oBAAoB,wDAAwD;CAC/H;AACD,0DAA0D,cAAc,qBAAqB,yDAAyD;CACrJ",file:"index.vue",sourcesContent:['\n.login-index[data-v-739533b8]{height:100vh;padding:0 5.333vw;text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;background-color:#fff;content:"viewport-units-buggyfill; height: 100vh; padding: 0 5.333vw"\n}\n.login-index .top[data-v-739533b8]{-webkit-box-flex:1;-ms-flex:1;flex:1;margin-top:12.8vw;content:"viewport-units-buggyfill; margin-top: 12.8vw"\n}\n.login-index .top .logo[data-v-739533b8]{width:22.4vw;height:22.4vw;margin-bottom:13.333vw;content:"viewport-units-buggyfill; width: 22.4vw; height: 22.4vw; margin-bottom: 13.333vw"\n}\n.login-index .top .user-img[data-v-739533b8]{width:24vw;height:24vw;border-radius:50%;margin-bottom:2.667vw;content:"viewport-units-buggyfill; width: 24vw; height: 24vw; margin-bottom: 2.667vw"\n}\n.login-index .top .company-name[data-v-739533b8]{padding-bottom:3.2vw;content:"viewport-units-buggyfill; padding-bottom: 3.2vw"\n}\n.login-index .bottom[data-v-739533b8]{font-size:4.267vw;margin:4vw 0 8vw;content:"viewport-units-buggyfill; font-size: 4.267vw; margin: 4vw 0 8vw"\n}\n.login-index .bottom .wechat-login[data-v-739533b8]{padding:1.333vw 4vw;content:"viewport-units-buggyfill; padding: 1.333vw 4vw"\n}\n.login-index .bottom .icon-repost-wechat[data-v-739533b8]{color:#03cf0a;margin-right:1.333vw;content:"viewport-units-buggyfill; margin-right: 1.333vw"\n}'],sourceRoot:""}])},"p+9O":function(n,e,t){e=n.exports=t("FZ+f")(!0),e.push([n.i,'\n.login-index .weui-cells:before{content:none\n}\n.login-index .weui-cell{padding-left:0;padding-right:0\n}\n.login-index .weui-cell:before{left:0\n}\n.login-index .weui-cell .weui-input{padding-left:8.533vw;text-align:left!important;content:"viewport-units-buggyfill; padding-left: 8.533vw"\n}',"",{version:3,sources:["/Users/glay/IdeaProjects/hiho-mobile/src/views/login/index.vue"],names:[],mappings:";AACA,gCAAgC,YAAY;CAC3C;AACD,wBAAwB,eAAe,eAAe;CACrD;AACD,+BAA+B,MAAM;CACpC;AACD,oCAAoC,qBAAqB,0BAA0B,yDAAyD;CAC3I",file:"index.vue",sourcesContent:['\n.login-index .weui-cells:before{content:none\n}\n.login-index .weui-cell{padding-left:0;padding-right:0\n}\n.login-index .weui-cell:before{left:0\n}\n.login-index .weui-cell .weui-input{padding-left:8.533vw;text-align:left!important;content:"viewport-units-buggyfill; padding-left: 8.533vw"\n}'],sourceRoot:""}])}});
//# sourceMappingURL=20.js.map