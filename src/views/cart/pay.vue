<template>
    <div class="custom-body pay">
        <div class="main-content">
            <!--<div @click="params.receiverInfo = {phone:123}">123</div>-->
            <!--<div @click="params.receiverInfo.phone=321">321</div>-->
            <group>
                <cell link="/address" :border-intent="false" is-link>
                    <i slot="icon" class="icon-address iconNH mgr8"></i>
                    <div slot="title" v-if="params.receiverInfo">
                        <p class="pdb4">{{params.receiverInfo.receiverName}}：{{params.receiverInfo.phone}}</p>
                        <p class="fs12 light-gray">{{params.receiverInfo.address}}</p>
                    </div>
                    <div slot="title" v-else>
                        <p class="fs12 light-gray">请选择送货地址</p>
                    </div>
                </cell>
            </group>
            <group v-for="(item,index) in params.shopCartBrandUnits" :key="index">
                <div v-if="item.shopCartItem.length>0" class="border-b">
                    <cell :border-intent="false">
                        <div slot="title" class="fs16">{{item.brandName}}</div>
                        <div slot="icon" class="brand-logo">
                            <img :src="item.brandLogo" alt="">
                        </div>
                    </cell>
                </div>
                <div class="goods-item" :key="$index" v-for="($item,$index) in item.shopCartItem">
                    <div class="goods-main">
                        <cell style="position: relative;" :border-intent="false">
                            <div slot="icon" class="goods-img cover-bg-img"
                                 :style="{backgroundImage:'url(' + $item.goodsImage + ')'}">
                            </div>
                            <!--<img slot="icon" class="goods-img"-->
                            <!--:src="$item.goodsImage" />-->
                            <div class="good-msg" slot="title">
                                <div class="goods-name">{{$item.goodsName}}</div>
                                <div class="fs12 dark-gray pdb4">款式<span class="pdl4">{{$item.style}}</span>
                                </div>
                                <div class="fs12 dark-gray pdb4">款号<span class="pdl4">{{$item.styleNo}}</span>
                                </div>
                                <div>
                                    <x-button class="tag-btn select-size-btn"
                                              mini>
                                        <span>{{$item.goodsSpecName}}</span></x-button>
                                </div>
                            </div>
                            <div class="goods-price">￥{{$item.salePrice}}</div>
                        </cell>
                        <div @click="showEditRemark($item)" class="order-remark">
                            <span>备注: {{$item.remark||'暂无备注'}}</span>
                            <i class="iconNH icon-cart-edit"></i>
                        </div>
                    </div>
                </div>
            </group>
        </div>
        <div class="footer">
            <group>
                <cell class="fs14 black" :title="'商品合计('+params.selectNum+'件)'">
                    <span class="price red">￥{{(params.totalAmount-params.totalFreight).toFixed(2)}}</span>
                </cell>
                <cell class="fs14 black" title="运费">
                    <span class="price red">￥{{params.totalFreight}}</span>
                </cell>
                <cell class="fs14 black" title="金额">
                    <div class="black">
                        合计:
                        <span class="price red">￥{{(params.totalAmount*1).toFixed(2)}}</span>
                    </div>
                </cell>
            </group>
            <group>
                <cell style="text-align: center;" class="fs14 black" title="支付方式">
                </cell>
                <cell class="fs16 black" title="微信方式">
                    <div slot="icon" class="icon-wxpay mgr16"></div>
                    <div :class="['icon-checkbox',{'is-active':check.wx}]"
                         @click="check.wx = true; check.ali=false;params.payMethod = 'WX_PAY'"></div>
                </cell>
                <cell class="fs16 black" title="支付宝方式">
                    <div slot="icon" class="icon-alipay mgr16"></div>
                    <div :class="['icon-checkbox',{'is-active':check.ali}]"
                         @click="check.ali = true;check.wx = false;params.payMethod = 'ALI_PAY'"></div>
                </cell>
            </group>
            <x-button class="full-btn" v-if="isAlreadyPay" :disabled="isAlreadyPay" type="primary">支付中...</x-button>
            <x-button class="full-btn" v-else @click.native="buy" type="primary">{{check.wx?'微信':'支付宝'}}支付<span
                class="fs14">￥</span><span
                class="fs18">{{(params.totalAmount*1).toFixed(2)}}</span></x-button>
        </div>

        <!--修改备注弹出层-->
        <div v-transfer-dom>
            <confirm dialog-transition="" v-model="isEditRemark"
                     title="修改备注"
                     @on-confirm="editRemark">
                <div solt="content">
                    <group>
                        <x-textarea :max="50" class="remark-textarea" v-model="remark"></x-textarea>
                    </group>
                </div>
            </confirm>
        </div>
    </div>
</template>

<script>
    import {placeOrderH5, payOrderH5, queryPaymentStatus, editRemark, addStock} from '@/api/cart'
    import {TransferDomDirective as TransferDom} from 'vux'

    export default {
        name: "pay",
        directives: {
            TransferDom
        },
        data() {
            return {
                remark: '',
                isEditRemark: false,
                check: {wx: true, ali: false},
                params: {},
                isAlreadyPay: false,
                editingRemarkItem: {},
                isNow: 0, //0:购物车下单支付 1:立即下单支付
            }
        },
        beforeRouteEnter(to, from, next) {
            if (from.path != '/address') {
                next(vm => {
                    vm.isNow = from.path == '/cart' ? 0 : 1
                })
            } else {
                next()
            }
        },
        // beforeRouteLeave(to, from, next) {
        //     if (this.isNow) {
        //         addStock({goodsSpecId: this.params.shopCartBrandUnits[0].shopCartItem[0].goodsSpecId})
        //     }
        //     next()
        // },
        methods: {
            // 修改备注
            editRemark() {
                let params = {
                    goodsShopCartId: this.editingRemarkItem.goodsShopCartId,
                    remark: this.remark
                }
                editRemark(params).then(res => {
                    if (res.code === 0
                    ) {
                        this.$vux.toast.show({
                            text: '修改成功',
                            type: 'success'
                        })
                        this.editingRemarkItem.remark = this.remark
                        this.remark = ''
                    }
                })
            },
            showEditRemark(item) {
                console.log(item)
                this.isEditRemark = true
                this.editingRemarkItem = item
                this.remark = item.remark
            },
            buy() {
                if (this.params.receiverInfo) {
                    let that = this
                    this.isAlreadyPay = true
                    this.params.totalAmount = (this.params.totalAmount * 1).toFixed(2)
                    this.params.isNow = this.isNow
                    console.log(this.params)
                    placeOrderH5(this.params).then(res => {
                        if (res.code === 0) {
                            // this.$getCartNum(this.$store.getters.userInfo.id)
                            this.$store.dispatch('getCartNum', this.$store.getters.userInfo.id)
                            let params = {
                                payMethod: this.params.payMethod,
                                userId: this.$store.getters.userInfo.id,
                                finPaymentId: res.data.finPaymentId,
                                totalAmount: res.data.totalAmount,
                            }
                            payOrderH5(params).then(res => {
                                if (res.code === 0 && this.params.payMethod === 'WX_PAY') {
                                    if (res.data.return_code !== 'SUCCESS' || res.data.result_code !== 'SUCCESS') {
                                        this.$vux.toast.show({
                                            text: '调起支付失败',
                                            type: 'cancel',
                                            onHide() {
                                                that.isNow = 0
                                                that.$store.commit('setOrderListType', 'WAIT_PAY')
                                                that.$router.replace('/orderList')
                                            }
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
                                    console.log(payParams,'weiwei');
                                    Wechat.sendPaymentRequest(payParams, function () {
                                        that.$vux.toast.show({
                                            text: '支付成功',
                                            onHide() {
                                                that.isNow = 0
                                                that.$store.commit('setOrderListType', 'WAIT_SEND')
                                                that.$router.replace('/orderList')

                                            }
                                        })
                                    }, function (reason) {
                                        that.$vux.toast.show({
                                            text: reason,
                                            type: 'cancel',
                                            onHide() {
                                                that.isNow = 0
                                                that.$router.replace('/orderList')
                                            }
                                        })
                                    });
                                }
                                if (res.code === 0 && this.params.payMethod === 'ALI_PAY') {
                                    cordova.plugins.alipay.payment(res.data, function success(e) {
                                        that.$vux.toast.show({
                                            text: '支付成功',
                                            onHide() {
                                                that.isNow = 0
                                                that.$store.commit('setOrderListType', 'WAIT_SEND')
                                                that.$router.replace('/orderList')
                                            }
                                        })
                                    }, function error(e) {
                                        that.$vux.toast.show({
                                            text: '支付失败',
                                            type: 'cancel',
                                            onHide() {
                                                that.isNow = 0
                                                that.$store.commit('setOrderListType', 'WAIT_PAY')
                                                that.$router.replace('/orderList')
                                            }
                                        })
                                    });
                                }
                            })
                        }
                    })
                } else {
                    this.$vux.toast.show({
                        type: 'text',
                        text: '请先选择送货地址'
                    })
                }
            }
        },
        computed: {
            addressInfo() {
                return this.$store.state.user.addressInfo
            }
        },
        created() {
            this.params = this.$store.state.user.orderInfo
            console.log(this.params, '下单信息');
            this.params.payMethod = 'WX_PAY'
            if (this.addressInfo.userAddressId) {
                this.params.receiverInfo = this.addressInfo
            }
        },
        activated() {
            if (this.addressInfo.userAddressId) {
                if (this.params.receiverInfo) {
                    this.params.receiverInfo.phone = this.addressInfo.phone
                    this.params.receiverInfo.receiverName = this.addressInfo.receiverName
                    this.params.receiverInfo.address = this.addressInfo.address
                    this.params.receiverInfo.isDefault = this.addressInfo.isDefault
                    this.params.receiverInfo.userAddressId = this.addressInfo.userAddressId
                    console.log(this.params.receiverInfo);
                } else {
                    this.params.receiverInfo = {
                        phone: this.addressInfo.phone,
                        receiverName: this.addressInfo.receiverName,
                        address: this.addressInfo.address,
                        isDefault: this.addressInfo.isDefault,
                        userAddressId: this.addressInfo.userAddressId
                    }
                }
            }
        }
    }
</script>
<style lang="less">
</style>
<style lang="less" scoped>
    @import '../../assets/style/vars.less';

    .pay {
        .border-b {
            border-bottom: 1px solid #eee;
        }
        .brand-logo {
            display: flex;
            width: 24px;
            height: 24px;
            margin-right: 10px;
            justify-content: center;
            align-items: center;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .goods-item {
            display: flex;
            border-bottom: 1px solid #eee;
            .check-box {
                flex: 0 0 54px;
                display: flex;
                /*align-items: center;*/
                justify-content: center;
                .icon-checkbox {
                    margin-top: 60px;
                }
            }
            .goods-main {
                flex: 1;
                .goods-img {
                    display: block;
                    width: 82px;
                    height: 82px;
                    margin-right: 10px;
                }
                .good-msg {
                    .goods-name {
                        font-size: 13px;
                        vertical-align: top;
                        padding-bottom: 8px;
                    }
                }
                .goods-price {
                    font-size: 14px;
                    color: @red;
                    margin-top: 64px;
                }
                .del {
                    position: absolute;
                    right: 20px;
                    top: 40px;
                }
                .order-remark {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 12px;
                    margin: 12px 15px;
                    padding: 6px 8px;
                    min-height: 30px;
                    color: @light-gray;
                    background-color: @gray-white-bg;
                    span {
                        flex: 1;
                    }
                    .icon-cart-edit {
                        width: 12px;
                        font-size: 12px;
                    }
                }

                .size-list {
                    position: relative;
                    width: 340px;
                    padding: 12px 8px 5px;
                    margin: 0 0 12px -35px;
                    /*margin-bottom: 12px;*/
                    /*margin: 0 auto 10px;*/
                    background-color: @gray-white-bg;
                    &::before {
                        content: '';
                        position: absolute;
                        z-index: 2;
                        top: -8px;
                        left: 140px;
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-bottom: 10px solid @gray-white-bg;
                    }
                    .select-item {
                        font-size: 10px;
                        text-align: center;
                        min-width: 73px;
                        padding: 0 8px;
                        line-height: 30px;
                        margin: 0 4px 8px;
                        &.is-active {
                            color: #fff !important;
                            background-color: #797988;
                        }
                    }
                }
            }
        }
        .remark-textarea {
            font-size: 14px;
            border: 1px solid @border-color;
        }
    }
</style>
