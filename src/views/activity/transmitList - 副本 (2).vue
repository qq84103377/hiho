<template>
    <div class="custom-body transmit-list">
        <div class="main-content">
            <scroller
                ref="transmitListScroller"
                noDataText="没有商品了"
                :on-refresh="refresh"
                :on-infinite="infinite">
                <div class="tip-bar brown">提示：转发时现价=销售价+标准代购价+加价</div>
                <group>
                    <cell @click.native="goodsClick(item,index)" v-for="(item,index) in goodsList" :key="index"
                          :border-intent="false" class="item" align-items="flex-start">
                        <i slot="icon" :class="['iconNH icon-checkbox',{' is-active':item.selected}]"></i>
                        <div slot="title" class="goods-info">
                            <div class="goods-img cover-bg-img" :style="{backgroundImage:'url(' + item.firstPic + ')'}">
                                <div class="mask-tip" v-if="item.stockSum==0">
                                    <p class="fs16 chinese">卖光了</p>
                                    <p class="fs12">Sold out</p>
                                </div>
                            </div>
                            <div class="goods-msg">
                                <p :class="['fs13 pdb4',{'dark-gray':item.stockSum==0}]">{{item.name}}</p>
                                <p class="fs12 dark-gray pdb4">规格 {{item.goodsSpec}}</p>
                                <p class="fs12 dark-gray pdb4">款式 {{item.style}}</p>
                                <div class="fs12 dark-gray style-no">
                                    <div class="style">款号<span class="pdl4">{{item.styleNo}}</span></div>
                                    <div v-if="item.transmited"><span class="already-tag">已转发</span></div>
                                </div>
                            </div>
                        </div>
                    </cell>
                </group>
            </scroller>
        </div>
        <div class="price">
            <span>转发商品加价：</span>
            <checker v-model="purchPrice" type="radio" default-item-class="select-item blue-gray-bg light-gray"
                    selected-item-class="is-active">
                <checker-item v-for="(item,index) in priceList" :key="index" :value="item.purchaseCost">+￥{{item.purchaseCost}}
                </checker-item>
            </checker>
        </div>
        <div class="footer">
            <div>
                <span @click="selectedAll">
                <i :class="['iconNH icon-checkbox',{' is-active':this.selectedCount>0}]"></i>
                <span class="pdt4 pdl4">已勾选 <span class="red">{{selectedCount}}</span> 件</span>
                <!-- <span class="pdt4 pdl4">代购价 <span class="red">￥{{purchPrice || 0}}</span></span> -->
                </span>
            </div>

            <div>
                <x-button @click.native="confirm" mini type="primary" class="btn w82">确定</x-button>
            </div>
        </div>
    </div>

</template>

<script>
    import {getH5GoodsListOfActivity,transferBase64} from '@/api/activity'
    import {getH5UserPurchases} from '@/api/mine.js'
    import {brandDetailH5} from '@/api/brand'

    export default {
        name: "transmitList",
        data() {
            return {
                goodsList: [],
                priceList: [],
                selectedCount: 0,
                type: '',
                purchPrice: 0
            }
        },
        watch: {
            selectedCount() {

            }
        },
        methods: {
            getH5UserPurchases () {
                let params = {
                    userId: this.$store.getters.userInfo.id
                }
                getH5UserPurchases (params).then(res => {
                    if (res.code === 0) {
                        this.priceList = res.data.userPurchaseResponses
                    }
                })
            },
            refresh(done) {
                done(true)
                if (this.type === 'ACTIVITY') {
                    this.getGoodList(done)
                }
                if (this.type === 'BRAND') {
                    this.getBrandDetailH5(done)
                }
            },
            infinite(done) {
                done()
            },
            getGoodList(done) {
                let params = {
                    userId: this.$store.getters.userInfo.id,
                    activityId: this.$route.query.id
                }
                getH5GoodsListOfActivity(params).then(res => {
                    console.log(res)
                    if (res.code === 0) {
                        this.goodsList = res.data
                        done()
                        console.log(this.goodsList, 'ddddd')
                    }
                })
            },
            getBrandDetailH5(done) {
                let params = {
                    userId: this.$store.getters.userInfo.id,
                    brandId: this.$route.query.id,
                    flag: 1,
                    pageNum: 0,
                    pageSize: 0
                }
                brandDetailH5(params).then(res => {
                    if (res.code === 0) {
                        this.goodsList = res.data.brandGoods
                        this.selectedCount = 0
                        done()
                    }
                })
            },
            goodsClick(item, index) {
                if (this.selectedCount >= 9 && !item.selected) {
                    this.$vux.toast.show({
                        text: '最多只能选择9个商品',
                        type: 'text'
                    })
                    return
                }
                this.$set(this.goodsList[index], 'selected', item.stockSum > 0 ? !item.selected : false)
                if (item.selected) {
                    this.selectedCount++
                } else {
                    if (this.selectedCount > 0) {
                        this.selectedCount--
                    }
                }
            },

            // 处理代购价问题
<<<<<<< HEAD
            getTotalPrice(salePrice) {
                // let salePrice = salePrice*1
                if(salePrice.includes('\n现价：¥')) {
                   salePrice =  salePrice.split('\n现价：¥')[1]
                //    console.log(salePrice,'salePrice ¥')
                } else if (salePrice.includes('\n现价：')) {
                    salePrice =  salePrice.split('\n现价：')[1]
                    console.log(salePrice,'salePrice ：')
                }
                // console.log(salePrice,'salePrice')
=======
            getTotalPrice(remark,salePrice,purchaseCost) {
                salePrice = salePrice*1 + purchaseCost*1
>>>>>>> beta
                let purchPrice = this.purchPrice*1
                console.log(salePrice, purchPrice)
                console.log((parseFloat(salePrice*1) + (purchPrice ? parseFloat(purchPrice) : 0)).toFixed(2))
                return (parseFloat(salePrice*1) + (purchPrice ? parseFloat(purchPrice) : 0)).toFixed(2)
            },
            handleRemark(remark,salePrice,purchaseCost) {
                if (remark.includes('\n现价')){
                    return remark = remark.split('\n现价')[0] + '\n现价：¥' + this.getTotalPrice(remark,salePrice,purchaseCost)
                } else {
                    return remark = remark + '\n现价：¥' + this.getTotalPrice(remark,salePrice,purchaseCost)
                }
            },
            confirm () {
                if (this.selectedCount === 0) {
                    this.$vux.toast.show({
                        text: '至少选择1个商品',
                        type: 'text'
                    })
                    return
                }
                let list = []
                for (let i =0; i<this.goodsList.length; i++){
                    let obj = {}
                    let item = this.goodsList[i]
                    if(item.selected) {
                        obj.remark = this.handleRemark(item.remark,item.salePrice,item.purchaseCost)
                        let imgsList = []
                        if (item.picPathsList.length < 4)  {
                            this.$vux.toast.text(`款号为：${item.styleNo}只有一张图片，不允许合成，请选择至少是四张图的款号进行合成`)
                            return
                        }
                        item.picPathsList.forEach((i,index) => {
                            if (index < 4) {
                                imgsList.push(i.src)
                            }
                        })
                        obj.imgList = imgsList
                        list.push(obj)
                    }
                }
                this.$router.push({path: '/batchTransmit', query: {info: list}})
            },
            // 选择前9个可选的
            selectedAll() {
                if (this.selectedCount > 0) {
                    this.goodsList.forEach((item, index) => {
                        this.$set(this.goodsList[index], 'selected', false)
                    })
                    this.selectedCount = 0
                }
                else {
                    this.goodsList.forEach((item, index) => {
                        if (item.stockSum > 0 && this.selectedCount < 9) {
                            this.$set(this.goodsList[index], 'selected', true)
                            this.selectedCount++
                        }
                    })
                }

            }
        },
        created() {
            this.type = this.$route.query.type
            this.getH5UserPurchases()
        },
        mounted(){
            this.$refs.transmitListScroller.triggerPullToRefresh()
        }
    }
</script>
<style lang="less">
    .transmit-list {
        .weui-cells {
            margin: 0 !important;
        }
    }
</style>
<style lang="less" scoped>
    @import '../../assets/style/vars.less';

    .transmit-list {
        display: flex;
        flex-direction: column;
        .main-content {

            .item {
                padding: 12px 16px;
                padding: 12px 16px;
            }
            .icon-checkbox {
                margin-top: 40px;
            }
            .goods-info {
                display: flex;
                .goods-img {
                    width: 82px;
                    height: 82px;
                    margin-left: 10px;
                    .mask-tip {
                        width: 100%;
                        height: 100%;
                        padding: 0 10px;
                        line-height: 24px;
                        text-align: center;
                        color: #fff;
                        background-color: rgba(0, 0, 0, 0.5);
                        .chinese {
                            padding-top: 15px;
                            padding-bottom: 4px;
                            border-bottom: 1px solid #fff;
                        }
                    }
                }
                .goods-msg {
                    flex: 1;
                    padding-left: 10px;
                    .style-no {
                        display: flex;
                        .style {
                            flex: 1;
                        }
                        .already-tag {
                            font-size: 10px;
                            padding: 5px 8px;
                            color: @red;
                            background-color: #FCEFF2;
                        }
                    }

                }

            }
        }
        .footer {
            width: 100%;
            height: 48px;
            display: flex;
            padding: 0 16px;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            line-height: 20px;
            color: @dark-gray;
            background-color: #fff;
            box-shadow: inset 0 0 3px 0 rgba(38, 47, 59, .12);
        }
        .price{
            overflow-x:auto;
            overflow-y:hidden;
            background-color: #fff;
            padding-top:8px;
            width:100%;
            max-width:700px;
            white-space:nowrap;
            height:46px;
            display:flex;
            justify-content: flex-start;
            span{
                font-size:10px;
                display:inline-block;
                line-height: 38px;
                margin-left:5px;
            }
            .select-item {
                font-size: 10px;
                text-align: center;
                min-width: 90px;
                padding: 0 8px;
                line-height: 30px;
                margin: 0 3px 8px;
                &.is-active {
                    color: #fff !important;
                    background-color: #797988;
                }
            }
        }

    }
</style>
