<template>
    <div class="after-sales-index posR">
        <tab custom-bar-width="36px" :line-width="2" :scroll-threshold="5" v-model="index">
            <tab-item class="vux-center" :selected="queryType == item.status " v-for="(item, index) in salesData"
                      @on-item-click="tabClick(item.status)" :key="index">
                {{item.label}}
            </tab-item>
        </tab>
        <div v-if="queryType == 'FLOWING' ||　queryType == 'CLOSED'" class="tab posA white-bg fs12 light-gray">
            <div v-if="queryType == 'FLOWING'">
                <span :class="{'black': curIndex == index ? true : false }" @click.stop="followFilter(index)"
                      v-for="(item,index) of followList" :key="index">{{item.name}}</span>
            </div>
            <div v-else><span v-for="(el,key) in closeList" :key="key"
                              :class="{'black': curIndex1 == key ? true : false }" @click.stop="closedFilter(key)">{{el.name}}</span>
            </div>
        </div>
        <swiper :min-moving-distance="100" @on-index-change="swiperChange" v-model="index" :show-dots="false"
                :class="[queryType == 'FLOWING' || queryType == 'CLOSED' ? 'pd72' : 'pd36']">
            <swiper-item  v-for="(item, index) in salesData" :key="index">
                <after-sales-list :afterSalesListType="item.status" :afterSalesListSubType="item.subStatus" ></after-sales-list>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    // import {getRefundOrdersH5} from '@/api/afterSales.js'
    import afterSalesList from './components/afterSalesList'

    export default {

        name: 'afterSalesIndex',
        data() {
            return {
                index: 0,
                queryType: '',
                querySubType:'',
                curIndex: 0,
                curIndex1: 0,
                salesData: [
                    {label: '全部', status: ''},
                    {label: '待审核', status: 'WAIT_AGREE'},
                    {label: '退款中', status: 'FLOWING',subStatus:''},
                    {label: '已退款', status: 'SUCCESS'},
                    {label: '已关闭', status: 'CLOSED',subStatus:''}
                ],
                followList: [
                    {name: '全部', status: ''},
                    {name: '退款中', status: 'REFUNDING'},
                    {name: '退货中', status: 'RETURNING'}
                ],
                closeList: [
                    {name: '全部', status: ''},
                    {name: '已取消', status: 'CANCEL'},
                    {name: '被拒绝', status: 'REFUSED'}
                ]
            }
        },
        methods: {

            followFilter(index) {
                this.curIndex = index
                this.querySubType = this.followList[index].status
                this.$set(this.salesData[2],'subStatus',this.querySubType)
                this.$store.commit('setAfterSalesListSubType', this.querySubType)
            },
            closedFilter(index) {
                this.querySubType = this.closeList[index].status
                this.curIndex1 = index
                this.$set(this.salesData[4],'subStatus',this.querySubType)
                this.$store.commit('setAfterSalesListSubType', this.querySubType)

            },
            // 切换tab时触发
            tabClick(status) {
                this.queryType = status
                this.$store.commit('setAfterSalesListType', this.queryType)

            },
            swiperChange(index) {
                this.queryType = this.salesData[index].status
                this.$store.commit('setAfterSalesListType', this.queryType)
            }
        },
        created() {
            this.queryType = this.$store.getters.afterSalesListType
            this.querySubType = this.$store.getters.afterSalesListSubType
            if(this.queryType==='FLOWING'){
                this.$set(this.salesData[2],'subStatus',this.querySubType)
            }
            if(this.queryType==='CLOSED'){
                this.$set(this.salesData[4],'subStatus',this.querySubType)
            }
        },
        components: {
            'after-sales-list':afterSalesList},

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
