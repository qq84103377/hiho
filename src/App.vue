<template>
    <div id="app">
        <!-- <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view> -->
        <navigation>
            <router-view></router-view>
        </navigation>
        <!--<router-view></router-view>-->
        <!-- <loading v-model="isLoading"></loading> -->
        <div v-transfer-dom>
            <confirm
                class="nf-confirm"
                v-model="exitAppVisble"
                dialog-transition=""
                title="提示"
                content="是否确认退出app？"
                @on-confirm="onAppOutConfirm">
            </confirm>
        </div>

        <!--置顶横幅消息-->
        <div v-transfer-dom>
            <transition name="fade" mode="out-in">
                <div
                    v-if="topMsg&&msgData[0].messageType!='ACTIVITY'&&(msgData[0].redirectType!='GOODS'&&msgData[0].redirectType!='UPDATE')"
                    @click="goTo()" class="top-msg">
                    <div class="top-msg-left">
                        {{msgData[0].subTitle}}{{msgData[0].mainTitle}}{{msgData[0].mainContext?msgData[0].mainContext.split(';')[0]:''}}
                        {{(msgData[0].redirectType=='ORDER' || msgData[0].redirectType=='ACTIVITY' ||
                        msgData[0].redirectType=='REFUND')?'查看更多>>':''}}
                    </div>
                    <i @click.stop="topMsg=false" class="msg-close"></i></div>
            </transition>
        </div>

        <!--活动海布(单张)-->
        <div v-transfer-dom>
            <!--topMsg&&(msgData[0].messageType=='ACTIVITY'||msgData[0].redirectType=='GOODS')-->
            <x-dialog dialog-transition=""
                      :show="topMsg&&(msgData[0].messageType=='ACTIVITY'||msgData[0].redirectType=='GOODS')"
                      class="activity-dialog">
                <div @click="topMsg = false" class="close"></div>
                <div class="line"></div>
                <img @click="goTo()" v-if="msgData[0].picUrl" class="activity-img" :src="msgData[0].picUrl" alt="">
            </x-dialog>
        </div>

        <!--营销消息轮播图-->
        <div v-transfer-dom>
            <x-dialog dialog-transition="" v-model="popMsg" class="marketing-dialog">
                <div @click="closePop" class="close"></div>
                <div class="line"></div>
                <swiper dots-position="center">
                    <swiper-item class="activity-swiper" v-for="(item, index) in popList" :key="index">
                        <div @click="goTo(item)">
                            <content-item :info="item"></content-item>
                        </div>
                    </swiper-item>
                </swiper>
            </x-dialog>
        </div>

        <div v-transfer-dom>
            <previewer @on-close="closeImg" ref="previewer" :list="previewerImgList"></previewer>
        </div>
        <div v-transfer-dom class="purchase-price-mag">
            <confirm
                class="nf-confirm"
                v-model="isUpdateVisible"
                dialog-transition=""
                confirm-text="确定"
                cancel-text="取消"
                @on-confirm="updateApp">
                <div solt="title" class="black fs18 bold">发现新版本{{appVersion}}</div>
                <div>
                    <div  style="text-align:left;" v-for="(item, index) in text" :key="index">{{index+1}}:{{item}}</div>
                </div>
            </confirm>
        </div>
    </div>
</template>

<script>
    import FastClick from 'fastclick'
    import {Loading, TransferDom, Confirm} from 'vux'
    import {mapState, mapGetters, mapMutations} from 'vuex'
    import {doLogin, doWorkbayLogin, getMissionIdBySerialNum} from '@/api'
    import {getShopCartNum} from '@/api/cart'
    import {getRecentUpdateMsg} from '@/api/mine.js'
    import {RongYunInit, RongYunLogOut} from '@/config/rongyun'
    import {getMsgIcons, getRongYunToken, setSingleHasRead, getOnlineImMsgs, addVersionUpdateMsg} from '@/api/message'
    import contentItem from './views/info/components/content-item'

    export default {
        name: "app",
        data() {
            return {
                firstLogin: true,
                popMsg: false,
                instance: {},
                exitAppVisble: false,
                isAppBackgroud: false,
                isUpdateVisible: false,
                previewerImgList: [],
                appVersion: '',
                text: [],
                topMsg: false,
                msgData: [{picUrl: ''}],
                popList: []
            };
        },
        directives: {
            TransferDom
        },
        components: {
            Loading,
            Confirm,
            contentItem
        },
        mounted() {
            if (this.userId) {
                this.Ryinit(this.userId)
            }
            // const _this = this;
            // chcp.getVersionInfo(callback);
            //
            // function callback(err, data) {
            //     _this.appVersion = data;
            //     _this.getRecentUpdateMsg()
            // }
            // 禁止ios缩放网页
            document.documentElement.addEventListener('touchstart', (event) => {
                if (event.touches.length > 1) {
                    event.preventDefault();
                }
            }, false);
            FastClick.attach(document.body);
            document.addEventListener("backbutton", this.showConfirm, true);
            document.addEventListener("resume", this.onAppForeground, true);
            document.addEventListener("pause", this.onAppBackground, true);
        },
        created() {
            // if (this.userId) {
                // this.$getCartNum(this.userId)
            //     this.$store.dispatch('getCartNum',this.userId)
            // }
            // setInterval(() => {
            //     if (this.userId) {
            //         // this.$getCartNum(this.userId)
            //         this.$store.dispatch('getCartNum',this.userId)
            //     }
            // }, 60000)
        },
        computed: {
            previewerInfo() {
                return this.$store.getters.previewerInfo;
            },
            userId() {
                return this.$store.getters.userInfo.id
            },
            msg() {
                return this.$store.state.message.rongYunRes
            }
        },
        watch: {
            userId(v) {
                if (v) {
                    this.Ryinit(v)
                }else {
                    RongYunLogOut()
                }
            },
            previewerInfo: {
                handler(newValue, oldValue) {
                    console.log(newValue)
                    this.previewerImgList = this.previewerInfo.imgList
                    let that = this
                    setTimeout(function () {
                        that.$refs.previewer.show(that.previewerInfo.currentIndex)
                    }, 200)
                },
                deep: true
            },
            msg(v) {
                if (v.content) {
                    console.log(eval(v.content.data), 'msg显示');
                    this.setHasMsg(true)
                    this.msgData = eval(v.content.data)
                    if (!this.popMsg) {
                        this.topMsgShow()
                    }

                }
            },
            '$route'(to, from, next) {
                console.log(to, from,'d=d=d=d=d');
                if (to.path == '/activity' && this.firstLogin) {
                    //第一次登陆成功显示推送活动弹窗
                    getOnlineImMsgs({userId: this.userId}).then(res => {
                        console.log(res, '上线活动');
                        this.firstLogin = false;
                        if (res.code == 0 && res.data && res.data.imMessages.length) {
                            this.popList = res.data.imMessages

                            this.popMsg = true
                        } else {
                            // if(!this.topMsg){
                            this.getRecentUpdateMsg()
                            // }
                        }
                    })
                }
                //切换路由时检查是否有新消息
                if (to.meta.isShowInfo) {
                    this.checkNewMsg()
                }
                //切换路由时若是一级菜单则调用查询购物车角标接口
                if(!to.meta.isHideTabbar&&this.userId) {
                    this.$store.dispatch('getCartNum',this.userId)
                }
            }
        },
        methods: {
            ...mapMutations(['setHasMsg', 'setHasUpdate', 'setInstance', 'setRongYunRes', 'setToken', 'setUserInfo', 'setLoginData', 'loginOut', 'setCartNum']),
            ...mapGetters(['getUserInfo', 'getLoginData']),
            checkNewMsg() {
                getMsgIcons({userId: this.userId}).then(res => {
                    // console.log(res.data,'未读消息数量');
                    const num = res.data.reduce((total, num) => total + num)
                    console.log(num, '未读消息数量');
                    this.setHasMsg(num > 0)
                })
            },
            closePop() {
                this.popMsg = false
                let time = setTimeout(() => {
                    this.getRecentUpdateMsg()
                    clearTimeout(time)
                }, 3000)
            },
            topMsgShow() {
                this.topMsg = true
                if (this.msgData[0].messageType != 'ACTIVITY' && (this.msgData[0].redirectType != 'GOODS' && this.msgData[0].redirectType != 'UPDATE')) {
                    let time = setTimeout(() => {
                        this.topMsg = false
                        // this.closePop()
                        clearTimeout(time)
                    }, 3000)
                }
            },
            addUpdateMsg() {
                let params = {
                    "version": this.appVersion,
                    "userId": this.userId,
                    "msgList": this.text
                }
                addVersionUpdateMsg(params).then(res => {
                    console.log(res, '添加更新版本通知');
                })
            },
            getRecentUpdateMsg() {
                // const version = '1.2.0'
                let u = navigator.userAgent,
                    system = 'ANDROID',
                    version = '';
                if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
                    system = 'ANDROID'
                } else if (u.indexOf('iPhone') > -1) {//苹果手机
                    system = 'IOS'
                }

                alert(JSON.stringify(chcp))
                chcp.getVersionInfo((err,data) => {
                    version = data.appVersion
                });

                getRecentUpdateMsg({system, version, userId: this.userId}).then(res => {
                    // alert('调用更新接口'+JSON.stringify(u)+JSON.stringify(res))
                    if (res.code == 0 && res.data) {
                        // chcp.getVersionInfo((err,data) => {
                        //     if(data.appVersion!=res.data.version){
                        this.text = res.data.msgList
                        this.appVersion = res.data.version
                        // this.addUpdateMsg()
                        this.isUpdateVisible = true
                        this.setHasUpdate(res.data.version)
                        // }
                        // });
                        // if(version!=res.data.version){
                        //     this.text = res.data.msgList
                        //     this.appVersion = res.data.version
                        //     this.isUpdateVisible = true
                        //     this.addUpdateMsg()
                        //     this.setHasUpdate(res.data.version)
                        // }
                        console.log(res, '版本更新信息');
                    }
                })
            },
            checkUpdate(type) {
                const _this = this;
                chcp.fetchUpdate(function (error, data) {
                    if (!error) {
                        _this.isUpdateVisible = true
                    }
                })
            },
            updateApp() {
                // this.setHasUpdate('')
                const _this = this;
                _this.$vux.loading.show({
                    text: '更新中'
                })
                this.setHasUpdate('')
                chcp.installUpdate(function (error) {
                    // alert('更新啊')
                    _this.$vux.loading.hide()
                    _this.$vux.toast.text('更新完成')
                    _this.isUpdateVisible = false
                })
            },
            updateOnlineStatus() {
                const isOnline = window.navigator.onLine;
                if (isOnline) {
                    this.$router.push('/mission')
                }
                else {
                    this.$vux.alert.show({
                        title: '提示',
                        content: '网络未连接！',
                    });
                }
            },
            //顶部消息跳转
            goTo(item = this.msgData[0]) {
                this.popMsg = false
                this.topMsg = false
                setSingleHasRead({uniqueFlag: item.uniqueFlag}).then(res => {
                    console.log(res.data, '设置单个消息已读');
                })
                if (item.redirectType == 'ORDER') {
                    this.$router.push(`/orderDetail?id=${item.redirectReferId}`)
                } else if (item.redirectType == 'ACTIVITY') {
                    this.$router.push(`/activityDetail?activityId=${item.redirectReferId}&type=${this.checkTime(item)}`)
                } else if (item.redirectType == 'REFUND') {
                    this.$router.push(`/afterSalesDetail?refundOrderId=${item.redirectReferId}`)
                } else if (item.redirectType == 'BRAND') {
                    this.$router.push(`/brandDetail?brandId=${item.redirectReferId}`)
                }
            },
            checkTime(item) {
                let arr = item.remark.split(',')
                if (arr[0] * 1 > new Date().getTime()) {
                    //预告
                    return 1
                } else {
                    return 0
                }
            },
            // 获取融云token
            fetchToken(userId) {
                return getRongYunToken({
                    userId: userId
                }).then(res => {
                    return res;
                });
            },
            Ryinit(userId) {
                this.fetchToken(userId).then(token => {
                    // console.log(token)
                    const key = process.env.RongYunKey;
                    RongYunInit({
                        token: token,
                        appKey: 'kj7swf8ok1dv2'
                    }, {
                        getMessage: this.setRongYunRes,
                        getInstance: this.getInstance
                    });
                });
            },
            getInstance(instance) {
                this.instance = instance;
                this.setInstance(instance);
            },
            onAppOutConfirm() {
                navigator.app.exitApp();
            },
            onAppForeground() {
                this.isAppBackgroud = false;
                setTimeout(() => {
                    document.addEventListener("backbutton", this.showConfirm, true);
                }, 1000)
            },
            onAppBackground() {
                document.removeEventListener("backbutton", this.showConfirm, true);
                this.isAppBackgroud = true;
            },
            // showConfirm() {
            //     if (!this.isAppBackgroud) {
            //         this.exitAppVisble = true;
            //     }
            // }
            showConfirm() {
                if (!this.isAppBackgroud) {
                    let currentPath = this.$route.path
                    let firMenu = ['/login', '/activity', '/brand', '/follow/followGoods', '/cart', '/mine']
                    if (this.previewerImgList.length > 0) {
                        this.$refs.previewer.close()
                        this.previewerImgList = []
                    }
                    else if (firMenu.indexOf(currentPath) !== -1) {
                        this.exitAppVisble = true;
                    } else {
                        this.$router.go(-1)
                    }
                }
            },
            closeImg() {
                this.previewerImgList = []
            }
        }
    };
</script>

<style lang="less">
    @import './assets/style/reset.less';
    @import './assets/style/common.less';
    @import './assets/style/icon.less';
    @import '~vux/src/styles/1px.less';
    @import 'assets/style/resetVux.less';

    body {
        font-size: 16px;
        background-color: #ececec;
        color: @black;
        padding-top: constant(safe-area-inset-top);
    }

    html,
    body,
    #app {
        width: 100vw;
        height: 100vh;
    }

    img, .iconNH {
        content: normal !important;
    }

    .iconfont {
        font-size: 16px !important;
    }

    [aspectratio] {
        position: relative;
    }

    [aspectratio]::before {
        content: '';
        display: block;
        width: 1px;
        margin-left: -1px;
        height: 0;
    }

    [aspectratio-content] {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }

    .top-msg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        background-color: rgba(0, 0, 0, .5);
        width: 100%;
        padding: 9px 16px 9px 13px;
        font-size: 12px;
        color: #fff;
        word-break: break-all;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .top-msg-left {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }

    .msg-close {
        flex: 0 0 20px;
        height: 20px;
        background: url("./assets/icon/order_fail@3x.png") no-repeat;
        background-size: 100% 100%;
        /*position: absolute;*/
        right: 0;
        top: 0;
    }

    .activity-dialog, .marketing-dialog {
        .weui-dialog {
            background-color: transparent !important;
            .vux-slider {
                /*padding-top: 0 !important;*/
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .activity-img {
            width: 100%;
            height: 446px;
            padding-top: 46px;
        }
        .vux-slider .vux-indicator-right > a > .vux-icon-dot.active, .vux-slider > .vux-indicator > a > .vux-icon-dot.active {
            background-color: #797988;
        }
        .vux-swiper {
            background: #fff !important;
        }
        .activity-swiper {
            padding: 5px;
            .pop-content {
                height: 25%;
                .main-title {
                    font-size: 20px;
                    color: #29292A;
                    margin-bottom: 6px;
                }
                .main-content {
                    color: #797988;
                    font-size: 12px;
                }
            }
        }
        .vux-slider > .vux-swiper > .vux-swiper-item {
            height: 80%;
        }
        .close {
            z-index: 99999;
            width: 26px;
            height: 26px;
            background: transparent url("./assets/icon/order_fail@3x.png") no-repeat right;
            background-size: 25px 25px;
            position: absolute;
            top: 0px;
            right: 0;
        }
        .line {
            width: 2px;
            height: 26px;
            background: #fff;
            position: absolute;
            top: 21px;
            right: 12px;
        }
    }

    .marketing-dialog {
        .weui-dialog {
            max-width: none;
            width: 90%;
            .content-item {
                .box {
                    padding: 0;
                }
            }
        }
    }
</style>
