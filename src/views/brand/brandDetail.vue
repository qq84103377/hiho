<template>
    <div class="brand-detail">
        <tab class="tab-bar" :scroll-threshold="2" custom-bar-width="36px" :line-width="2" v-model="index">
            <tab-item v-for="(item, index) in activityText" :key="index" :selected="selectedText === item"
                      @click.native="selectTab(item)">{{item}}
            </tab-item>
        </tab>
        <swiper @on-index-change="swiperChange" :min-moving-distance="100" v-model="index" :show-dots="false">
            <swiper-item v-for="(item, index) in activityText" :key="index">
              <live :brandId="$route.query.brandId" v-if="item == '活动'" ref="brandLive"></live>
              <good :brandId="$route.query.brandId" v-if="item == '货品'" ref="brandGood"></good>
            </swiper-item>
        </swiper>
    </div>
</template>
<script>

  import live from "./components/brandDetailLive";
  import good from "./components/brandDetailGoods";
  import {getPosition, getPositionEnter} from '@/components/position.js'
  export default {
      name: 'brandDetail',
      data() {
          return {
              index: 0,
              selectedText: '货品',
              activityText: ['货品','活动'],
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
      components: {
        good,
        live
      },
      // 记录滚动位置
        beforeRouteEnter(to,from,next){
          console.log(to, 'to')
          if (to.meta.isSelect) {
              if(sessionStorage.brandGoodPosition){
                next(vm => {
                  getPositionEnter(sessionStorage.brandGoodPosition,vm, vm.$refs.brandGood[0].$refs.brandGood)
                })
              }
            } else {
              if(sessionStorage.brandLivePosition){
                next(vm => {
                  getPositionEnter(sessionStorage.brandLivePosition, vm, vm.$refs.brandLive[0].$refs.brandLive)
                })
              }
            }
         next()
        },
        beforeRouteLeave (to, from, next) {
            sessionStorage.brandLivePosition = getPosition(this.$refs.brandLive[0].$refs.brandLive)
            sessionStorage.brandGoodPosition = getPosition(this.$refs.brandGood[0].$refs.brandGood)
            from.meta.isSelect = this.selectedText == '活动' ? false : true
            next()
        }
  }
</script>
<style rel="stylesheet/scss" lang="less">
  .brand-detail{
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
    .weui-btn.has-radius{
      border-radius: 3px !important;
    }
  }

</style>

<style rel="stylesheet/scss" lang="less" scoped>
@import '../../assets/style/vars.less';
.brand-detail{
  .tab-bar {
    padding:0 16px;
    width: 100%;
    position: fixed;
    z-index: 10;
    top: 45px;
    left: 0;
    border-bottom: 0.5px solid @border-color;
    border-top:.5px solid @border-color;
  }
}

</style>
