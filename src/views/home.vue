<template>
    <div class="container nf-scroll-container">
        <app-header></app-header>
        <section class="nf-scroll-view">
            <!-- <transition :name="transitionName"> -->
            <div class="loading-box" v-show="isLoading">
                <spinner class="inline-loading"></spinner>
            </div>
            <!-- <keep-alive>
                <router-view class="nf-router-view" v-if="!$route.meta.dontKeepAlive"></router-view>
            </keep-alive>
            <router-view class="nf-router-view" v-if="$route.meta.dontKeepAlive"></router-view> -->
            <router-view class="nf-router-view"></router-view>
            <!-- </transition> -->
        </section>
        <app-nav></app-nav>
    </div>
</template>

<script>
import AppHeader from '@/components/home/app-header'
import AppNav from '@/components/home/app-nav'
import { Spinner } from 'vux'
import { mapMutations, mapGetters, mapState } from 'vuex'
import { getRongYunToken, getMissionIdBySerialNum, doLogin, doWorkbayLogin } from '@/api'
import { RongYunInit } from '@/config/rongyun'
export default {
    name: "Home",
    data() {
        return {
            instance: {},
            transitionName: 'fade-in',
            map: {

            }
        };
    },
    components: {
        AppHeader,
        AppNav,
        Spinner
    },
    computed: {
        ...mapState({
            isLoading: state => state.vuxLoading.isLoading
        })
    },
    watch: {
        '$route'(to, from, next) {
            if (!this.map[to.path]) {
                this.map[to.path] = Date.now() + 1;
            }
            if (!this.map[from.path]) {
                this.map[from.path] = Date.now();
            }
            if (this.map[to.path] > this.map[from.path]) {
                this.transitionName = 'fade-in'
            }
            else {
                this.transitionName = 'fade-out'
            }
        }
    },
    mounted() {
        // const userId = this.$getUserInfo()['userId'];
        // app.initialize(this.getScanNum);
        // this.login(userId);
        // document.addEventListener('volumeupbutton', function () {
        //     cordova.plugins.Scanner.startScan();
        // }, true);
        // document.addEventListener('volumedownbutton', function () {
        //     cordova.plugins.Scanner.stopScan();
        // }, true);
        // this.getScanNum({barcode: '0118010202107'})
    },
    methods: {
        ...mapGetters(['getUserInfo', 'getLoginData']),
        ...mapMutations(['setRongYunRes', 'setInstance', 'setToken', 'setUserInfo', 'setLoginData', 'loginOut']),
        login(userId) {
            if (localStorage.isLoginAgain == 0) {
                this.Ryinit(userId);
                localStorage.isLoginAgain = 1;
            }
            else {
                if (userId) {
                    const params = this.getLoginData();
                    if (params['bossCode']) {
                        this.workerLogin(params)
                        return
                    }
                    this.bossLogin(params)
                }
            }
        },
        // 老板登录
        bossLogin(param) {
            doLogin(param)
                .then(res => {
                    if (res.code === 0) {
                        const userInfo = {
                            unitId: res.unitId,
                            userId: res.userId,
                            role: res.role,
                            sid: res.sid,
                            permissionList: res.permissionList
                        }
                        const token = {
                            ...res.data
                        }
                        this.setUserInfo(userInfo);
                        this.setToken(token);
                        this.setLoginData(param);
                        this.Ryinit(res.userId);
                    }
                    else {
                        this.loginOut(() => {
                            this.$router.push('/login')
                        });
                    }
                });
        },
        // 工位登录
        workerLogin(param) {
            doWorkbayLogin(param)
                .then(res => {
                    if (res.code === 0) {
                        const userInfo = {
                            unitId: res.to,
                            userId: res.userId,
                            role: 0,
                            sid: res.sid,
                            permissionList: res.permissionList
                        }
                        const token = {
                            ...res.data
                        }
                        this.setUserInfo(userInfo);
                        this.setToken(token);
                        this.setLoginData(param);
                        this.Ryinit(res.userId);
                    }
                    else {
                        this.loginOut(() => {
                            this.$router.push('/login')
                        });
                    }
                });
        },
        Ryinit(userId) {
            this.fetchToken(userId).then(token => {
                // console.log(token)
                const key = process.env.RongYunKey;
                RongYunInit({
                    token: token,
                    appKey: key
                }, {
                        getMessage: this.setRongYunRes,
                        getInstance: this.getInstance
                    });
            });
        },
        // 获取融云token
        fetchToken(userId) {
            return getRongYunToken({
                userId: userId
            }).then(res => {
                return res;
            });
        },
        getInstance(instance) {
            this.instance = instance;
            this.setInstance(instance);
        },
        handleDisconnect() {
            this.instance.disconnect();
        },
        getScanNum(result) {
            if (result) {
                let pathList = ['/mission/report', '/mission/nodedetail', '/mission/wymScanResult', '/mission/scanEntrance']
                if (pathList.includes(this.$route.path)) {
                    this.$store.commit('setBarCode', { barcode: result.barcode, timeStamp: Math.round(new Date().getTime() / 1000) });
                }
                else {
                    this.$vux.alert.show({
                        title: '提示',
                        content: '当前页面不支持扫码'
                    });
                }
            }
        }
    }
}
</script>

<style scoped lang="less">
@import '../assets/style/vars.less';

.nf-scroll-view {
    overflow: hidden;
}
.nf-router-view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
.loading-box {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    // background: rgba(255, 255, 255, .9);
    .inline-loading {
        margin-top: -100px;
    }
}
.fade-out-enter-active,
.fade-out-leave-active,
.fade-in-enter-active,
.fade-in-leave-active {
    will-change: opacity;
    transition: opacity 0.2s;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-perspective: 1000;
    perspective: 1000;
}
.fade-out-enter {
    opacity: 1;
}
.fade-out-leave-active {
    opacity: 0;
}
.fade-in-enter {
    opacity: 0;
}
.fade-in-leave-active {
    opacity: 1;
}
.pop-out-enter-active,
.pop-out-leave-active,
.pop-in-enter-active,
.pop-in-leave-active {
    will-change: transform;
    transition: transform 0.3s, opacity 0.3s;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-perspective: 1000;
    perspective: 1000;
}
.pop-out-enter {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
}
.pop-out-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
}
.pop-in-enter {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
}
.pop-in-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
}
</style>
