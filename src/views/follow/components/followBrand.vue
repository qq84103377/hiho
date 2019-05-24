<template>
    <div class="brand-index">
        <scroller
            ref="brand"
            :snapping="true"
            noDataText="海量货品尽在嗨货"
            :on-refresh="refresh"
            :on-infinite="infinite">
            <div>
                <brand-item @reverstNotice="cancelNotice" :fileList="item" :brandItemIndex="index" v-for="(item,index) in brandList" :key="index"></brand-item>
            </div>
        </scroller>

    </div>
</template>

<script>
    import {brandListH5} from '@/api/brand'

    export default {
        name: 'brandIndex',
        data() {
            return {
                brandList: [],
                pageNum: 0
            }
        },
        methods: {
            async refresh(done) {
                done(true)
                this.pageNum = 1
                await this.getBrandListH5(done)
            },
            async infinite(done) {
                this.pageNum++
                await this.getBrandListH5(done)
            },
            getBrandListH5(done) {
                let params = {
                    userId: this.$store.getters.userInfo.id,
                    pageSize: 10,
                    pageNum: this.pageNum,
                    noticeFlag:'1'

                }
                brandListH5(params).then(res => {
                    if (res.code === 0) {
                        console.log(this.pageNum)
                        if (res.data.brandList.length == 0) {
                            if (this.pageNum === 1) this.brandList = []
                            done(true)
                            return
                        }
                        this.brandList = this.pageNum === 1 ? res.data.brandList : this.brandList.concat(res.data.brandList)
                        done()
                    }
                })
            },
            // 取消关注
            cancelNotice(brandItemIndex){
                this.$set(this.brandList[brandItemIndex],'hasNotice',(this.brandList[brandItemIndex].hasNotice===1?0:1))
                this.brandList.splice(brandItemIndex,1)
                console.log(brandItemIndex)
            }
        },
        created() {
        }
    }
</script>

<style rel="stylesheet/scss" lang="less">
    .brand-index {
        > div {
            height: 100% !important;
        }
    }

</style>

<style rel="stylesheet/scss" lang="less" scoped>
</style>
