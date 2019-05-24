<template>
    <div class="mine-index custom-body">
        <div class="header clearfix">
            <div  @click="$router.push('/info')" class="msg-icon">
                <i class="iconNH icon-info-w"></i>
                <badge v-if="hasMsg" class="badge"></badge>
            </div>
            <div class="fl clearfix">
                <div class="img mgr16 fl mgt62 mgl26">
                    <x-img :src="form.headImgPath" :default-src="imgUrl"></x-img>
                </div>
                <div class="text fr mgt62">
                    <div style="display: flex;align-items: center;" class="fs16 gray">{{form.name}}<span
                        class="edit icon-edit " @click.prevent="$router.push('/mine/myEdit')"></span></div>
                    <!-- <div class="vip fs12 center mgt8">VIP1</div> -->
                    <div class="vip"><img src="../../assets/icon/mine_tag-vip1@3x.png" alt=""></div>
                </div>
            </div>
        </div>
        <group>
            <cell title="我的订单" value="查看全部" is-link :border-intent="true"
                  @click.native="$router.push('/orderList')"></cell>
        </group>
        <ul class="icon-btn white-bg">
            <li @click="goOrderList(item.status)" v-for="(item,index) in list" :key="index">
                <div class="icon-img">
                    <img :src="item.url" alt="">
                    <badge v-if="item.orderNo>0" class="cart-badge" :text="item.orderNo"></badge>
                </div>
                <div class="dark-gray fs10">{{item.txt}}</div>
            </li>
        </ul>
        <group class="mgt8 main-content">
            <cell title="退款/售后" value="查看全部" is-link @click.native="goSalesList"></cell>
            <cell title="邀请用户-销售业绩" is-link @click.native="$router.push('/mine/salesPerformance')"></cell>
            <cell title="地址管理" is-link @click.native="$router.push('/mine/addressList')"></cell>
            <cell title="代购价管理" is-link @click.native="$router.push('/mine/purchasePriceMag')"></cell>
            <cell title="我的VIP等级" is-link @click.native="$router.push('/mine/myVip')"></cell>
            <cell title="邀请好友" is-link @click.native="$router.push('/mine/myShare')"></cell>
            <cell title="咨询客服" is-link @click.native="$router.push('/mine/customerService')"></cell>
            <cell title="使用指南" is-link @click.native="$router.push('/mine/userGuide')"></cell>
            <cell is-link @click.native="checkUpdate(1)">
                <div slot="title">版本号 <span class="new" v-show="hasUpdate">新版本</span></div>
                <div>
                    {{appVersion.appVersion}}-{{ appVersion.currentWebVersion}}
                </div>
            </cell>
        </group>
        <div v-transfer-dom class="purchase-price-mag">
            <confirm
                class="nf-confirm"
                v-model="isUpdateVisible"
                dialog-transition=""
                :content="``"
                confirm-text="确定"
                cancel-text="取消"
                @on-confirm="updateApp">
                <!--<div solt="title" class="black fs18 bold">可更新到{{hasUpdate}}版本，是否现在更新？-->
                <!--</div>-->
                <div solt="title" class="black fs18 bold">有可更新版本，是否现在更新？
                </div>
            </confirm>
        </div>
    </div>
</template>
<script>
    import {getH5UserInfo, getH5OrderNo, hideOrderSymbol} from '@/api/mine.js'
    import {TransferDomDirective as TransferDom} from 'vux'
    import {mapState, mapGetters, mapMutations} from 'vuex'

    export default {
        name: 'mineIndex',
        directives: {
            TransferDom
        },
        data() {
            return {
                form: {headImgPath: '', name: ''},
                imgUrl: require('../../assets/icon/commom_pic-placeholder@3x.png'),
                list: [
                    {
                        url: require('../../assets/icon/mine_order-paying@2x.png'),
                        txt: '待支付',
                        status: 'WAIT_PAY',
                        orderNo: 0
                    },
                    {
                        url: require('../../assets/icon/mine_order-wait-for-deliver@2x.png'),
                        txt: '待发货',
                        status: 'WAIT_SEND',
                        orderNo: 0
                    },
                    {
                        url: require('../../assets/icon/mine_order-delivered@2x.png'),
                        txt: '已发货',
                        status: 'SENDED',
                        orderNo: 0
                    },
                    {
                        url: require('../../assets/icon/mine_order-cancel@2x.png'),
                        txt: '已取消',
                        status: 'CANCEL',
                        orderNo: 0
                    }
                ],
                appVersion: {},
                isUpdateVisible: false,
                isShow: false
            }
        },
        activated() {
            this.getOrderNum()
        },
        mounted() {
            // console.log(this.$store.dispatch('setHasUpdate', 'fgfg'),'asdasdasd'123123);
            const _this = this;
            chcp.getVersionInfo(callback);

            function callback(err, data) {
                _this.appVersion = data;
            }
        },
        computed: {
            hasUpdate() {
                return this.$store.state.message.hasUpdate
            },
            hasMsg() {
                return this.$store.state.message.hasMsg
            }
        },
        methods: {
            ...mapMutations(['setHasUpdate']),

            getOrderNum() {
                this.list.forEach(item => {
                    item.orderNo = 0
                })
                getH5OrderNo({userId: this.$store.getters.userInfo.id}).then(res => {
                    res.data.h5OrderNoOneResponses.forEach(v => {
                        let item = this.list.find(_v => _v.status == v.status)
                        if (item) {
                            item.orderNo = v.orderNo
                        }
                    })
                })
            },
            goSalesList() {
                this.$store.commit('setAfterSalesListType', '')
                this.$router.push({path: '/afterSalesList'})
            },
            goOrderList(status) {
                this.$store.commit('setOrderListType', status)
                if (status == 'SENDED' || status == 'CANCEL')
                    hideOrderSymbol({userId: this.$store.getters.userInfo.id, status: status}).then(res => {
                        console.log(res);
                    })
                this.$router.push({path: '/orderList'})
            },
            getUserInfo() {
                let params = {
                    id: this.$store.getters.userInfo.id
                }
                console.log(this.$vux)
                getH5UserInfo(params).then(res => {
                    this.form = {
                        headImgPath: res.data.headImgPath,
                        name: res.data.name
                    }
                })
            },
            checkUpdate(type) {
                // if (this.hasUpdate) {
                //     this.isUpdateVisible = true
                // } else {
                //     this.$vux.toast.text('已经是最新版本了')
                // }

                const _this = this;
                chcp.fetchUpdate(function (error, data) {
                    if (type) {
                        if (!error) {
                            _this.isUpdateVisible = true
                        } else {
                            _this.$vux.toast.text('已经是最新版本了')
                            _this.isShow = false
                        }
                    } else {
                        if (!error) {
                            _this.isShow = true
                        }
                    }

                })
            },
            updateApp() {
                // this.setHasUpdate('')
                // const _this = this;
                // _this.$vux.loading.show({
                //     text: '更新中'
                // })
                // this.setHasUpdate('')
                // chcp.installUpdate(function (error) {
                //     // alert('更新啊')
                //     _this.$vux.loading.hide()
                //     _this.$vux.toast.text('更新完成')
                //     _this.isUpdateVisible = false
                // })


                const _this = this;
                _this.$vux.loading.show({
                    text: '更新中'
                })
                chcp.installUpdate(function (error) {
                    _this.$vux.loading.hide()
                    _this.$vux.toast.text('更新完成')
                    this.isShow = false
                })
            }
        },
        created() {
            this.getOrderNum()
            this.getUserInfo()
            // this.checkUpdate()
        }
    }
</script>

<style rel="stylesheet/scss" lang="less">
    @import '../../assets/style/vars.less';

    .mine-index {
        background-color: @mine-color;
        .header {
            height: 160px;
            background-image: url('../../assets/icon/mine_info-bg@2x.png');
            background-color: @black;
            background-size: 100% 100%;
            position: relative;
            .msg-icon {
                top: 13px;
                right: 19px;
                position: absolute;
                .badge{
                    position: absolute;
                    right: -8px;
                    top: -3px;
                }
            }
            .img {
                height: 64px;
                width: 64px;
                img {
                    height: 100%;
                    width: 100%;
                    border-radius: 50%;
                }
            }
            .text {
                .vip {
                    // border:1px solid @light-gold;
                    // background:@gold;
                    height: 25px;
                    width: 38px;
                    // border-radius:8px;
                    // font-size:9px;
                    // font-weight:600;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .edit {
                margin-left: 8px;
                font-size: 20px;
                display: inline-block;
            }
        }
        // .content {
        // 重写cell样式
        .weui-cells {
            margin-top: 0 !important;
        }
        .vux-label {
            font-size: 15px !important;
        }
        .weui-cells:after, .weui-cells:before {
            left: 16px;
            content: '' !important;
        }
        .icon-btn {
            height: 78px;
            display: flex;
            li {
                flex: 1;
                text-align: center;
                margin-top: 20px;
                position: relative;
                .icon-img {
                    vertical-align: middle;
                    text-align: center;
                    img {
                        max-height: 25px;
                        max-width: 25px;
                    }
                    .cart-badge {
                        position: absolute;
                        right: 20px;
                        top: -10px;
                    }
                }
            }
        }
        // }
        .new {
            background-color: @red;
            color: #fff;
            font-size: 12px;
            height: 22px;
            line-height: 22px;
            width: 52px;
            text-align: center;
            display: inline-block;
        }
    }

</style>

<style rel="stylesheet/scss" lang="less" scoped>
    .purchase-price-mag {
        .bold {
            font-weight: 550;
        }
    }

</style>
