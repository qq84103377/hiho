<template>
    <div>
        <scroller
            ref="orderListScroller"
            noDataText="海量货品尽在嗨货"
            :on-refresh="refresh"
            :on-infinite="infinite">
            <group v-for="(item,index) in orderList" :key="index">
                <cell :border-intent="false">
                    <div slot="title" class="fs16">{{item.brandName}}</div>
                    <img slot="icon" class="brand-logo" :src="item.brandPicPath">
                    <div v-if="item.status==='WAIT_PAY'" class="fs14 red">待支付&nbsp;<clocker
                        @on-finish="pageNum=1;getOrderList()" format=" %M：%S" :time="item.expireAt"></clocker>
                    </div>
                    <div v-if="item.status==='CANCEL'||item.status==='EXPIRE'" class="fs14 red">
                        <div class="light-gray fs14">已取消</div>
                        <div class="blue-gray fs10">{{item.status==='EXPIRE'?'支付超时取消':'主动取消'}}</div>
                    </div>
                    <div v-if="item.status==='SENDED' || item.status==='WAIT_SEND'" class="fs14 red">
                        <div class="light-gray fs14">{{item.status==='SENDED'?'已发货':'待发货'}}</div>
                    </div>
                </cell>
                <cell :border-intent="false">
                    <div slot="title">
                        <div aspectratio w-345-64>
                            <div v-if="item.goodsPicPaths&&item.goodsPicPaths.length>0" class="img-list"
                                 aspectratio-content>
                                <div v-for="(imgItem,imgIndex) in item.goodsPicPaths.slice(0,5)" :key="imgIndex"
                                     class="item">
                                    <div class="cover-bg-img" :style="{backgroundImage:'url(' + imgItem + ')'}"></div>
                                    <!--<x-img :src="imgItem" default-src=""></x-img>-->
                                    <div v-if="imgIndex===4" class="total-mask">共{{item.goodsPicPaths.length}}件
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </cell>
                <div class="cell-box">
                    <span class="fs14 lh32">合计: ¥{{(item.totalAmount*1).toFixed(2)}}（{{item.goodsSum}}件）</span>
                    <x-button @click.native="goDetail(item.id)" class="fr" mini plain
                                :type="item.status==='WAIT_PAY'?'warn':'default'">查看
                    </x-button>
                    <x-button v-if="item.status==='WAIT_PAY'" @click.native="orderId=item.id;isPayMethodVisible=true"
                                class="fr mgr4" mini plain
                                type="warn">去支付
                    </x-button>
                </div>
            </group>
        </scroller>

        <!--选择支付类型-->
        <div v-transfer-dom>
            <actionsheet v-model="isPayMethodVisible">
                <div slot="header">
                    <div class="refund-type-list">
                        <cell @click.native="goPay('WX_PAY')" :border-intent="false" is-link popup-style>
                            <i slot="icon" class="iconNH icon-wxpay mgr16"></i>
                            <div slot="title">微信支付</div>
                        </cell>
                        <cell @click.native="goPay('ALI_PAY')" :border-intent="false" is-link>
                            <i slot="icon" class="iconNH icon-alipay mgr16"></i>
                            <div slot="title">支付宝</div>
                        </cell>
                    </div>
                </div>
            </actionsheet>
        </div>
    </div>
</template>

<script>
    import {getH5OrderList, repay} from '@/api/order.js'
    import {TransferDomDirective as TransferDom} from 'vux'

    export default {
        props: ['orderListType'],
        directives: {
            TransferDom
        },
        data() {
            return {
                orderId: '',
                isPayMethodVisible: false,
                orderList: [],
                pageNum: 0
            }
        },
        methods: {
            // 支付
            goPay(type) {

                let that = this;
                let params = {
                    orderId: this.orderId,
                    payMethod: type,
                    userId: this.$store.getters.userInfo.id
                }
                this.isPayMethodVisible = false
                repay(params).then(res => {
                    if (res.code === 0 && type === 'WX_PAY') {
                        if (res.data.return_code !== 'SUCCESS' || res.data.result_code !== 'SUCCESS') {
                            this.$vux.toast.show({
                                text: '调起支付失败',
                                type: 'cancel'
                            })
                            return
                        }
                        let payParams = {
                            appid: res.data.appid,
                            mch_id: res.data.mch_id, // merchant id
                            prepay_id: res.data.prepay_id, // prepay id
                            nonce: res.data.finalPackage.noncestr, // nonce
                            timestamp: res.data.finalPackage.timestamp, // timestamp
                            sign: res.data.paySign // signed string
                        };
                        Wechat.sendPaymentRequest(payParams, function () {
                            that.$vux.toast.show({
                                text: '支付成功',
                                onHide() {
                                    that.getOrderList()
                                }
                            })
                        }, function (reason) {
                            that.$vux.toast.show({
                                text: reason,
                                type: 'cancel',
                                onHide() {
                                    that.getOrderList()
                                }
                            })
                        });
                    }
                    if (res.code === 0 && type === 'ALI_PAY') {
                        cordova.plugins.alipay.payment(res.data, function success(e) {
                            that.$vux.toast.show({
                                text: '支付成功',
                                onHide() {
                                    that.getOrderList()
                                }
                            })
                        }, function error(e) {
                            that.$vux.toast.show({
                                text: '支付失败',
                                type: 'cancel',
                                onHide() {
                                    that.getOrderList()
                                }
                            })
                        });
                    }
                })
            },
            refresh(done) {
                done(true)
                this.pageNum = 1
                this.getOrderList(done)
            },
            infinite(done) {
                this.pageNum++
                this.getOrderList(done)
            },
            // 根据type获取订单列表
            async getOrderList(done) {
                let params = {
                    status: this.orderListType ? this.orderListType : '',
                    userId: this.$store.getters.userInfo.id,
                    pageSize: 10,
                    pageNum: this.pageNum
                }
                await getH5OrderList(params).then(res => {
                    if (res.code === 0) {
                        if (res.data.orders.length == 0) {
                            if (this.pageNum === 1) this.orderList = []
                            if (done) done(true)
                            return
                        }
                        // 将用；号隔开的多个图片转换成数组
                        res.data.orders.forEach(item => {
                            if (item.goodsPicPaths) {
                                item.goodsPicPaths = item.goodsPicPaths.split(';')
                            }
                        })
                        this.orderList = this.pageNum === 1 ? res.data.orders : this.orderList.concat(res.data.orders)
                        if (done) done()
                        console.log(this.orderListType + '订单第' + this.pageNum + '页')
                    }
                })

            },
            goDetail(id) {
                this.$store.commit('setOrderListType', this.orderListType)
                this.$router.push({path: '/orderDetail', query: {id: id}})
            }
        },
        activated() {
            this.pageNum = 1
            this.getOrderList()
        },
        created() {
        }
    }
</script>

<style rel="stylesheet/scss" lang="less">
    .order-list {

    }
</style>

<style rel="stylesheet/scss" lang="less" scoped>
    .order-list {
        .brand-logo {
            display: block;
            width: 24px;
            height: 24px;
            margin-right: 10px;
        }
        [w-345-64] {
            width: 345px;
        }
        [w-345-64] {
            aspect-ratio: '345:64';
        }
        .cell-box{
            padding:0 12px 16px;
        }
        .img-list {
            display: flex;
            margin-bottom: 15px;
            .item {
                position: relative;
                width: 64px;
                height: 64px;
                padding-right: 0;
                margin-right: 6px;
                &:last-child {
                    margin-right: 0;
                }
                .cover-bg-img {
                    width: 100%;
                    height: 100%;
                }
                .total-mask {
                    position: absolute;
                    left: 0;
                    top: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    font-size: 12px;
                    color: #fff;
                    background-color: rgba(0, 0, 0, .5);

                }

            }
        }
    }

</style>
