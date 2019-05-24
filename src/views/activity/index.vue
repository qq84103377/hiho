<template>
    <div class="custom-body activity-index">
        <tab class="tab-bar" :scroll-threshold="3" custom-bar-width="36px" :line-width="2" v-model="index">
            <tab-item v-for="(item, index) in activityText" :key="index" :selected="selectedText === item"
                      @click.native="selectTab(item)">{{item}}
            </tab-item>
        </tab>
        <div class="main-content">
            <div :class="['detail-item',{ active:selectedText=='直播'}]">
                <live ref="live"></live>
            </div>
            <div :class="['detail-item',{ active:selectedText=='预告'}]">
                <preview ref="preview"></preview>
            </div>
            <div :class="['detail-item',{ active:selectedText=='爆款'}]">
                <hot ref="hot"></hot>
            </div>
        </div>
    </div>
</template>

<script>
    import hot from "./components/hot";
    import live from "./components/live";
    import preview from "./components/preview";
    import {getPosition, getPositionEnter} from '@/components/position.js'
    import {TransferDomDirective as TransferDom } from 'vux'

    export default {
        directives: {
            TransferDom
        },
        name: 'activityIndex',
        data() {
            return {
                index: 0,
                selectedText: '直播',
                activityText: ['直播', '预告', '爆款'],
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
        created() {
        },
        components: {
            hot,
            live,
            preview
        },
        beforeRouteLeave (to, from, next) {
            sessionStorage.livePosition = getPosition(this.$refs.live.$refs.live)
            sessionStorage.hotPosition = getPosition(this.$refs.hot.$refs.hot)
            sessionStorage.previewPosition = getPosition(this.$refs.preview.$refs.preview)
            if (this.selectedText == '直播') {
                from.meta.isLive = true
                from.meta.isHot = false
                from.meta.isPreview = false
            } else if (this.selectedText == '预告') {
                from.meta.isLive = false
                from.meta.isHot = false
                from.meta.isPreview = true
            } else if (this.selectedText == '爆款'){
                from.meta.isLive = false
                from.meta.isHot = true
                from.meta.isPreview = false
            }
            next()
        },
        beforeRouteEnter (to, from, next) {
            if (to.meta.isLive) {
                if (sessionStorage.livePosition) {
                    next(vm => {
                        getPositionEnter(sessionStorage.livePosition,vm, vm.$refs.live.$refs.live)
                    })
                }
            } else if (to.meta.isPreview) {
                if (sessionStorage.previewPosition) {
                    next(vm => {
                        getPositionEnter(sessionStorage.previewPosition,vm, vm.$refs.preview.$refs.preview)
                    })
                }
            } else if (to.meta.isHot) {
                if (sessionStorage.hotPosition) {
                    next(vm => {
                        getPositionEnter(sessionStorage.hotPosition,vm, vm.$refs.hot.$refs.hot)
                    })
                }
            }
            next()
        }
    }
</script>

<style rel="stylesheet/scss" lang="less">
    .activity-index {
        .vux-tab-wrap {
            height: 36px !important;
            padding-top: 0 !important;
        }
        .vux-slider {
            height: 100%;
            overflow: auto;
            padding-top: 44px;
            .vux-swiper {
                height: 100% !important;
                overflow-y: auto !important;
            }
        }
        .vux-swiper-item > div {
            height: 100% !important;
        }
        .weui-btn.has-radius {
            border-radius: 3px !important;
        }
    }

</style>

<style rel="stylesheet/scss" lang="less" scoped>
    .tab-bar {
        width: 100%;
    }
    .detail-item{
        width: 100%;
        height: 100%;
        position: absolute;
        transition: all 0.3s ease;
        transform: translateX(-100%);
        &.active{
            transform: translateX(0);
        }
    }
    .bold{
        font-weight:550;
    }
</style>
