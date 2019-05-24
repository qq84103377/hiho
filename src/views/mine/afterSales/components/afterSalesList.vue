<template>
    <scroller
        :ref="'afterSalesListScroller'+afterSalesListType"
        noDataText="海量货品尽在嗨货"
        :on-refresh="refresh"
        :on-infinite="infinite">
        <group v-for="(item,index) in afterSalesList" :key="index">
            <cell :border-intent="false">
                <div slot="title" class="fs16">{{item.brandName}}</div>
                <img slot="icon" class="brand-logo red" :src="item.brandPicPath">
                <div class="fs14">
                    <span v-if="item.refundStatus == 'WAIT_AGREE'" class="red">{{statusMap[item.refundStatus]}}</span>
                    <span
                        v-else-if="item.refundStatus == 'WAIT_RETUEN_GOODS' ||　item.refundStatus == 'WAIT_RECIVE_GOODS' || item.refundStatus == 'WAIT_REFUND' || item.refundStatus == 'REFUNDING'"
                        class="black">{{statusMap[item.refundStatus]}}</span>
                    <div v-else-if="item.refundStatus == 'CANCEL'|| item.refundStatus == 'REFUSED'">
                        <div class="light-gray">已关闭</div>
                        <div class="blue-gray">{{item.refundStatus==='CANCEL'?'用户取消':'平台拒绝'}}</div>
                    </div>
                    <span v-else>{{statusMap[item.refundStatus]}}</span>
                </div>
            </cell>
            <cell :border-intent="false" @click.native="goSalesDetail(item.refundOrderId)">
                <!--<div slot="title" class="clearfix">-->
                <div slot="icon" class="img  cover-bg-img" :style="{backgroundImage:'url(' + item.goodsPic+ ')'}">
                </div>
                <div slot="title">
                    <div class="fs14 pdb4">{{item.goodsName}}</div>
                    <div class="fs12 light-gray pdb4">款式 {{item.goodsStyle}}</div>
                    <div class="fs12 light-gray pdb4">款号 {{item.goodsStyleNo}}</div>
                    <div class="fs12 light-gray ">{{item.goodsSpecName}}</div>
                </div>
                <!--</div>-->
            </cell>
            <cell :border-intent="false">
                <div slot="title" class="fs14 light-gray">{{item.refundType == 'MONEY_ONLY' ? '仅退款':
                    '退货退款'}}:￥{{item.refundAmount}}
                </div>
                <div class="fs14 light-gray">退款单:{{item.refundOrderNum}}</div>
            </cell>
        </group>
    </scroller>
</template>

<script>
    import {getRefundOrdersH5} from '@/api/afterSales.js'

    export default {
        props: ['afterSalesListType', 'afterSalesListSubType', 'refreshScroller'],
        data() {
            return {
                afterSalesList: [],
                pageNum: 0,
                statusMap: {
                    'WAIT_AGREE': '审核中',
                    'WAIT_RETUEN_GOODS': '退货中 ',
                    'WAIT_RECIVE_GOODS': '退货中',
                    'WAIT_REFUND': '退款中',
                    'REFUNDING': '退款中',
                    'SUCCESS': '已退款',
                    'FAIL': '退款失败',
                    'CANCEL': '已关闭',
                    'REFUSED': '已关闭',
                },
            }
        },
        methods: {
            refresh(done) {
                done(true)
                this.pageNum = 1
                this.getRefundOrders(done)
            },
            infinite(done) {
                this.pageNum++
                this.getRefundOrders(done)
            },
            // 跳转详情
            goSalesDetail(id) {
                this.$router.push({path: '/afterSalesDetail', query: {refundOrderId: id}})
            },
            // 根据type获取订单列表
            async getRefundOrders(done) {
                let status = this.afterSalesListType
                if ((this.afterSalesListType === 'FLOWING' || this.afterSalesListType === 'CLOSED')
                    && this.afterSalesListSubType != '') {
                    status = this.afterSalesListSubType
                }
                let params = {
                    statusFilter: status,
                    userId: this.$store.getters.userInfo.id,
                    pageSize: 10,
                    pageNum: this.pageNum
                }
                await getRefundOrdersH5(params).then(res => {
                    if (res.code === 0) {
                        if (res.data.refundOrders.length == 0) {
                            if (this.pageNum === 1) this.afterSalesList = []
                            if (done) done(true)
                            return
                        }
                        this.afterSalesList = this.pageNum === 1 ? res.data.refundOrders
                            : this.afterSalesList.concat(res.data.refundOrders)
                            console.log(this.afterSalesList,'this.afterSalesList')
                        if (done) done()
                        console.log(this.afterSalesListType + '售后单第' + this.pageNum + '页')
                        console.log(this.afterSalesList.length, res.data.totalCount)
                    }
                })
            }
        },
        activated () {
            this.pageNum = 1
            this.getRefundOrders()
        },
        created() {
        },
        watch: {
            afterSalesListSubType: function (val) {
                this.$refs['afterSalesListScroller' + this.afterSalesListType].triggerPullToRefresh()

            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="less">
    .after-sales-index {
        .weui-cells {
            margin-top: 8px !important;
        }
        .weui-btn_mini {
            width: 82px !important;
        }
        .vux-tab-wrap {
            position: fixed;
            top: 46px;
            left: 0;
            z-index: 2;
            width: 100vw;
        }
        .vux-slider {
            height: 100%;
            // padding-top: 44px;
            padding-bottom: 8px;
            overflow: auto;
            .vux-swiper {
                height: 100% !important;
                overflow-y: auto !important;
            }
        }
    }

</style>

<style rel="stylesheet/scss" lang="less" scoped>
    .after-sales-index {
        .pd36 {
            padding-top: 36px !important
        }
        .pd72 {
            padding-top: 72px !important
        }
        .tab {
            position: fixed;
            top: 36px;
            width: 100%;
            z-index: 999;
            height: 36px;
            padding: 0 100px;
            line-height: 36px;
            border-bottom: 1px solid #d9d9d9;
            div {
                display: flex;
                span {
                    flex: 1;
                    text-align: center;
                }
            }

        }
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
        .img {
            width: 82px;
            height: 82px;
            margin-right: 10px;
            display: inline-block;
            img {
                height: 100%;
                width: 100%;
            }
        }
        .h39 {
            height: 39px;
        }
        .h20 {
            height: 20px;
        }
    }

</style>
