<template>
    <div class="cart-index">
        <!--<div class="header black">进货车-->
            <!--&lt;!&ndash;<span @click="$router.push('/invalidGoods')">失效清单</span>&ndash;&gt;-->
        <!--</div>-->
        <div class="car-content">
            <scroller
                ref="carIndexScroller"
                noDataText="海量货品尽在嗨货"
                :on-refresh="refresh"
                :on-infinite="infinite">
                <div>
                    <div class="tip-bar brown">
                        <div style="line-height: normal">
                            <div class="fs14 black">已失效商品<span class="red">{{invalidNum}}</span>件</div>
                            <div class="fs12 light-gray">购物车里的商品15分钟内有效，请及时完成支付操作</div>
                        </div>
                        <div class="view-more" @click="$router.push('/invalidGoods')">查看</div>
                    </div>
                    <group class="mgb8">
                        <cell link="/address" :border-intent="false" is-link>
                            <i slot="icon" class="icon-address iconNH mgr8"></i>
                            <div slot="title" v-if="res.receiverInfo">
                                <p class="pdb4">{{res.receiverInfo.receiverName}}：{{res.receiverInfo.phone}}</p>
                                <p class="fs12 light-gray">{{res.receiverInfo.address}}</p>
                            </div>
                            <div slot="title" v-else>
                                <p class="fs12 light-gray">请选择送货地址</p>
                            </div>
                        </cell>
                    </group>
                    <group v-for="(item,index) in res.shopCartBrandUnits" :key="index">
                        <div v-if="item.shopCartItem.length>0" class="border-b">
                            <cell :border-intent="false">
                                <div slot="title" class="fs16">{{item.brandName}}</div>
                                <div slot="icon" class="brand-logo">
                                    <i :class="['icon-checkbox',{'is-active':item.check}]"
                                       @click="selectBrand(item)"></i>
                                </div>
                            </cell>
                        </div>
                        <div class="goods-item" :key="$index" v-for="($item,$index) in item.shopCartItem">
                            <div class="check-box"><i :class="['icon-checkbox',{'is-active':$item.check}]"
                                                      @click="selectGoods($item)"></i></div>
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
                                            <x-button @click.native="getSpecList($item)" class="tag-btn select-size-btn"
                                                      mini>
                                                <span>{{$item.goodsSpecName}}</span><i
                                                class="icon-dropdown" style="display: inline-block;"></i></x-button>
                                        </div>
                                    </div>
                                    <div class="goods-price">￥{{$item.salePrice}}</div>
                                    <i class="icon-del del" @click="delPop = true;goodsItem=$item"></i>
                                    <!--<div v-transfer-dom>-->
                                    <!--<confirm dialog-transition="" v-model="delPop"-->
                                    <!--:title="'确定移出购物车?'"-->
                                    <!--@on-cancel="delPop = false"-->
                                    <!--@on-confirm="delGoods($item)">-->
                                    <!--</confirm>-->
                                    <!--</div>-->
                                </cell>
                                <checker class="size-list" v-show="$item.show" type="radio"
                                         default-item-class="select-item blue-gray-bg light-gray"
                                         selected-item-class="is-active">
                                    <checker-item @on-item-click="selectSpec($item,spec)" v-if="spec.stock"
                                                  :value="spec.id" v-for="(spec,specIndex) in $item.specList"
                                                  :key="specIndex">{{spec.name}}
                                    </checker-item>
                                </checker>

                                <div @click="showEditRemark($item)" class="order-remark">
                                    <span>备注: {{$item.remark||'暂无备注'}}</span>
                                    <i class="iconNH icon-cart-edit"></i>
                                </div>
                            </div>
                        </div>
                    </group>
                </div>
            </scroller>
        </div>
        <div class="list-footer">
            <div class="footer-left fs12 dark-gray">
                <i :class="['iconNH icon-checkbox',{'is-active':isAll}]"
                   @click="selectAll"></i>全选
                <div class="count black">合计:<span class="red">￥{{totalPrice}}</span></div>
            </div>
            <div class="buy gradient-gold black" @click="buy">下单({{selectNum}})</div>
        </div>

        <div v-transfer-dom>
            <confirm dialog-transition="" v-model="delPop"
                     :title="'确定移出购物车?'"
                     @on-cancel="delPop = false"
                     @on-confirm="delGoods(goodsItem)">
            </confirm>
        </div>
        <!--修改备注弹出层-->
        <div v-transfer-dom>
            <confirm dialog-transition="" v-model="isEditRemarkVisible"
                     title="修改备注"
                     @on-confirm="editRemark">
                <div solt="content">
                        <group>
                            <x-textarea :max="50" class="remark-textarea" v-model="editingRemark"></x-textarea>
                        </group>
                </div>
            </confirm>
        </div>
    </div>
</template>

<script>
    import {TransferDomDirective as TransferDom} from 'vux'
    import {getShotCartsH5, batchRemoveH5, editStockPage, editShopCartSpecH5, editRemark} from '@/api/cart'

    export default {
        name: 'cartIndex',
        directives: {
            TransferDom
        },
        data() {
            return {
                res: {receiverInfo: {}, shopCartBrandUnits: [{shopCartItem: []}]},
                //下单数量
                selectNum: 0,
                isAll: false,
                delPop: false,
                totalFreight: 0,
                orderInfo: {shopCartBrandUnits: []},
                goodsItem: {},
                pageNum: 0,
                isEditRemarkVisible: false,
                editingRemarkItem: {},
                editingRemark: '',
                list: [],
                invalidNum: 0
            }
        },
        computed: {
            totalPrice() {
                this.selectNum = 0
                this.totalFreight = 0
                let totalPrice = 0
                let all = 0
                this.list = this.res.shopCartBrandUnits
                for (let i = 0; i < this.res.shopCartBrandUnits.length; i++) {
                    let brandCheckNum = 0
                    for (let j = 0; j < this.res.shopCartBrandUnits[i].shopCartItem.length; j++) {
                        // debugger
                        if (this.res.shopCartBrandUnits[i].shopCartItem[j].check) {
                            this.selectNum++
                            brandCheckNum++
                            totalPrice += this.res.shopCartBrandUnits[i].shopCartItem[j].salePrice
                        }
                    }
                    this.$set(this.res.shopCartBrandUnits[i], 'check', brandCheckNum >= this.res.shopCartBrandUnits[i].shopCartItem.length)
                    if (this.res.shopCartBrandUnits[i].check) {
                        all++
                    }
                }
                this.isAll = all >= this.res.shopCartBrandUnits.length && all
                return totalPrice.toFixed(2)
            },
            userId(){
                return this.$store.getters.userInfo.id
            }
        },
        watch: {
            list(val ,newVal) {
                console.log(val,newVal)
            },
            deep:true
        },
         methods: {
            selectSpec(item, spec) {
                let params = {
                    goodsShopCartId: item.goodsShopCartId,
                    goodsSpecId: spec.id
                }
                console.log(params);
                editShopCartSpecH5(params).then(res => {
                    console.log(res);
                    if (res.code == 0) {
                        item.goodsSpecId = spec.id
                        item.goodsSpecName = spec.name
                    }
                })
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
            getWeight (id, list) {
                let arr1 = list
                let hash1 = {}
                list  = arr1.reduce((item, next) => {
                    hash1[next[id]] ? '' : hash1[next[id]] = true && item.push(next);
                    return item
                }, []);
                return list
            },
            //下单
            buy() {
                if (this.selectNum) {
                    if (this.res.receiverInfo) {
                        let list = []
                        this.orderInfo.shopCartBrandUnits = []
                        list = this.getWeight('brandId', this.list)
                        for (let i = 0; i < this.list.length; i++) {
                           let temp = {...this.list[i]}
                           temp.shopCartItem = (this.res.shopCartBrandUnits[i].shopCartItem.filter(v => {
                                if (v.check) temp.payAmount += v.salePrice
                               return v.check
                           }))
                           if (temp.shopCartItem.length) this.orderInfo.shopCartBrandUnits.push(temp)
                       }
                        let freightList = []
                        list.map(i => {
                            i.shopCartItem.map(item => {
                                if(item.check) {
                                    freightList.push(item)
                                }
                            })
                        })
                        freightList = this.getWeight('brandId', freightList)
                        freightList.map(i => {
                          this.totalFreight += i.freight
                        })
                        this.orderInfo.userId = this.$store.getters.userInfo.id
                        this.orderInfo.receiverInfo = this.res.receiverInfo
                        this.orderInfo.totalAmount = Number(this.totalPrice) + this.totalFreight
                        this.orderInfo.totalFreight = this.totalFreight
                        this.orderInfo.selectNum = this.selectNum
                        this.$store.commit('setOrderInfo', this.orderInfo)
                        this.$router.push({path: '/pay'})
                    } else {
                        this.$vux.toast.show({
                            type: 'text',
                            text: '请先选择送货地址'
                        })
                    }
                }
            },
            delGoods(item) {
                batchRemoveH5([item.goodsShopCartId]).then(res => {
                    if (res.code === 0) {
                        // this.$refs.carIndexScroller.triggerPullToRefresh()
                        this.pageNum = 1
                        this.getCartList()
                        // this.$getCartNum(this.userId)
                        this.$store.dispatch('getCartNum',this.userId)
                        this.delPop = false
                    }
                })
            },
            selectAll() {
                this.isAll = !this.isAll
                for (let i = 0; i < this.res.shopCartBrandUnits.length; i++) {
                    for (let j = 0; j < this.res.shopCartBrandUnits[i].shopCartItem.length; j++) {
                        this.$set(this.res.shopCartBrandUnits[i].shopCartItem[j], 'check', this.isAll)
                    }
                }
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
            async refresh(done) {
                done(true)
                this.pageNum = 1
                this.$store.dispatch('getCartNum',this.userId)
                await this.getCartList(done)
            },
            async infinite(done) {
                this.pageNum++
                await this.getCartList(done)
            },
            async getCartList(done) {
                let params = {
                    userId: this.$store.getters.userInfo.id,
                    pageSize: 10,
                    pageNum: this.pageNum,
                }
                await getShotCartsH5(params).then(res => {
                    console.log(res)
                    if (res.code === 0) {
                        this.res.receiverInfo = res.data.receiverInfo
                        this.invalidNum = res.data.invalidNum
                        if (res.data.shopCartBrandUnits.length == 0) {
                            if (this.pageNum === 1) this.res.shopCartBrandUnits = []
                            if(done) return done(true)
                        }
                        this.res.shopCartBrandUnits = this.pageNum === 1 ? res.data.shopCartBrandUnits :
                            this.res.shopCartBrandUnits.concat(res.data.shopCartBrandUnits)
                        if(done) done()
                    }
                })
            },
            // 修改备注
            editRemark() {
                let that = this;
                let params = {
                    goodsShopCartId: this.editingRemarkItem.goodsShopCartId,
                    remark: this.editingRemark
                }
                editRemark(params).then(res => {
                    if (res.code === 0
                    ) {
                        this.$vux.toast.show({
                            text: '修改成功',
                            type: 'success'
                        })
                        this.editingRemarkItem.remark = this.editingRemark
                        this.editingRemark = ''
                    }
                })
            },
            showEditRemark(item) {
                console.log(item)
                this.isEditRemarkVisible = true
                this.editingRemarkItem = item
                this.editingRemark = item.remark
            }
        },
        activated () {
            this.pageNum = 1
            this.getCartList()
        },
        created() {
        }
    }
</script>

<style rel="stylesheet/scss" lang="less">
    @import '../../assets/style/vars.less';

    .cart-index {
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

<style rel="stylesheet/scss" lang="less" scoped>
    @import '../../assets/style/vars.less';

    .cart-index {
        /*padding-top: 45px;*/
        .car-content {
            height: 100%;
            width: 100%;
            position: relative;
            padding-bottom: 46px;
            .tip-bar{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 52px;
                .view-more{
                    margin: 0 16px 0 13px;
                    flex: 0 0 54px;
                    height: 32px;
                    line-height: 32px;
                    font-size: 12px;
                    color: @black;
                    text-align: center;
                    border: 1px solid #9898A1;
                }
            }
        }
        .header {
            background: #ffffff;
            padding: 0 16px;
            font-size: 18px;
            text-align: center;
            line-height: 45px;
            width: 100%;
            z-index: 99;
            left: 0;
            top: 0;
            position: fixed;
            border-bottom: 1px solid #eee;
            span {
                position: absolute;
                bottom: 0;
                right: 16px;
                font-size: 15px;
                float: right;
            }
        }
        // .tip {
        //     background: #FFF7E8;
        //     text-align: center;
        //     line-height: 36px;
        //     font-size: 12px;
        // }
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
        .goods-item {
            display: flex;
            border-bottom: 1px solid #eee;
            .check-box {
                flex: 0 0 54px;
                display: flex;
                /*align-items: center;*/
                justify-content: center;
                .icon-checkbox{
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
                    margin: 0 16px 12px 0;
                    padding: 6px 8px;
                    color: @light-gray;
                    background-color: @gray-white-bg;
                    span{
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
                        margin: 0 4px 8px ;
                        &.is-active {
                            color: #fff !important;
                            background-color: #797988;
                        }
                    }
                }
            }
        }
        .list-footer {
            width: 100%;
            height: 46px;
            position: fixed;
            z-index: 10;
            background: #ffffff;
            left: 0;
            bottom: 50px;
            display: flex;
            .footer-left {
                flex: 1;
                line-height: 46px;
                display: flex;
                align-items: center;
                i {
                    margin-left: 18px;
                    margin-right: 10px;
                }
                .count {
                    flex: 1;
                    font-size: 14px;
                    margin-right: 16px;
                    text-align: right;
                }
            }
            .buy {
                line-height: 46px;
                flex: 0 0 104px;
                text-align: center;
                font-size: 16px;
            }
        }
    }

    .remark-textarea {
        font-size: 14px;
        border: 1px solid @border-color;
    }
</style>
