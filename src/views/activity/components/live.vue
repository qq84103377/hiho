<template>
        <scroller
            ref="live"
            noDataText="海量货品尽在嗨货"
            :on-refresh="refresh"
            :on-infinite="infinite">
            <div>
                <activity-item type="ACTIVITY" v-for="(item,index) in activities" :key="index" :activityInfo="item">
                    <div slot="badge">
                        <div class="badge1 gradient-gold brown">{{item.name}}</div>
                        <div class="badge2">热卖中</div>
                    </div>
                    <div slot="countdown">
                        <count-time @clockerEnd="clockerEnd(index)" :type="0" :time="item.endTime"></count-time>
                    </div>
                <span slot="btn">
                    <x-button class="w82 has-radius" mini plain type="default"
                          @click.native="$router.push({path:'/activityDetail',query:{activityId:item.id,type:0}})">抢购</x-button>

                    <x-button class=" has-radius" mini type="primary"
                              @click.native="$router.push({path:'/transmitList',query:{id:item.id,type:'ACTIVITY'}})">
                        批量转发
                    </x-button>
                </span>
                </activity-item>
            </div>
        </scroller>
</template>

<script>
    import {getH5ActivityList} from '@/api/activity'

    export default {
        name: "live",
        data() {
            return {
                activities: [],
                pageNum: 0,
            }
        },
        methods: {
            async refresh(done) {
                done(true)
                this.pageNum = 1
                await this.getActivityList(done)
            },
            async infinite(done) {
                this.pageNum++
                await this.getActivityList(done)
            },
            async getActivityList(done) {
                let params = {
                    userId: this.$store.getters.userInfo.id,
                    pageSize: 10,
                    pageNum: this.pageNum,
                    status: 'onGoing'
                }
                await getH5ActivityList(params).then(res => {
                    if (res.code === 0) {
                        if (res.data.activities.length == 0) {
                            done(true)
                            return
                        }
                        this.activities = this.pageNum === 1 ? res.data.activities : this.activities.concat(res.data.activities)
                        done()
                        console.log('直播第' + this.pageNum + '页')
                        console.log(this.activities.length, res.data.totalCount)
                    }
                })
            },
            clockerEnd(index) {
                this.activities.splice(index, 1)
            }
        },
        created() {
        }
    }
</script>

<style lang="less" scoped>
</style>
