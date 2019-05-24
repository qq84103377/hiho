<template>
    <div class="order-list">
        <tab custom-bar-width="36px" :line-width="2" :scroll-threshold="5" v-model="index">
            <tab-item class="vux-center" :selected="queryType == item.status" v-for="(item, index) in orderData"
                      @on-item-click="tabClick(item.status)" :key="index">{{item.label}}
            </tab-item>
        </tab>

        <swiper @on-index-change="swiperChange" :min-moving-distance="100" v-model="index" :show-dots="false">
            <swiper-item v-for="(item, index) in orderData" :key="index">
                <order-list :orderListType="item.status"></order-list>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import {getH5OrderList} from '@/api/order.js'
    import orderList from './components/orderList'
    import {hideOrderSymbol} from '@/api/mine'

    export default {
        name: 'orderList',
        data() {
            return {
                index: 0,
                queryType: '',
                orderData: [
                    {label: '全部', status: ''},
                    {label: '待支付', status: 'WAIT_PAY'},
                    {label: '待发货', status: 'WAIT_SEND'},
                    {label: '已发货', status: 'SENDED'},
                    {label: '已取消', status: 'CANCEL'}
                ],
            }
        },
        methods: {
            // 切换tab时触发
            tabClick(status) {
                this.queryType = status
                if (status == 'SENDED' || status == 'CANCEL') {
                    hideOrderSymbol({userId: this.$store.getters.userInfo.id, status: status}).then(res => {
                        console.log(res);
                    })
                }
            },
            swiperChange(index) {
                this.queryType = this.orderData[index].status
                if (this.queryType == 'SENDED' || this.queryType == 'CANCEL') {
                    hideOrderSymbol({userId: this.$store.getters.userInfo.id, status: this.queryType}).then(res => {
                        console.log(res);
                    })
                }
            },
        },
        created() {
            this.queryType = this.$store.getters.orderListType
        },
        activated() {
            this.queryType = this.$store.getters.orderListType
        },
        components: {
            'order-list': orderList
        }
    }
</script>

<style rel="stylesheet/scss" lang="less">
    .order-list {
        .weui-cells {
            margin-top: 8px !important;
        }
        .weui-btn_mini {
            width: 82px !important;
        }
        .vux-tab-wrap {
            position: fixed;
            top: 45px;
            left: 0;
            z-index: 2;
            width: 100vw;
        }
        .vux-slider {
            height: 100%;
            padding-top: 44px;
            /*padding-bottom: 8px;*/
            overflow: auto;
            .vux-swiper {
                height: 100% !important;
                overflow-y: auto !important;
            }
        }
    }

</style>

<style rel="stylesheet/scss" lang="less" scoped>

</style>
