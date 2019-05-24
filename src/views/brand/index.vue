<template>
  <div class="brand-index">
      <scroller
          ref="brand"
          :snapping="true"
          noDataText="海量货品尽在嗨货"
          :on-refresh="refresh"
          :on-infinite="infinite">
      <div>
        <brand-item @reverstNotice="toggleNotice" :fileList="item" :brandItemIndex="index"  v-for="(item,index) in brandList" :key="index"></brand-item>
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
        pageNum:0
      }
    },
    methods: {
      async refresh(done){
          done(true)
        this.pageNum = 1
        await this.getBrandListH5(done)
      },
      async infinite(done){
        this.pageNum++
        await this.getBrandListH5(done)
      },
      getBrandListH5 (done) {
        let params = {
          userId: this.$store.getters.userInfo.id,
          pageSize:10,
          pageNum:this.pageNum,
        }
        brandListH5(params).then(res => {
            console.log(res.code,'返回状态')
            if(res.code===0){
                console.log(this.pageNum)
                if(res.data.brandList.length==0){
                    if (this.pageNum === 1) this.brandList = []
                    done(true)
                    return
                }
                this.brandList =this.pageNum===1?res.data.brandList:this.brandList.concat(res.data.brandList)
                done()
            }
        })
      },
        toggleNotice(brandItemIndex){
            this.$set(this.brandList[brandItemIndex],'hasNotice',(this.brandList[brandItemIndex].hasNotice===1?0:1))
        }
    },
    // 记录滚动位置
    beforeRouteEnter(to,from,next){
      if(!sessionStorage.position){//当前页面刷新不需要切换位置
        sessionStorage.position = '';
        next();
      }else{
        next(vm => {
          if(vm && vm.$refs.brand){//通过vm实例访问this
            setTimeout(function () {
              vm.$refs.brand.scrollTo(0, sessionStorage.position, false);
            },0)//同步转异步操作
          }
        })
      }
    },
    beforeRouteLeave (to, from, next) {
      sessionStorage.position = this.$refs.brand && this.$refs.brand.getPosition() && this.$refs.brand.getPosition().top
      next()

    },
    created () {
    }
  }
</script>

<style rel="stylesheet/scss" lang="less">
.brand-index{
    > div{
      height: 100% !important;
    }
}

</style>

<style rel="stylesheet/scss" lang="less" scoped>
</style>
