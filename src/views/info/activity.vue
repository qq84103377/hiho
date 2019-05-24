<template>
    <scroller
        ref="hot"
        noDataText="海量货品尽在嗨货"
        :on-refresh="refresh"
        :on-infinite="infinite">
        <div class="base-wrap">
            <div class="item" v-for="(item,index) in list" :key="index">
                <badge v-if="!item.hasRead" class="badge"></badge>
                <img @click="goTo(item)" class="img-item"
                     :src="item.picUrl" alt="">
            </div>
        </div>
    </scroller>
</template>
<script>
    import contentItem from "./components/content-item";
    import {getMessages, setHasRead, setSingleHasRead} from "@/api/message";

    export default {
        name: 'infoLogistics',
        components: {
            contentItem
        },
        data() {
            return {
                list: [],
                pageNum: 0,
                flag: false
            }
        },
        created() {
            // this.getList()
        },
        methods: {
            goTo(item) {
                item.hasRead = true
                setSingleHasRead({uniqueFlag: item.uniqueFlag}).then(res => {
                    console.log(res.data, '设置单个消息已读');
                })
                item.redirectType == 'BRAND' ? this.$router.push(`/brandDetail?brandId=${item.redirectReferId}`) : this.$router.push(`/activityDetail?activityId=${item.redirectReferId}&type=${this.checkTime(item)}`)
            },
            checkTime(item) {
                let arr = item.remark.split(',')
                if (arr[0] * 1 > new Date().getTime()) {
                    //预告
                    return 1
                } else {
                    return 0
                }
            },
            setRead() {
                setHasRead({userId: this.$store.getters.userInfo.id, messageType: 'ACTIVITY'}).then(res => {
                    console.log('设置已读');
                })
            },
            refresh(done) {
                done(true)
                this.pageNum = 1
                this.getList(done)
            },
            async infinite(done) {
                this.pageNum++
                await this.getList(done)
                if (!this.flag) {
                    this.setRead()
                    this.flag = true
                }
            },
            async getList(done) {
                const params = {
                    userId: this.$store.getters.userInfo.id,
                    messageType: 'ACTIVITY',
                    pageNum: this.pageNum,
                    pageSize: 9
                }
                await getMessages(params).then(res => {
                    console.log(res.data, 'ACTIVITY');
                    if (res.code == 0) {
                        if (res.data.imMessages.length == 0) {
                            if (this.pageNum === 1) this.list = []
                            if (done) return done(true)
                        }
                        this.list = this.pageNum === 1 ? res.data.imMessages : this.list.concat(res.data.imMessages)
                        if (done) done()
                    }
                })
            }
        }
    }
</script>
<style lang="less" scope>
    .base-wrap {
        padding: 0 10px;
        .item {
            position: relative;
            .img-item {
                width: 100%;
                height: 300px;
                margin: 15px 0;
            }
            .badge {
                position: absolute;
                left: 0;
                top: 28px;
            }
        }
    }

</style>

