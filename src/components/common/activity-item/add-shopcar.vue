<template>
    <div class="add-shopcar">
        <div class=" shopcar gray-white-bg ">
            <div class="tip blue-gray">先选择规格再加入进货车</div>
            <checker v-model="checkValue" type="radio" default-item-class="select-item blue-gray-bg light-gray"
                     selected-item-class="is-active">
                <checker-item v-if="item.stock" v-for="(item,index) in checkList" :key="index" :value="item.id">
                    {{item.name}}
                </checker-item>
            </checker>
            <!--<div v-transfer-dom>-->
            <!--<x-dialog dialog-transition="" hide-on-blur v-model="show">-->
            <!--<div class="dialog-shopcar">-->
            <!--<div class="dialog-head black">确定加入购物车？</div>-->
            <!--<div class="dialog-content">-->
            <!--<x-textarea class="gray-white-bg" :rows="6" placeholder="请输入下单备注" v-model="remark"></x-textarea>-->
            <!--&lt;!&ndash;<div class="fs12 mgt14 light-gray">您可以在“我的”-“设置”中关闭下单备注， 之后每次下单将不再弹出此备注框&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->
            <!--<div class="dialog-footer">-->
            <!--<x-button @click.native="show=false">取消</x-button>-->
            <!--<x-button @click.native="addShopcar" type="primary">确定</x-button>-->
            <!--</div>-->
            <!--</div>-->
            <!--</x-dialog>-->
            <!--</div>-->
        </div>
        <div class="btn-content">
            <x-button @click.native="goPay"
                      :class="[' default-btn',{'blue-gray-bg light-gray':!checkValue}]"
                      :type="checkValue?'primary':''" mini><i
                :class="['iconNH','icon-add-order',{'is-active':checkValue}]"></i><i
                style="display: inline-block;vertical-align: middle;">立即下单</i>
            </x-button>
            <x-button @click.native="addShopcar"
                      :class="[' default-btn',{'blue-gray-bg light-gray':!checkValue}]"
                      :type="checkValue?'primary':''" mini><i
                :class="['iconNH','icon-shopcar',{'is-active':checkValue}]"></i><i
                style="display: inline-block;vertical-align: middle;">加入进货车</i>
            </x-button>
        </div>

    </div>
</template>

<script>
    import {TransferDomDirective as TransferDom} from 'vux'
    import {addGoodsCartH5} from '@/api/activity'
    import {placeOrderNow} from '@/api/cart'

    export default {
        name: "add-shopcar",
        props: ['checkList', 'goodsId'],
        directives: {
            TransferDom
        },
        data() {
            return {
                remark: '',
                show: false,
                checkValue: ''
            }
        },
        watch: {
            show(v) {
                if (v) this.remark = ''
            }
        },
        methods: {
            goPay() {
                const params = {
                    userId: this.$store.getters.userInfo.id,
                    goodsId: this.goodsId,
                    goodsSpecId: this.checkValue
                }
                placeOrderNow(params).then(res => {
                    if(res.code==0){
                        const {receiverInfo,shopCartBrandUnits} = res.data
                        const {salePrice,freight} = res.data.shopCartBrandUnits[0].shopCartItem[0]
                        shopCartBrandUnits[0].payAmount = salePrice
                        const info = {
                            payMethod: "WX_PAY",
                            receiverInfo,
                            selectNum: 1,
                            shopCartBrandUnits,
                            totalAmount: salePrice+freight,
                            totalFreight: freight,
                            userId: this.$store.getters.userInfo.id
                        }
                        this.$store.commit('setOrderInfo', info)
                        this.$router.push(`/pay`)
                    }else {
                        this.$vux.toast.text(res.msg)
                    }
                })
            },
            addShopcar() {
                if (this.checkValue === '') {
                    this.$vux.toast.show({
                        type: 'text',
                        text: '请选择规格'
                    })
                    return
                }
                let params = {
                    goodsShopCartParams: [
                        {
                            userId: this.$store.getters.userInfo.id,
                            goodsId: this.goodsId,
                            goodsSpecId: this.checkValue,
                            remark: this.remark
                        }
                    ]
                }
                addGoodsCartH5(params).then(res => {
                    this.show = false
                    if (res.code == 0) {
                        // this.$getCartNum(this.$store.getters.userInfo.id)
                        this.checkValue = ''
                        this.$store.dispatch('getCartNum',this.$store.getters.userInfo.id)
                        this.$vux.toast.show({
                            type: 'text',
                            text: '添加成功'
                        })
                    }
                })
            }

        }
    }
</script>

<style lang="less" scoped>
    .add-shopcar {
        .shopcar {
            padding: 12px 8px 5px;
            /*padding-right: 0;*/
            .tip {
                font-size: 10px;
                margin-bottom: 6px;
                padding-left: 4px;
            }
            .select-item {
                font-size: 10px;
                text-align: center;
                min-width: 72px;
                padding: 0 8px;
                line-height: 30px;
                margin: 0 3px 8px;
                /*&:nth-of-type(4n+0) {*/
                /*margin-right: 0;*/
                /*}*/
                &.is-active {
                    color: #fff !important;
                    background-color: #797988;
                }
            }
        }
        .btn-content {
            margin-top: 8px;
            text-align: right;
            .default-btn {
                border: 0.026667rem solid transparent;
                &::after {
                    border-color: transparent;
                }
            }
        }

    }

    /*.dialog-shopcar{*/
    /*padding: 0 16px;*/
    /*.dialog-head{*/
    /*font-size: 18px;*/
    /*padding: 26px 0 20px;*/
    /*border-bottom: 1px solid #D6D6DE;*/
    /*}*/
    /*.dialog-content{*/
    /*margin-top: 20px;*/
    /*textarea{*/
    /*padding: 12px;*/
    /*font-size: 16px;*/
    /*margin-bottom: 14px;*/
    /*}*/
    /*}*/
    /*.dialog-footer{*/
    /*margin-top: 26px;*/
    /*margin-bottom: 30px;*/
    /*display: flex;*/
    /*button{*/
    /*font-size: 14px;*/
    /*line-height: 42px;*/
    /*background-color: #fff;*/
    /*!*float: left;*!*/
    /*!*width: 50%;*!*/
    /*&:nth-child(2){*/
    /*margin-top: 0;*/
    /*margin-left: 8px;*/
    /*}*/
    /*}*/
    /*}*/
    /*}*/
</style>
