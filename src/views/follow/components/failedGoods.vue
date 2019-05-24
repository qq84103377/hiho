<template>
    <div class="failed-goods">
        <div class="header posR">
            <div class="fs18 text">已失效商品</div>
            <x-button mini class="btn posA" @click.native="delAll">全部清除</x-button>
        </div>
        <scroller class="scroller-top"
                  noDataText="海量货品尽在嗨货"
                  :on-refresh="refresh"
                  :on-infinite="infinite">
            <div>
                <activity-item type="GOODS" v-for="(item,index) in failedGoodsList" :key="index" :activityInfo="item">
                    <div class="price" slot="price">
                        <div class="sale-price red">¥{{item.salePrice}}
                            <s class="blue-gray fs12">¥{{item.postedPrice}}</s>
                        </div>
                        <div class="black fs12">默认代购费:<span class="red fs18">¥{{item.purchaseCost}}</span></div>
                    </div>
                    <div slot="shopcar">
                        <add-shopcar :checkList="item.specs" :goodsId="item.id"></add-shopcar>
                    </div>
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
        name: 'failedGoods',
        data() {
            return {
                show: false,
                pageNum: 0,
                failedGoodsList: [],
            }
        },
        methods: {
            delAll() {
                if (this.failedGoodsList.length == 0) return this.$vux.toast.text('暂无失效商品')
                this.show = true
            },
            onCancel() {
                this.show = false
            },
            onConfirm() {
                let params = {
                    userId: this.$store.getters.userInfo.id
                }
                let self = this
                cancelNoticeOfInvalidGoods(params).then(res => {
                    self.$vux.toast.text(res.msg)
                    this.pageNum = 1
                    this.$router.go(-1)
                })
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
            getH5GoodsList(done) {
                let params = {
                    userId: this.$store.getters.userInfo.id,
                    pageSize: 10,
                    pageNum: this.pageNum,
                    noticeFlag: '1',
                    invalidFlag: '1'
                }
                h5GoodsList(params).then(res => {
                    if (res.code === 0) {
                        console.log(this.pageNum)
                        if (res.data.goods.length == 0) {
                           if (this.pageNum === 1) this.failedGoodsList = []
                           if (done) return done(true)
                        }
                        this.failedGoodsList = this.pageNum === 1 ? res.data.goods : this.failedGoodsList.concat(res.data.goods)
                        if (done) done()
                    }
                })
            }
        },
        created() {

        }
    }
</script>
<style lang="less" scoped>
    @import '../../../assets/style/vars.less';

    .failed-goods {
        .header {
            height: 45px;
            text-align: center;
            line-height: 45px;
            background-color: @white-bg;
            border-bottom: .5px solid @border-color;
            .text {
                font-weight: 520;
            }
            .weui-btn:after {
                border: none
            }
            .btn {
                top: 8px;
                padding: 0;
                right: 15px;
                border: none !important;
                background-color: @white-bg;
                box-shadow: 0 !important;
            }
        }
        .scroller-top {
            top: 45px;
        }
    }
</style>


