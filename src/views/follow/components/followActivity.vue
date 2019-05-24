<template>
    <scroller
        ref="live"
        noDataText="海量货品尽在嗨货"
        :on-refresh="refresh"
        :on-infinite="infinite">
        <div>
            <div class="header-titile" v-if="invalidCount > 0">
                <div class="text fs14">已失效活动<span class="red"> {{invalidCount}} </span>个</div>
                <div class="btn">
                    <x-button mini plain type="warn" class="button button-color" @click.native="show=true">
                        全部清除
                    </x-button>
                    <x-button mini plain type="default" class="button" @click.native="$router.push('/failedActivity')">查看
                    </x-button>
                </div>
            </div>
            <activity-item type="ACTIVITY" v-for="(item,index) in activities" :key="index" :activityInfo="item"
                           @focus="focus">
                <div slot="badge">
                    <div class="badge1 gradient-gold brown">{{item.name}}</div>
                    <div v-if="item.isEnd=='0'" :class="['badge2',{'preview':!item.isLive}]">
                        {{!item.isLive?'活动预告':'热卖中'}}
                    </div>
                </div>
                <div slot="countdown">
                    <count-time @clockerEnd="clockerEnd(item)" :isEnd="item.isEnd" :type="item.isLive?'0':'1'"
                                :time="!item.isLive?item.startTime:item.endTime"></count-time>
                </div>
                <span slot="btn">
                    <x-button class="w82 has-radius" mini plain type="default"
                              @click.native="$router.push({path:'/activityDetail',query:{activityId:item.id,type:item.isLive?0:1}})">抢购</x-button>

                    <x-button class=" has-radius" mini type="primary"
                              @click.native="$router.push({path:'/transmitList',query:{id:item.id,type:'ACTIVITY'}})">
                        批量转发
                    </x-button>
                </span>
            </activity-item>
        </div>

        <div v-transfer-dom>
        <confirm v-model="show"
        title="提示"
        dialog-transition=""
        @on-cancel="show=false"
        @on-confirm="onConfirm">
        <p style="text-align:center;"> 是否要全部清除已失效活动？</p>
        </confirm>
        </div>
    </scroller>
</template>

<script>
    import {getH5ActivityList} from '@/api/activity'
    import {clearInvalidNoticeAct} from '@/api/follow'
    import {TransferDomDirective as TransferDom} from 'vux'

    export default {
        name: "followActivity",
        directives: {
            TransferDom
        },
        data() {
            return {
                show: false,
                activities: [],
                pageNum: 0,
                invalidCount: 0
            }
        },
        watch:{
          '$route'(to,from){
              if(from.path == '/failedActivity'){
                  this.focus()
              }
          }
        },
        methods: {
            onConfirm() {
                let params = {
                    userId: this.$store.getters.userInfo.id
                }
                let self = this
                clearInvalidNoticeAct(params).then(res => {
                    if(res.code==0){
                        self.$vux.toast.text(res.msg)
                        this.pageNum = 1
                        this.getActivityList()
                    }
                })
            },
            timeType(item) {
                console.log(new Date().getTime(), item.startTimeStamp);
                if ((new Date().getTime() / 1000) >= item.endTimeStamp) {
                    //已结束
                    item.isEnd = '1'
                } else {
                    //直播中
                    item.isLive = true
                }
            },
            focus() {
                this.pageNum = 1
                this.getActivityList()
            },
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
                    noticeFlag: 1
                }
                await getH5ActivityList(params).then(res => {
                    if (res.code === 0) {
                        if (res.data.activities.length == 0) {
                            if (this.pageNum === 1) this.activities = []
                            if (done) return done(true)
                        }
                        res.data.activities.forEach(v => {
                            this.$set(v, 'isLive', (new Date().getTime() / 1000) >= v.startTimeStamp)
                        })
                        this.invalidCount = res.data.invalidCount
                        this.activities = this.pageNum === 1 ? res.data.activities : this.activities.concat(res.data.activities)
                        if (done) done()
                    }
                })
            },
            clockerEnd(item) {
                this.timeType(item)
            }
        },
        created() {
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/style/vars.less';
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
</style>
