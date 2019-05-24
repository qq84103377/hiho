<template>
    <div class="invalid-goods">
        <div class="header black">
            <i class="icon-back" @click="$router.go(-1)"></i>
            <div class="title">失效商品清单({{count}})</div>
            <div @click="allDel" class="clear-list fs16">清空列表</div>
        </div>
       <div class="goods-list">
           <scroller
               ref="invalidGoodsScroller"
               class="scroller-top"
               noDataText="海量货品尽在嗨货"
               :on-refresh="refresh"
               :on-infinite="infinite">
               <div>
                   <group v-for="(item,index) in invalidList" :key="index">
                       <div class="border-b">
                           <cell :border-intent="false">
                               <div slot="title" class="fs16">{{item.brandName}}</div>
                               <div slot="icon" class="brand-logo">
                                   <i :class="['icon-checkbox',{'is-active':item.check}]"
                                      @click="selectBrand(item)"></i>
                               </div>
                           </cell>
                       </div>
                       <div style="position: relative;" :key="$index" v-for="($item,$index) in item.shopCartItem">
                           <div v-if="$item.goodsStatus == 1" class="mask">
                               <div class="mask-tip goods-down">
                                   <div class="goods-tip">已下架</div>
                               </div>
                           </div>
                           <div v-else-if="$item.goodsStatus == 0&&$item.stock == 0" class="mask">
                               <div class="mask-tip"></div>
                           </div>
                           <div class="goods-item">
                               <div class="check-box"><i :class="['icon-checkbox',{'is-active':$item.check}]"
                                                         @click="selectGoods($item)"></i></div>
                               <div class="goods-main">
                                   <cell style="position: relative;" :border-intent="false">
                                       <!--<img slot="icon" class="goods-img" :src="$item.goodsImage" />-->
                                       <div slot="icon" class="goods-img cover-bg-img" :style="{backgroundImage:'url(' + $item.goodsImage + ')'}"></div>
                                       <div class="good-msg" slot="title">
                                           <div class="goods-name">{{$item.goodsName}}</div>
                                           <div class="fs12 dark-gray pdb4">款式<span class="pdl4">{{$item.style}}</span>
                                           </div>
                                           <div class="fs12 dark-gray pdb4">款号<span class="pdl4">{{$item.styleNo}}</span>
                                           </div>
                                           <div>
                                               <x-button @click.native="getSpecList($item)" class="tag-btn select-size-btn"
                                                         mini>
                                                   <span>{{$item.goodsSpecName}}</span><i
                                                   class="icon-dropdown" style="display: inline-block;"></i></x-button>
                                           </div>
                                       </div>
                                       <div class="goods-price">￥{{$item.salePrice}}</div>
                                   </cell>
                                   <checker class="size-list" v-show="$item.show" type="radio"
                                            default-item-class="select-item blue-gray-bg light-gray"
                                            selected-item-class="is-active">
                                       <checker-item v-if="spec.stock" @on-item-click="selectSpec($item,spec)" :value="spec.id"
                                                     v-for="(spec,specIndex) in $item.specList" :key="specIndex">
                                           {{spec.name}}
                                       </checker-item>
                                   </checker>

                                   <div class="order-remark">
                                       <span>备注: {{$item.remark?$item.remark:'暂无备注'}}</span>
                                       <!--<i class="icon-cart-edit"></i>-->
                                   </div>
                               </div>
                           </div>
                           <div class="btn-group">
                               <x-button @click.native="itemDel($item)" class="action-btn" mini type="warn" :plain="true">
                                   清除
                               </x-button>
                               <x-button @click.native="goodsAddShopcar($item,$index,item)" class="action-btn" mini
                                         style="margin-top: 0;" type="primary">重新购买
                               </x-button>
                           </div>
                       </div>
                   </group>
                   <!--<divider style="color: #C4C4CB" class="fs10" v-if="endTip">海量货品尽在嗨货</divider>-->
               </div>
           </scroller>
       </div>
        <div class="footer dark-gray">
            <span class="footer-tip">已勾选{{selectNum}}件</span>
            <x-button @click.native="batchAdd" class="action-btn" mini type="primary">重新购买</x-button>
            <x-button @click.native="batchDel" class="action-btn" mini style="margin-top: 0;" type="warn" :plain="true">
                清除
            </x-button>
        </div>

        <div v-transfer-dom>
            <confirm dialog-transition="" v-model="delPop"
                     :title="'确定清除商品?'"
                     @on-cancel="delPop = false"
                     @on-confirm="delGoods(delGoodsParams)">
            </confirm>
        </div>

        <div v-transfer-dom>
            <confirm dialog-transition="" v-model="addPop"
                     :title="'确定加入进货车?'"
                     @on-cancel="addPop = false"
                     @on-confirm="addShopcar">
            </confirm>
        </div>
    </div>
</template>

<script>
    import {TransferDomDirective as TransferDom} from 'vux'
    import {getInvalidShopCartsH5, batchRemoveH5, editStockPage} from '@/api/cart'
    import {addGoodsCartH5} from '@/api/activity'

    export default {
        name: "invalid-goods",
        directives: {
            TransferDom
        },
        data() {
            return {
                demo1Checkbox: 0,
                invalidList: [],
                delPop: false,
                addPop: false,
                delGoodsParams: [],
                addShoprCarList: {},
                count: 0,
                pageNum: 0,
                invalidNum: 0
            }
        },
        computed: {
            selectNum() {
                this.invalidNum = 0
                let selectNum = 0,
                    arr = [],
                    addShoprCarList = []
                for (let i = 0; i < this.invalidList.length; i++) {
                    let brandCheckNum = 0
                    for (let j = 0; j < this.invalidList[i].shopCartItem.length; j++) {
                        if (this.invalidList[i].shopCartItem[j].check) {
                            addShoprCarList.push({
                                userId: this.$store.getters.userInfo.id,
                                goodsId: this.invalidList[i].shopCartItem[j].goodsId,
                                goodsSpecId: this.invalidList[i].shopCartItem[j].goodsSpecId,
                                remark: this.invalidList[i].shopCartItem[j].remark,
                                goodsShopCartId: this.invalidList[i].shopCartItem[j].goodsShopCartId,
                            })
                            if(this.invalidList[i].shopCartItem[j].stock == 0 || this.invalidList[i].shopCartItem[j].goodsStatus == 1){
                                this.invalidNum++
                            }
                            selectNum++
                            brandCheckNum++
                            arr.push(this.invalidList[i].shopCartItem[j].goodsShopCartId)
                        }
                    }
                    this.$set(this.invalidList[i], 'check', brandCheckNum >= this.invalidList[i].shopCartItem.length)
                }
                if (!this.delPop) {
                    this.delGoodsParams = arr
                    this.addShoprCarList = {goodsShopCartParams: addShoprCarList}
                }
                return selectNum
            }
        },
        methods: {
            async refresh(done) {
                done(true)
                this.pageNum = 1
                await this.getInvalidList(done)
            },
            async infinite(done) {
                this.pageNum++
                await this.getInvalidList(done)
            },
            addShopcar() {
                addGoodsCartH5(this.addShoprCarList).then(res => {
                    if (res.code == 0) {
                        this.pageNum = 1
                        this.getInvalidList()
                        // this.$getCartNum(this.$store.getters.userInfo.id)
                        this.$store.dispatch('getCartNum',this.$store.getters.userInfo.id)
                        this.show = false
                        this.$vux.toast.show({
                            type: 'text',
                            text: '加入进货车成功'
                        })
                    }
                })
            },
            goodsAddShopcar(item, index, arr) {
                this.addPop = true
                this.addShoprCarList = {
                    goodsShopCartParams: [
                        {
                            ...item,
                            // goodsShopCartId: item.goodsShopCartId,
                            userId: this.$store.getters.userInfo.id,
                            // goodsId: item.goodsId,
                            // goodsSpecId: item.goodsSpecId,
                            // remark: item.remark
                        }
                    ]
                }
            },
            allDel() {
                this.delPop = true;
                let arr = []
                for (let i = 0; i < this.invalidList.length; i++) {
                    for (let j = 0; j < this.invalidList[i].shopCartItem.length; j++) {
                        arr.push(this.invalidList[i].shopCartItem[j].goodsShopCartId)
                    }
                }
                this.delGoodsParams = arr
            },
            itemDel(item) {
                this.delPop = true;
                this.delGoodsParams = []
                this.delGoodsParams.push(item.goodsShopCartId)
                console.log(this.delGoodsParams);
            },
            batchAdd() {
                if (!this.selectNum) return
                if (this.invalidNum) {
                    this.$vux.toast.show({
                        type: 'text',
                        text: '请选择有库存或已上架的商品进行购买'
                    })
                    return
                }
                this.addPop = true
            },
            batchDel() {
                if (!this.selectNum) return
                this.delPop = true
            },
            delGoods(params) {
                console.log(params);
                batchRemoveH5(params).then(res => {
                    if(res.code===0){
                        this.pageNum = 1
                        this.getInvalidList()
                        // this.$refs.invalidGoodsScroller.triggerPullToRefresh()
                    }
                })
            },
            selectBrand(item) {
                this.$set(item, 'check', !item.check)
                for (let i = 0; i < item.shopCartItem.length; i++) {
                    this.$set(item.shopCartItem[i], 'check', item.check)
                }
            },
            selectGoods(item) {
                this.$set(item, 'check', !item.check)
            },
            selectSpec(item, spec) {
                item.goodsSpecId = spec.id
                item.goodsSpecName = spec.name
            },
            getSpecList(item) {
                console.log(item);
                this.$set(item, 'show', !item.show)
                if (item.specList) return
                let params = {goodsId: item.goodsId}
                editStockPage(params).then(res => {
                    console.log(res.data.goodsSpecSimpleParamList);
                    this.$set(item, 'specList', res.data.goodsSpecSimpleParamList)
                })
            },
            async getInvalidList(done) {
                let params = {
                    userId: this.$store.getters.userInfo.id,
                    pageSize: 10,
                    pageNum: this.pageNum,
                }
                await getInvalidShopCartsH5(params).then(res => {
                    if(res.code===0){
                        if(res.data.shopCartBrandUnits.length==0){
                            if (this.pageNum === 1) this.invalidLis = []
                            if (done) return done(true)
                        }
                        this.count = res.data.totalSpecNum
                        this.invalidList =this.pageNum===1?res.data.shopCartBrandUnits: this.invalidList.concat(res.data.shopCartBrandUnits)
                        if (done) done()
                        console.log('失效第'+this.pageNum+'页')
                        console.log(this.invalidList.length,res.data.totalCount)
                    }
                })
            }
        },
        created() {
        }
    }
</script>

<style rel="stylesheet/scss" lang="less">
    @import '../../assets/style/vars.less';

    .invalid-goods {
        .weui-cells {
            margin-top: 0;
        }
        .goods-item {
            .weui-cell {
                padding-left: 0;
            }
        }
    }

</style>

<style lang="less" scoped>
    @import '../../assets/style/vars.less';
    .invalid-goods {
        padding-top: 44px;

        .header {
            background: #fff;
            height: 44px;
            align-items: center;
            z-index: 99;
            padding: 0 16px;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            border-bottom: 1px solid #eee;
            i {
                position: absolute;
                left: 16px;
                top: 50%;
                transform: translateY(-50%);
            }
            .title {
                text-align: center;
                font-size: 18px;
                line-height: 44px;
            }
            .clear-list {
                position: absolute;
                right: 16px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .goods-list{
            position: relative;
            height:100%;
            width: 100%;
        }
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
        }
        .mask{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,.5);
            z-index: 99;
            .mask-tip{
                padding: 0 11px;
                width: 84px;
                height: 62px;
                background: rgba(0,0,0,.5);
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                background: url("../../assets/icon/sign-soldout@2x.png") no-repeat;
                background-size: cover;
                &.goods-down{
                    background: none;
                    width: auto;
                    height: auto;
                }
                .goods-tip{
                    padding: 10px;
                    background: rgba(0,0,0,.5);
                    color: #fff;
                }
            }
        }
        .goods-item {
            display: flex;
            border-bottom: 1px solid #eee;
            .check-box {
                flex: 0 0 54px;
                display: flex;
                align-items: center;
                justify-content: center;
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
                    margin-top: 84px;
                }
                .order-remark {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 12px;
                    margin: 0 16px 12px 0;
                    padding: 6px 8px;
                    color: @light-gray;
                    background-color: @gray-white-bg;
                    .icon-mine_info-edit {
                        font-size: 12px;
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
                    margin: 0 auto 10px;
                    background-color: @gray-white-bg;
                    &::before {
                        content: '';
                        position: absolute;
                        z-index: 2;
                        top: -8px;
                        left: 100px;
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-bottom: 10px solid @gray-white-bg;
                    }
                    .select-item {
                        font-size: 10px;
                        text-align: center;
                        min-width: 73px;
                        padding: 0 8px;
                        line-height: 24px;
                        margin-bottom: 6px;
                        margin-right: 4px;
                        &.is-active {
                            color: #fff !important;
                            background-color: #797988;
                        }
                    }
                }
            }
        }
        .btn-group {
            padding: 8px 16px;
            border-bottom: 1px solid #eee;
            text-align: right;
            .action-btn {
                width: 88px;
                padding: 0;
            }
        }
        .footer {
            font-size: 12px;
            border-top: 1px solid #eee;
            padding: 8px 16px;
            position: fixed;
            background: #fff;
            z-index: 99;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: right;
            .footer-tip {
                line-height: 32px;
                float: left;
            }
            .action-btn {
                width: 98px;
                float: right;
                &:nth-child(3) {
                    margin-right: 5px;

                }
            }
        }
    }
</style>
