<template>
    <div class="order-detail custom-body"  :class="['order-detail', 'custom-body',detailInfo.orderStatus == 'WAIT_PAY'? 'pdb48':''] ">
        <div class="main-content">
        <div class="status-banner"
             :class="{'wait-pay':detailInfo.orderStatus==='WAIT_PAY',
                        'wait-deliver':detailInfo.orderStatus==='WAIT_SEND',
                        'wait-receive':detailInfo.orderStatus==='SENDED',
                        'cancel-already':detailInfo.orderStatus==='CANCEL'||detailInfo.orderStatus==='EXPIRE',
                        }">
            <i class="pay-icon"></i>
            <span>{{getOrderStatusText(detailInfo.orderStatus)}}
                <clocker v-if="detailInfo.orderStatus==='WAIT_PAY'" @on-finish="getOrderDetail" format=" %M：%S"
                         :time="detailInfo.expireAt"></clocker>
            </span>
        </div>
        <group>
            <cell :border-intent="false">
                <div slot="title" class="fs12">订单编号: {{detailInfo.orderNum}}</div>
                <div class="fs12 black">{{detailInfo.orderAt}}</div>
            </cell>
            <cell :border-intent="false" is-link>
                <i slot="icon" class="icon-address iconNH mgr8"></i>
                <div slot="title">
                    <p class="pdb4">{{detailInfo.receiverName}}：{{detailInfo.receiverPhone}}</p>
                    <p class="fs12 light-gray">{{detailInfo.receiverAddress}}</p>
                </div>
            </cell>
        </group>
        <!--商品合计-->
        <group>
            <cell>
                <div slot="title">商品合计（{{detailInfo.goodsSum}})</div>
                <div class="black">¥{{(detailInfo.orderAmount*1).toFixed(2)}}</div>
            </cell>
            <cell>
                <div slot="title">运费</div>
                <div class="black">¥{{detailInfo.freight}}</div>
            </cell>
            <cell>
                <div slot="title">应付金额</div>
                <div class="black">¥{{(detailInfo.totalAmount*1).toFixed(2)}}</div>
            </cell>
        </group>
        <!--商品信息-->
        <group>
            <cell :border-intent="false">
                <div slot="title" class="fs16">{{detailInfo.goodsSpecsDetail[0].brandName}}</div>
                <img slot="icon" class="brand-logo" :src="detailInfo.goodsSpecsDetail[0].brandLogo">
            </cell>
            <template v-for="(item,index) in detailInfo.goodsSpecsDetail" >
                <cell class="good-detail" :border-intent="false">
                    <!--<img slot="icon" class="goods-img" :src="item.goodsPicture">-->
                    <div slot="icon" class="goods-img cover-bg-img"
                         :style="{backgroundImage:'url(' + item.goodsPicture + ')'}"></div>

                    <div class="good-msg" slot="title">
                        <div class="goods-name">{{item.goodsName}}</div>
                        <div class="fs12 dark-gray pdb4">款式<span class="pdl4">{{item.goodsStyle}}</span></div>
                        <div class="fs12 dark-gray pdb4">款号<span class="pdl4">{{item.goodsStyleNo}}</span></div>
                        <div>
                            <x-button @click.native="specClick(item)" class="tag-btn select-size-btn" mini><span>{{item.specName}}</span>
                                <i v-if="detailInfo.orderStatus==='WAIT_PAY'" class="iconNH icon-dropdown"
                                   :class="{'reverse':item.show}"></i></x-button>
                        </div>
                    </div>
                    <div class="right-content">
                        <div>
                            <x-button
                                v-if="(detailInfo.orderStatus==='WAIT_SEND'||detailInfo.orderStatus==='SENDED')&&(item.refundStatus === 'CANCEL' || item.refundStatus === null)"
                                @click.native="applyRefund(item)" mini plain type="default">售后
                            </x-button>
                            <x-button
                                v-if="(detailInfo.orderStatus==='WAIT_SEND'||detailInfo.orderStatus==='SENDED')&&!(item.refundStatus === 'CANCEL' || item.refundStatus === null)"
                                @click.native="$router.push({path:'/afterSalesDetail',query:{refundOrderId:item.refundOrderId}})"
                                mini plain type="default">售后详情
                            </x-button>
                        </div>
                        <p class="goods-price">￥{{item.price}}</p>
                    </div>
                </cell>
                <div v-show="item.show" class="size-list mgb10">
                    <div class="item" v-for="(specItem,specIndex) in item.orderGoodsSpecs" :key="specIndex">
                        <x-button @click.native="changeSpec(item,specItem)" class="tag-btn"
                                  :class="{'active':specItem.name===item.specName}" mini>{{specItem.name}}
                        </x-button>
                    </div>
                </div>
                <div class="order-remark">
                    <div class="fs12">备注：{{item.remark?item.remark:'暂无备注'}}</div>
                    <div v-if="detailInfo.orderStatus==='WAIT_PAY'"><i @click="showRemarkChange(item)"
                                                                       class="iconNH icon-cart-edit"></i></div>
                </div>
            </template>
        </group>
        <!--支付信息-->
        <group v-if="detailInfo.payStatus==='FINISHED_PAY'">
            <cell>
                <div slot="title">支付：¥{{(detailInfo.totalAmount*1).toFixed(2)}}</div>
                <div class="black">
                    <i class="iconNH icon-wxpay"
                       :class="{'icon-wxpay':detailInfo.payMethod==='WX_PAY','icon-alipay':detailInfo.payMethod==='ALI_PAY'}"></i>
                    <span>{{detailInfo.payMethod==='WX_PAY'?'微信支付':'支付宝'}}</span>
                </div>
            </cell>
            <cell>
                <div class="light-gray fs12" slot="title">支付流水号：{{detailInfo.payNum}}</div>
            </cell>
        </group>
        <!--物流信息-->
        <group v-if="detailInfo.orderStatus==='SENDED'">
            <cell>
                <div slot="title">物流公司</div>
                <div class="black">
                    <div>{{detailInfo.logisticsCompany}}</div>
                </div>
            </cell>
            <cell>
                <div class="black" slot="title">物流单号</div>
                <div class="black">{{detailInfo.logisticsNum}}</div>
            </cell>
        </group>
    </div>
        <!--底部操作栏-->
        <div v-if="detailInfo.orderStatus ==='WAIT_PAY'" class="footer">
            <div>
                <x-button @click.native="cancelOrderVisible = true" mini plain type="default">取消订单</x-button>
            </div>
            <div>
                <x-button @click.native="isPayMethodVisible = true" mini plain type="warn">去支付</x-button>
            </div>
        </div>
        <!--选择退款类型-->
        <actionsheet v-model="isRefundVisible">
            <div slot="header">
                <div class="refund-type-list">
                    <cell :border-intent="false" is-link
                          :link="{path:'/refund',query:{type:'MONEY_ONLY',info:refundInfo}}">
                        <i slot="icon" class="iconNH icon-refund mgr16"></i>
                        <div slot="title">
                            <p class="pdb4">仅退款</p>
                            <p class="fs12 light-gray">未收到货(包含未签收)，或卖家协商同意前</p>
                        </div>
                    </cell>
                    <cell v-if="detailInfo.orderStatus==='SENDED'" :border-intent="false" is-link
                          :link="{path:'/refund',query:{type:'MONEY_GOODS',info:refundInfo}}">
                        <i slot="icon" class="iconNH icon-refund-goods mgr16"></i>
                        <div slot="title">
                            <p class="pdb4">退货退款</p>
                            <p class="fs12 light-gray">已收到货，需要退换已收到货品</p>
                        </div>
                    </cell>
                </div>
            </div>
        </actionsheet>
        <!--选择支付类型-->
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

        <!--修改备注弹出层-->
        <div v-transfer-dom>
            <confirm dialog-transition="" v-model="isChangeRemarkVisible"
                     title="修改备注"
                     @on-confirm="changeOrderRemark">
                <div solt="content">
                    <group>
                        <x-textarea  v-model="editingRemark"></x-textarea>
                    </group>
                </div>
            </confirm>
        </div>
        <!--取消订单确认框-->
        <div v-transfer-dom>
            <confirm dialog-transition="" v-model="cancelOrderVisible"
                     title="确定取消订单?"
                     @on-cancel="cancelOrderVisible = false"
                     @on-confirm="cancelOrder">
            </confirm>
        </div>
        <div v-transfer-dom>
            <confirm dialog-transition="" v-model="isEdit"
                     title="提示"
                     content="确定要更换商品规格吗?"
                     @on-cancel="isEdit = false"
                     @on-confirm="editSpc">
            </confirm>
        </div>
    </div>
</template>

<script>
    import {TransferDomDirective as TransferDom} from 'vux'
    import {getOrderDetail, cancelOrder, repay, saveOrderRemark, saveOrderSpec} from '@/api/order.js'

    export default {
        name: 'orderDetail',
        directives: {
            TransferDom
        },
        data() {
            return {
                cancelOrderVisible: false,
                detailInfo: {},
                isRefundVisible: false,
                isPayMethodVisible: false,
                isChangeRemarkVisible: false,
                editingRemark: '',
                editingOrderSpecId: '',
                refundInfo: {},
                isEdit: false,
                params: {}
            }
        },
        methods: {
            applyRefund(item) {
                this.refundInfo = item
                this.refundInfo.orderId = this.detailInfo.id
                this.refundInfo.payMethod = this.detailInfo.payMethod
                this.refundInfo.freight = this.detailInfo.freight
                this.refundInfo.receiverInfo = {
                    name: this.detailInfo.receiverName,
                    address: this.detailInfo.receiverAddress,
                    phone: this.detailInfo.receiverPhone,
                }
                this.isRefundVisible = true
            },
            getOrderDetail() {
                let params = {
                    id: this.$route.query.id
                }
                getOrderDetail(params).then(res => {
                    if (res.code === 0
                    ) {
                        this.detailInfo = res.data
                    }
                    console.log(this.detailInfo)
                })
            },
            getOrderStatusText(status) {
                let statusText = ''
                switch (status) {
                    case 'WAIT_PAY':
                        statusText = '待支付';
                        break;
                    case 'WAIT_SEND':
                        statusText = '已付款，等待发货';
                        break;
                    case 'SENDED':
                        statusText = '已发货';
                        break;
                    case 'CANCEL':
                        statusText = '已被主动取消';
                        break;
                    case 'EXPIRE':
                        statusText = '支付超时，已取消';
                        break;
                }
                return statusText
            },
            // 点击规格的时候
            specClick(item) {
                if (this.detailInfo.orderStatus === 'WAIT_PAY') {
                    this.$set(item,'show',!item.show)
                }
            },
            editSpc() {
                saveOrderSpec(this.params).then(res => {
                    if (res.code === 0) {
                        this.$vux.toast.text('更换成功')
                        this.getOrderDetail()
                    }
                })
            },
            // 处于待支付状态时，更换商品规格
            changeSpec(item, specItem) {
                let that = this;
                if (item.specName != specItem.name) {
                    this.isEdit = true
                    this.params = {
                        orderSpecId: item.id,
                        newGoodsSpecId: specItem.id,
                    }
                }
            },
            // 取消订单
            cancelOrder() {
                let that = this;
                let params = {
                    orderIds: [this.detailInfo.id]
                }
                cancelOrder(params).then(res => {
                    if (res.code === 0
                    ) {
                        this.$vux.toast.show({
                            text: '订单已取消',
                            type: 'text',
                            onHide() {
                                that.getOrderDetail()
                            }
                        })
                    }
                })
            },
            // 支付
            goPay(type) {

                let that = this;
                let params = {
                    orderId: this.detailInfo.id,
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
                                    that.getOrderDetail()
                                }
                            })
                        }, function (reason) {
                            that.$vux.toast.show({
                                text: reason,
                                type: 'cancel',
                                onHide() {
                                    that.getOrderDetail()
                                }
                            })
                        });
                    }
                    if (res.code === 0 && type === 'ALI_PAY') {
                        cordova.plugins.alipay.payment(res.data, function success(e) {
                            that.$vux.toast.show({
                                text: '支付成功',
                                onHide() {
                                    that.getOrderDetail()
                                }
                            })
                        }, function error(e) {
                            that.$vux.toast.show({
                                text: '支付失败',
                                type: 'cancel',
                                onHide() {
                                    that.getOrderDetail()
                                }
                            })
                        });
                    }
                })
            },
            // 修改备注
            changeOrderRemark() {
                let that = this;
                let params = {
                    orderSpecId: this.editingOrderSpecId,
                    remark: this.editingRemark
                }
                saveOrderRemark(params).then(res => {
                    if (res.code === 0
                    ) {
                        this.$vux.toast.show({
                            text: '修改成功',
                            type: 'success',
                            onHide() {
                                that.getOrderDetail()
                            }
                        })

                    }
                })
            },
            showRemarkChange(item) {
                this.isChangeRemarkVisible = true
                this.editingRemark = item.remark
                this.editingOrderSpecId = item.id
            }
        },
        beforeCreate: function () {
            window.repayTimer = ''
        },
        created() {
            this.getOrderDetail()
        },
        activated () {
            this.isRefundVisible = false
            this.isSpecListVisible = false
            this.isPayMethodVisible = false
            this.isChangeRemarkVisible = false
            this.getOrderDetail()
        },
        beforeDestroy() {
            clearInterval(repayTimer)
        }
    }
</script>

<style rel="stylesheet/scss" lang="less">
    @import '../../../assets/style/vars.less';

    .order-detail {
        .weui-cells {
            margin-top: 8px !important;
        }
        .footer {
            .weui-btn_mini {
                font-size: 12px;
                min-width: 82px !important;
            }
        }
        .good-detail {
            align-items: stretch;
        }
        .tag-btn.select-size-btn {
            background-color: @gray-white-bg !important;
        }
        .size-list {
            .weui-btn_mini {
                width: 64px !important;
                margin: 5px 2px;
            }
        }
    }


</style>

<style rel="stylesheet/scss" lang="less" scoped>
    @import '../../../assets/style/vars.less';
    .pdb48{
        padding-bottom:48px;
    }
    .order-detail {
        .status-banner {
            height: 60px;
            line-height: 60px;
            font-size: 14px;
            padding: 0 15px 0 26px;
            color: #fff;
            .pay-icon {
                display: inline-block;
                vertical-align: middle;
                width: 26px;
                height: 26px;
                margin-right: 8px;
            }
            &.wait-pay {
                background: linear-gradient(left, #F95C6A, #EF3C4E);
                .pay-icon {
                    background: url('../../../assets/icon/order_paying@3x.png') no-repeat center center;
                    background-size: cover;
                }
            }
            &.wait-deliver {
                background: @dark-gray;
                .pay-icon {
                    background: url('../../../assets/icon/order_finish-deliver@3x.png') no-repeat center center;
                    background-size: cover;
                }
            }
            &.wait-receive {
                background: @black;
                .pay-icon {
                    background: url('../../../assets/icon/order_pay-finish@3x.png') no-repeat center center;
                    background-size: cover;
                }
            }
            &.cancel-already {
                background: #B5B2AF;
                .pay-icon {
                    background: url('../../../assets/icon/order_fail@3x.png') no-repeat center center;
                    background-size: cover;
                }
            }

        }
        .icon-order_wechat-pay-s {
            width: 16px;
            height: 16px;
            margin-right: 6px;
            color: #41B035;
        }
        .icon-cart_alipay-l {
            width: 16px;
            height: 16px;
            margin-right: 6px;
            color: @blue;
        }
        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100vw;
            height: 48px;
            padding: 0 16px;
            background: @gray-white-bg;
            box-shadow: 0 -1px 2px rgba(0, 0, 0, .1);
        }
        .address-logo {
            display: block;
            width: 14px;
            margin-right: 8px;
        }
        .brand-logo {
            display: block;
            width: 24px;
            height: 24px;
            margin-right: 10px;
        }
        .good-msg {
            padding-right: 15px;
            .goods-name {
                font-size: 13px;
                min-height: 40px;
                vertical-align: top;
                padding-bottom: 8px;
            }
        }
        .goods-img {
            display: block;
            width: 82px;
            height: 82px;
            margin-right: 10px;
        }
        .right-content {
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: space-between;
            .goods-price {
                font-size: 14px;
                color: @red;
            }
        }
        .order-remark {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            margin: 0 16px 12px;
            padding: 6px 8px;
            color: @light-gray;
            background-color: @gray-white-bg;
            .iconNH {
                margin-left: 5px;
            }
        }
        .icon-cart_dropdown-s {
            font-size: 8px !important;
            margin-left: 5px;
        }
        .size-list {
            position: relative;
            width: 288px;
            padding: 5px 9px;
            margin-left: 70px;
            background-color: @gray-white-bg;
            &::before {
                content: '';
                position: absolute;
                z-index: 2;
                top: -8px;
                left: 80px;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid @gray-white-bg;
            }
            .item {
                display: inline-block;
                width: 25%;
                text-align: center;
            }

        }
        .refund-type-list {
            text-align: left;
            background-color: #fff;
        }

        .icon-dropdown.reverse {
            transform: rotatex(180deg);
        }

    }

</style>
