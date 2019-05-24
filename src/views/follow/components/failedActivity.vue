<template>
    <div class="failed-goods">
        <div class="header posR">
            <div class="fs18 text">已失效活动</div>
            <x-button mini class="btn posA" @click.native="delAll">全部清除</x-button>
        </div>
        <scroller class="scroller-top"
                  noDataText="海量货品尽在嗨货"
                  :on-refresh="refresh"
                  :on-infinite="infinite">
            <div>
                <activity-item type="ACTIVITY" v-for="(item,index) in failedActivityList" :key="index" :activityInfo="item">
                    <div slot="badge">
                        <div class="badge1 gradient-gold brown">{{item.name}}</div>
                    </div>
                    <div slot="countdown">
                        <count-time :isEnd="'1'" :type="'0'"
                                    :time="item.endTime"></count-time>
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
        <div v-transfer-dom>
            <confirm v-model="show"
                     title="提示"
                     dialog-transition=""
                     @on-cancel="onCancel"
                     @on-confirm="onConfirm">
                <p style="text-align:center;"> 是否要全部清除已失效活动？</p>
            </confirm>
        </div>
    </div>
</template>
<script>
    import { clearInvalidNoticeAct} from '@/api/follow'
    import { getH5ActivityList} from '@/api/activity'
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
                failedActivityList: [],
            }
        },
        methods: {
            delAll() {
                if (this.failedActivityList.length == 0) return this.$vux.toast.text('暂无失效活动')
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
                clearInvalidNoticeAct(params).then(res => {
                    if(res.code==0){
                        self.$vux.toast.text(res.msg)
                        this.pageNum = 1
                        this.$router.go(-1)
                    }
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
                    status: 'end'
                }
                getH5ActivityList(params).then(res => {
                    if (res.code === 0) {
                        if (res.data.activities.length == 0) {
                           if (this.pageNum === 1) this.failedActivityList = []
                           if (done) return done(true)
                        }
                        this.failedActivityList = this.pageNum === 1 ? res.data.activities : this.failedActivityList.concat(res.data.activities)
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


