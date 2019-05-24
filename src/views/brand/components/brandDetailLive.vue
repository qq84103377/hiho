<template>
    <div class="brand-detail-live">
        <scroller
            ref="brandLive"
            noDataText="海量货品尽在嗨货"
            :on-refresh="refresh"
            :on-infinite="infinite">
            <div>
                <activity-item :activityInfo="item" type="ACTIVITY" :brandName="brandName" v-for="(item, index) in activitiesList"
                               :key="index">
                    <div slot="badge">
                        <div class="badge1 gradient-gold brown">{{item.name}}</div>
                        <div :class="['badge2' ,item.startTimeMillis> nowTime? 'preview' : '']">{{item.startTimeMillis > nowTime ? '活动预告':'热卖中'}}
                        </div>
                    </div>
                    <div slot="countdown">
                        <count-time :type="item.startTimeMillis > nowTime? 1 : 0"
                                    :time="item.startTimeMillis > nowTime?item.startTime:item.endTime"></count-time>
                    </div>
                    <span slot="btn">
          <x-button
              @click.native="$router.push({path:'/activityDetail',query:{activityId:item.id,type:item.startTimeMillis > nowTime?1 : 0}})"
              class="w82 has-radius" mini plain type="default">{{item.startTimeMillis > nowTime ? '详情': '抢购'}}</x-button>
          <x-button class="has-radius" mini type="primary"
                    @click.native="$router.push({path:'/transmitList',query:{id:item.id,type:'ACTIVITY'}})">批量转发</x-button>
        </span>
                </activity-item>
            </div>
        </scroller>
    </div>
</template>
<script>
    import {brandDetailH5} from '@/api/brand'

    export default {
        name: 'brandDetailLive',
        props: ['brandId'],
        data() {
            return {
                nowTime: (new Date()).getTime(),
                pageNum: 0,
                activitiesList: [],
                brandName: ''
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
                    flag: 0,
                    pageNum: this.pageNum,
                    pageSize: 3
                }
                await brandDetailH5(params).then(res => {
                    if (res.code === 0) {
                        if (res.data.brandActivities.length == 0) {
                            if (this.pageNum === 1) this.activitiesList = []
                            done(true)
                            return
                        }
                        this.brandName = res.data.brandName
                        this.activitiesList = this.pageNum === 1 ? res.data.brandActivities : this.activitiesList.concat(res.data.brandActivities)
                        done()
                    }
                })
            }
        },
        created() {
            // this.getBrandDetailH5()
        }
    }
</script>
<style lang="less" scoped>
    .brand-detail-live {
        .activity-item {
            &:first-child {
                margin-top: -3px !important;
            }
        }
        .btn {
            position: fixed;
            bottom: 0;
            font-weight: 400;
            font-size: 16px;
        }
    }
</style>

<style lang="less">
    .brand-detail-live {
        .vux-slider {
            margin-top: -8px;
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
