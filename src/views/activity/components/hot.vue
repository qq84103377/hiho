<template>
    <scroller
        ref="hot"
        noDataText="海量货品尽在嗨货"
        :on-refresh="refresh"
        :on-infinite="infinite">
        <div>
            <activity-item type="GOODS" v-for="(item,index) in goodsList" :key="index" :activityInfo="item">
                <div class="price" slot="price">
                    <div class="sale-price red">¥{{item.salePrice}}
                        <s class="blue-gray fs12" v-if="item.postedPrice">¥{{item.postedPrice}}</s>
                    </div>
                    <div class="black fs12">默认代购费:<span class="red fs18">¥{{item.purchaseCost}}</span></div>
                </div>
                <div slot="shopcar">
                    <add-shopcar :checkList="item.specs" :goodsId="item.id"></add-shopcar>
                </div>
                <span slot="btn">
                      <x-button class="w82 has-radius" mini type="primary"
                    @click.native="$router.push({path:'/activityTransmit',query:{type:1,info:item}})">
                    转发
                    </x-button>
                </span>
            </activity-item>
        </div>
    </scroller>
</template>

<script>
    import {getH5GoodsList} from '@/api/activity'
    export default {
        name: "hot",
        data() {
            return {
                goodsList: [],
                pageNum:0
            }
        },
        methods:{

             refresh(done){
                 done(true)
                 this.pageNum = 1
                 this.getGoodsList(done)
            },
             infinite(done){
                this.pageNum++
                 this.getGoodsList(done)
            },
            async getGoodsList(done){
                let params = {
                    userId: this.$store.getters.userInfo.id,
                    pageSize:10,
                    pageNum:this.pageNum,
                    noticeFlag:0,
                }
                await getH5GoodsList(params).then(res => {
                   if(res.code===0){
                       if(res.data.goods.length==0){
                           if (this.pageNum === 1) this.goodsList = []
                           done(true)
                           return
                       }
                       this.goodsList = this.pageNum===1?res.data.goods:this.goodsList.concat(res.data.goods)
                       done()
                       console.log('爆款第'+this.pageNum+'页')
                       console.log(this.goodsList.length,res.data.totalCount)
                   }

               })
            }
        },
        created(){
        }
    }
</script>

<style scoped>

</style>
