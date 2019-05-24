<template>
    <div class="follow-index">
        <tab class="tab-bar" :scroll-threshold="3" custom-bar-width="36px" :line-width="2" v-model="index">
            <tab-item v-for="(item, index) in activityText" :key="index" :selected="selectedText === item"
                      @click.native="selectTab(item)">{{item}}
            </tab-item>
        </tab>
        <swiper @on-index-change="swiperChange" :min-moving-distance="150" v-model="index" :show-dots="false">
            <swiper-item v-for="(item, index) in activityText" :key="index">
                <follow-activity v-if="item=='活动'" ref="follwActivity"></follow-activity>
                <follow-goods v-if="item=='商品'" ref="follwGood"></follow-goods>
                <follow-brand v-if="item=='品牌'" ref="followBrand"></follow-brand>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import followGoods from "./components/followGoods";
    import followBrand from "./components/followBrand";
    import followActivity from "./components/followActivity";
    import {getPosition, getPositionEnter} from '@/components/position.js'

    export default {
        name: 'followIndex',
        data() {
            return {
                selectedText: '活动',
                index: 0,
                activityText: ['活动','商品','品牌']
            }
        },
        methods: {
            selectTab(item) {
                this.selectedText = item
            },
            swiperChange(index) {
                this.selectTab(this.activityText[index])
            }
        },
        components:{
            followGoods,
            followBrand,
            followActivity
        },
         beforeRouteLeave (to, from, next) {
            sessionStorage.followGoodPosition = getPosition(this.$refs.follwGood[0].$refs.followGood)
            sessionStorage.followBrandPosition = getPosition(this.$refs.followBrand[0].$refs.brand)
            // sessionStorage.followActivityPosition = getPosition(this.$refs.followActivity.$refs.followActivity)
            if (this.selectedText == '商品') {
                from.meta.isGood = true
                from.meta.isBrand = false
                // from.meta.isActivity = false
            } else if (this.selectedText == '品牌') {
                from.meta.isGood = false
                from.meta.isBrand = true
                // from.meta.isActivity = false
            }
            // else if (this.selectedText == '活动') {
            //     from.meta.isGood = false
            //     from.meta.isBrand = false
            //     from.meta.isActivity = true
            // }
            next()
        },
        beforeRouteEnter (to, from, next) {
            if (to.meta.isGood) {
                if (sessionStorage.followGoodPosition) {
                    next(vm => {
                        getPositionEnter(sessionStorage.followGoodPosition,vm, vm.$refs.follwGood[0].$refs.followGood)
                    })
                }
            } else if (to.meta.isBrand) {
                if (sessionStorage.followBrandPosition) {
                    next(vm => {
                        getPositionEnter(sessionStorage.followBrandPosition,vm, vm.$refs.followBrand[0].$refs.brand)
                    })
                }
            }
            // else if (to.meta.isActivity) {
            //     if (sessionStorage.followActivityPosition) {
            //         next(vm => {
            //             getPositionEnter(sessionStorage.followActivityPosition,vm, vm.$refs.followActivity.$refs.followActivity)
            //         })
            //     }
            // }
            next()
        }
    }
</script>

<style rel="stylesheet/scss" lang="less">
    @import '../../assets/style/vars.less';

    .follow-index {
        .vux-slider {
            height: 100%;
            overflow: auto;
            padding-top: 0 !important;
            .vux-swiper {
                height: 100% !important;
                overflow-y: auto !important;
            }
        }
        .vux-swiper-item > div {
            height: 100% !important;
        }
        .vux-tab-wrap {
            padding-top: 0 !important;
        }

        .activity-item:first-child{
            margin-top: 0;
        }
        /*.vux-tab-wrap {*/
            /*padding-top: 0 !important;*/
        /*}*/
        /*.vux-slider {*/
            /*margin-top: 0 !important;*/
            /*height: 100%;*/
            /*overflow: auto;*/
            /*padding-top: 0 !important;*/
            /*.vux-swiper {*/
                /*height: 100% !important;*/
                /*overflow-y: auto !important;*/
            /*}*/
        /*}*/
        /*.vux-swiper-item > div {*/
            /*height: 100% !important;*/
        /*}*/
    }

</style>

<style rel="stylesheet/scss" lang="less" scoped>
    @import '../../assets/style/vars.less';

    .follow-index {
    }
</style>
