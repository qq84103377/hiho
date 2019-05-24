<template>
    <div class="follow-goods">
        <scroller
            ref="followGood"
            noDataText="海量货品尽在嗨货"
            :on-refresh="refresh"
            :on-infinite="infinite">
            <div class="header-titile" v-if="invalidCount > 0">
                <div class="text fs14">已失效商品<span class="red"> {{invalidCount}} </span>款</div>
                <div class="btn">
                    <x-button mini plain type="warn" class="button button-color" @click.native="delAll(invalidCount)">全部清除</x-button>
                    <x-button mini plain type="default" class="button" @click.native="$router.push('/failedGoods')">查看</x-button>
                </div>
            </div>
            <div>
                <activity-item type="GOODS" v-for="(item,index) in followGoodsList" :key="index" :activityInfo="item" @focus="focus">
                    <div class="price" slot="price">
                        <div class="sale-price red">¥{{item.salePrice}}
                            <s class="blue-gray fs12" v-if="item.postedPrice">¥{{item.postedPrice}}</s>
                        </div>
                        <div class="black fs12">默认代购费:<span class="red fs18">¥{{item.purchaseCost}}</span></div>
                    </div>
                    <div slot="shopcar">
                        <add-shopcar :checkList="item.specs" :goodsId="item.id"></add-shopcar>
                    </div>
                    <span slot="btn">
                      <x-button class="w82 has-radius" mini type="primary"
                    @click.native="$router.push({path:'/activityTransmit',query:{type:1,info:item}})">
                    转发
                    </x-button>
                </span>
                </activity-item>
            </div>
        </scroller>
        <div v-transfer-dom>
            <confirm v-model="show"
                     title="提示"
                     dialog-transition=""
                     @on-cancel="onCancel"
                     @on-confirm="onConfirm">
                <p style="text-align:center;"> 是否要全部清除已失效商品？</p>
            </confirm>
        </div>
    </div>
</template>

<script>
    import {h5GoodsList, cancelNoticeOfInvalidGoods} from '@/api/follow'
    import {TransferDomDirective as TransferDom} from 'vux'

    export default {
        directives: {
            TransferDom
        },
        name: "followGoods",
        data() {
            return {
                show: false,
                pageNum: 0,
                // totalCount:100,
                endTip: false,
                invalidCount: 0,
                followGoodsList: [],
            }
        },
        methods: {
            onCancel() {
                this.show = false
            },
            onConfirm() {
                let params = {
                    userId: this.$store.getters.userInfo.id
                }
                let self = this
                this.$vux.loading.show('loading')
                cancelNoticeOfInvalidGoods(params).then(res => {
                    self.$vux.toast.text(res.msg)
                    this.pageNum = 1
                    this.getH5GoodsList()
                    this.$vux.loading.hide()
                })
            },
            focus() {
                this.pageNum = 1
                this.getH5GoodsList()
            },
            delAll(num) {
                if (num == 0) return this.$vux.toast.text('暂无失效商品')
                this.show = true
            },
            async refresh(done) {
                done(true)
                this.pageNum = 1
                await this.getH5GoodsList(done)
            },
            async infinite(done) {
                this.pageNum++
                await this.getH5GoodsList(done)
            },
            async getH5GoodsList(done) {
                let params = {
                    userId: this.$store.getters.userInfo.id,
                    pageSize: 10,
                    pageNum: this.pageNum,
                    noticeFlag: '1'
                }
                await h5GoodsList(params).then(res => {
                    console.log(res);
                    if (res.code === 0) {
                        this.invalidCount = res.data.invalidCount
                        console.log(this.pageNum)
                        if (res.data.goods.length == 0) {
                            if (this.pageNum === 1) this.followGoodsList = []
                            if (done) return done(true)
                        }
                        this.followGoodsList =this.pageNum===1?res.data.goods:this.followGoodsList.concat(res.data.goods)
                        if (done) done()
                    }
                })
            }
        },
        created() {
        }
    }
</script>

<style scoped lang="less">
    @import '../../../assets/style/vars.less';

    .follow-goods {
        .header-titile {
            background-color: #fff7e8;
            height: 46px !important;
            width: 100%;
            line-height: 46px;
            padding: 0 16px;
            display: flex;
            .text {
                flex: 1;
            }
            .btn {
                flex: 1;
                line-height: 46px;
                text-align: right;
                .button {
                    // margin: 7px 0px;
                    font-size: 12px !important;
                }
                .button-color {
                    border-color: @red !important;
                    color: @red !important;
                }
            }
            .weui-btn + .weui-btn {
                margin-top: 7px !important;
            }
        }
    }
</style>
