<template>
    <div class=" custom-body brand-detail-goods">
        <div class="main-content">
        <scroller
            ref="brandGood"
            noDataText="海量货品尽在嗨货"
            :on-refresh="refresh"
            :on-infinite="infinite">
            <div>
                <div class="header">
                    <div class="white-bg box">
                        <div class="header-title">
                            <img class="logo" :src="brandDetail.brandPicPath" />
                            <div class="title-text">
                                <div class="name fs15 black">{{brandDetail.brandName}}</div>
                                <div class="good light-gray fs12"><span
                                    class="mgr16">活动 {{brandDetail.actNum}}</span><span>商品 {{brandDetail.goodsNum}}</span>
                                </div>
                            </div>
                            <div>
                                <i @click.stop="toggleNotice()" :class="['iconNH', 'icon-focus',{'active':brandDetail.hasNotice=='1'}]"></i>
                            </div>
                        </div>
                        <p class="fs14 mgt8">{{brandDetail.remark}}</p>
                    </div>
                    <div class="line-icon">
                        <i class="iconNH icon-goods-line"></i>
                    </div>
                </div>
                <activity-item :activityInfo="item" type="GOODS" v-for="(item, index) in goodList" :key="index">
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
                                @click.native="$router.push({path:'activityTransmit',query:{type:1,info:item}})">
                    转发
                    </x-button>
                </span>
                </activity-item>
            </div>
        </scroller>
        </div>
        <div class="footer">
        <x-button @click.native="$router.push({path:'/transmitList',query:{id:brandId,type:'BRAND'}})" type="primary" class="full-btn">批量转发</x-button>
        </div>
    </div>
</template>
<script>
    import {brandDetailH5} from '@/api/brand'
    import {notice} from '@/api/activity'

    export default {
        name: 'brandDetailGoods',
        props:['brandId'],
        data() {
            return {
                nowTime: (new Date()).getTime(),
                pageNum: 0,
                goodList: [],
                brandDetail: {}
            }
        },
        methods: {
            async refresh(done) {
                done(true)
                this.pageNum = 1
                await this.getBrandDetailH5(done)
            },
            async infinite(done) {
                this.pageNum++
                await this.getBrandDetailH5(done)
            },
            async getBrandDetailH5(done) {
                let params = {
                    userId: this.$store.getters.userInfo.id,
                    brandId: this.brandId,
                    flag: 1,
                    pageNum: this.pageNum,
                    pageSize: 3
                }
                await brandDetailH5(params).then(res => {
                    if (res.code === 0) {
                        if (res.data.brandGoods.length == 0) {
                            if (this.pageNum === 1) this.goodList = []
                            done(true)
                            return
                        }
                        this.brandDetail = res.data
                        this.goodList = this.pageNum === 1 ? res.data.brandGoods : this.goodList.concat(res.data.brandGoods)
                        done()
                    }
                })
            },
            toggleNotice(){
                console.log(this.brandDetail,'ddddddvvv')
                let patams = {
                    userId: this.$store.getters.userInfo.id,
                    action: this.brandDetail.hasNotice===1 ? 0 : 1,
                    type: 'BRAND',
                    attrId: this.brandDetail.brandId
                }
                notice(patams).then(res => {
                    if (res.code === 0) {
                        this.brandDetail.hasNotice =this.brandDetail.hasNotice===1 ? 0 : 1
                        this.$vux.toast.show({
                            type: 'text',
                            text: this.brandDetail.hasNotice ===1 ? '关注成功' : '取消关注'
                        })
                    }

                })
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../../../assets/style/vars.less';

    .brand-detail-goods {
        .header {
            background-color: @black;
            padding: 16px 10px 0;
            .box {
                padding: 20px;
                .header-title {
                    display: flex;
                    align-items: center;
                    .logo {
                        width: 42px;
                        height: 42px;
                    }
                    .title-text {
                        flex: 1;
                        margin-left: 10px;
                    }
                }
            }
            .line-icon {
                text-align: center;
                height: 30px;
                line-height: 30px;
                margin-top: 6px;
            }
        }
        .activity-item {
            &:first-child {
                margin-top: -3px !important;
            }
        }
    }
</style>
<style lang="less">
    .brand-detail-goods {
        .vux-slider {
            &:first-child {
                margin-top: -8px !important;
            }
            // margin-top:8px !important;
            height: 100%;
            overflow: auto;
            padding-top: 44px;
            margin-bottom: 50px !important;
            .vux-swiper {
                height: 100% !important;
                overflow-y: auto !important;
            }
        }
        .vux-swiper-item > div {
            height: 100% !important;
        }
    }
</style>

